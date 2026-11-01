import { __, _n, sprintf } from '@wordpress/i18n';
import { Button, Notice } from '@wordpress/components';
import {
	Icon,
	quote,
	pages,
	published,
	starFilled,
	check,
	update,
	video,
	layout,
} from '@wordpress/icons';

import { settings, useOverview } from '../data';
import { Card, StatCard, Stars, StarIcon } from './ui';
import UsageTable from './usage-table';

// decorative stack of testimonial cards; the chip shows the site's real rating
const HeroArt = ( { rating } ) => (
	<div className="etb-hero__art" aria-hidden="true">
		<div className="etb-float-card is-back">
			<span className="etb-float-card__lines">
				<span />
				<span />
				<span />
			</span>
		</div>
		<div className="etb-float-card is-front">
			<div className="etb-float-card__top">
				<Icon icon={ quote } size={ 30 } />
				<Stars rating={ 5 } />
			</div>
			<p className="etb-float-card__quote">
				{ __(
					'Working with this team was the best decision we made this year.',
					'easy-testimonial-blocks'
				) }
			</p>
			<div className="etb-float-card__author">
				<img
					src={ settings.imagesUrl + 'avatars/sarah-mitchell.webp' }
					alt=""
				/>
				<span>
					<strong>Sarah Mitchell</strong>
					<small>
						{ __(
							'Marketing Director',
							'easy-testimonial-blocks'
						) }
					</small>
				</span>
			</div>
		</div>
		<div className="etb-float-chip">
			<StarIcon size={ 18 } />
			<span>
				{ rating
					? sprintf(
							/* translators: %s: average rating, e.g. 4.9 */
							__(
								'%s average rating',
								'easy-testimonial-blocks'
							),
							rating
					  )
					: __( 'Star ratings built in', 'easy-testimonial-blocks' ) }
			</span>
		</div>
	</div>
);

const Hero = ( { onNavigate, rating } ) => (
	<section className="etb-hero">
		<div className="etb-hero__content">
			<span className="etb-hero__eyebrow">
				{ sprintf(
					/* translators: %s: plugin version */
					__( 'Version %s', 'easy-testimonial-blocks' ),
					settings.version
				) }
			</span>
			<h2 className="etb-hero__title">
				{ __(
					'Turn happy customers into your best marketing',
					'easy-testimonial-blocks'
				) }
			</h2>
			<p className="etb-hero__text">
				{ __(
					'Build a polished testimonials section in minutes. Start from a ready-made design, add your reviews and ratings, and publish. No code needed.',
					'easy-testimonial-blocks'
				) }
			</p>
			<div className="etb-hero__actions">
				<Button
					variant="primary"
					className="etb-button-light"
					icon={ layout }
					onClick={ () => onNavigate( 'designs' ) }
				>
					{ __(
						'Create a testimonial page',
						'easy-testimonial-blocks'
					) }
				</Button>
				<Button
					variant="tertiary"
					className="etb-button-ghost"
					icon={ video }
					onClick={ () => onNavigate( 'help' ) }
				>
					{ __( 'Watch the tutorial', 'easy-testimonial-blocks' ) }
				</Button>
			</div>
		</div>
		<HeroArt rating={ rating } />
	</section>
);

const Stats = ( { stats, isLoading } ) => (
	<div className="etb-stats">
		<StatCard
			icon={ quote }
			label={ __( 'Testimonials', 'easy-testimonial-blocks' ) }
			value={ stats?.testimonials ?? 0 }
			hint={ __( 'across all your content', 'easy-testimonial-blocks' ) }
			isLoading={ isLoading }
		/>
		<StatCard
			icon={ pages }
			label={ __( 'Pages & posts', 'easy-testimonial-blocks' ) }
			value={ stats?.pages ?? 0 }
			hint={ sprintf(
				/* translators: %d: number of testimonial grids */
				_n(
					'%d testimonial grid',
					'%d testimonial grids',
					stats?.grids ?? 0,
					'easy-testimonial-blocks'
				),
				stats?.grids ?? 0
			) }
			isLoading={ isLoading }
		/>
		<StatCard
			icon={ published }
			label={ __( 'Published', 'easy-testimonial-blocks' ) }
			value={ stats?.published ?? 0 }
			hint={ __( 'live on your site', 'easy-testimonial-blocks' ) }
			isLoading={ isLoading }
		/>
		<StatCard
			icon={ starFilled }
			label={ __( 'Average rating', 'easy-testimonial-blocks' ) }
			value={
				stats?.averageRating ? (
					<span className="etb-stat__rating">
						{ stats.averageRating }
						<Stars rating={ stats.averageRating } />
					</span>
				) : (
					'—'
				)
			}
			hint={
				stats?.averageRating
					? __( 'from rated testimonials', 'easy-testimonial-blocks' )
					: __( 'no ratings yet', 'easy-testimonial-blocks' )
			}
			isLoading={ isLoading }
		/>
	</div>
);

