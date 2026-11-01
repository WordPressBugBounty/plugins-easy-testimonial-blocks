import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';

// classes the v1 accent bar wrote on the wrapper
const LEGACY_BAR_CLASSES = [
	'etb-has-bar',
	'etb_left',
	'etb_right',
	'etb_top',
	'etb_bottom',
];

/**
 * v1 ( <= 1.1.2 ): saved the unused accent bar classes
 * ( `etb-has-bar etb_left` ) on the wrapper. The bar lost its styles in
 * 1.1.0 and was removed in 1.2.0; this entry migrates old grids.
 */
const v1 = {
	attributes: {
		...metadata.attributes,
		showBar: {
			type: 'boolean',
			default: true,
		},
		barPosition: {
			type: 'string',
			default: 'etb_left',
		},
		barThickness: {
			type: 'number',
			default: 4,
		},
		barColor: {
			type: 'string',
			default: '#c0c0c0',
		},
	},
	supports: {
		html: true,
		anchor: true,
		align: [ 'wide', 'full' ],
		customClassName: true,
	},
	// Core moves classes that the current `save` doesn't produce into the
	// "Additional CSS class(es)" field, so old grids still pass validation;
	// opt them into this migration so the legacy classes get dropped. The
	// first argument only holds the raw comment attributes, so the fixed-up
	// class is read from the parsed block.
	isEligible( attributes, innerBlocks, { block } = {} ) {
		const className = block?.attributes?.className;
		return (
			!! className &&
			className
				.split( /\s+/ )
				.some( ( name ) => LEGACY_BAR_CLASSES.includes( name ) )
		);
	},
	migrate( attributes ) {
		const { showBar, barPosition, barThickness, barColor, ...migrated } =
			attributes;
		return migrated;
	},
	save( { attributes } ) {
		const { id, showBar, barPosition, enableBoxShadow, customClases } =
			attributes;
		return (
			<div
				{ ...useBlockProps.save( {
					className: `${ id } ${
						showBar ? 'etb-has-bar' + ' ' + barPosition : ''
					} ${ enableBoxShadow ? 'has-box-shadow' : '' } ${
						customClases || ''
					}`,
				} ) }
			>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export default [ v1 ];
