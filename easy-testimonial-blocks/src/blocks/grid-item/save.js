// import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import icons from '../../utilities/options/icons';
export default function save( { attributes } ) {
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
	return (
		<div { ...useBlockProps.save() }>
			<div className="testimonial-header">
				<div className="quote-icon">{ showIcon && icons[ icon ] }</div>
				{ showRating && (
					<div className="rating">
						<div className="rating-value">
							{ showNumericalRating && rating }
						</div>
						<div
							className="etb-rating"
							data-rate-value={ rating }
						></div>
					</div>
				) }
			</div>
			<RichText.Content
				tagName="p"
				className={ 'testimonial-message' }
				value={ testimonial }
			/>
			<div className="reviewer-info">
				{ photo && (
					<div className="reviewer-photo">
						<img
							src={ photo.url }
							alt={ photo.alt ? photo.alt : reviewerName }
						/>
					</div>
				) }
				<div className="reviewer-info-content">
					{ reviewerName && (
						<RichText.Content
							tagName="h4"
							className={ 'reviewer-name' }
							value={ reviewerName }
						/>
					) }
					{ reviewerTitle && (
						<RichText.Content
							tagName="p"
							className={ 'reviewer-title' }
							value={ reviewerTitle }
						/>
					) }
					{ reviewerCompany && (
						<RichText.Content
							tagName="p"
							className={ 'reviewer-company' }
							value={ reviewerCompany }
						/>
					) }
				</div>
			</div>
		</div>
	);
}
