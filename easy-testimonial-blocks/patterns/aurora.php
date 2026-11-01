<?php
/**
 * Pattern: Testimonials: aurora gradient.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'       => __( 'Testimonials: aurora gradient', 'easy-testimonial-blocks' ),
	'description' => __( 'Bold gradient cards with white text and a lift on hover.', 'easy-testimonial-blocks' ),
	'categories'  => array( 'testimonials' ),
	'keywords'    => array( __( 'testimonials', 'easy-testimonial-blocks' ), __( 'reviews', 'easy-testimonial-blocks' ), __( 'gradient', 'easy-testimonial-blocks' ), __( 'colorful', 'easy-testimonial-blocks' ) ),
	'content'     => <<<'HTML'
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#ffffff"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#ffffff;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center">Results that speak for themselves</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"textAlign":"center"}}} -->
<p class="has-text-align-center">Teams of every size trust us to deliver.</p>
<!-- /wp:paragraph -->

<!-- wp:etb/grid {"id":"etb-grid-pattern-aurora","gridCols":{"desktop":3,"tablet":2,"mobile":1},"gridGap":{"desktop":28,"tablet":24,"mobile":16},"preset":"aurora","hoverStyle":"lift","nameTag":"h3","iconSizes":{"desktop":36,"tablet":32,"mobile":28},"iconColor":"#ffffff","showNumericalRating":false,"ratingColor":"#fde68a","ttmFontSizes":{"desktop":17,"tablet":16,"mobile":16},"ttmFontColor":"#ffffff","photoSizes":{"desktop":48,"tablet":44,"mobile":40},"photoBorder":{"width":"2px","style":"solid","color":"rgba(255,255,255,0.7)"},"nameFontSizes":{"desktop":16,"tablet":16,"mobile":15},"nameFontColor":"#ffffff","titleFontSizes":{"desktop":14,"tablet":13,"mobile":13},"titleFontColor":"rgba(255,255,255,0.75)","companyFontSizes":{"desktop":14,"tablet":13,"mobile":13},"companyFontColor":"rgba(255,255,255,0.75)","containerBorderRadius":20,"containerPadding":{"desktop":32,"tablet":28,"mobile":24},"enableBoxShadow":false,"containerBg":"","align":"wide"} -->
<div class="wp-block-etb-grid alignwide etb-grid-pattern-aurora etb-preset-aurora has-hover-lift"><!-- wp:etb/grid-item {"testimonial":"Professional, responsive and genuinely invested in our success. Our conversion rate has doubled since launch.","reviewerName":"David Okafor","reviewerTitle":"Founder","reviewerCompany":"Northpeak Consulting","photo":{"url":"ETB_AVATARS/david-okafor.webp","alt":"David Okafor"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">Professional, responsive and genuinely invested in our success. Our conversion rate has doubled since launch.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/david-okafor.webp" alt="David Okafor"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">David Okafor</h4><p class="reviewer-title">Founder</p><p class="reviewer-company">Northpeak Consulting</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"From the first call to the final handoff, everything felt effortless. I recommend them to everyone who asks.","reviewerName":"Elena Rossi","reviewerTitle":"Creative Director","reviewerCompany":"Rossi Creative","photo":{"url":"ETB_AVATARS/elena-rossi.webp","alt":"Elena Rossi"},"rating":4.8} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">4.8</div><div class="etb-rating" data-rate-value="4.8"></div></div></div><p class="testimonial-message">From the first call to the final handoff, everything felt effortless. I recommend them to everyone who asks.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/elena-rossi.webp" alt="Elena Rossi"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Elena Rossi</h4><p class="reviewer-title">Creative Director</p><p class="reviewer-company">Rossi Creative</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"The quality of work exceeded our expectations. We saw a measurable difference within the first month.","reviewerName":"James Carter","reviewerTitle":"Head of Growth","reviewerCompany":"Fieldnote Apps","photo":{"url":"ETB_AVATARS/james-carter.webp","alt":"James Carter"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">The quality of work exceeded our expectations. We saw a measurable difference within the first month.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/james-carter.webp" alt="James Carter"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">James Carter</h4><p class="reviewer-title">Head of Growth</p><p class="reviewer-company">Fieldnote Apps</p></div></div></div>
<!-- /wp:etb/grid-item --></div>
<!-- /wp:etb/grid --></div>
<!-- /wp:group -->
HTML
,
);
