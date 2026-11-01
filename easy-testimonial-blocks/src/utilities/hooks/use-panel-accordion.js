import { useSyncExternalStore, useCallback } from '@wordpress/element';

/*
 * Open panel per group, shared by every instance. Each block's inspector
 * stays mounted even when another block is selected, so local state would
 * drift; a shared store keeps all of them in sync for the session.
 */
const openPanels = {};
const listeners = new Set();

const setOpenPanel = ( group, name ) => {
	openPanels[ group ] = name;
	listeners.forEach( ( listener ) => listener() );
};

const subscribe = ( listener ) => {
	listeners.add( listener );
	return () => listeners.delete( listener );
};

/**
 * Accordion behavior for sidebar panels: opening one PanelBody closes the
 * others in the same group. Clicking the open panel closes it.
 *
 * Usage:
 *   const panel = usePanelAccordion( 'etb/grid:settings', 'design' );
 *   <PanelBody title="Layout" { ...panel( 'layout' ) }>…</PanelBody>
 *
 * @param {string}      group       Unique key for a set of panels ( e.g. one inspector tab ).
 * @param {string|null} initialOpen Panel open until the user picks one.
 * @return {Function} Returns the `opened` / `onToggle` props for a panel name.
 */
export default function usePanelAccordion( group, initialOpen = null ) {
	const openPanel = useSyncExternalStore( subscribe, () =>
		group in openPanels ? openPanels[ group ] : initialOpen
	);

	const toggle = useCallback(
		( name ) => setOpenPanel( group, openPanel === name ? null : name ),
		[ group, openPanel ]
	);

	return ( name ) => ( {
		opened: openPanel === name,
		onToggle: () => toggle( name ),
	} );
}
