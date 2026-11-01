<?php
/**
 * Block pattern registration.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the ready-made testimonial sections shipped in /patterns under
 * the core "Testimonials" pattern category.
 */
class ETB_Patterns {

	/**
	 * Pattern slugs, in the order they appear in the inserter.
	 *
	 * Each slug maps to patterns/{slug}.php, which returns the arguments for
	 * register_block_pattern(). Pattern markup refers to the bundled avatars
	 * with the ETB_AVATARS placeholder.
	 *
	 * @var string[]
	 */
	private $patterns = array(
		'three-cards',
		'featured',
		'two-column',
		'dark',
		'wall-of-love',
		'spotlight',
		'speech-bubbles',
		'aurora',
		'glass',
		'accent-stripe',
		'editorial',
		'side-by-side',
		'minimal',
	);

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register' ) );
	}

	/**
	 * Registers every pattern listed in $patterns.
	 */
	public function register() {
		if ( ! function_exists( 'register_block_pattern' ) ) {
			return;
		}

		$avatars_url = untrailingslashit( esc_url( ETB_URL . 'assets/images/avatars' ) );

		foreach ( $this->patterns as $slug ) {
			$file = ETB_PATH . 'patterns/' . $slug . '.php';

			if ( ! file_exists( $file ) ) {
				continue;
			}

			$pattern = require $file;

			if ( ! is_array( $pattern ) || empty( $pattern['content'] ) ) {
				continue;
			}

			$pattern['content'] = str_replace( 'ETB_AVATARS', $avatars_url, $pattern['content'] );

			// Lets the grid's design picker find these patterns.
			$pattern['blockTypes'] = array( 'etb/grid' );

			register_block_pattern( 'easy-testimonial-blocks/' . $slug, $pattern );
		}
	}
}
