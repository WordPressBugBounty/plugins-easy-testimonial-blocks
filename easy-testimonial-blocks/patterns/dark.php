<?php
/**
 * Pattern: Testimonials: dark section.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'       => __( 'Testimonials: dark section', 'easy-testimonial-blocks' ),
	'description' => __( 'Three testimonial cards on a dark background.', 'easy-testimonial-blocks' ),
	'categories'  => array( 'testimonials' ),
	'keywords'    => array( __( 'testimonials', 'easy-testimonial-blocks' ), __( 'reviews', 'easy-testimonial-blocks' ), __( 'dark', 'easy-testimonial-blocks' ) ),
	'content'     => <<<'HTML'
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#111827","text":"#f9fafb"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-text-color has-background" style="color:#f9fafb;background-color:#111827;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center">Loved by our customers</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p>Thousands of happy customers and counting.</p>
<!-- /wp:paragraph -->

<!-- wp:etb/grid {"id":"etb-grid-pattern-dark","gridCols":{"desktop":3,"tablet":2,"mobile":1},"gridGap":{"desktop":28,"tablet":24,"mobile":16},"nameTag":"h3","iconColor":"#818cf8","iconOpacity":0.6,"ratingColor":"#fbbf24","ttmFontSizes":{"desktop":17,"tablet":16,"mobile":16},"ttmFontColor":"#e5e7eb","photoSizes":{"desktop":52,"tablet":48,"mobile":44},"photoBorder":{"width":"0px","style":"solid","color":""},"nameFontSizes":{"desktop":18,"tablet":17,"mobile":17},"nameFontColor":"#ffffff","titleFontSizes":{"desktop":14,"tablet":14,"mobile":14},"titleFontColor":"#9ca3af","companyFontSizes":{"desktop":14,"tablet":14,"mobile":14},"companyFontColor":"#9ca3af","containerBorderRadius":14,"containerPadding":{"desktop":32,"tablet":28,"mobile":24},"enableBoxShadow":false,"containerBg":"#1f2937","align":"wide"} -->
<div class="wp-block-etb-grid alignwide etb-grid-pattern-dark"><!-- wp:etb/grid-item {"testimonial":"Professional, responsive and genuinely invested in our success. Our conversion rate has doubled since launch.","reviewerName":"David Okafor","reviewerTitle":"Founder","reviewerCompany":"Northpeak Consulting","photo":{"url":"ETB_AVATARS/david-okafor.webp","alt":"David Okafor"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">Professional, responsive and genuinely invested in our success. Our conversion rate has doubled since launch.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/david-okafor.webp" alt="David Okafor"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">David Okafor</h4><p class="reviewer-title">Founder</p><p class="reviewer-company">Northpeak Consulting</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"I have worked with many providers over the years, and none have been this thoughtful. They listened, adapted and delivered something better than I imagined.","reviewerName":"Priya Sharma","reviewerTitle":"Life Coach","reviewerCompany":"Bloom Coaching","photo":{"url":"ETB_AVATARS/priya-sharma.webp","alt":"Priya Sharma"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">I have worked with many providers over the years, and none have been this thoughtful. They listened, adapted and delivered something better than I imagined.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/priya-sharma.webp" alt="Priya Sharma"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Priya Sharma</h4><p class="reviewer-title">Life Coach</p><p class="reviewer-company">Bloom Coaching</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"The quality of work exceeded our expectations. We saw a measurable difference within the first month.","reviewerName":"James Carter","reviewerTitle":"Head of Growth","reviewerCompany":"Fieldnote Apps","photo":{"url":"ETB_AVATARS/james-carter.webp","alt":"James Carter"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">The quality of work exceeded our expectations. We saw a measurable difference within the first month.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/james-carter.webp" alt="James Carter"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">James Carter</h4><p class="reviewer-title">Head of Growth</p><p class="reviewer-company">Fieldnote Apps</p></div></div></div>
<!-- /wp:etb/grid-item --></div>
<!-- /wp:etb/grid --></div>
<!-- /wp:group -->
HTML
,
);
