/**
 * Builds the per-instance editor CSS for the testimonial grid.
 * Mirrors the frontend rules generated in includes/grid.php.
 *
 * The rules are scoped to the active editor device preview
 * ( Desktop | Tablet | Mobile ) instead of media queries, so the
 * editor canvas always renders the selected device's styles.
 */

// converts a border radius value (number | string | per-corner object) to CSS
const toCssValue = ( value, defaultUnit ) => {
	if ( typeof value === 'string' ) {
		const preset = value.match( /^var:preset\|([a-z-]+)\|(.+)$/ );
		if ( preset ) {
			return `var(--wp--preset--${ preset[ 1 ] }--${ preset[ 2 ] })`;
		}
		return /^-?\d+(\.\d+)?$/.test( value )
			? `${ value }${ defaultUnit }`
			: value;
	}
	if ( typeof value === 'number' ) {
		return `${ value }${ defaultUnit }`;
	}
	return value;
};

const getRadiusDeclarations = ( value, defaultUnit ) => {
	if ( value === undefined || value === null || value === '' ) {
		return '';
	}
	if ( typeof value !== 'object' ) {
		return `border-radius: ${ toCssValue( value, defaultUnit ) };`;
	}
	return [
		[ 'top-left', value.topLeft ],
		[ 'top-right', value.topRight ],
		[ 'bottom-right', value.bottomRight ],
		[ 'bottom-left', value.bottomLeft ],
	]
		.filter( ( [ , corner ] ) => corner !== undefined && corner !== '' )
		.map(
			( [ corner, cornerValue ] ) =>
				`border-${ corner }-radius: ${ toCssValue(
					cornerValue,
					defaultUnit
				) };`
		)
		.join( ' ' );
};

// converts a per-side padding object to CSS declarations
const getPaddingDeclarations = ( value ) => {
	if (
		! value ||
		typeof value !== 'object' ||
		( value.top === undefined &&
			value.right === undefined &&
			value.bottom === undefined &&
			value.left === undefined )
	) {
		return '';
	}
	return [
		[ 'top', value.top ],
		[ 'right', value.right ],
		[ 'bottom', value.bottom ],
		[ 'left', value.left ],
	]
		.filter( ( [ , side ] ) => side !== undefined && side !== '' )
		.map(
			( [ side, sideValue ] ) =>
				`padding-${ side }: ${ toCssValue( sideValue, 'px' ) };`
		)
		.join( ' ' );
};

// legacy responsive padding ({desktop,tablet,mobile}) keeps per-device rules
const isBoxPadding = ( value ) =>
	!! value &&
	typeof value === 'object' &&
	( value.top !== undefined ||
		value.right !== undefined ||
		value.bottom !== undefined ||
		value.left !== undefined );

// legacy responsive font sizes ({desktop,tablet,mobile}) keep per-device rules
const isResponsiveSizes = ( value ) =>
	!! value && typeof value === 'object' && value.desktop !== undefined;

// font size declarations for string values ( theme presets / custom sizes )
const getFontSizeDeclaration = ( value ) => {
	if ( typeof value !== 'string' || value === '' ) {
		return '';
	}
	return `font-size: ${ toCssValue( value, 'px' ) };`;
};

