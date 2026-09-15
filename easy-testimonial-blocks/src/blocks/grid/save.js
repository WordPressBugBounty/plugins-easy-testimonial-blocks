import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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
}
