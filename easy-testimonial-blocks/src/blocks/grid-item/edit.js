import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	RichText,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	Button,
	ToolbarGroup,
	ToolbarButton,
	ToggleControl,
	Card,
	CardHeader,
	CardBody,
	RangeControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

// editor star rating component
import StarRating from '../../utilities/components/star-rating';

// import icons
import icons from '../../utilities/options/icons';

// tags allowed for the reviewer name ( mirrors includes/grid-item.php )
const NAME_TAGS = [ 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div' ];

// keep only what the block renders instead of the whole media object
const toPhoto = ( media ) => ( {
	id: media.id,
	url: media.sizes?.medium?.url || media.url,
	alt: media.alt || '',
} );

export default function Edit( { attributes, setAttributes, context } ) {
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
				<Card>
					<CardHeader>
						<strong>
							{ __( 'User Rating', 'easy-testimonial-blocks' ) }
						</strong>
					</CardHeader>
					<CardBody>
						<ToggleControl
							label={ __(
								'Show Rating',
								'easy-testimonial-blocks'
							) }
							checked={ showRating }
							onChange={ () =>
								setAttributes( {
									showRating: ! showRating,
								} )
							}
						/>
						{ showRating && (
							<RangeControl
								label={ __(
									'Rating',
									'easy-testimonial-blocks'
								) }
								value={ rating }
								onChange={ ( value ) =>
									setAttributes( {
										rating: value,
									} )
								}
								min={ 0 }
								max={ 5 }
								step={ 0.1 }
							/>
						) }
					</CardBody>
				</Card>
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
										'Replace Photo',
										'easy-testimonial-blocks'
									) }
									onClick={ open }
								/>
							) }
						/>
						<ToolbarButton
							icon={ 'trash' }
							label={ __(
								'Remove Photo',
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
						'testimonial text..',
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
										'Upload Photo',
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
								'reviewer name..',
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
								'reviewer title..',
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
								'company name..',
								'easy-testimonial-blocks'
							) }
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
