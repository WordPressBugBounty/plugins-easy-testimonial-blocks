/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	store as blockEditorStore,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	FontSizePicker,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	RangeControl,
	__experimentalBorderControl as BorderControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

// import components
import ColorControl from '../../utilities/components/colorcontrol/colorcontrol';
import IconPicker from '../../utilities/components/iconpicker/iconpicker';
import SingleInput from '../../utilities/components/singleinput/singleinput';
import ButtonsControl from '../../utilities/components/buttonscontrol/buttonscontrol';

// card design presets
import PresetPicker from './preset-picker';
import ItemsPanelContent from './items-panel';
import { getPresetAttributes, getAccentHint, HOVER_STYLES } from './presets';
import ShadowControl from '../../utilities/components/shadowcontrol/shadowcontrol';
import { DEFAULT_SHADOW } from '../../utilities/shadow';

// import options
import usePanelAccordion from '../../utilities/hooks/use-panel-accordion';
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

// titled sub-section inside a panel ( e.g. Name, Job title )
const ControlGroup = ( { title, children } ) => (
	<div className="etb-control-group">
		<h3 className="etb-control-group__title">{ title }</h3>
		{ children }
	</div>
);

/**
 * Sidebar settings for a testimonial container. The grid and the carousel
 * share every panel except Layout.
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Block attribute setter.
 * @param {string}   props.clientId      Block client id.
 * @param {string}   props.name          Block name, keys the panel accordion.
 * @param {Element}  props.layoutPanel   Layout panel contents; defaults to the grid's.
 */
