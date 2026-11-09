<?php
/**
 * Testimonial Carousel — frontend markup and per-instance CSS.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Per-instance CSS for the etb/carousel block: the shared card styles plus
 * slides per view and gap for each device.
 *
 * @param array $attributes Block attributes ( must carry a non-empty 'id' ).
 * @return string
 */
function etb_testimonial_carousel_css( $attributes ) {
	$handle     = preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $attributes['id'] );
	$attributes = wp_parse_args(
		$attributes,
		array(
			'slidesPerView' => array( 'desktop' => 3, 'tablet' => 2, 'mobile' => 1 ),
			'slideGap'      => array( 'desktop' => 24, 'tablet' => 20, 'mobile' => 16 ),
		)
	);

	$layout = array();
	foreach ( array( 'desktop', 'tablet', 'mobile' ) as $device ) {
		$slides = isset( $attributes['slidesPerView'][ $device ] ) ? min( 6, max( 1, absint( $attributes['slidesPerView'][ $device ] ) ) ) : 1;
		$gap    = isset( $attributes['slideGap'][ $device ] ) ? absint( $attributes['slideGap'][ $device ] ) : 0;

		$layout[ $device ] = ".$handle.wp-block-etb-carousel{--etb-slides: {$slides};--etb-gap: {$gap}px;}";
	}

	// navigation colors ( arrows, dots, pause button ), read by style.scss
	$css = '';
	foreach ( array( 'navColor' => '--etb-nav-color', 'navHoverColor' => '--etb-nav-hover-color' ) as $key => $property ) {
		$color = empty( $attributes[ $key ] ) ? '' : etb_sanitize_css_color( $attributes[ $key ] );
		if ( $color ) {
			$css .= ".$handle.wp-block-etb-carousel{{$property}: {$color};}";
		}
	}

	return $css . etb_testimonial_card_css( $attributes, 'wp-block-etb-carousel', $layout );
}

/**
 * Carousel markup: the wrapper, the scroll-snap track holding the rendered
 * testimonials, and the controls ( wired up by view.js ).
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Rendered testimonials ( inner blocks ).
 * @return string
 */
