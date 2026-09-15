const ButtonsControl = ( {
	label,
	attribute,
	attributeName,
	setAttributes,
	options,
} ) => {
	return (
		<div className="etb-buttons-control">
			<p className="etb-label">{ label }</p>
			<div className="buttons-group">
				{ options &&
					options.map( ( option, index ) => {
						return (
							<button
								className={ `single-btn ${
									attribute === option.value ? 'active' : ''
								}` }
								onClick={ () =>
									setAttributes( {
										[ attributeName ]: option.value,
									} )
								}
								key={ index }
							>
								<span
									className={ `dashicons dashicons-editor-${ option.icon }` }
								></span>
							</button>
						);
					} ) }
			</div>
		</div>
	);
};

export default ButtonsControl;
