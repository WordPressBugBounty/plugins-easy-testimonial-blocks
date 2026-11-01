import { __ } from '@wordpress/i18n';
import { Tooltip } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

import icons from '../../options/icons';

// quote styles in display order ( keys match src/utilities/options/icons.js )
const STYLES = [
	{ key: 'two', label: __( 'Filled', 'easy-testimonial-blocks' ) },
	{ key: 'one', label: __( 'Outlined', 'easy-testimonial-blocks' ) },
	{ key: 'four', label: __( 'Filled, closing', 'easy-testimonial-blocks' ) },
	{
		key: 'three',
		label: __( 'Outlined, closing', 'easy-testimonial-blocks' ),
	},
];

/**
 * Quote icon style picker: every style visible at once as a radio group.
 *
 * @param {Object}   props              Component props.
 * @param {string}   props.label        Control label.
 * @param {string}   props.selectedIcon Active icon key.
 * @param {Function} props.func         Called with the chosen icon key.
 */
const IconPicker = ( { label, selectedIcon, func } ) => {
	const labelId = `etb-icon-picker-label-${ useInstanceId( IconPicker ) }`;

	// arrow keys move between options, like a native radio group
	const onKeyDown = ( event, index ) => {
		const step = {
			ArrowRight: 1,
			ArrowDown: 1,
			ArrowLeft: -1,
			ArrowUp: -1,
		}[ event.key ];
		if ( ! step ) {
			return;
		}
		event.preventDefault();
		const next = STYLES[ ( index + step + STYLES.length ) % STYLES.length ];
		func( next.key );
		event.currentTarget.parentElement
			.querySelector( `[data-icon="${ next.key }"]` )
			?.focus();
	};

	return (
		<div className="etb-icon-picker">
			<p className="etb-label" id={ labelId }>
				{ label }
			</p>
			<div
				className="etb-icon-picker__options"
				role="radiogroup"
				aria-labelledby={ labelId }
			>
				{ STYLES.map( ( style, index ) => {
					const isActive = style.key === selectedIcon;
					return (
						<Tooltip key={ style.key } text={ style.label }>
							<button
								type="button"
								role="radio"
								aria-checked={ isActive }
								aria-label={ style.label }
								tabIndex={ isActive ? 0 : -1 }
								data-icon={ style.key }
								className={
									'etb-icon-picker__option' +
									( isActive ? ' is-active' : '' )
								}
								onClick={ () => func( style.key ) }
								onKeyDown={ ( event ) =>
									onKeyDown( event, index )
								}
							>
								{ icons[ style.key ] }
							</button>
						</Tooltip>
					);
				} ) }
			</div>
		</div>
	);
};

export default IconPicker;
