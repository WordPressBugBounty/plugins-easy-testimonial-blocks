<?php
/**
 * Pattern: Testimonials: speech bubbles.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'       => __( 'Testimonials: speech bubbles', 'easy-testimonial-blocks' ),
	'description' => __( 'Quotes in speech bubbles that point to each reviewer.', 'easy-testimonial-blocks' ),
	'categories'  => array( 'testimonials' ),
	'keywords'    => array( __( 'testimonials', 'easy-testimonial-blocks' ), __( 'reviews', 'easy-testimonial-blocks' ), __( 'speech bubble', 'easy-testimonial-blocks' ), __( 'chat', 'easy-testimonial-blocks' ) ),
	'content'     => <<<'HTML'
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#ffffff"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#ffffff;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center">Hear it from our customers</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"textAlign":"center"}}} -->
<p class="has-text-align-center">Honest words from the people we work with every day.</p>
<!-- /wp:paragraph -->

<!-- wp:etb/grid {"id":"etb-grid-pattern-speech-bubbles","gridCols":{"desktop":3,"tablet":2,"mobile":1},"gridGap":{"desktop":28,"tablet":24,"mobile":16},"preset":"bubble","nameTag":"h3","iconSizes":{"desktop":30,"tablet":28,"mobile":26},"iconColor":"#4f46e5","iconOpacity":0.9,"showNumericalRating":false,"ratingColor":"#f59e0b","ttmFontSizes":{"desktop":17,"tablet":16,"mobile":16},"ttmFontColor":"#334155","photoSizes":{"desktop":48,"tablet":44,"mobile":40},"photoBorder":{"width":"0px","style":"solid","color":""},"nameFontSizes":{"desktop":16,"tablet":16,"mobile":15},"nameFontColor":"#0f172a","titleFontSizes":{"desktop":14,"tablet":13,"mobile":13},"titleFontColor":"#64748b","companyFontSizes":{"desktop":14,"tablet":13,"mobile":13},"companyFontColor":"#64748b","containerBorderRadius":0,"containerPadding":{"top":"0px","right":"0px","bottom":"0px","left":"0px"},"enableBoxShadow":false,"containerBg":"","align":"wide"} -->
<div class="wp-block-etb-grid alignwide etb-grid-pattern-speech-bubbles etb-preset-bubble"><!-- wp:etb/grid-item {"testimonial":"The quality of work exceeded our expectations. We saw a measurable difference within the first month.","reviewerName":"James Carter","reviewerTitle":"Head of Growth","reviewerCompany":"Fieldnote Apps","photo":{"url":"ETB_AVATARS/james-carter.webp","alt":"James Carter"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">The quality of work exceeded our expectations. We saw a measurable difference within the first month.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/james-carter.webp" alt="James Carter"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">James Carter</h4><p class="reviewer-title">Head of Growth</p><p class="reviewer-company">Fieldnote Apps</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"I have worked with many providers over the years, and none have been this thoughtful. They listened, adapted and delivered something better than I imagined.","reviewerName":"Priya Sharma","reviewerTitle":"Life Coach","reviewerCompany":"Bloom Coaching","photo":{"url":"ETB_AVATARS/priya-sharma.webp","alt":"Priya Sharma"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">I have worked with many providers over the years, and none have been this thoughtful. They listened, adapted and delivered something better than I imagined.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/priya-sharma.webp" alt="Priya Sharma"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Priya Sharma</h4><p class="reviewer-title">Life Coach</p><p class="reviewer-company">Bloom Coaching</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"Friendly service, fair pricing and outstanding attention to detail. Our customers noticed the difference right away.","reviewerName":"Lucas Meyer","reviewerTitle":"Owner","reviewerCompany":"Meyer \u0026 Sons Bakery","photo":{"url":"ETB_AVATARS/lucas-meyer.webp","alt":"Lucas Meyer"},"rating":4.9} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">4.9</div><div class="etb-rating" data-rate-value="4.9"></div></div></div><p class="testimonial-message">Friendly service, fair pricing and outstanding attention to detail. Our customers noticed the difference right away.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/lucas-meyer.webp" alt="Lucas Meyer"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Lucas Meyer</h4><p class="reviewer-title">Owner</p><p class="reviewer-company">Meyer & Sons Bakery</p></div></div></div>
<!-- /wp:etb/grid-item --></div>
<!-- /wp:etb/grid --></div>
<!-- /wp:group -->
HTML
,
);
