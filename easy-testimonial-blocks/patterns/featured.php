<?php
/**
 * Pattern: Testimonials: featured quote.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'       => __( 'Testimonials: featured quote', 'easy-testimonial-blocks' ),
	'description' => __( 'One large testimonial to highlight your best review.', 'easy-testimonial-blocks' ),
	'categories'  => array( 'testimonials' ),
	'keywords'    => array( __( 'testimonial', 'easy-testimonial-blocks' ), __( 'quote', 'easy-testimonial-blocks' ), __( 'featured', 'easy-testimonial-blocks' ), __( 'review', 'easy-testimonial-blocks' ) ),
	'content'     => <<<'HTML'
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#ffffff"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#ffffff;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px"><!-- wp:etb/grid {"id":"etb-grid-pattern-featured","gridCols":{"desktop":1,"tablet":1,"mobile":1},"gridGap":{"desktop":28,"tablet":24,"mobile":16},"nameTag":"h3","iconSizes":{"desktop":72,"tablet":60,"mobile":48},"iconColor":"#4F46E5","iconOpacity":0.25,"showNumericalRating":false,"ratingColor":"#F59E0B","ttmFontSizes":{"desktop":24,"tablet":22,"mobile":19},"photoSizes":{"desktop":64,"tablet":56,"mobile":48},"photoBorder":{"width":"0px","style":"solid","color":""},"nameFontSizes":{"desktop":20,"tablet":19,"mobile":18},"titleFontSizes":{"desktop":14,"tablet":14,"mobile":14},"companyFontSizes":{"desktop":14,"tablet":14,"mobile":14},"containerBorderRadius":14,"containerPadding":{"desktop":48,"tablet":40,"mobile":28},"enableBoxShadow":false,"containerBg":"#f5f6fa"} -->
<div class="wp-block-etb-grid etb-grid-pattern-featured"><!-- wp:etb/grid-item {"testimonial":"I have worked with many providers over the years, and none have been this thoughtful. They listened, adapted and delivered something better than I imagined.","reviewerName":"Priya Sharma","reviewerTitle":"Life Coach","reviewerCompany":"Bloom Coaching","photo":{"url":"ETB_AVATARS/priya-sharma.webp","alt":"Priya Sharma"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">I have worked with many providers over the years, and none have been this thoughtful. They listened, adapted and delivered something better than I imagined.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/priya-sharma.webp" alt="Priya Sharma"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Priya Sharma</h4><p class="reviewer-title">Life Coach</p><p class="reviewer-company">Bloom Coaching</p></div></div></div>
<!-- /wp:etb/grid-item --></div>
<!-- /wp:etb/grid --></div>
<!-- /wp:group -->
HTML
,
);
