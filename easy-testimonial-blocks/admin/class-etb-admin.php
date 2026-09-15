<?php
/**
 * Admin settings page.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers and renders the plugin's Tools admin page.
 */
class ETB_Admin {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'register_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Enqueues the admin page's styles.
	 *
	 * @param string $screen Current admin screen hook suffix.
	 */
	public function enqueue_assets( $screen ) {
		if ( 'tools_page_etb-blocks' !== $screen ) {
			return;
		}

		wp_enqueue_style( 'etb-admin-style', ETB_URL . 'admin/admin.css', array(), ETB_VERSION );
	}

	/**
	 * Registers the admin page under Tools.
	 */
	public function register_menu() {
		add_submenu_page(
			'tools.php',
			__( 'Testimonial Blocks', 'easy-testimonial-blocks' ),
			__( 'Testimonial Blocks', 'easy-testimonial-blocks' ),
			'manage_options',
			'etb-blocks',
			array( $this, 'render_page' )
		);
	}

	/**
	 * Renders the admin page markup.
	 */
	public function render_page() {
		?>
		<div class="etb__wrap">
			<div class="plugin_max_container">
				<div class="plugin__head_container">
					<div class="plugin_head">
						<h1 class="plugin_title">
							<?php esc_html_e( 'Testimonial Blocks', 'easy-testimonial-blocks' ); ?>
						</h1>
						<p class="plugin_description">
							<?php esc_html_e( 'A collection of custom Gutenberg blocks developed with native components to showcase client testimonials.', 'easy-testimonial-blocks' ); ?>
						</p>
					</div>
				</div>
				<div class="plugin__body_container">
					<div class="plugin_body">
						<div class="tabs__panels">
							<div class="tab__panel">
								<div class="tab__panel_flex">
									<div class="tab__panel_left">
										<h3 class="video__title">
											<?php esc_html_e( 'Video Tutorial', 'easy-testimonial-blocks' ); ?>
										</h3>
										<p class="video__description">
											<?php esc_html_e( 'Watch the video tutorial to learn how to use the plugin. It will help you start your own design quickly.', 'easy-testimonial-blocks' ); ?>
										</p>
										<div class="video__container">
											<iframe width="560" height="315" src="https://www.youtube.com/embed/4J7tbJ3NQWQ" title="<?php esc_attr_e( 'Testimonial Blocks — Video Tutorial', 'easy-testimonial-blocks' ); ?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
										</div>
									</div>
									<div class="tab__panel_right">
										<div class="single__support_panel">
											<h3 class="support__title">
												<?php esc_html_e( 'Report a Bug', 'easy-testimonial-blocks' ); ?>
											</h3>
											<p class="support__description">
												<?php esc_html_e( 'If you find any issue or have any suggestion, please let me know.', 'easy-testimonial-blocks' ); ?>
											</p>
											<a href="https://wordpress.org/support/plugin/easy-testimonial-blocks/" class="support__link" target="_blank">
												<?php esc_html_e( 'Support', 'easy-testimonial-blocks' ); ?>
											</a>
										</div>
										<div class="single__support_panel">
											<h3 class="support__title">
												<?php esc_html_e( 'Spread Your Love', 'easy-testimonial-blocks' ); ?>
											</h3>
											<p class="support__description">
												<?php esc_html_e( 'If you like this plugin, please share your opinion', 'easy-testimonial-blocks' ); ?>
											</p>
											<a href="https://wordpress.org/support/plugin/easy-testimonial-blocks/reviews/" class="support__link" target="_blank">
												<?php esc_html_e( 'Rate the Plugin', 'easy-testimonial-blocks' ); ?>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php
	}
}
