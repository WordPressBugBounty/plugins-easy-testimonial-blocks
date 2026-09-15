<?php
/**
 * Testimonial Grid Item — frontend renderer.
 *
 * Renders the grid-item block on the frontend with SVG stars.
 * The saved markup (src/blocks/grid-item/save.js) is intentionally
 * kept unchanged for block validation stability; this render callback
 * takes precedence on the frontend for both new and existing posts.
 *
 * Loaded once at plugin boot from plugin.php.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Quote icons (mirror of src/utilities/options/icons.js).
 */
function etb_quote_icons() {
	return array(
		'one'   => '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m20.622 4c.76 0 1.378.608 1.378 1.355 0 .531-.315 1.018-.843 1.302-1.212.645-2.614 2.735-2.983 4.286 2.38.538 3.8 2.394 3.8 4.564 0 2.169-1.859 4.493-4.627 4.493-3.501 0-5.096-2.882-5.096-5.561 0-5.742 6.32-10.439 8.371-10.439zm-10.251 0c.76 0 1.378.608 1.378 1.355 0 .531-.315 1.018-.843 1.302-1.212.645-2.614 2.735-2.983 4.286 2.38.538 3.8 2.394 3.8 4.564 0 2.169-1.859 4.493-4.627 4.493-3.501 0-5.096-2.882-5.096-5.561 0-5.742 6.32-10.439 8.371-10.439zm6.21 8.428c-.112-3 1.984-5.754 3.649-6.966-1.911.782-6.479 4.857-6.479 8.977 0 1.869.942 4.051 3.596 4.051 1.871 0 3.127-1.542 3.127-2.983 0-1.453-.862-3.166-3.893-3.079zm-10.251 0c-.112-3 1.984-5.754 3.649-6.966-1.911.782-6.479 4.857-6.479 8.977 0 1.869.942 4.051 3.596 4.051 1.871 0 3.127-1.542 3.127-2.983 0-1.453-.862-3.166-3.893-3.079z" fill-rule="nonzero"/></svg>',
		'two'   => '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"/></svg>',
		'three' => '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m3.378 20c-.76 0-1.378-.608-1.378-1.355 0-.531.315-1.018.843-1.302 1.212-.645 2.614-2.735 2.983-4.286-2.38-.538-3.8-2.394-3.8-4.564 0-2.169 1.859-4.493 4.627-4.493 3.501 0 5.096 2.882 5.096 5.561 0 5.742-6.32 10.439-8.371 10.439zm10.251 0c-.76 0-1.378-.608-1.378-1.355 0-.531.315-1.018.843-1.302 1.212-.645 2.614-2.735 2.983-4.286-2.38-.538-3.8-2.394-3.8-4.564 0-2.169 1.859-4.493 4.627-4.493 3.501 0 5.096 2.882 5.096 5.561 0 5.742-6.32 10.439-8.371 10.439zm-6.21-8.428c.112 3-1.984 5.754-3.649 6.966 1.911-.782 6.479-4.857 6.479-8.977 0-1.869-.942-4.051-3.596-4.051-1.871 0-3.127 1.542-3.127 2.983 0 1.453.862 3.166 3.893 3.079zm10.251 0c.112 3-1.984 5.754-3.649 6.966 1.911-.782 6.479-4.857 6.479-8.977 0-1.869-.942-4.051-3.596-4.051-1.871 0-3.127 1.542-3.127 2.983 0 1.453.862 3.166 3.893 3.079z" fill-rule="nonzero"/></svg>',
		'four'  => '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m2.699 20c-.411 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.016.092-4.326-2.582-4.326-4.258 0-2.006 1.738-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.834 10.693-8.468 10.693zm10.833 0c-.41 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.015.092-4.326-2.582-4.326-4.258 0-2.006 1.739-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.833 10.693-8.468 10.693z" fill-rule="nonzero"/></svg>',
	);
}

/**
 * Star rating SVG markup (mirror of src/utilities/components/star-rating).
 */
function etb_star_rating_svg( $rating, $total = 5 ) {
	$full_path  = 'M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Z';
	$empty_path = 'M49.62,18.85a1.9,1.9,0,0,0-1.54-1.29L33.4,15.38,26.84,1.63a1.92,1.92,0,0,0-3.47,0L16.86,15.34,2.13,17.56a1.92,1.92,0,0,0-1.08,3.25L11.73,31.53,9.21,46.73A1.93,1.93,0,0,0,11.1,49a2,2,0,0,0,.92-.23L25.07,41.6l13.11,7.14a1.93,1.93,0,0,0,2.82-2L38.46,31.6l10.7-10.79A1.92,1.92,0,0,0,49.62,18.85ZM37,30.19a1.94,1.94,0,0,0-.53,1.67L39,46.9l-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.5-15a1.94,1.94,0,0,0-.53-1.67L2.57,19.51l14.59-2.19a2,2,0,0,0,1.45-1.08L25.08,2.58,31.6,16.25a2,2,0,0,0,1.45,1.07l14.58,2.19Z';

	$full_svg  = '<svg viewBox="0 0 49.23 48.44"><path d="' . $full_path . '" transform="translate(-0.39 -0.78)"/></svg>';
	$empty_svg = '<svg viewBox="0 0 49.23 48.44" class="empty-star"><path d="' . $empty_path . '" transform="translate(-0.49 -0.53)"/></svg>';

	$rating    = min( max( (float) $rating, 0 ), (float) $total );
	$rating    = round( $rating * 10 ) / 10;
	$filled    = (int) floor( $rating );
	$fraction  = round( ( $rating - $filled ) * 10 ) / 10;
	$empty     = max( 0, $total - (int) ceil( $rating ) );

	$output = str_repeat( $full_svg, $filled );

	if ( $fraction > 0 ) {
		$clip = ( 1 - $fraction ) * 100;
		$output .= '<span class="etb-star-fraction">';
		$output .= $empty_svg;
		$output .= str_replace(
			'<svg ',
			'<svg style="clip-path: inset( 0 ' . esc_attr( $clip ) . '% 0 0 );" ',
			$full_svg
		);
		$output .= '</span>';
	}

	$output .= str_repeat( $empty_svg, $empty );

	return $output;
}

