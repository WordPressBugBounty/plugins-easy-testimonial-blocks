import { __ } from '@wordpress/i18n';

import ShadowPicker from './shadowpicker';
import { DEFAULT_SHADOW } from '../../shadow';

/**
 * Custom card shadow: one picker for the normal state, one for hover.
 *
 * @param {Object}   props          Component props.
 * @param {Object}   props.value    Shadow attribute ( { enabled, normal, hover } ).
 * @param {Function} props.onChange Called with the updated shadow.
 */
export default function ShadowControl( { value, onChange } ) {
	const shadow = { ...DEFAULT_SHADOW, ...value };

	return (
		<div className="etb-shadow-control">
			<ShadowPicker
				label={ __( 'Normal', 'easy-testimonial-blocks' ) }
				value={ shadow.normal }
				onChange={ ( normal ) => onChange( { ...shadow, normal } ) }
			/>
			<ShadowPicker
				label={ __( 'Hover', 'easy-testimonial-blocks' ) }
				value={ shadow.hover }
				onChange={ ( hover ) => onChange( { ...shadow, hover } ) }
			/>
		</div>
	);
}
