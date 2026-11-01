<?php
/**
 * Pattern: Testimonials: three cards.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'       => __( 'Testimonials: three cards', 'easy-testimonial-blocks' ),
	'description' => __( 'A section heading with three testimonial cards, star ratings and reviewer photos.', 'easy-testimonial-blocks' ),
	'categories'  => array( 'testimonials' ),
	'keywords'    => array( __( 'testimonials', 'easy-testimonial-blocks' ), __( 'reviews', 'easy-testimonial-blocks' ), __( 'cards', 'easy-testimonial-blocks' ), __( 'social proof', 'easy-testimonial-blocks' ) ),
	'content'     => <<<'HTML'
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#f5f6fa"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#f5f6fa;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center">What our customers say</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p>Real feedback from people who trust us with their business.</p>
<!-- /wp:paragraph -->

<!-- wp:etb/grid {"id":"etb-grid-pattern-cards","gridCols":{"desktop":3,"tablet":2,"mobile":1},"gridGap":{"desktop":28,"tablet":24,"mobile":16},"nameTag":"h3","iconColor":"#4F46E5","iconOpacity":0.25,"ratingColor":"#F59E0B","ttmFontSizes":{"desktop":17,"tablet":16,"mobile":16},"photoSizes":{"desktop":52,"tablet":48,"mobile":44},"photoBorder":{"width":"0px","style":"solid","color":""},"nameFontSizes":{"desktop":18,"tablet":17,"mobile":17},"titleFontSizes":{"desktop":14,"tablet":14,"mobile":14},"companyFontSizes":{"desktop":14,"tablet":14,"mobile":14},"containerBorderRadius":14,"containerPadding":{"desktop":32,"tablet":28,"mobile":24},"containerBg":"#ffffff","align":"wide"} -->
<div class="wp-block-etb-grid alignwide etb-grid-pattern-cards has-box-shadow"><!-- wp:etb/grid-item {"testimonial":"Working with this team was the best decision we made this year. They delivered on time, communicated clearly and the results speak for themselves.","reviewerName":"Sarah Mitchell","reviewerTitle":"Marketing Director","reviewerCompany":"Brightline Studio","photo":{"url":"ETB_AVATARS/sarah-mitchell.webp","alt":"Sarah Mitchell"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">Working with this team was the best decision we made this year. They delivered on time, communicated clearly and the results speak for themselves.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/sarah-mitchell.webp" alt="Sarah Mitchell"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Sarah Mitchell</h4><p class="reviewer-title">Marketing Director</p><p class="reviewer-company">Brightline Studio</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"Professional, responsive and genuinely invested in our success. Our conversion rate has doubled since launch.","reviewerName":"David Okafor","reviewerTitle":"Founder","reviewerCompany":"Northpeak Consulting","photo":{"url":"ETB_AVATARS/david-okafor.webp","alt":"David Okafor"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">Professional, responsive and genuinely invested in our success. Our conversion rate has doubled since launch.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/david-okafor.webp" alt="David Okafor"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">David Okafor</h4><p class="reviewer-title">Founder</p><p class="reviewer-company">Northpeak Consulting</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"From the first call to the final handoff, everything felt effortless. I recommend them to everyone who asks.","reviewerName":"Elena Rossi","reviewerTitle":"Creative Director","reviewerCompany":"Rossi Creative","photo":{"url":"ETB_AVATARS/elena-rossi.webp","alt":"Elena Rossi"},"rating":4.8} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">4.8</div><div class="etb-rating" data-rate-value="4.8"></div></div></div><p class="testimonial-message">From the first call to the final handoff, everything felt effortless. I recommend them to everyone who asks.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/elena-rossi.webp" alt="Elena Rossi"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Elena Rossi</h4><p class="reviewer-title">Creative Director</p><p class="reviewer-company">Rossi Creative</p></div></div></div>
<!-- /wp:etb/grid-item --></div>
<!-- /wp:etb/grid --></div>
<!-- /wp:group -->
HTML
,
);
