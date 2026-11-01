<?php
/**
 * Pattern: Testimonials: side by side.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'       => __( 'Testimonials: side by side', 'easy-testimonial-blocks' ),
	'description' => __( 'Two wide cards with the reviewer beside each quote.', 'easy-testimonial-blocks' ),
	'categories'  => array( 'testimonials' ),
	'keywords'    => array( __( 'testimonials', 'easy-testimonial-blocks' ), __( 'reviews', 'easy-testimonial-blocks' ), __( 'two columns', 'easy-testimonial-blocks' ), __( 'case study', 'easy-testimonial-blocks' ) ),
	'content'     => <<<'HTML'
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#ffffff"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#ffffff;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center">Client stories</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"textAlign":"center"}}} -->
<p class="has-text-align-center">The people behind the projects, in their own words.</p>
<!-- /wp:paragraph -->

<!-- wp:etb/grid {"id":"etb-grid-pattern-side-by-side","gridCols":{"desktop":2,"tablet":1,"mobile":1},"gridGap":{"desktop":28,"tablet":24,"mobile":16},"preset":"split","nameTag":"h3","iconSizes":{"desktop":28,"tablet":26,"mobile":24},"iconColor":"#4f46e5","iconOpacity":1,"showNumericalRating":false,"ratingColor":"#f59e0b","ttmFontSizes":{"desktop":17,"tablet":16,"mobile":16},"ttmFontColor":"#334155","photoSizes":{"desktop":64,"tablet":56,"mobile":52},"photoBorder":{"width":"0px","style":"solid","color":""},"infoAlign":"center","nameFontSizes":{"desktop":16,"tablet":16,"mobile":15},"nameFontColor":"#0f172a","titleFontSizes":{"desktop":14,"tablet":13,"mobile":13},"titleFontColor":"#64748b","companyFontSizes":{"desktop":14,"tablet":13,"mobile":13},"companyFontColor":"#64748b","containerBorder":{"width":"1px","style":"solid","color":"#e2e8f0"},"containerBorderRadius":16,"containerPadding":{"desktop":32,"tablet":28,"mobile":24},"enableBoxShadow":false,"containerBg":"#ffffff","align":"wide"} -->
<div class="wp-block-etb-grid alignwide etb-grid-pattern-side-by-side etb-preset-split"><!-- wp:etb/grid-item {"testimonial":"Working with this team was the best decision we made this year. They delivered on time, communicated clearly and the results speak for themselves.","reviewerName":"Sarah Mitchell","reviewerTitle":"Marketing Director","reviewerCompany":"Brightline Studio","photo":{"url":"ETB_AVATARS/sarah-mitchell.webp","alt":"Sarah Mitchell"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">Working with this team was the best decision we made this year. They delivered on time, communicated clearly and the results speak for themselves.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/sarah-mitchell.webp" alt="Sarah Mitchell"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">Sarah Mitchell</h4><p class="reviewer-title">Marketing Director</p><p class="reviewer-company">Brightline Studio</p></div></div></div>
<!-- /wp:etb/grid-item -->

<!-- wp:etb/grid-item {"testimonial":"The quality of work exceeded our expectations. We saw a measurable difference within the first month.","reviewerName":"James Carter","reviewerTitle":"Head of Growth","reviewerCompany":"Fieldnote Apps","photo":{"url":"ETB_AVATARS/james-carter.webp","alt":"James Carter"}} -->
<div class="wp-block-etb-grid-item"><div class="testimonial-header"><div class="quote-icon"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"></path></svg></div><div class="rating"><div class="rating-value">5</div><div class="etb-rating" data-rate-value="5"></div></div></div><p class="testimonial-message">The quality of work exceeded our expectations. We saw a measurable difference within the first month.</p><div class="reviewer-info"><div class="reviewer-photo"><img src="ETB_AVATARS/james-carter.webp" alt="James Carter"/></div><div class="reviewer-info-content"><h4 class="reviewer-name">James Carter</h4><p class="reviewer-title">Head of Growth</p><p class="reviewer-company">Fieldnote Apps</p></div></div></div>
<!-- /wp:etb/grid-item --></div>
<!-- /wp:etb/grid --></div>
<!-- /wp:group -->
HTML
,
);
