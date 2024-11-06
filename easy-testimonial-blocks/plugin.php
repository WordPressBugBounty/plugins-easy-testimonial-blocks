<?php
/**
 * Plugin Name:       Easy Testimonial Blocks
 * Description:       A collection of custom Gutenberg blocks developed with native components to showcase client testimonials.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.0.4
 * Author:            Zakaria Binsaifullah
 * Author URI:        https://makegutenblock.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       easy-testimonial-blocks
 *
 * @package           @wordpress/create-block
 */

 /**
  * @package Zero Configuration with @wordpress/create-block
  *  [etb] && [ETB] ===> Prefix
  */

// Stop Direct Access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// require admin page
require_once __DIR__ . '/admin/admin-class.php';

/**
 * Blocks Final Class
 */

final class ETB_BLOCKS_CLASS {
	public function __construct() {

		// define constants
		$this->etb_define_constants();

		// block initialization
		add_action( 'init', [ $this, 'etb_blocks_init' ] );

		// blocks category
		if( version_compare( $GLOBALS['wp_version'], '5.7', '<' ) ) {
			add_filter( 'block_categories', [ $this, 'etb_register_block_category' ], 10, 2 );
		} else {
			add_filter( 'block_categories_all', [ $this, 'etb_register_block_category' ], 10, 2 );
		}

		// enqueue block assets
		add_action( 'enqueue_block_assets', [ $this, 'etb_external_libraries' ] );

		// redirect users to admin page
		add_action( 'activated_plugin', [ $this, 'etb_redirect_to_admin_page' ] );

	}

	/**
	 * Redirect users to admin page
	 */
	public function etb_redirect_to_admin_page($plugin){
		if( $plugin == plugin_basename( __FILE__ ) ) {
			exit( wp_redirect( admin_url( 'tools.php?page=etb-blocks' ) ) );
		}
	}

	/**
	 * Initialize the plugin
	 */

	public static function init(){
		static $instance = false;
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Define the plugin constants
	 */
	private function etb_define_constants() {
		define( 'ETB_VERSION', '1.0.1' );
		define( 'ETB_URL', plugin_dir_url( __FILE__ ) );
		define( 'ETB_INC_URL', ETB_URL . 'includes/' );
	}

	/**
	 * Blocks Registration
	 */

	public function etb_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/blocks/' . $name, $options );
	 }


	 // register inline style
	 public function etb_register_inline_style( $id, $css ){
		wp_register_style( $id, false );
		wp_enqueue_style( $id );
		wp_add_inline_style( $id, $css );
	 }

	/**
	 * Blocks Initialization
	*/
	public function etb_blocks_init() {
		// grid block
		$this->etb_register_block( 'grid', [
			'render_callback' => [ $this, 'etb_grid_block' ],
		] );

		// grid child block
		$this->etb_register_block( 'grid-item' );
	}

	// grid block callback
	public function etb_grid_block($attributes, $content ){
		// require grid template
		require_once __DIR__ . '/templates/grid/grid.php';
		$id = $attributes['id'];

		// register inline style
		$this->etb_register_inline_style(
			$id,
			etb_testimonial_grid( $attributes )
		);

		return $content;
	}

	/**
	 * Register Block Category
	 */

	public function etb_register_block_category( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'etb-blocks',
					'title' => __( 'Testimonial Blocks', 'easy-testimonial-blocks' ),
				),
			),
			$categories,
		);
	}

	/**
	 * Enqueue Block Assets
	 */
	public function etb_external_libraries() {
		if( ! is_admin() && has_block('etb/grid-item') ){
			wp_enqueue_script( 'etb-rater', ETB_INC_URL . 'js/rater.min.js', array('jquery'), ETB_VERSION, true );
			wp_enqueue_script( 'etb-plugin', ETB_INC_URL . 'js/plugin.js', array('jquery', 'etb-rater'), ETB_VERSION, true );
		}
	}

}

/**
 * Kickoff
*/

ETB_BLOCKS_CLASS::init();
