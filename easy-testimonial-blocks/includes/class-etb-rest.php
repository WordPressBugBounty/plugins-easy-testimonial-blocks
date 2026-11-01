<?php
/**
 * REST API endpoints for the admin dashboard.
 *
 * @package EasyTestimonialBlocks
 */

// Stop direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers etb/v1/overview: usage stats and the list of content that
 * contains a Testimonial Grid, for the dashboard's Overview tab.
 */
class ETB_REST {

	/**
	 * REST namespace.
	 */
	const NAMESPACE = 'etb/v1';

	/**
	 * Maximum number of posts scanned for testimonial blocks.
	 */
	const SCAN_LIMIT = 200;

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Registers the REST routes.
	 */
	public function register_routes() {
		register_rest_route(
			self::NAMESPACE,
			'/overview',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_overview' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Returns usage stats and every editable post that contains a grid.
	 *
	 * @return WP_REST_Response
	 */
	public function get_overview() {
		global $wpdb;

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- block markup can't be searched through WP_Query; results depend on live content.
		$post_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT ID FROM {$wpdb->posts}
				WHERE post_content LIKE %s
				AND post_status NOT IN ( 'trash', 'auto-draft', 'inherit' )
				AND post_type <> 'revision'
				ORDER BY post_modified DESC
				LIMIT %d",
				'%' . $wpdb->esc_like( '<!-- wp:etb/grid' ) . '%',
				self::SCAN_LIMIT
			)
		);

		$items        = array();
		$stats        = array(
			'pages'         => 0,
			'published'     => 0,
			'grids'         => 0,
			'testimonials'  => 0,
			'averageRating' => null,
		);
		$rating_total = 0;
		$rating_count = 0;

		foreach ( $post_ids as $post_id ) {
			$post = get_post( (int) $post_id );

			if ( ! $post || ! current_user_can( 'edit_post', $post->ID ) ) {
				continue;
			}

			$counts = $this->count_blocks( parse_blocks( $post->post_content ) );

			if ( 0 === $counts['grids'] ) {
				continue;
			}

			$type_object = get_post_type_object( $post->post_type );
			$is_public   = 'publish' === $post->post_status;
			$is_viewable = in_array( $post->post_status, array( 'publish', 'private' ), true ) && is_post_type_viewable( $post->post_type );

			$items[] = array(
				'id'            => $post->ID,
				// Raw title: get_the_title() would add a "Private:" prefix the status column already covers.
				'title'         => '' !== $post->post_title ? wp_strip_all_tags( $post->post_title ) : __( '(no title)', 'easy-testimonial-blocks' ),
				'type'          => $type_object ? $type_object->labels->singular_name : $post->post_type,
				'status'        => $post->post_status,
				'statusLabel'   => get_post_status_object( $post->post_status ) ? get_post_status_object( $post->post_status )->label : $post->post_status,
				'editUrl'       => (string) get_edit_post_link( $post->ID, 'raw' ),
				'viewUrl'       => $is_viewable ? (string) get_permalink( $post ) : '',
				'postType'      => $post->post_type,
				'grids'         => $counts['grids'],
				'testimonials'  => $counts['testimonials'],
				'averageRating' => $counts['ratingCount'] > 0 ? round( $counts['ratingTotal'] / $counts['ratingCount'], 1 ) : null,
				/* translators: %s: human-readable time difference, e.g. "2 hours" */
				'modified'      => sprintf( __( '%s ago', 'easy-testimonial-blocks' ), human_time_diff( get_post_modified_time( 'U', true, $post ), time() ) ),
				'modifiedDate'  => get_post_modified_time( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), false, $post, true ),
				'modifiedTime'  => (int) get_post_modified_time( 'U', true, $post ),
			);

			++$stats['pages'];
			$stats['grids']        += $counts['grids'];
			$stats['testimonials'] += $counts['testimonials'];
			$rating_total          += $counts['ratingTotal'];
			$rating_count          += $counts['ratingCount'];

			if ( $is_public ) {
				++$stats['published'];
			}
		}

		if ( $rating_count > 0 ) {
			$stats['averageRating'] = round( $rating_total / $rating_count, 1 );
		}

		return rest_ensure_response(
			array(
				'stats' => $stats,
				'items' => $items,
			)
		);
	}

	/**
	 * Counts grids, testimonials and ratings in a parsed block tree.
	 *
	 * @param array $blocks Parsed blocks.
	 * @return array
	 */
	private function count_blocks( array $blocks ) {
		$counts = array(
			'grids'        => 0,
			'testimonials' => 0,
			'ratingTotal'  => 0,
			'ratingCount'  => 0,
		);

		foreach ( $blocks as $block ) {
			if ( 'etb/grid' === $block['blockName'] ) {
				++$counts['grids'];
			}

			if ( 'etb/grid-item' === $block['blockName'] ) {
				++$counts['testimonials'];

				$attrs = $block['attrs'];
				if ( ! isset( $attrs['showRating'] ) || false !== $attrs['showRating'] ) {
					$counts['ratingTotal'] += isset( $attrs['rating'] ) ? min( max( (float) $attrs['rating'], 0 ), 5 ) : 5;
					++$counts['ratingCount'];
				}
			}

			if ( ! empty( $block['innerBlocks'] ) ) {
				$inner = $this->count_blocks( $block['innerBlocks'] );
				foreach ( $counts as $key => $value ) {
					$counts[ $key ] = $value + $inner[ $key ];
				}
			}
		}

		return $counts;
	}
}
