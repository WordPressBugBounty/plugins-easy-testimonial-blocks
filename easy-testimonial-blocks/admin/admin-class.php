<?php
/**
 * Admin class
 */
class ETB_Admin_Page {

    /**
     * Constructor
     */
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'etb_admin_menu' ] );

        // enqueue admin assets
        add_action( 'admin_enqueue_scripts', [ $this, 'etb_admin_assets' ] );
    }

    /**
     * Enqueue admin scripts
     */
    public function etb_admin_assets($screen) {
        if( $screen === 'tools_page_etb-blocks' ){
            wp_enqueue_style( 'etb-admin-style', ETB_URL . 'admin/admin.css', [], time() );
            // JS
            wp_enqueue_script( 'etb-admin-script', ETB_URL . 'admin/admin.js', [ 'jquery' ], time(), true );
        }
    }

    /**
     * Add admin menu
     */
    public function etb_admin_menu() {
        add_submenu_page(
            'tools.php',
            __( 'Testimonial Blocks', 'easy-testimonial-blocks' ),
            __( 'Testimonial Blocks', 'easy-testimonial-blocks' ),
            'manage_options',
            'etb-blocks',
            [ $this, 'etb_admin_page' ]
        );
    }

    /**
     * Admin page
     */
    public function etb_admin_page() {
        ?>
        <div class="etb__wrap">
            <div class="plugin_max_container">
                <div class="plugin__head_container">
                    <div class="plugin_head">
                        <h1 class="plugin_title">
                            <?php _e( 'Testimonial Blocks', 'easy-testimonial-blocks' ); ?>
                        </h1>
                        <p class="plugin_description">
                            <?php _e( 'A collection of custom Gutenberg blocks developed with native components to showcase client testimonials.', 'easy-testimonial-blocks' ); ?>
                        </p>
                    </div>
                </div>
                <div class="plugin__body_container">
                    <div class="plugin_body">
                        <div class="tabs__panel_container">
                            <div class="tabs__titles">
                                <p class="tab__title active" data-tab="tab1">
                                    <?php _e( 'Help and Support', 'easy-testimonial-blocks' ); ?>
                                </p>
                                <p class="tab__title pro__tab" data-tab="tab2">
                                    <?php _e( 'Change Logs', 'easy-testimonial-blocks' ); ?>
                                </p>
                            </div>
                            <div class="tabs__container">
                                <div class="tabs__panels">
                                    <div class="tab__panel active" id="tab1">
                                        <div class="tab__panel_flex">
                                            <div class="tab__panel_left">
                                                <h3 class="video__title">
                                                    <?php _e( 'Video Tutorial', 'easy-testimonial-blocks' ); ?>
                                                </h3>
                                                <p class="video__description">
                                                    <?php _e( 'Watch the video tutorial to learn how to use the plugin. It will help you start your own design quickly.', 'easy-testimonial-blocks' ); ?>
                                                </p>
                                                <div class="video__container">
                                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/4J7tbJ3NQWQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                </div>
                                            </div>
                                            <div class="tab__panel_right">
                                                <div class="single__support_panel">
                                                    <h3 class="support__title">
                                                        <?php _e( 'Report a Bug', 'easy-testimonial-blocks' ); ?>
                                                    </h3>
                                                    <p class="support__description">
                                                        <?php _e( 'If you find any issue or have any suggestion, please let me know.', 'easy-testimonial-blocks' ); ?>
                                                    </p>
                                                    <a href="https://wordpress.org/support/plugin/easy-testimonial-blocks/" class="support__link" target="_blank">
                                                        <?php _e( 'Support', 'easy-testimonial-blocks' ); ?>
                                                    </a>
                                                </div>
                                                <div class="single__support_panel">
                                                    <h3 class="support__title">
                                                        <?php _e( 'Spread Your Love', 'easy-testimonial-blocks' ); ?>
                                                    </h3>
                                                    <p class="support__description">
                                                        <?php _e( 'If you like this plugin, please share your opinion', 'easy-testimonial-blocks' ); ?>
                                                    </p>
                                                    <a href="https://wordpress.org/support/plugin/easy-testimonial-blocks/reviews/" class="support__link" target="_blank">
                                                        <?php _e( 'Rate the Plugin', 'easy-testimonial-blocks' ); ?>
                                                    </a>
                                                </div>
                                                <div class="single__support_panel">
                                                    <h3 class="support__title">
                                                        <?php _e( 'Explore More Blocks', 'easy-testimonial-blocks' ); ?>
                                                    </h3>
                                                    <p class="support__description">
                                                        <?php _e( 'Want to get more similar blocks, please visit our website', 'easy-testimonial-blocks' ); ?>
                                                    </p>
                                                    <a href="https://makegutenblock.com" class="support__link" target="_blank">
                                                        <?php _e( 'Explore Blocks', 'easy-testimonial-blocks' ); ?>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="custom__block_request">
                                            <h3 class="custom__block_request_title">
                                                <?php _e( 'Need to Hire Experts?', 'easy-testimonial-blocks' ); ?>
                                            </h3>
                                            <p class="custom__block_request_description">
                                                <?php _e( 'We offer paid service and available for hiring for any custom projects. You can hire our experts to get your projects done with awesome, high quality production.', 'easy-testimonial-blocks' ); ?>
                                            </p>
                                            <div class="available__links">
                                                <a href="mailto:zbinsaifullah@gmail.com" class="available__link mail" target="_blank">
                                                    <?php _e( 'Send Email', 'easy-testimonial-blocks' ); ?>
                                                </a>
                                                <a href="https://makegutenblock.com/contact" class="available__link web" target="_blank">
                                                    <?php _e( 'Send Message', 'easy-testimonial-blocks' ); ?>
                                                </a>
                                                <a href="https://www.fiverr.com/devs_zak" class="available__link fiverr" target="_blank">
                                                    <?php _e( 'Fiverr', 'easy-testimonial-blocks' ); ?>
                                                </a>
                                                <a href="https://www.upwork.com/freelancers/~010af183b3205dc627" class="available__link upwork" target="_blank">
                                                    <?php _e( 'UpWork', 'easy-testimonial-blocks' ); ?>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab__panel" id="tab2">
                                        <div class="change__log_head">
                                            <div class="head_info">
                                                <h3 class="change__log_title">
                                                    <?php _e( 'Change logs', 'easy-testimonial-blocks' ); ?>
                                                </h3>
                                                <p class="free_vs_pro_note">
                                                    <?php _e( 'Here is the brief of our plugins change logs', 'easy-testimonial-blocks' ); ?>
                                                </p>
                                            </div>
                                            <div class="pro__free_table">
                                                <h3 class="change-log-title">
                                                    <?php _e( '1.0.0', 'easy-testimonial-blocks' ); ?>
                                                </h3>
                                                <li class="log-detail">
                                                    <?php _e( 'Initial Release', 'easy-testimonial-blocks' ); ?>
                                                </li>
                                            </div>
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

new ETB_Admin_Page();