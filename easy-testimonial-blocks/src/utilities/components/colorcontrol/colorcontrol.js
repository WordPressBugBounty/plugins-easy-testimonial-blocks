import { __ } from '@wordpress/i18n';
import {
	Button,
	ColorIndicator,
	ColorPalette,
	Dropdown,
} from '@wordpress/components';
import { useSettings } from '@wordpress/block-editor';

/**
 * Color setting styled like core's color controls: a row with a swatch,
 * the label and the current value, opening the theme palette plus a custom
 * picker. Clearing falls back to the design's default color.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.label         Setting label.
 * @param {string}   props.colorName     Attribute the color is stored in.
 * @param {string}   props.colorValue    Current color.
 * @param {Function} props.setAttributes Block attribute setter.
 * @param {boolean}  props.disableAlpha  Hide the opacity slider.
 * @param {string}   props.help          Optional hint shown under the row.
 * @param {Function} props.onChange      Optional handler, used instead of colorName / setAttributes.
 */
const ColorControl = ( {
	label,
	colorName,
	colorValue,
	setAttributes,
	disableAlpha,
	help,
	onChange,
} ) => {
	const [ palette ] = useSettings( 'color.palette' );

	return (
		<div className="etb-color-control">
			<Dropdown
				className="etb-color-control__dropdown"
				popoverProps={ { placement: 'left-start', offset: 36 } }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						className="etb-color-control__toggle"
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						<ColorIndicator colorValue={ colorValue } />
						<span className="etb-color-control__label">
							{ label }
						</span>
						<span className="etb-color-control__value">
							{ colorValue ||
								__( 'Default', 'easy-testimonial-blocks' ) }
						</span>
					</Button>
				) }
				renderContent={ () => (
					<div className="etb-color-control__popover">
						<ColorPalette
							colors={ palette ?? [] }
							value={ colorValue }
							enableAlpha={ ! disableAlpha }
							onChange={ ( value ) =>
								onChange
									? onChange( value )
									: setAttributes( { [ colorName ]: value } )
							}
							__experimentalIsRenderedInSidebar
						/>
					</div>
				) }
			/>
			{ help && <p className="etb-color-control__help">{ help }</p> }
		</div>
	);
};

export default ColorControl;