function etb_testimonial_carousel( $attributes, $content ) {
	$attributes = wp_parse_args(
		$attributes,
		array(
			'id'              => '',
			'preset'          => 'classic',
			'hoverStyle'      => 'none',
			'enableBoxShadow' => true,
			'customShadow'    => array(),
			'customClases'    => '',
			'showArrows'      => true,
			'showDots'        => true,
			'autoplay'        => false,
			'autoplayDelay'   => 5,
			'showPauseButton' => false,
			'arrowPosition'   => 'bottom',
			'loop'            => true,
		)
	);

	$preset = sanitize_html_class( (string) $attributes['preset'] );
	$hover  = sanitize_html_class( (string) $attributes['hoverStyle'] );

	$classes = array_filter(
		array(
			sanitize_html_class( (string) $attributes['id'] ),
			$preset && 'classic' !== $preset ? 'etb-preset-' . $preset : '',
			$attributes['enableBoxShadow'] ? 'has-box-shadow' : '',
			$hover && 'none' !== $hover ? 'has-hover-' . $hover : '',
			$attributes['enableBoxShadow'] && ! empty( $attributes['customShadow']['enabled'] ) ? 'has-custom-shadow' : '',
		)
	);
	foreach ( preg_split( '/\s+/', (string) $attributes['customClases'] ) as $custom_class ) {
		$classes[] = sanitize_html_class( $custom_class );
	}

	$delay = $attributes['autoplay'] ? (int) round( min( 15, max( 2, (float) $attributes['autoplayDelay'] ) ) * 1000 ) : 0;

	$i18n = array(
		/* translators: accessible role name of one carousel item */
		'slide'   => __( 'slide', 'easy-testimonial-blocks' ),
		/* translators: 1: slide number, 2: number of slides */
		'slideOf' => __( '%1$d of %2$d', 'easy-testimonial-blocks' ),
		/* translators: %d: slide number */
		'goTo'    => __( 'Go to slide %d', 'easy-testimonial-blocks' ),
		'pause'   => __( 'Pause autoplay', 'easy-testimonial-blocks' ),
		'play'    => __( 'Play autoplay', 'easy-testimonial-blocks' ),
	);

	$wrapper_attributes = get_block_wrapper_attributes(
		array(
			'class'                => implode( ' ', array_filter( $classes ) ),
			'role'                 => 'region',
			'aria-roledescription' => __( 'carousel', 'easy-testimonial-blocks' ),
			'aria-label'           => __( 'Testimonials', 'easy-testimonial-blocks' ),
			'data-loop'            => $attributes['loop'] ? 'true' : 'false',
			'data-autoplay'        => (string) $delay,
			'data-i18n'            => wp_json_encode( $i18n ),
		)
	);

	$chevron_left  = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M14.6 7l-1.2-1L8 12l5.4 6 1.2-1-4.6-5z"/></svg>';
	$chevron_right = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M10.6 6L9.4 7l4.6 5-4.6 5 1.2 1 5.4-6z"/></svg>';
	$icon_pause    = '<svg class="etb-carousel__icon-pause" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 5h3v14H7zm7 0h3v14h-3z"/></svg>';
	$icon_play     = '<svg class="etb-carousel__icon-play" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z"/></svg>';

	$position   = in_array( $attributes['arrowPosition'], array( 'bottom', 'sides', 'top' ), true ) ? $attributes['arrowPosition'] : 'bottom';
	$arrows     = (bool) $attributes['showArrows'];
	$pause      = $delay && $attributes['showPauseButton'];
	$top_row    = 'top' === $position && ( $arrows || $pause );
	$bottom_row = $attributes['showDots'] || ( $arrows && 'bottom' === $position ) || ( $pause && 'top' !== $position );

	$pause_html = '<button type="button" class="etb-carousel__pause" data-paused="false" aria-label="' . esc_attr__( 'Pause autoplay', 'easy-testimonial-blocks' ) . '" hidden>' . $icon_pause . $icon_play . '</button>';
	$prev_html  = '<button type="button" class="etb-carousel__arrow etb-carousel__arrow--prev" aria-label="' . esc_attr__( 'Previous testimonial', 'easy-testimonial-blocks' ) . '">' . $chevron_left . '</button>';
	$next_html  = '<button type="button" class="etb-carousel__arrow etb-carousel__arrow--next" aria-label="' . esc_attr__( 'Next testimonial', 'easy-testimonial-blocks' ) . '">' . $chevron_right . '</button>';

	// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped -- the button markup above is static or escaped
	ob_start();
	?>
	<div <?php echo $wrapper_attributes; ?>>
		<?php if ( $top_row ) : ?>
			<div class="etb-carousel__controls etb-carousel__controls--top" hidden>
				<?php
				echo $pause ? $pause_html : '';
				echo $arrows ? $prev_html . $next_html : '';
				?>
			</div>
		<?php endif; ?>
		<div class="etb-carousel__viewport">
			<div class="etb-carousel__track" tabindex="0" aria-label="<?php esc_attr_e( 'Testimonials, scroll for more', 'easy-testimonial-blocks' ); ?>">
				<?php echo $content; ?>
			</div>
			<?php if ( $arrows && 'sides' === $position ) : ?>
				<div class="etb-carousel__controls etb-carousel__controls--sides" hidden>
					<?php echo $prev_html . $next_html; ?>
				</div>
			<?php endif; ?>
		</div>
		<?php if ( $bottom_row ) : ?>
			<div class="etb-carousel__controls etb-carousel__controls--bottom" hidden>
				<?php
				echo $pause && 'top' !== $position ? $pause_html : '';
				echo $arrows && 'bottom' === $position ? $prev_html : '';
				echo $attributes['showDots'] ? '<div class="etb-carousel__dots"></div>' : '';
				echo $arrows && 'bottom' === $position ? $next_html : '';
				?>
			</div>
		<?php endif; ?>
	</div>
	<?php
	// phpcs:enable
	return ob_get_clean();
}