const Checklist = ( { stats, isLoading } ) => {
	const steps = [
		{
			label: __( 'Add a Testimonial Grid', 'easy-testimonial-blocks' ),
			done: ( stats?.grids ?? 0 ) > 0,
		},
		{
			label: __(
				'Add at least 3 testimonials',
				'easy-testimonial-blocks'
			),
			done: ( stats?.testimonials ?? 0 ) >= 3,
		},
		{
			label: __(
				'Publish a page with testimonials',
				'easy-testimonial-blocks'
			),
			done: ( stats?.published ?? 0 ) > 0,
		},
	];
	const completed = steps.filter( ( step ) => step.done ).length;
	const isComplete = ! isLoading && completed === steps.length;

	let progressLabel = '\u00a0';
	if ( isComplete ) {
		progressLabel = __(
			'All set! Your testimonials are live.',
			'easy-testimonial-blocks'
		);
	} else if ( ! isLoading ) {
		progressLabel = sprintf(
			/* translators: 1: completed steps, 2: total steps */
			__( '%1$d of %2$d steps complete', 'easy-testimonial-blocks' ),
			completed,
			steps.length
		);
	}

	return (
		<Card title={ __( 'Getting started', 'easy-testimonial-blocks' ) }>
			<div
				className="etb-progress"
				role="progressbar"
				aria-valuemin={ 0 }
				aria-valuemax={ steps.length }
				aria-valuenow={ completed }
				aria-label={ __(
					'Getting started progress',
					'easy-testimonial-blocks'
				) }
			>
				<span
					style={ {
						width: `${ ( completed / steps.length ) * 100 }%`,
					} }
				/>
			</div>
			<p
				className={
					'etb-progress__label' + ( isComplete ? ' is-complete' : '' )
				}
			>
				{ progressLabel }
			</p>
			<ul className="etb-checklist">
				{ steps.map( ( step ) => (
					<li
						key={ step.label }
						className={ step.done ? 'is-done' : '' }
					>
						<span className="etb-checklist__mark">
							{ step.done && <Icon icon={ check } size={ 16 } /> }
						</span>
						<span>{ step.label }</span>
					</li>
				) ) }
			</ul>
		</Card>
	);
};

const ComingNext = () => (
	<Card
		title={ __( 'Coming next', 'easy-testimonial-blocks' ) }
		className="etb-card--soft"
	>
		<ul className="etb-roadmap">
			<li>
				<strong>
					{ __( 'Testimonial slider', 'easy-testimonial-blocks' ) }
				</strong>
				<span>
					{ __(
						'A fast, accessible carousel layout.',
						'easy-testimonial-blocks'
					) }
				</span>
			</li>
			<li>
				<strong>
					{ __( 'Testimonials library', 'easy-testimonial-blocks' ) }
				</strong>
				<span>
					{ __(
						'Manage testimonials in one place and show them anywhere.',
						'easy-testimonial-blocks'
					) }
				</span>
			</li>
			<li>
				<strong>
					{ __( 'Collection form', 'easy-testimonial-blocks' ) }
				</strong>
				<span>
					{ __(
						'Let customers submit testimonials for your approval.',
						'easy-testimonial-blocks'
					) }
				</span>
			</li>
		</ul>
		<Button
			variant="link"
			href={ settings.supportUrl }
			target="_blank"
			rel="noreferrer"
		>
			{ __( 'Suggest a feature', 'easy-testimonial-blocks' ) }
		</Button>
	</Card>
);

export default function Overview( { onNavigate } ) {
	const { data, error, isLoading, reload } = useOverview();

	// placeholders only on the first load; a refresh keeps the current data
	const isFirstLoad = isLoading && ! data;

	return (
		<div className="etb-view">
			<Hero
				onNavigate={ onNavigate }
				rating={ data?.stats?.averageRating }
			/>
			{ error && (
				<Notice
					status="error"
					isDismissible={ false }
					actions={ [
						{
							label: __( 'Try again', 'easy-testimonial-blocks' ),
							onClick: reload,
						},
					] }
				>
					{ __(
						'Your testimonial stats could not be loaded.',
						'easy-testimonial-blocks'
					) }
				</Notice>
			) }
			<Stats stats={ data?.stats } isLoading={ isFirstLoad } />
			<Card
				title={
					<>
						{ __(
							'Where your testimonials appear',
							'easy-testimonial-blocks'
						) }
						{ !! data?.items?.length && (
							<span className="etb-card__badge">
								{ data.items.length }
							</span>
						) }
					</>
				}
				action={
					<Button
						size="compact"
						icon={ update }
						label={ __( 'Refresh', 'easy-testimonial-blocks' ) }
						showTooltip
						className={ isLoading ? 'is-spinning' : undefined }
						disabled={ isLoading }
						accessibleWhenDisabled
						onClick={ reload }
					/>
				}
				className="etb-card--table"
			>
				<UsageTable
					items={ data?.items ?? [] }
					isLoading={ isFirstLoad }
					onNavigate={ onNavigate }
				/>
			</Card>
			<div className="etb-pair">
				<Checklist stats={ data?.stats } isLoading={ isFirstLoad } />
				<ComingNext />
			</div>
		</div>
	);
}
