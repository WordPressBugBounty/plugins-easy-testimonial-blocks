import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
const { Fragment } = wp.element;

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

	// set unique id
	setAttributes( {
		id: 'etb-grid-' + clientId.slice( 0, 8 ),
	} );

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