/**
 * Allowed SVG tags and attributes for icon sanitization.
 *
 * Everything not listed here ( script, event handlers, foreignObject, ... )
 * is stripped by wp_kses.
 */
function etb_svg_allowed_tags() {
	$common_attrs = array(
		'class'             => true,
		'id'                => true,
		'fill'              => true,
		'fill-opacity'      => true,
		'fill-rule'         => true,
		'clip-rule'         => true,
		'stroke'            => true,
		'stroke-width'      => true,
		'stroke-opacity'    => true,
		'stroke-linecap'    => true,
		'stroke-linejoin'   => true,
		'stroke-miterlimit' => true,
		'opacity'           => true,
		'transform'         => true,
	);

	return array(
		'svg'    => array_merge(
			$common_attrs,
			array(
				'viewbox'     => true,
				'xmlns'       => true,
				'xmlns:xlink' => true,
				'width'       => true,
				'height'      => true,
				'role'        => true,
				'aria-hidden' => true,
				'focusable'   => true,
			)
		),
		'path'   => array_merge(
			$common_attrs,
			array( 'd' => true )
		),
		'g'      => $common_attrs,
		'defs'   => array(),
		'symbol' => array_merge(
			$common_attrs,
			array( 'viewbox' => true )
		),
		'use'    => array(
			'class'      => true,
			'href'       => true,
			'xlink:href' => true,
		),
		'title'  => array(),
		'desc'   => array(),
	);
}

/**
 * Sanitizes an SVG string for safe output ( quote icons ).
 *
 * Keeps only whitelisted SVG tags/attributes and strips everything else,
 * including script tags and event handler attributes.
 */
function etb_sanitize_svg( $svg ) {
	return wp_kses( (string) $svg, etb_svg_allowed_tags() );
}

/**
 * Renders the testimonial grid item block.
 */
function etb_testimonial_grid_item( $attributes ) {
	$attributes = wp_parse_args(
		$attributes,
		array(
			'showIcon'            => true,
			'icon'                => 'two',
			'showNumericalRating' => true,
			'testimonial'         => '',
			'reviewerName'        => '',
			'reviewerTitle'       => '',
			'reviewerCompany'     => '',
			'photo'               => array(),
			'showRating'          => true,
			'rating'              => 5,
		)
	);

	$icons = etb_quote_icons();
	$icon  = isset( $icons[ $attributes['icon'] ] ) ? $icons[ $attributes['icon'] ] : $icons['two'];

	ob_start();
	?>
	<div class="wp-block-etb-grid-item">
		<div class="testimonial-header">
			<?php if ( $attributes['showIcon'] ) : ?>
				<div class="quote-icon">
					<?php echo etb_sanitize_svg( $icon ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- sanitized via etb_sanitize_svg() ?>
				</div>
			<?php endif; ?>
			<?php if ( $attributes['showRating'] ) : ?>
				<div class="rating">
					<div class="rating-value">
						<?php if ( $attributes['showNumericalRating'] ) : ?>
							<?php echo esc_html( $attributes['rating'] ); ?>
						<?php endif; ?>
					</div>
					<div class="gutenlayout-star-rating" role="img" aria-label="<?php echo esc_attr( $attributes['rating'] . ' out of 5 stars' ); ?>">
						<?php
						// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static SVG markup
						echo etb_star_rating_svg( $attributes['rating'], 5 );
						?>
					</div>
				</div>
			<?php endif; ?>
		</div>
		<p class="testimonial-message"><?php echo wp_kses_post( $attributes['testimonial'] ); ?></p>
		<div class="reviewer-info">
			<?php if ( ! empty( $attributes['photo']['url'] ) ) : ?>
				<div class="reviewer-photo">
					<img
						src="<?php echo esc_url( $attributes['photo']['url'] ); ?>"
						alt="<?php echo esc_attr( ! empty( $attributes['photo']['alt'] ) ? $attributes['photo']['alt'] : $attributes['reviewerName'] ); ?>"
					/>
				</div>
			<?php endif; ?>
			<div class="reviewer-info-content">
				<?php if ( ! empty( $attributes['reviewerName'] ) ) : ?>
					<h4 class="reviewer-name"><?php echo wp_kses_post( $attributes['reviewerName'] ); ?></h4>
				<?php endif; ?>
				<?php if ( ! empty( $attributes['reviewerTitle'] ) ) : ?>
					<p class="reviewer-title"><?php echo wp_kses_post( $attributes['reviewerTitle'] ); ?></p>
				<?php endif; ?>
				<?php if ( ! empty( $attributes['reviewerCompany'] ) ) : ?>
					<p class="reviewer-company"><?php echo wp_kses_post( $attributes['reviewerCompany'] ); ?></p>
				<?php endif; ?>
			</div>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
