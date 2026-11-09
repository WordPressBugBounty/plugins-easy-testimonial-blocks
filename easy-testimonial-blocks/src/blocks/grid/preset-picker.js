import { __ } from '@wordpress/i18n';

import { PRESETS } from './presets';

/**
 * Grid of card design thumbnails; the active preset is highlighted.
 *
 * @param {Object}   props          Component props.
 * @param {string}   props.value    Active preset slug.
 * @param {Function} props.onChange Called with the chosen preset slug.
 */
export default function PresetPicker( { value, onChange } ) {
	// set by PHP before the grid's editor script; read at render time so the
	// carousel's bundle ( which may load first ) sees it too
	const thumbnailsUrl = window.etbEditor?.presetsUrl;

	return (
		<div
			className="etb-preset-picker"
			role="radiogroup"
			aria-label={ __( 'Card design', 'easy-testimonial-blocks' ) }
		>
			{ PRESETS.map( ( preset ) => {
				const isActive = ( value || 'classic' ) === preset.slug;
				return (
					<button
						key={ preset.slug }
						type="button"
						role="radio"
						aria-checked={ isActive }
						className={
							'etb-preset-picker__item' +
							( isActive ? ' is-active' : '' )
						}
						onClick={ () => onChange( preset.slug ) }
					>
						<span
							className={ `etb-preset-picker__thumb is-${ preset.slug }` }
						>
							{ thumbnailsUrl && (
								<img
									src={ `${ thumbnailsUrl }${ preset.slug }.webp` }
									alt=""
									loading="lazy"
								/>
							) }
						</span>
						<span className="etb-preset-picker__label">
							{ preset.label }
						</span>
					</button>
				);
			} ) }
		</div>
	);
}
