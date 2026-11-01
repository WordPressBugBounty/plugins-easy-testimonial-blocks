import { __ } from '@wordpress/i18n';
import { Button, Dropdown, TextControl } from '@wordpress/components';

import ColorControl from '../colorcontrol/colorcontrol';
import { shadowToCss } from '../../shadow';

// one-click starting points ( single layer, like the custom fields )
const PRESETS = [
	{
		name: __( 'Subtle', 'easy-testimonial-blocks' ),
		value: { x: 0, y: 1, blur: 3, spread: 0, color: 'rgba(15,23,42,0.12)' },
	},
	{
		name: __( 'Soft', 'easy-testimonial-blocks' ),
		value: {
			x: 0,
			y: 8,
			blur: 24,
			spread: -8,
			color: 'rgba(15,23,42,0.15)',
		},
	},
	{
		name: __( 'Medium', 'easy-testimonial-blocks' ),
		value: {
			x: 0,
			y: 12,
			blur: 32,
			spread: -12,
			color: 'rgba(15,23,42,0.22)',
		},
	},
	{
		name: __( 'Large', 'easy-testimonial-blocks' ),
		value: {
			x: 0,
			y: 24,
			blur: 48,
			spread: -16,
			color: 'rgba(15,23,42,0.25)',
		},
	},
	{
		name: __( 'Floating', 'easy-testimonial-blocks' ),
		value: {
			x: 0,
			y: 32,
			blur: 64,
			spread: -24,
			color: 'rgba(15,23,42,0.35)',
		},
	},
	{
		name: __( 'Crisp', 'easy-testimonial-blocks' ),
		value: { x: 6, y: 6, blur: 0, spread: 0, color: 'rgba(15,23,42,0.9)' },
	},
	{
		name: __( 'Glow', 'easy-testimonial-blocks' ),
		value: {
			x: 0,
			y: 12,
			blur: 32,
			spread: -8,
			color: 'rgba(79,70,229,0.45)',
		},
	},
	{
		name: __( 'Ring', 'easy-testimonial-blocks' ),
		value: { x: 0, y: 0, blur: 0, spread: 3, color: 'rgba(79,70,229,0.3)' },
	},
];

const FIELDS = [
	{
		key: 'x',
		label: __( 'X', 'easy-testimonial-blocks' ),
		min: -50,
		max: 50,
	},
	{
		key: 'y',
		label: __( 'Y', 'easy-testimonial-blocks' ),
		min: -50,
		max: 50,
	},
	{
		key: 'blur',
		label: __( 'Blur', 'easy-testimonial-blocks' ),
		min: 0,
		max: 100,
	},
	{
		key: 'spread',
		label: __( 'Spread', 'easy-testimonial-blocks' ),
		min: -50,
		max: 50,
	},
];

const isSame = ( a, b ) =>
	[ 'x', 'y', 'blur', 'spread', 'color' ].every(
		( key ) => String( a?.[ key ] ) === String( b?.[ key ] )
	);

// small white card wearing the shadow
const Swatch = ( { layer, size = 'small' } ) => (
	<span className={ `etb-shadow-swatch is-${ size }` }>
		<span style={ { boxShadow: shadowToCss( layer ) } } />
	</span>
);

/**
 * One shadow layer: a row showing the shadow, opening presets plus custom
 * offset / blur / spread / color fields.
 *
 * @param {Object}   props          Component props.
 * @param {string}   props.label    Row label ( e.g. "Normal" ).
 * @param {Object}   props.value    Layer { x, y, blur, spread, color }.
 * @param {Function} props.onChange Called with the updated layer.
 */
export default function ShadowPicker( { label, value, onChange } ) {
	const layer = value || PRESETS[ 2 ].value;
	const set = ( key, next ) => onChange( { ...layer, [ key ]: next } );

	return (
		<Dropdown
			className="etb-shadow-picker"
			// focus the popover itself, not the first preset ( its focus ring reads as "selected" )
			popoverProps={ {
				placement: 'left-start',
				offset: 36,
				focusOnMount: true,
			} }
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					className="etb-shadow-picker__toggle"
					onClick={ onToggle }
					aria-expanded={ isOpen }
				>
					<Swatch layer={ layer } />
					<span className="etb-shadow-picker__label">{ label }</span>
					<span className="etb-shadow-picker__summary">
						{ `${ layer.x } ${ layer.y } ${ layer.blur } ${ layer.spread }` }
					</span>
				</Button>
			) }
			renderContent={ () => (
				<div className="etb-shadow-picker__popover">
					<div className="etb-shadow-picker__preview">
						<Swatch layer={ layer } size="large" />
					</div>

					<p className="etb-shadow-picker__heading">
						{ __( 'Presets', 'easy-testimonial-blocks' ) }
					</p>
					<div className="etb-shadow-picker__presets">
						{ PRESETS.map( ( preset ) => (
							<button
								key={ preset.name }
								type="button"
								className={
									'etb-shadow-picker__preset' +
									( isSame( preset.value, layer )
										? ' is-active'
										: '' )
								}
								aria-pressed={ isSame( preset.value, layer ) }
								onClick={ () =>
									onChange( { ...preset.value } )
								}
							>
								<Swatch layer={ preset.value } />
								<span>{ preset.name }</span>
							</button>
						) ) }
					</div>

					<p className="etb-shadow-picker__heading">
						{ __( 'Customize', 'easy-testimonial-blocks' ) }
					</p>
					<div className="etb-shadow-picker__fields">
						{ FIELDS.map( ( field ) => (
							<TextControl
								key={ field.key }
								type="number"
								label={ field.label }
								value={ layer[ field.key ] }
								min={ field.min }
								max={ field.max }
								onChange={ ( next ) => {
									const number = parseInt( next, 10 );
									// "" or "-" while typing a negative value: wait for a number
									if ( Number.isNaN( number ) ) {
										return;
									}
									set(
										field.key,
										Math.max(
											field.min,
											Math.min( field.max, number )
										)
									);
								} }
								__nextHasNoMarginBottom
								__next40pxDefaultSize
							/>
						) ) }
					</div>
					<ColorControl
						label={ __( 'Color', 'easy-testimonial-blocks' ) }
						colorValue={ layer.color }
						onChange={ ( next ) =>
							set( 'color', next || PRESETS[ 2 ].value.color )
						}
					/>
				</div>
			) }
		/>
	);
}
