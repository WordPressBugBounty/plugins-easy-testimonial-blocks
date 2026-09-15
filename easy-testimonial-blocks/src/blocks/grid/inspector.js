/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	FontSizePicker,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	__experimentalBorderControl as BorderControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
const { Fragment } = wp.element;

// import components
import ColorControl from '../../utilities/components/colorcontrol/colorcontrol';
import IconPicker from '../../utilities/components/iconpicker/iconpicker';
import SingleInput from '../../utilities/components/singleinput/singleinput';
import ButtonsControl from '../../utilities/components/buttonscontrol/buttonscontrol';

// import options
import aligns from '../../utilities/options/aligns';
import flexaligns from '../../utilities/options/flexaligns';

// legacy responsive defaults for the font size attributes
const FONT_SIZE_DEFAULTS = {
	ttmFontSizes: { desktop: 20, tablet: 18, mobile: 16 },
	nameFontSizes: { desktop: 24, tablet: 20, mobile: 18 },
	titleFontSizes: { desktop: 18, tablet: 16, mobile: 14 },
	companyFontSizes: { desktop: 16, tablet: 15, mobile: 14 },
};

// normalize legacy responsive font sizes for the core font size picker
const getFontSizeControlValue = ( value ) => {
	if (
		typeof value === 'object' &&
		value !== null &&
		value.desktop !== undefined
	) {
		return `${ value.desktop }px`;
	}
	return value;
};

const FontSizeSetting = ( { label, value, attributeName, setAttributes } ) => (
	<div className="etb-font-size">
		{ label && <p className="etb-label">{ label }</p> }
		<FontSizePicker
			value={ getFontSizeControlValue( value ) }
			onChange={ ( next ) =>
				setAttributes( {
					[ attributeName ]:
						next ?? FONT_SIZE_DEFAULTS[ attributeName ],
				} )
			}
		/>
	</div>
);

