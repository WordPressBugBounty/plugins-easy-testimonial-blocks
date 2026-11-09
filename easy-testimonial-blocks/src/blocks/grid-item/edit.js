import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	RichText,
	MediaUpload,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	Button,
	ToolbarGroup,
	ToolbarButton,
	ToggleControl,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

// editor star rating component
import StarRating from '../../utilities/components/star-rating';

// import icons
import icons from '../../utilities/options/icons';

// sidebar panels behave as an accordion
import usePanelAccordion from '../../utilities/hooks/use-panel-accordion';

// tags allowed for the reviewer name ( mirrors includes/grid-item.php )
const NAME_TAGS = [ 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div' ];

// keep only what the block renders instead of the whole media object
const toPhoto = ( media ) => ( {
	id: media.id,
	url: media.sizes?.medium?.url || media.url,
	alt: media.alt || '',
} );

export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
} ) {
	// the parent grid owns the card design; the sidebar links back to it
	const gridClientId = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlockRootClientId( clientId ),
		[ clientId ]
	);
	const { selectBlock } = useDispatch( blockEditorStore );
	// accordion: opening a panel closes the other
	const panel = usePanelAccordion( 'etb/grid-item:settings', 'rating' );

	const {
		testimonial,
		reviewerName,
		reviewerTitle,
		reviewerCompany,
		photo,
		showRating,
		rating,
	} = attributes;

	// display settings are owned by the parent grid
	const showIcon = context[ 'etb/showIcon' ] ?? attributes.showIcon;
	const icon = context[ 'etb/icon' ] ?? attributes.icon;
	const showNumericalRating =
		context[ 'etb/showNumericalRating' ] ?? attributes.showNumericalRating;
	const nameTag = NAME_TAGS.includes( context[ 'etb/nameTag' ] )
		? context[ 'etb/nameTag' ]
		: 'h4';
	return (
		<Fragment>
			<InspectorControls group="settings">
				<PanelBody
					className="etb-panel"
					{ ...panel( 'rating' ) }
					title={ __( 'Rating', 'easy-testimonial-blocks' ) }
				>
					<ToggleControl
						label={ __( 'Show rating', 'easy-testimonial-blocks' ) }
						checked={ showRating }
						onChange={ () =>
							setAttributes( { showRating: ! showRating } )
						}
						__nextHasNoMarginBottom
					/>
					{ showRating && (
						<RangeControl
							label={ __( 'Stars', 'easy-testimonial-blocks' ) }
							help={ __(
								'From 0 to 5, in steps of 0.1.',
								'easy-testimonial-blocks'
							) }
							value={ rating }
							onChange={ ( value ) =>
								setAttributes( { rating: value } )
							}
							min={ 0 }
							max={ 5 }
							step={ 0.1 }
							__nextHasNoMarginBottom
						/>
					) }
				</PanelBody>
				{ gridClientId && (
					<PanelBody
						className="etb-panel"
						{ ...panel( 'design' ) }
						title={ __( 'Card design', 'easy-testimonial-blocks' ) }
					>
						<p className="etb-preset-note">
							{ __(
								'Colors, spacing and the card design are shared by every testimonial in the grid or carousel.',
								'easy-testimonial-blocks'
							) }
						</p>
						<Button
							variant="secondary"
							onClick={ () => selectBlock( gridClientId ) }
						>
							{ __(
								'Edit card design',
								'easy-testimonial-blocks'
							) }
						</Button>
					</PanelBody>
				) }
			</InspectorControls>
			{ photo && (
				<BlockControls>
					<ToolbarGroup>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									photo: toPhoto( media ),
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ photo && photo.id }
							render={ ( { open } ) => (
								<ToolbarButton
									icon={ 'edit' }
									label={ __(
										'Replace photo',
										'easy-testimonial-blocks'
									) }
									onClick={ open }
								/>
							) }
						/>
						<ToolbarButton
							icon={ 'trash' }
							label={ __(
								'Remove photo',
								'easy-testimonial-blocks'
							) }
							onClick={ () =>
								setAttributes( { photo: undefined } )
							}
						/>
					</ToolbarGroup>
				</BlockControls>
			) }
			<div { ...useBlockProps() }>
				<div className="testimonial-header">
					<div className="quote-icon">
						{ showIcon && icons[ icon ] }
					</div>
					{ showRating && (
						<div className="rating">
							{ showNumericalRating && (
								<div className="rating-value">{ rating }</div>
							) }

							<StarRating total={ 5 } rating={ rating } />
						</div>
					) }
				</div>
				<RichText
					tagName="p"
					className={ 'testimonial-message' }
					value={ testimonial }
					onChange={ ( value ) =>
						setAttributes( { testimonial: value } )
					}
					placeholder={ __(
						'Write what the customer said…',
						'easy-testimonial-blocks'
					) }
				/>
				<div className="reviewer-info">
					{ photo ? (
						<div className="reviewer-photo">
							<img
								src={ photo.url }
								alt={ photo.alt ? photo.alt : reviewerName }
							/>
						</div>
					) : (
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									photo: toPhoto( media ),
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ photo && photo.id }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									variant="secondary"
									icon={ 'cloud-upload' }
								>
									{ __(
										'Add photo',
										'easy-testimonial-blocks'
									) }
								</Button>
							) }
						/>
					) }

					<div className="reviewer-info-content">
						<RichText
							tagName={ nameTag }
							className={ 'reviewer-name' }
							value={ reviewerName }
							onChange={ ( value ) =>
								setAttributes( { reviewerName: value } )
							}
							placeholder={ __(
								'Reviewer name',
								'easy-testimonial-blocks'
							) }
						/>
						<RichText
							tagName="p"
							className={ 'reviewer-title' }
							value={ reviewerTitle }
							onChange={ ( value ) =>
								setAttributes( { reviewerTitle: value } )
							}
							placeholder={ __(
								'Job title',
								'easy-testimonial-blocks'
							) }
						/>
						<RichText
							tagName="p"
							className={ 'reviewer-company' }
							value={ reviewerCompany }
							onChange={ ( value ) =>
								setAttributes( { reviewerCompany: value } )
							}
							placeholder={ __(
								'Company',
								'easy-testimonial-blocks'
							) }
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
