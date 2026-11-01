import { __, sprintf } from '@wordpress/i18n';
import {
	DropdownMenu,
	MenuGroup,
	MenuItem,
	RangeControl,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { SVG, Path } from '@wordpress/primitives';

// the editor's own device preview icons ( same paths as core's preview menu )
const deviceIcon = ( d ) => (
	<SVG
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
	>
		<Path d={ d } />
	</SVG>
);

// core's checkmark, marks the active device in the menu
const checkIcon = (
	<SVG
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
	>
		<Path d="M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 7.9z" />
	</SVG>
);

// device keys (attribute keys) mapped to the core editor device type values
const DEVICES = [
	{
		key: 'desktop',
		value: 'Desktop',
		label: __( 'Desktop', 'easy-testimonial-blocks' ),
		icon: deviceIcon(
			'M20.5 16h-.7V8c0-1.1-.9-2-2-2H6.2c-1.1 0-2 .9-2 2v8h-.7c-.8 0-1.5.7-1.5 1.5h20c0-.8-.7-1.5-1.5-1.5zM5.7 8c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v7.6H5.7V8z'
		),
	},
	{
		key: 'tablet',
		value: 'Tablet',
		label: __( 'Tablet', 'easy-testimonial-blocks' ),
		icon: deviceIcon(
			'M17 4H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12zm-7.5-.5h4V16h-4v1.5z'
		),
	},
	{
		key: 'mobile',
		value: 'Mobile',
		label: __( 'Mobile', 'easy-testimonial-blocks' ),
		icon: deviceIcon(
			'M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z'
		),
	},
];

const SingleInput = ( {
	label,
	attribute,
	attributeName,
	setAttributes,
	min,
	max,
} ) => {
	// share the device state with the editor canvas (device preview)
	const { deviceType, hasEditorStore } = useSelect( ( select ) => {
		const store = select( editorStore );
		return {
			deviceType: store?.getDeviceType?.() ?? 'Desktop',
			hasEditorStore: !! store?.getDeviceType,
		};
	}, [] );
	const { setDeviceType } = useDispatch( editorStore );

	const device = deviceType?.toLowerCase() ?? 'desktop';
	const current =
		DEVICES.find( ( item ) => item.key === device ) ?? DEVICES[ 0 ];

	return (
		<div className="etb-single-input">
			<div className="etb-control-header">
				<span className="etb-control-label">{ label }</span>
				{ hasEditorStore && (
					<DropdownMenu
						className="etb-device-menu"
						icon={ current.icon }
						label={ sprintf(
							/* translators: %s: device name, e.g. "Desktop" */
							__(
								'Editing %s values. Change device',
								'easy-testimonial-blocks'
							),
							current.label
						) }
						toggleProps={ {
							size: 'small',
							className: 'etb-device-toggle',
						} }
						popoverProps={ { placement: 'bottom-start' } }
					>
						{ ( { onClose } ) => (
							<MenuGroup
								label={ __(
									'Device',
									'easy-testimonial-blocks'
								) }
							>
								{ DEVICES.map( ( item ) => (
									<MenuItem
										key={ item.key }
										icon={ item.icon }
										iconPosition="left"
										role="menuitemradio"
										isSelected={ item.key === device }
										suffix={
											item.key === device
												? checkIcon
												: null
										}
										onClick={ () => {
											setDeviceType( item.value );
											onClose();
										} }
									>
										{ item.label }
									</MenuItem>
								) ) }
							</MenuGroup>
						) }
					</DropdownMenu>
				) }
			</div>
			<div className="etb-inputs">
				<RangeControl
					value={ attribute?.[ device ] }
					onChange={ ( value ) =>
						setAttributes( {
							[ attributeName ]: {
								...attribute,
								[ device ]: value,
							},
						} )
					}
					min={ min }
					max={ max }
				/>
			</div>
		</div>
	);
};
export default SingleInput;
