/**
 * Custom card shadow helpers, shared by the sidebar control and the
 * editor CSS ( mirrored in PHP by etb_shadow_css() ).
 */

// matches the picker's "Medium" ( normal ) and "Large" ( hover ) presets
export const DEFAULT_SHADOW = {
	normal: {
		x: 0,
		y: 12,
		blur: 32,
		spread: -12,
		color: 'rgba(15,23,42,0.22)',
	},
	hover: { x: 0, y: 24, blur: 48, spread: -16, color: 'rgba(15,23,42,0.25)' },
};

// one shadow layer as a CSS box-shadow value
export const shadowToCss = ( layer ) => {
	if ( ! layer ) {
		return '';
	}
	const {
		x = 0,
		y = 0,
		blur = 0,
		spread = 0,
		color = 'rgba(0,0,0,0.2)',
	} = layer;
	return `${ x }px ${ y }px ${ blur }px ${ spread }px ${ color }`;
};
