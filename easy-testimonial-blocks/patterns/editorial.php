<?php
/**
 * Pattern: Testimonials: editorial.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'       => __( 'Testimonials: editorial', 'easy-testimonial-blocks' ),
	'description' => __( 'Serif italic quotes on warm paper-toned cards.', 'easy-testimonial-blocks' ),
	'categories'  => array( 'testimonials' ),
	'keywords'    => array( __( 'testimonials', 'easy-testimonial-blocks' ), __( 'reviews', 'easy-testimonial-blocks' ), __( 'serif', 'easy-testimonial-blocks' ), __( 'elegant', 'easy-testimonial-blocks' ) ),
	'content'     => <<<'HTML'
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#fffcf5"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#fffcf5;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center">Kind words from our clients</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"textAlign":"center"}}} -->
<p class="has-text-align-center">A few notes we are proud to share.</p>
<!-- /wp:paragraph -->

<!-- wp:etb/grid {"id":"etb-grid-pattern-editorial","gridCols":{"desktop":3,"tablet":2,"mobile":1},"gridGap":{"desktop":28,"tablet":24,"mobile":16},"preset":"editorial","nameTag":"h3","icon":"one","iconSizes":{"desktop":34,"tablet":30,"mobile":28},"iconColor":"#b45309","iconOpacity":0.85,"showNumericalRating":false,"ratingColor":"#b45309","ttmFontSizes":{"desktop":20,"tablet":19,"mobile":18},"ttmFontColor":"#292524","photoSizes":{"desktop":44,"tablet":40,"mobile":40},"photoBorder":{"width":"0px","style":"solid","color":""},"nameFontSizes":{"desktop":13,"tablet":13,"mobile":12},"nameFontColor":"#1c1917","titleFontSizes":{"desktop":14,"tablet":13,"mobile":13},"titleFontColor":"#78716c","companyFontSizes":{"desktop":14,"tablet":13,"mobile":13},"companyFontColor":"#78716c","containerBorder":{"width":"1px","style":"solid","color":"#efe7d6"},"containerBorderRadius":6,"containerPadding":{"desktop":32,"tablet":28,"mobile":24},"enableBoxShadow":false,"containerBg":"#fffcf5","align":"wide"} -->
<div class="wp-block-etb-grid alignwide etb-grid-pattern-editorial etb-preset-editorial"><!-- wp:etb/grid-item {"testimonial":"I have worked with many providers over the years, and none have been this thoughtful. They listened, adapted and delivered something better than I imagined.","reviewerName":"Priya Sharma","reviewerTitle":"Life Coach","reviewerCompany":"Bloom Coaching","photo":{"url":"ETB_AVATARS/priya-sharma.webp","alt":"Priya Sharma"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">I have worked with many providers over the years, and none have been this thoughtful. They listened, adapted and delivered something better than I imagined.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/priya-sharma.webp" alt="Priya Sharma"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Priya Sharma</h4><p class="reviewer-title">Life Coach</p><p class="reviewer-company">Bloom Coaching</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"Friendly service, fair pricing and outstanding attention to detail. Our customers noticed the difference right away.","reviewerName":"Lucas Meyer","reviewerTitle":"Owner","reviewerCompany":"Meyer \u0026 Sons Bakery","photo":{"url":"ETB_AVATARS/lucas-meyer.webp","alt":"Lucas Meyer"},"rating":4.9} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">4.9</div><div class="etb-rating" data-rate-value="4.9"></div></div></div><p class="testimonial-message">Friendly service, fair pricing and outstanding attention to detail. Our customers noticed the difference right away.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/lucas-meyer.webp" alt="Lucas Meyer"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Lucas Meyer</h4><p class="reviewer-title">Owner</p><p class="reviewer-company">Meyer & Sons Bakery</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"Professional, responsive and genuinely invested in our success. Our conversion rate has doubled since launch.","reviewerName":"David Okafor","reviewerTitle":"Founder","reviewerCompany":"Northpeak Consulting","photo":{"url":"ETB_AVATARS/david-okafor.webp","alt":"David Okafor"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">Professional, responsive and genuinely invested in our success. Our conversion rate has doubled since launch.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/david-okafor.webp" alt="David Okafor"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">David Okafor</h4><p class="reviewer-title">Founder</p><p class="reviewer-company">Northpeak Consulting</p></div></div></div>
<!-- /wp:etb/grid-item --></div>
<!-- /wp:etb/grid --></div>
<!-- /wp:group -->
HTML
,
);