const getGridStyles = ( attributes, deviceType = 'Desktop' ) => {
	const {
		id,
		zIndex,
		containerBg,
		containerBorder,
		containerBorderRadius,
		containerPadding,
		iconColor,
		iconOpacity,
		ratingColor,
		ttmFontColor,
		ttmAlign,
		infoAlign,
		photoBorder,
		photoBorderRadius,
		nameFontColor,
		titleFontColor,
		companyFontColor,
		gridCols,
		gridGap,
		iconSizes,
		ttmFontSizes,
		photoSizes,
		nameFontSizes,
		titleFontSizes,
		companyFontSizes,
	} = attributes;

	if ( ! id ) {
		return '';
	}

	const device = [ 'Desktop', 'Tablet', 'Mobile' ].includes( deviceType )
		? deviceType.toLowerCase()
		: 'desktop';

	const fontRule = ( selector, sizes, fallback ) =>
		isResponsiveSizes( sizes )
			? `.${ id } ${ selector } { font-size: ${
					sizes?.[ device ] ?? fallback?.[ device ]
			  }px; }`
			: '';

	const css = `
		.${ id }.wp-block-etb-grid {
			${ zIndex ? `z-index: ${ zIndex };` : '' }
		}
		.${ id } .wp-block-etb-grid-item {
			${ containerBg ? `background: ${ containerBg };` : '' }
			${ getRadiusDeclarations( containerBorderRadius, 'px' ) }
			${ getPaddingDeclarations( containerPadding ) }
			${
				containerBorder?.width && containerBorder.width !== 0
					? `border: ${ toCssValue( containerBorder.width, 'px' ) } ${
							containerBorder.style ?? 'solid'
					  }${
							containerBorder.color
								? ` ${ containerBorder.color }`
								: ''
					  };`
					: ''
			}
		}
		.${ id } .quote-icon svg {
			${ iconColor ? `fill: ${ iconColor };` : '' }
			opacity: ${ iconOpacity };
		}
		.${ id } .rating {
			${ ratingColor ? `color: ${ ratingColor };` : '' }
		}
		.${ id } .testimonial-message {
			${ getFontSizeDeclaration( ttmFontSizes ) }
			${ ttmFontColor ? `color: ${ ttmFontColor };` : '' }
			text-align: ${ ttmAlign };
		}
		.${ id } .reviewer-info {
			justify-content: ${ infoAlign };
		}
		.${ id } .reviewer-photo {
			${ getRadiusDeclarations( photoBorderRadius, '%' ) }
			${
				photoBorder && photoBorder.width !== '0px'
					? `border: ${ photoBorder.width } ${
							photoBorder.style ? photoBorder.style : 'solid'
					  } ${ photoBorder.color ? photoBorder.color : '#fa0' };`
					: ''
			}
		}
		.${ id } .reviewer-name {
			${ getFontSizeDeclaration( nameFontSizes ) }
			${ nameFontColor ? `color: ${ nameFontColor };` : '' }
		}
		.${ id } .reviewer-title {
			${ getFontSizeDeclaration( titleFontSizes ) }
			${ titleFontColor ? `color: ${ titleFontColor };` : '' }
		}
		.${ id } .reviewer-company {
			${ getFontSizeDeclaration( companyFontSizes ) }
			${ companyFontColor ? `color: ${ companyFontColor };` : '' }
		}
	`;

	// rules for the active device preview (mirrors the frontend media queries)
	const deviceCss = `
		.${ id } .block-editor-block-list__layout {
			display: grid;
			grid-template-columns: repeat( ${ gridCols?.[ device ] ?? 2 }, 1fr );
			gap: ${ gridGap?.[ device ] ?? 20 }px;
		}
		${
			isBoxPadding( containerPadding )
				? ''
				: `
		.${ id } .wp-block-etb-grid-item {
			padding: ${ containerPadding?.[ device ] ?? 20 }px;
		}`
		}
		.${ id } .quote-icon svg {
			width: ${ iconSizes?.[ device ] ?? 60 }px;
		}
		${ fontRule( '.testimonial-message', ttmFontSizes, {
			desktop: 20,
			tablet: 18,
			mobile: 16,
		} ) }
		.${ id } .reviewer-photo {
			width: ${ photoSizes?.[ device ] ?? 60 }px;
			height: ${ photoSizes?.[ device ] ?? 60 }px;
		}
		${ fontRule( '.reviewer-name', nameFontSizes, {
			desktop: 24,
			tablet: 20,
			mobile: 18,
		} ) }
		${ fontRule( '.reviewer-title', titleFontSizes, {
			desktop: 18,
			tablet: 16,
			mobile: 14,
		} ) }
		${ fontRule( '.reviewer-company', companyFontSizes, {
			desktop: 16,
			tablet: 15,
			mobile: 14,
		} ) }
	`;

	return css + deviceCss;
};

export default getGridStyles;
