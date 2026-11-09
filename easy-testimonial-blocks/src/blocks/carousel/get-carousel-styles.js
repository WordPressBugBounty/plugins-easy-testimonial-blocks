/**
 * Builds the per-instance editor CSS for the testimonial carousel.
 * Mirrors the frontend rules generated in includes/carousel.php.
 */
import { getCardStyles } from '../grid/get-grid-styles';

const getCarouselStyles = ( attributes, deviceType = 'Desktop' ) => {
	const { id, slidesPerView, slideGap, navColor, navHoverColor } = attributes;

	if ( ! id ) {
		return '';
	}

	const nav = [
		navColor ? `--etb-nav-color: ${ navColor };` : '',
		navHoverColor ? `--etb-nav-hover-color: ${ navHoverColor };` : '',
	].join( ' ' );

	return (
		`.${ id }.wp-block-etb-carousel { ${ nav } }` +
		getCardStyles(
			attributes,
			deviceType,
			'wp-block-etb-carousel',
			( device ) => `
		.${ id }.wp-block-etb-carousel {
			--etb-slides: ${ slidesPerView?.[ device ] ?? 1 };
			--etb-gap: ${ slideGap?.[ device ] ?? 20 }px;
		}`
		)
	);
};

export default getCarouselStyles;
