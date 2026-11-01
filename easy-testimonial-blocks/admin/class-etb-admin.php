<?php
/**
 * Admin dashboard page.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the plugin dashboard under Settings and loads its React app
 * ( src/admin, built to build/admin ).
 */
class ETB_Admin {

	/**
	 * Admin page slug.
	 */
	const PAGE_SLUG = 'etb-blocks';

	/**
	 * Hook suffix of the dashboard screen.
	 */
	const SCREEN_ID = 'settings_page_etb-blocks';

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'register_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		add_filter( 'admin_body_class', array( $this, 'body_class' ) );
		add_filter( 'plugin_action_links_' . ETB_BASENAME, array( $this, 'action_links' ) );
	}

	/**
	 * URL of the dashboard page.
	 *
	 * @return string
	 */
	public static function page_url() {
		return admin_url( 'options-general.php?page=' . self::PAGE_SLUG );
	}

	/**
	 * Registers the dashboard under Settings.
	 */
	public function register_menu() {
		add_options_page(
			__( 'Testimonial Blocks', 'easy-testimonial-blocks' ),
			__( 'Testimonial Blocks', 'easy-testimonial-blocks' ),
			'manage_options',
			self::PAGE_SLUG,
			array( $this, 'render_page' )
		);
	}

	/**
	 * Adds a "Dashboard" link to the plugin's row on the Plugins screen.
	 *
	 * @param array $links Existing action links.
	 * @return array
	 */
	public function action_links( $links ) {
		array_unshift(
			$links,
			sprintf(
				'<a href="%s">%s</a>',
				esc_url( self::page_url() ),
				esc_html__( 'Dashboard', 'easy-testimonial-blocks' )
			)
		);

		return $links;
	}

	/**
	 * Flags the dashboard screen so its styles can go edge to edge.
	 *
	 * @param string $classes Space-separated body classes.
	 * @return string
	 */
	public function body_class( $classes ) {
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;

		if ( $screen && self::SCREEN_ID === $screen->id ) {
			$classes .= ' etb-dashboard-screen';
		}

		return $classes;
	}

	/**
	 * Loads the dashboard app on its own screen only.
	 *
	 * @param string $screen Current admin screen hook suffix.
	 */
	public function enqueue_assets( $screen ) {
		if ( self::SCREEN_ID !== $screen ) {
			return;
		}

		$asset_file = ETB_PATH . 'build/admin/index.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		wp_enqueue_script(
			'etb-dashboard',
			ETB_URL . 'build/admin/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_set_script_translations( 'etb-dashboard', 'easy-testimonial-blocks' );

		wp_add_inline_script(
			'etb-dashboard',
			'window.etbDashboard = ' . wp_json_encode( $this->get_app_settings() ) . ';',
			'before'
		);

		// The asset version is the JS bundle hash, so CSS-only changes need their own.
		$style_file = ETB_PATH . 'build/admin/style-index.css';

		wp_enqueue_style(
			'etb-dashboard',
			ETB_URL . 'build/admin/style-index.css',
			array( 'wp-components' ),
			file_exists( $style_file ) ? (string) filemtime( $style_file ) : $asset['version']
		);
		wp_style_add_data( 'etb-dashboard', 'rtl', 'replace' );
	}

	/**
	 * Settings passed to the dashboard app.
	 *
	 * @return array
	 */
	private function get_app_settings() {
		return array(
			'version'      => ETB_VERSION,
			'imagesUrl'    => ETB_URL . 'assets/images/',
			'newPageUrl'   => admin_url( 'post-new.php?post_type=page' ),
			'editPostUrl'  => admin_url( 'post.php?action=edit&post=' ),
			'canEditPages' => current_user_can( 'edit_pages' ),
			'videoId'      => '4J7tbJ3NQWQ',
			'supportUrl'   => 'https://wordpress.org/support/plugin/easy-testimonial-blocks/',
			'reviewUrl'    => 'https://wordpress.org/support/plugin/easy-testimonial-blocks/reviews/#new-post',
		);
	}

	/**
	 * Renders the mount point for the dashboard app.
	 */
	public function render_page() {
		?>
		<div class="wrap etb-dashboard-wrap">
			<h1 class="screen-reader-text"><?php esc_html_e( 'Testimonial Blocks', 'easy-testimonial-blocks' ); ?></h1>
			<hr class="wp-header-end" />
			<div id="etb-dashboard"></div>
			<noscript>
				<p><?php esc_html_e( 'The Testimonial Blocks dashboard needs JavaScript. Please enable it in your browser.', 'easy-testimonial-blocks' ); ?></p>
			</noscript>
		</div>
		<?php
	}
}