const Inspector = ( {
	attributes,
	setAttributes,
	clientId,
	name = 'etb/grid',
	layoutPanel,
} ) => {
	// shown next to the Testimonial Items panel title
	const itemCount = useSelect(
		( select ) => select( blockEditorStore ).getBlockCount( clientId ),
		[ clientId ]
	);

	// accordion: opening a panel closes the others in the same tab
	const settingsPanel = usePanelAccordion( `${ name }:settings`, 'design' );
	const stylesPanel = usePanelAccordion( `${ name }:styles` );

	const {
		gridCols,
		gridGap,
		preset,
		accentColor,
		hoverStyle,
		customShadow,
		nameTag,
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

	// Shadow select: none / the design's own shadow / custom normal + hover
	let shadowMode = 'default';
	if ( ! enableBoxShadow ) {
		shadowMode = 'none';
	} else if ( customShadow?.enabled ) {
		shadowMode = 'custom';
	}
	const setShadowMode = ( mode ) =>
		setAttributes( {
			enableBoxShadow: mode !== 'none',
			customShadow: {
				...DEFAULT_SHADOW,
				...customShadow,
				enabled: mode === 'custom',
			},
		} );

	// only designs that use the accent color show its setting
	const accentHint = getAccentHint( preset );

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
			{ /* ─── Settings: what the grid shows and how it's arranged ─── */ }
			<InspectorControls group="settings">
				<PanelBody
					className="etb-panel"
					{ ...settingsPanel( 'design' ) }
					title={ __( 'Design', 'easy-testimonial-blocks' ) }
				>
					<PresetPicker
						value={ preset }
						onChange={ ( slug ) =>
							setAttributes( getPresetAttributes( slug ) )
						}
					/>
					<p className="etb-preset-note">
						{ __(
							'A design sets the card styles. Fine-tune any of them in the Styles tab.',
							'easy-testimonial-blocks'
						) }
					</p>
					{ accentHint && (
						<ColorControl
							label={ __(
								'Accent color',
								'easy-testimonial-blocks'
							) }
							colorValue={ accentColor }
							colorName="accentColor"
							setAttributes={ setAttributes }
							help={ accentHint }
						/>
					) }
				</PanelBody>
				<PanelBody
					className="etb-panel"
					{ ...settingsPanel( 'items' ) }
					title={
						<>
							{ __(
								'Testimonial Items',
								'easy-testimonial-blocks'
							) }
							<span className="etb-panel-count">
								{ itemCount }
							</span>
						</>
					}
				>
					<ItemsPanelContent clientId={ clientId } />
				</PanelBody>
				<PanelBody
					className="etb-panel"
					{ ...settingsPanel( 'layout' ) }
					title={ __( 'Layout', 'easy-testimonial-blocks' ) }
				>
					{ layoutPanel ?? (
						<>
							<SingleInput
								label={ __(
									'Columns',
									'easy-testimonial-blocks'
								) }
								attribute={ gridCols }
								attributeName="gridCols"
								setAttributes={ setAttributes }
								min={ 1 }
								max={ 5 }
							/>
							<SingleInput
								label={ __( 'Gap', 'easy-testimonial-blocks' ) }
								attribute={ gridGap }
								attributeName="gridGap"
								setAttributes={ setAttributes }
								min={ 0 }
								max={ 200 }
							/>
						</>
					) }
				</PanelBody>
				<PanelBody
					className="etb-panel"
					{ ...settingsPanel( 'display' ) }
					title={ __( 'Display', 'easy-testimonial-blocks' ) }
				>
					<ToggleControl
						label={ __( 'Quote icon', 'easy-testimonial-blocks' ) }
						checked={ showIcon }
						onChange={ () =>
							setAttributes( { showIcon: ! showIcon } )
						}
						__nextHasNoMarginBottom
					/>
					{ showIcon && (
						<IconPicker
							label={ __(
								'Icon style',
								'easy-testimonial-blocks'
							) }
							selectedIcon={ icon }
							func={ ( value ) =>
								setAttributes( { icon: value } )
							}
						/>
					) }
					<ToggleControl
						label={ __(
							'Rating number',
							'easy-testimonial-blocks'
						) }
						help={ __(
							'Shows the score, such as 4.8, next to the stars.',
							'easy-testimonial-blocks'
						) }
						checked={ showNumericalRating }
						onChange={ () =>
							setAttributes( {
								showNumericalRating: ! showNumericalRating,
							} )
						}
						__nextHasNoMarginBottom
					/>
					<SelectControl
						label={ __(
							'Reviewer name tag',
							'easy-testimonial-blocks'
						) }
						help={ __(
							'Use a paragraph or div to keep testimonials out of the page heading outline.',
							'easy-testimonial-blocks'
						) }
						value={ nameTag }
						options={ [
							'h2',
							'h3',
							'h4',
							'h5',
							'h6',
							'p',
							'div',
						].map( ( tag ) => ( {
							label: `<${ tag }>`,
							value: tag,
						} ) ) }
						onChange={ ( value ) =>
							setAttributes( { nameTag: value } )
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>

			{ /* ─── Styles: in the order the card reads, top to bottom ─── */ }
			<InspectorControls group="styles">
				<PanelBody
					className="etb-panel"
					{ ...stylesPanel( 'card' ) }
					title={ __( 'Card', 'easy-testimonial-blocks' ) }
				>
					<ColorControl
						label={ __( 'Background', 'easy-testimonial-blocks' ) }
						colorValue={ containerBg }
						colorName="containerBg"
						setAttributes={ setAttributes }
					/>
					<div className="etb-border-control">
						<BorderControl
							label={ __( 'Border', 'easy-testimonial-blocks' ) }
							value={ getBorderControlValue( containerBorder ) }
							onChange={ ( border ) =>
								setAttributes( { containerBorder: border } )
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
							setAttributes( { containerBorderRadius: value } )
						}
					/>
					<div className="etb-box-control">
						<BoxControl
							label={ __( 'Padding', 'easy-testimonial-blocks' ) }
							values={ getPaddingControlValues(
								containerPadding
							) }
							onChange={ ( value ) =>
								setAttributes( { containerPadding: value } )
							}
							allowReset={ false }
						/>
					</div>
					<ControlGroup
						title={ __( 'Effects', 'easy-testimonial-blocks' ) }
					>
						<SelectControl
							label={ __( 'Shadow', 'easy-testimonial-blocks' ) }
							value={ shadowMode }
							options={ [
								{
									value: 'none',
									label: __(
										'None',
										'easy-testimonial-blocks'
									),
								},
								{
									value: 'default',
									label: __(
										'Design default',
										'easy-testimonial-blocks'
									),
								},
								{
									value: 'custom',
									label: __(
										'Custom',
										'easy-testimonial-blocks'
									),
								},
							] }
							onChange={ setShadowMode }
							__nextHasNoMarginBottom
						/>
						{ shadowMode === 'custom' && (
							<ShadowControl
								value={ customShadow }
								onChange={ ( value ) =>
									setAttributes( {
										customShadow: {
											...value,
											enabled: true,
										},
									} )
								}
							/>
						) }
						<SelectControl
							label={ __(
								'Hover effect',
								'easy-testimonial-blocks'
							) }
							help={ __(
								'Plays on your site; hover effects stay off while you edit.',
								'easy-testimonial-blocks'
							) }
							value={ hoverStyle }
							options={ HOVER_STYLES }
							onChange={ ( value ) =>
								setAttributes( { hoverStyle: value } )
							}
							__nextHasNoMarginBottom
						/>
					</ControlGroup>
				</PanelBody>
				{ showIcon && (
					<PanelBody
						className="etb-panel"
						{ ...stylesPanel( 'icon' ) }
						title={ __( 'Quote icon', 'easy-testimonial-blocks' ) }
					>
						<ColorControl
							label={ __( 'Color', 'easy-testimonial-blocks' ) }
							colorValue={ iconColor }
							colorName="iconColor"
							setAttributes={ setAttributes }
						/>
						<SingleInput
							label={ __( 'Size', 'easy-testimonial-blocks' ) }
							attribute={ iconSizes }
							attributeName="iconSizes"
							setAttributes={ setAttributes }
							min={ 1 }
							max={ 200 }
						/>
						<RangeControl
							label={ __( 'Opacity', 'easy-testimonial-blocks' ) }
							value={ iconOpacity }
							onChange={ ( value ) =>
								setAttributes( { iconOpacity: value } )
							}
							min={ 0.1 }
							max={ 1 }
							step={ 0.01 }
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				) }
				<PanelBody
					className="etb-panel"
					{ ...stylesPanel( 'rating' ) }
					title={ __( 'Rating', 'easy-testimonial-blocks' ) }
				>
					<ColorControl
						label={ __( 'Star color', 'easy-testimonial-blocks' ) }
						colorValue={ ratingColor }
						colorName="ratingColor"
						setAttributes={ setAttributes }
					/>
				</PanelBody>
				<PanelBody
					className="etb-panel"
					{ ...stylesPanel( 'text' ) }
					title={ __( 'Quote text', 'easy-testimonial-blocks' ) }
				>
					<FontSizeSetting
						value={ ttmFontSizes }
						attributeName="ttmFontSizes"
						setAttributes={ setAttributes }
					/>
					<ColorControl
						label={ __( 'Color', 'easy-testimonial-blocks' ) }
						colorValue={ ttmFontColor }
						colorName="ttmFontColor"
						setAttributes={ setAttributes }
					/>
					<ButtonsControl
						label={ __( 'Alignment', 'easy-testimonial-blocks' ) }
						attribute={ ttmAlign }
						attributeName="ttmAlign"
						setAttributes={ setAttributes }
						options={ aligns }
					/>
				</PanelBody>
				<PanelBody
					className="etb-panel"
					{ ...stylesPanel( 'photo' ) }
					title={ __( 'Reviewer photo', 'easy-testimonial-blocks' ) }
				>
					<SingleInput
						label={ __( 'Size', 'easy-testimonial-blocks' ) }
						attribute={ photoSizes }
						attributeName="photoSizes"
						setAttributes={ setAttributes }
						min={ 1 }
						max={ 300 }
					/>
					<div className="etb-border-control">
						<BorderControl
							label={ __( 'Border', 'easy-testimonial-blocks' ) }
							onChange={ ( border ) =>
								setAttributes( { photoBorder: border } )
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
							setAttributes( { photoBorderRadius: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					className="etb-panel"
					{ ...stylesPanel( 'details' ) }
					title={ __(
						'Reviewer details',
						'easy-testimonial-blocks'
					) }
				>
					<ButtonsControl
						label={ __( 'Alignment', 'easy-testimonial-blocks' ) }
						attribute={ infoAlign }
						attributeName="infoAlign"
						setAttributes={ setAttributes }
						options={ flexaligns }
					/>
					<ControlGroup
						title={ __( 'Name', 'easy-testimonial-blocks' ) }
					>
						<FontSizeSetting
							value={ nameFontSizes }
							attributeName="nameFontSizes"
							setAttributes={ setAttributes }
						/>
						<ColorControl
							label={ __( 'Color', 'easy-testimonial-blocks' ) }
							colorValue={ nameFontColor }
							colorName="nameFontColor"
							setAttributes={ setAttributes }
						/>
					</ControlGroup>
					<ControlGroup
						title={ __( 'Job title', 'easy-testimonial-blocks' ) }
					>
						<FontSizeSetting
							value={ titleFontSizes }
							attributeName="titleFontSizes"
							setAttributes={ setAttributes }
						/>
						<ColorControl
							label={ __( 'Color', 'easy-testimonial-blocks' ) }
							colorValue={ titleFontColor }
							colorName="titleFontColor"
							setAttributes={ setAttributes }
						/>
					</ControlGroup>
					<ControlGroup
						title={ __( 'Company', 'easy-testimonial-blocks' ) }
					>
						<FontSizeSetting
							value={ companyFontSizes }
							attributeName="companyFontSizes"
							setAttributes={ setAttributes }
						/>
						<ColorControl
							label={ __( 'Color', 'easy-testimonial-blocks' ) }
							colorValue={ companyFontColor }
							colorName="companyFontColor"
							setAttributes={ setAttributes }
						/>
					</ControlGroup>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
};
export default Inspector;
