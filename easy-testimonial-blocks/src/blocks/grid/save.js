import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import { presetClassName, hoverClassName } from './presets';

export default function save( { attributes } ) {
	const {
		id,
		enableBoxShadow,
		customClases,
		preset,
		hoverStyle,
		customShadow,
	} = attributes;
	return (
		<div
			{ ...useBlockProps.save( {
				className: [
					id,
					presetClassName( preset ),
					enableBoxShadow ? 'has-box-shadow' : '',
					hoverClassName( hoverStyle ),
					enableBoxShadow && customShadow?.enabled
						? 'has-custom-shadow'
						: '',
					customClases || '',
				]
					.filter( Boolean )
					.join( ' ' ),
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
