<?php
/**
 * Plugin Name:       Easy Testimonial Blocks
 * Description:       A collection of custom Gutenberg blocks developed with native components to showcase client testimonials.
 * Requires at least: 6.5
 * Requires PHP:      7.0
 * Version:           1.1.1
 * Author:            Zakaria Binsaifullah
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       easy-testimonial-blocks
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Plugin constants.
define( 'ETB_VERSION', '1.1.1' );
define( 'ETB_FILE', __FILE__ );
define( 'ETB_PATH', plugin_dir_path( __FILE__ ) );
define( 'ETB_URL', plugin_dir_url( __FILE__ ) );
define( 'ETB_BASENAME', plugin_basename( __FILE__ ) );

// Block render helpers, loaded once at boot.
require_once ETB_PATH . 'includes/grid.php';
require_once ETB_PATH . 'includes/grid-item.php';

// Core classes.
require_once ETB_PATH . 'includes/class-etb-blocks.php';
require_once ETB_PATH . 'includes/class-etb-plugin.php';
require_once ETB_PATH . 'admin/class-etb-admin.php';

/**
 * Kick off the plugin.
 */
ETB_Plugin::init();
