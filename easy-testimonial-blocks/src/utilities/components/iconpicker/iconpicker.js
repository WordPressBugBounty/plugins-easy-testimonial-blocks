// import icons
import icons from '../../options/icons';
import { Dashicon } from '@wordpress/components';
import { useState } from '@wordpress/element';

const IconPicker = ( { label, selectedIcon, func } ) => {
	const [ showIcons, setShowIcons ] = useState( false );
	return (
		<div className="etb-icon-picker">
			<p className="etb-label">{ label }</p>
			<button
				className="icon-header"
				onClick={ () => setShowIcons( true ) }
			>
				<span className="selected-icon">{ icons[ selectedIcon ] }</span>
				<Dashicon icon={ showIcons ? 'minus' : 'plus' } />
			</button>
			{ showIcons && (
				<div className="icons-list">
					{
						// Loop through icons object
						Object.keys( icons ).map( ( icon, index ) => {
							return (
								<button
									className={ `icon ${
										icon === selectedIcon
											? 'active-icon'
											: ''
									}` }
									key={ index }
									onClick={ () => {
										func( icon );
										setShowIcons( false );
									} }
								>
									{ icons[ icon ] }
								</button>
							);
						} )
					}
				</div>
			) }
		</div>
	);
};

export default IconPicker;
