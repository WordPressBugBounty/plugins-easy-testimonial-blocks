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

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id, showBar, barPosition, enableBoxShadow, customClases } =
		attributes;

	// active editor device preview ( Desktop | Tablet | Mobile )
	const deviceType = useSelect(
		( select ) => select( editorStore )?.getDeviceType?.() ?? 'Desktop',
		[]
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
			showBar ? 'etb-has-bar' + ' ' + barPosition : '',
			enableBoxShadow ? 'has-box-shadow' : '',
			customClases || '',
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

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
			/>
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ [ 'etb/grid-item' ] }
					template={ [ [ 'etb/grid-item' ], [ 'etb/grid-item' ] ] }
				/>
			</div>
		</Fragment>
	);
}
