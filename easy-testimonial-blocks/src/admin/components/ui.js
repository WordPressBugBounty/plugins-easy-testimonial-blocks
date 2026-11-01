import { Icon } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';

export const Card = ( { title, action, className = '', children } ) => (
	<section className={ `etb-card ${ className }` }>
		{ ( title || action ) && (
			<header className="etb-card__header">
				{ title && <h2 className="etb-card__title">{ title }</h2> }
				{ action }
			</header>
		) }
		{ children }
	</section>
);

export const Skeleton = ( { width = '100%', height = 16 } ) => (
	<span
		className="etb-skeleton"
		style={ { width, height } }
		aria-hidden="true"
	/>
);

export const StatCard = ( { icon, label, value, hint, isLoading } ) => (
	<div className="etb-stat">
		<span className="etb-stat__icon">
			<Icon icon={ icon } size={ 22 } />
		</span>
		<div className="etb-stat__body">
			<span className="etb-stat__label">{ label }</span>
			<span className="etb-stat__value">
				{ isLoading ? <Skeleton width={ 56 } height={ 28 } /> : value }
			</span>
			{ hint && ! isLoading && (
				<span className="etb-stat__hint">{ hint }</span>
			) }
		</div>
	</div>
);

const STAR_PATH =
	'M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z';

// solid rating star ( the icon library's stars are outlines )
export const StarIcon = ( { size = 16, isEmpty = false } ) => (
	<svg
		viewBox="0 0 24 24"
		width={ size }
		height={ size }
		aria-hidden="true"
		focusable="false"
		className={ isEmpty ? 'is-empty' : undefined }
	>
		<path d={ STAR_PATH } />
	</svg>
);

export const Stars = ( { rating, size = 16 } ) => (
	<span
		className="etb-stars"
		role="img"
		aria-label={ sprintf(
			/* translators: %s: average rating */
			__( '%s out of 5 stars', 'easy-testimonial-blocks' ),
			rating
		) }
	>
		{ [ 1, 2, 3, 4, 5 ].map( ( position ) => (
			<StarIcon
				key={ position }
				size={ size }
				isEmpty={ rating < position - 0.25 }
			/>
		) ) }
	</span>
);

export const Pill = ( { tone = 'neutral', children } ) => (
	<span className={ `etb-pill is-${ tone }` }>{ children }</span>
);
