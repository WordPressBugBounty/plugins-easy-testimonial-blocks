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
const { Fragment } = wp.element;

// editor star rating component
import StarRating from '../../utilities/components/star-rating';

// import icons
import icons from '../../utilities/options/icons';

export default function Edit( { attributes, setAttributes, context } ) {
	const {
		showIcon,
		icon,
		testimonial,
		reviewerName,
		reviewerTitle,
		reviewerCompany,
		photo,
		showRating,
		rating,
		showNumericalRating,
	} = attributes;
	setAttributes( {
		icon: context[ 'etb/icon' ],
		showIcon: context[ 'etb/showIcon' ],
		showNumericalRating: context[ 'etb/showNumericalRating' ],
	} );
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
								min={ 1 }
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
									photo: media,
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ photo && photo.id }
							render={ ( { open } ) => (
								<ToolbarButton
									icon={ 'edit' }
									label="Edit"
									onClick={ open }
								/>
							) }
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
								<div className="rating-value">
									{ rating && rating }
								</div>
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
									photo: media,
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
							tagName="h4"
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
