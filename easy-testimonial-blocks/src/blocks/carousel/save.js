import { InnerBlocks } from '@wordpress/block-editor';

// the wrapper, track and controls are rendered in PHP ( includes/carousel.php ),
// so only the testimonials are saved
export default function save() {
	return <InnerBlocks.Content />;
}
