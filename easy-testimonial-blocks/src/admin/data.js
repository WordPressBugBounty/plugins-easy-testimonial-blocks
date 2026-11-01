import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect, useCallback } from '@wordpress/element';

// settings printed by ETB_Admin::get_app_settings()
export const settings = window.etbDashboard || {};

const PATTERN_PREFIX = 'easy-testimonial-blocks/';

/**
 * Fetches a REST path once and exposes { data, error, isLoading, reload }.
 *
 * @param {string}   path      REST path.
 * @param {Function} transform Maps the response before it is stored.
 * @return {Object} Request state.
 */
const useRequest = ( path, transform = ( response ) => response ) => {
	const [ state, setState ] = useState( {
		data: null,
		error: null,
		isLoading: true,
	} );

	const load = useCallback( () => {
		setState( ( previous ) => ( { ...previous, isLoading: true } ) );
		apiFetch( { path } )
			.then( ( response ) =>
				setState( {
					data: transform( response ),
					error: null,
					isLoading: false,
				} )
			)
			.catch( ( error ) =>
				setState( { data: null, error, isLoading: false } )
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ path ] );

	useEffect( load, [ load ] );

	return { ...state, reload: load };
};

// usage stats and the content that contains a Testimonial Grid
export const useOverview = () => useRequest( '/etb/v1/overview' );

// the plugin's bundled patterns, in registration order
export const usePatterns = () =>
	useRequest( '/wp/v2/block-patterns/patterns', ( patterns ) =>
		patterns
			.filter( ( pattern ) => pattern.name.startsWith( PATTERN_PREFIX ) )
			.map( ( pattern ) => ( {
				...pattern,
				slug: pattern.name.slice( PATTERN_PREFIX.length ),
			} ) )
	);

/**
 * Creates a draft page from a pattern and opens it in the editor.
 *
 * @param {Object} pattern Pattern from usePatterns().
 * @param {string} title   Title for the new page.
 * @return {Promise} Resolves once the browser starts navigating.
 */
export const createPageFromPattern = async ( pattern, title ) => {
	const page = await apiFetch( {
		path: '/wp/v2/pages',
		method: 'POST',
		data: { title, status: 'draft', content: pattern.content },
	} );
	window.location.href = settings.editPostUrl + page.id;
};

// pattern title without the shared "Testimonials: " prefix, capitalized
export const shortPatternTitle = ( title ) => {
	const short = title.includes( ':' )
		? title.slice( title.indexOf( ':' ) + 1 ).trim()
		: title;
	return short.charAt( 0 ).toUpperCase() + short.slice( 1 );
};
