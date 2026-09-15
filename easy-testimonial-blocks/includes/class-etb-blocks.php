<?php
/**
 * Block registration.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Discovers and registers every block shipped in build/blocks, wires up
 * the dynamic render callbacks they need, and registers the plugin's
 * block category.
 */
class ETB_Blocks {

	/**
	 * Map of block slug ( the build/blocks/{slug} directory name ) to its
	 * render callback. Blocks without an entry here are registered as
	 * static blocks straight from their block.json.
	 *
	 * @var array<string, callable>
	 */
	private $render_callbacks;

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->render_callbacks = array(
			'grid'      => array( $this, 'render_grid' ),
			'grid-item' => array( $this, 'render_grid_item' ),
		);

		add_action( 'init', array( $this, 'register' ) );
		add_filter( 'block_categories_all', array( $this, 'register_category' ) );
	}

	/**
	 * Registers every block found under build/blocks.
	 *
	 * Adding a new block only requires a build/blocks/{slug}/block.json;
	 * it is picked up automatically here. Add an entry to
	 * $render_callbacks only when the block needs server-side rendering.
	 */
	public function register() {
		$blocks_dir = ETB_PATH . 'build/blocks';

		if ( ! is_dir( $blocks_dir ) ) {
			return;
		}

		foreach ( glob( $blocks_dir . '/*', GLOB_ONLYDIR ) as $block_dir ) {
			if ( ! file_exists( $block_dir . '/block.json' ) ) {
				continue;
			}

			$slug = basename( $block_dir );
			$args = array();

			if ( isset( $this->render_callbacks[ $slug ] ) ) {
				$args['render_callback'] = $this->render_callbacks[ $slug ];
			}

			register_block_type( $block_dir, $args );
		}
	}

	/**
	 * Registers the "Testimonial Blocks" block category.
	 *
	 * @param array $categories Registered block categories.
	 * @return array
	 */
	public function register_category( $categories ) {
		return array_merge(
			array(
				array(
					'slug'  => 'etb-blocks',
					'title' => __( 'Testimonial Blocks', 'easy-testimonial-blocks' ),
				),
			),
			$categories
		);
	}

	/**
	 * Render callback for etb/grid-item.
	 *
	 * @param array $attributes Block attributes.
	 * @return string
	 */
	public function render_grid_item( $attributes ) {
		return etb_testimonial_grid_item( $attributes );
	}

	/**
	 * Render callback for etb/grid.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Inner block content.
	 * @return string
	 */
	public function render_grid( $attributes, $content ) {
		$this->register_inline_style( $attributes['id'], etb_testimonial_grid( $attributes ) );

		return $content;
	}

	/**
	 * Registers and enqueues a per-instance inline stylesheet.
	 *
	 * @param string $handle Unique style handle ( the block instance id ).
	 * @param string $css    CSS to inline.
	 */
	private function register_inline_style( $handle, $css ) {
		$handle = sanitize_html_class( $handle );

		wp_register_style( $handle, false, array(), ETB_VERSION );
		wp_enqueue_style( $handle );
		// Every value interpolated into $css is already sanitized per-declaration
		// in includes/grid.php; this is a final defense-in-depth pass so nothing
		// that could close out the inline <style> tag ever reaches the page.
		wp_add_inline_style( $handle, etb_sanitize_inline_css( $css ) );
	}
}
