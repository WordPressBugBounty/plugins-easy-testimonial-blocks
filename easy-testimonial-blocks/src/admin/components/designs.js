import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button, Notice, Spinner } from '@wordpress/components';
import { Icon, info, plus } from '@wordpress/icons';

import {
	settings,
	usePatterns,
	createPageFromPattern,
	shortPatternTitle,
} from '../data';
import { Skeleton } from './ui';

const DesignCard = ( { pattern, isBusy, isDisabled, onCreate } ) => (
	<article className="etb-design">
		<div className="etb-design__thumb">
			<img
				src={ `${ settings.imagesUrl }patterns/${ pattern.slug }.webp` }
				alt=""
				loading="lazy"
			/>
		</div>
		<div className="etb-design__body">
			<h3 className="etb-design__title">
				{ shortPatternTitle( pattern.title ) }
			</h3>
			<p className="etb-design__text">{ pattern.description }</p>
			{ settings.canEditPages && (
				<Button
					variant="primary"
					icon={ isBusy ? undefined : plus }
					onClick={ () => onCreate( pattern ) }
					disabled={ isDisabled }
					aria-disabled={ isDisabled }
				>
					{ isBusy && <Spinner /> }
					{ isBusy
						? __( 'Creating page…', 'easy-testimonial-blocks' )
						: __( 'Create page', 'easy-testimonial-blocks' ) }
				</Button>
			) }
		</div>
	</article>
);

export default function Designs() {
	const { data: patterns, error, isLoading } = usePatterns();
	const [ busySlug, setBusySlug ] = useState( null );
	const [ createError, setCreateError ] = useState( null );

	const onCreate = ( pattern ) => {
		setBusySlug( pattern.slug );
		setCreateError( null );
		createPageFromPattern(
			pattern,
			sprintf(
				/* translators: %s: design name, e.g. "Three cards" */
				__( 'Testimonials – %s', 'easy-testimonial-blocks' ),
				shortPatternTitle( pattern.title )
			)
		).catch( ( requestError ) => {
			setBusySlug( null );
			setCreateError(
				requestError?.message ||
					__(
						'The page could not be created.',
						'easy-testimonial-blocks'
					)
			);
		} );
	};

	return (
		<div className="etb-view">
			<div className="etb-view__intro">
				<h2>
					{ __(
						'Ready-made testimonial designs',
						'easy-testimonial-blocks'
					) }
				</h2>
				<p>
					{ __(
						'Start from a polished section and make it your own. Each design opens as a new draft page, with every text, photo, rating and color editable.',
						'easy-testimonial-blocks'
					) }
				</p>
			</div>

			<div className="etb-tip">
				<Icon icon={ info } size={ 20 } />
				<p>
					{ __(
						'You can also add these designs to any existing page: insert the Testimonial Grid block and click “Choose a design”, or open Patterns → Testimonials in the block inserter.',
						'easy-testimonial-blocks'
					) }
				</p>
			</div>

			{ ( error || createError ) && (
				<Notice status="error" isDismissible={ false }>
					{ createError ||
						__(
							'The designs could not be loaded.',
							'easy-testimonial-blocks'
						) }
				</Notice>
			) }

			<div className="etb-designs">
				{ isLoading &&
					[ 1, 2, 3 ].map( ( placeholder ) => (
						<article
							key={ placeholder }
							className="etb-design is-loading"
						>
							<Skeleton height={ 200 } />
							<div className="etb-design__body">
								<Skeleton width="60%" height={ 20 } />
								<Skeleton height={ 14 } />
							</div>
						</article>
					) ) }
				{ patterns?.map( ( pattern ) => (
					<DesignCard
						key={ pattern.name }
						pattern={ pattern }
						isBusy={ busySlug === pattern.slug }
						isDisabled={ !! busySlug }
						onCreate={ onCreate }
					/>
				) ) }
			</div>
		</div>
	);
}