const Inspector = ( { attributes, setAttributes } ) => {
	const {
		gridCols,
		gridGap,
		showIcon,
		icon,
		iconSizes,
		iconColor,
		iconOpacity,
		showNumericalRating,
		ratingColor,
		ttmFontSizes,
		ttmFontColor,
		ttmAlign,
		photoSizes,
		photoBorder,
		photoBorderRadius,
		infoAlign,
		nameFontSizes,
		nameFontColor,
		titleFontSizes,
		titleFontColor,
		companyFontSizes,
		companyFontColor,
		containerBorder,
		containerBorderRadius,
		containerPadding,
		enableBoxShadow,
		containerBg,
	} = attributes;

	// normalize legacy numeric radius values for the core radius control
	const getRadiusControlValues = ( value, defaultUnit ) =>
		typeof value === 'number' ? `${ value }${ defaultUnit }` : value;

	// normalize legacy responsive padding for the core box control
	const getPaddingControlValues = ( value ) => {
		if (
			! value ||
			typeof value !== 'object' ||
			value.top !== undefined ||
			value.right !== undefined ||
			value.bottom !== undefined ||
			value.left !== undefined
		) {
			return value;
		}
		if ( value.desktop !== undefined ) {
			const all = `${ value.desktop }px`;
			return { top: all, right: all, bottom: all, left: all };
		}
		return undefined;
	};

	// normalize legacy numeric border widths for the core border control
	const getBorderControlValue = ( value ) => {
		if ( ! value || typeof value !== 'object' ) {
			return value;
		}
		return {
			...value,
			width:
				typeof value.width === 'number'
					? `${ value.width }px`
					: value.width,
		};
	};

	return (
		<Fragment>
			<InspectorControls group="settings">
				<PanelBody
					title={ __( 'Layout', 'easy-testimonial-blocks' ) }
					initialOpen={ true }
				>
					<SingleInput
						label={ __(
							'Grid Columns',
							'easy-testimonial-blocks'
						) }
						attribute={ gridCols }
						attributeName="gridCols"
						setAttributes={ setAttributes }
						min={ 1 }
						max={ 5 }
					/>
					<SingleInput
						label={ __( 'Grid Gap', 'easy-testimonial-blocks' ) }
						attribute={ gridGap }
						attributeName="gridGap"
						setAttributes={ setAttributes }
						min={ 0 }
						max={ 200 }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Quote Icon', 'easy-testimonial-blocks' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Show Quote Icon',
							'easy-testimonial-blocks'
						) }
						checked={ showIcon }
						onChange={ () =>
							setAttributes( {
								showIcon: ! showIcon,
							} )
						}
					/>
					{ showIcon && (
						<IconPicker
							label={ __(
								'Select Quote Icon',
								'easy-testimonial-blocks'
							) }
							selectedIcon={ icon }
							func={ ( value ) =>
								setAttributes( {
									icon: value,
								} )
							}
						/>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Rating', 'easy-testimonial-blocks' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Show Number Rating',
							'easy-testimonial-blocks'
						) }
						checked={ showNumericalRating }
						onChange={ () =>
							setAttributes( {
								showNumericalRating: ! showNumericalRating,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody
					title={ __( 'Container', 'easy-testimonial-blocks' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Enable Box Shadow',
							'easy-testimonial-blocks'
						) }
						checked={ enableBoxShadow }
						onChange={ () =>
							setAttributes( {
								enableBoxShadow: ! enableBoxShadow,
							} )
						}
					/>
					<ColorControl
						label={ __( 'Background', 'easy-testimonial-blocks' ) }
						colorValue={ containerBg }
						colorName="containerBg"
						setAttributes={ setAttributes }
						disableAlpha={ false }
					/>
					<div className="etb-border-control">
						<BorderControl
							label={ __( 'Border', 'easy-testimonial-blocks' ) }
							value={ getBorderControlValue( containerBorder ) }
							onChange={ ( border ) =>
								setAttributes( {
									containerBorder: border,
								} )
							}
							withSlider={ true }
							disableUnits
						/>
					</div>
					<BorderRadiusControl
						values={ getRadiusControlValues(
							containerBorderRadius,
							'px'
						) }
						onChange={ ( value ) =>
							setAttributes( {
								containerBorderRadius: value,
							} )
						}
					/>
					<div className="etb-box-control">
						<BoxControl
							label={ __( 'Padding', 'easy-testimonial-blocks' ) }
							values={ getPaddingControlValues(
								containerPadding
							) }
							onChange={ ( value ) =>
								setAttributes( {
									containerPadding: value,
								} )
							}
							allowReset={ false }
						/>
					</div>
				</PanelBody>
				{ showIcon && (
					<PanelBody
						title={ __( 'Quote Icon', 'easy-testimonial-blocks' ) }
						initialOpen={ false }
					>
						<SingleInput
							label={ __(
								'Icon Size',
								'easy-testimonial-blocks'
							) }
							attribute={ iconSizes }
							attributeName="iconSizes"
							setAttributes={ setAttributes }
							min={ 1 }
							max={ 200 }
						/>
						<ColorControl
							label={ __(
								'Quote Icon Color',
								'easy-testimonial-blocks'
							) }
							colorValue={ iconColor }
							colorName="iconColor"
							setAttributes={ setAttributes }
							disableAlpha={ true }
						/>
						<RangeControl
							label={ __(
								'Icon Opacity',
								'easy-testimonial-blocks'
							) }
							value={ iconOpacity }
							onChange={ ( value ) =>
								setAttributes( {
									iconOpacity: value,
								} )
							}
							min={ 0.1 }
							max={ 1 }
							step={ 0.01 }
						/>
					</PanelBody>
				) }
				<PanelBody
					title={ __( 'Rating', 'easy-testimonial-blocks' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __(
							'Rating Color',
							'easy-testimonial-blocks'
						) }
						colorValue={ ratingColor }
						colorName="ratingColor"
						setAttributes={ setAttributes }
						disableAlpha={ true }
					/>
				</PanelBody>
				<PanelBody
					title={ __(
						'Testimonial Content',
						'easy-testimonial-blocks'
					) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Color', 'easy-testimonial-blocks' ) }
						colorValue={ ttmFontColor }
						colorName="ttmFontColor"
						setAttributes={ setAttributes }
						disableAlpha={ true }
					/>
					<FontSizeSetting
						value={ ttmFontSizes }
						attributeName="ttmFontSizes"
						setAttributes={ setAttributes }
					/>
					<ButtonsControl
						label={ __( 'Text Align', 'easy-testimonial-blocks' ) }
						attribute={ ttmAlign }
						attributeName="ttmAlign"
						setAttributes={ setAttributes }
						options={ aligns }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'User Photo', 'easy-testimonial-blocks' ) }
					initialOpen={ false }
				>
					<SingleInput
						label={ __( 'Photo Size', 'easy-testimonial-blocks' ) }
						attribute={ photoSizes }
						attributeName="photoSizes"
						setAttributes={ setAttributes }
						min={ 1 }
						max={ 300 }
					/>
					<div className="etb-border-control">
						<BorderControl
							label={ __(
								'Photo Border',
								'easy-testimonial-blocks'
							) }
							onChange={ ( border ) =>
								setAttributes( {
									photoBorder: border,
								} )
							}
							value={ photoBorder }
							withSlider={ true }
							disableUnits
						/>
					</div>
					<BorderRadiusControl
						values={ getRadiusControlValues(
							photoBorderRadius,
							'%'
						) }
						onChange={ ( value ) =>
							setAttributes( {
								photoBorderRadius: value,
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'User Info', 'easy-testimonial-blocks' ) }
					initialOpen={ false }
				>
					<ButtonsControl
						label={ __( 'Alignment', 'easy-testimonial-blocks' ) }
						attribute={ infoAlign }
						attributeName="infoAlign"
						setAttributes={ setAttributes }
						options={ flexaligns }
					/>
					<FontSizeSetting
						label={ __( 'Name', 'easy-testimonial-blocks' ) }
						value={ nameFontSizes }
						attributeName="nameFontSizes"
						setAttributes={ setAttributes }
					/>
					<ColorControl
						label={ __( 'Name Color', 'easy-testimonial-blocks' ) }
						colorValue={ nameFontColor }
						colorName="nameFontColor"
						setAttributes={ setAttributes }
						disableAlpha={ true }
					/>
					<FontSizeSetting
						label={ __( 'Designation', 'easy-testimonial-blocks' ) }
						value={ titleFontSizes }
						attributeName="titleFontSizes"
						setAttributes={ setAttributes }
					/>
					<ColorControl
						label={ __(
							'Designation Color',
							'easy-testimonial-blocks'
						) }
						colorValue={ titleFontColor }
						colorName="titleFontColor"
						setAttributes={ setAttributes }
						disableAlpha={ true }
					/>
					<FontSizeSetting
						label={ __( 'Company', 'easy-testimonial-blocks' ) }
						value={ companyFontSizes }
						attributeName="companyFontSizes"
						setAttributes={ setAttributes }
					/>
					<ColorControl
						label={ __(
							'Company Color',
							'easy-testimonial-blocks'
						) }
						colorValue={ companyFontColor }
						colorName="companyFontColor"
						setAttributes={ setAttributes }
						disableAlpha={ true }
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
};

export default Inspector;
