import {
	useBlockProps,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { Fragment, useEffect } from '@wordpress/element';

// editor styles — single source for all editor styles in the plugin
import '../../editor.scss';

// dynamic editor styles
import getGridStyles from './get-grid-styles';

// sidebar settings
import Inspector from './inspector';

// design picker shown while the grid is empty
import GridPlaceholder from './placeholder';

import { presetClassName, hoverClassName } from './presets';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		id,
		enableBoxShadow,
		customClases,
		preset,
		hoverStyle,
		customShadow,
	} = attributes;

	// active editor device preview ( Desktop | Tablet | Mobile )
	const deviceType = useSelect(
		( select ) => select( editorStore )?.getDeviceType?.() ?? 'Desktop',
		[]
	);

	// a freshly inserted grid has no testimonials yet
	const hasItems = useSelect(
		( select ) => select( blockEditorStore ).getBlockCount( clientId ) > 0,
		[ clientId ]
	);

	// another grid in the editor already uses this id ( e.g. after duplicating )
	const isDuplicateId = useSelect(
		( select ) => {
			if ( ! id ) {
				return false;
			}
			const {
				getClientIdsWithDescendants,
				getBlockName,
				getBlockAttributes,
			} = select( blockEditorStore );
			return getClientIdsWithDescendants().some(
				( otherId ) =>
					otherId !== clientId &&
					getBlockName( otherId ) === 'etb/grid' &&
					getBlockAttributes( otherId )?.id === id
			);
		},
		[ clientId, id ]
	);

	// assign a unique id once — only when missing or duplicated, so opening
	// a saved post never marks it as changed
	useEffect( () => {
		if ( ! id || isDuplicateId ) {
			setAttributes( { id: 'etb-grid-' + clientId.slice( 0, 8 ) } );
		}
	}, [ id, isDuplicateId, clientId, setAttributes ] );

	const blockProps = useBlockProps( {
		className: [
			id,
			presetClassName( preset ),
			enableBoxShadow ? 'has-box-shadow' : '',
			hoverClassName( hoverStyle ),
			enableBoxShadow && customShadow?.enabled ? 'has-custom-shadow' : '',
			customClases || '',
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	if ( ! hasItems ) {
		return (
			<div { ...blockProps }>
				<GridPlaceholder clientId={ clientId } />
			</div>
		);
	}

	return (
		<Fragment>
			<style
				dangerouslySetInnerHTML={ {
					__html: getGridStyles( attributes, deviceType ),
				} }
			/>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				clientId={ clientId }
			/>
			<div { ...blockProps }>
				<InnerBlocks allowedBlocks={ [ 'etb/grid-item' ] } />
			</div>
		</Fragment>
	);
}
