<?php
/**
 * Pattern: Testimonials: two columns.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'       => __( 'Testimonials: two columns', 'easy-testimonial-blocks' ),
	'description' => __( 'A heading with two bordered testimonial cards.', 'easy-testimonial-blocks' ),
	'categories'  => array( 'testimonials' ),
	'keywords'    => array( __( 'testimonials', 'easy-testimonial-blocks' ), __( 'reviews', 'easy-testimonial-blocks' ), __( 'two columns', 'easy-testimonial-blocks' ) ),
	'content'     => <<<'HTML'
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#ffffff"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#ffffff;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center">Trusted by growing teams</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p>Here is what a few of our clients have to say.</p>
<!-- /wp:paragraph -->

<!-- wp:etb/grid {"id":"etb-grid-pattern-two-col","gridGap":{"desktop":28,"tablet":24,"mobile":16},"nameTag":"h3","icon":"one","iconColor":"#4F46E5","iconOpacity":0.25,"ratingColor":"#F59E0B","ttmFontSizes":{"desktop":17,"tablet":16,"mobile":16},"photoSizes":{"desktop":52,"tablet":48,"mobile":44},"photoBorder":{"width":"0px","style":"solid","color":""},"nameFontSizes":{"desktop":18,"tablet":17,"mobile":17},"titleFontSizes":{"desktop":14,"tablet":14,"mobile":14},"companyFontSizes":{"desktop":14,"tablet":14,"mobile":14},"containerBorder":{"width":"1px","style":"solid","color":"#e5e7eb"},"containerBorderRadius":10,"containerPadding":{"desktop":32,"tablet":28,"mobile":24},"enableBoxShadow":false,"containerBg":"#ffffff","align":"wide"} -->
<div class="wp-block-etb-grid alignwide etb-grid-pattern-two-col"><!-- wp:etb/grid-item {"testimonial":"The quality of work exceeded our expectations. We saw a measurable difference within the first month.","reviewerName":"James Carter","reviewerTitle":"Head of Growth","reviewerCompany":"Fieldnote Apps","photo":{"url":"ETB_AVATARS/james-carter.webp","alt":"James Carter"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">The quality of work exceeded our expectations. We saw a measurable difference within the first month.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/james-carter.webp" alt="James Carter"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">James Carter</h4><p class="reviewer-title">Head of Growth</p><p class="reviewer-company">Fieldnote Apps</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"Friendly service, fair pricing and outstanding attention to detail. Our customers noticed the difference right away.","reviewerName":"Lucas Meyer","reviewerTitle":"Owner","reviewerCompany":"Meyer \u0026 Sons Bakery","photo":{"url":"ETB_AVATARS/lucas-meyer.webp","alt":"Lucas Meyer"},"rating":4.9} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">4.9</div><div class="etb-rating" data-rate-value="4.9"></div></div></div><p class="testimonial-message">Friendly service, fair pricing and outstanding attention to detail. Our customers noticed the difference right away.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/lucas-meyer.webp" alt="Lucas Meyer"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Lucas Meyer</h4><p class="reviewer-title">Owner</p><p class="reviewer-company">Meyer & Sons Bakery</p></div></div></div>
<!-- /wp:etb/grid-item --></div>
<!-- /wp:etb/grid --></div>
<!-- /wp:group -->
HTML
,
);
