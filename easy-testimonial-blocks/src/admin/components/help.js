import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import {
	Icon,
	plus,
	layout,
	pencil,
	published,
	lifesaver,
	commentContent,
	starFilled,
	external,
	arrowRight,
	info,
} from '@wordpress/icons';

import { settings } from '../data';
import { Card } from './ui';

const STEPS = [
	{
		icon: plus,
		title: __( 'Insert the block', 'easy-testimonial-blocks' ),
		text: __(
			'In any page or post, click + and search for “Testimonial Grid”.',
			'easy-testimonial-blocks'
		),
	},
	{
		icon: layout,
		title: __( 'Pick a design', 'easy-testimonial-blocks' ),
		text: __(
			'Choose one of the ready-made sections, or start with blank cards.',
			'easy-testimonial-blocks'
		),
	},
	{
		icon: pencil,
		title: __( 'Make it yours', 'easy-testimonial-blocks' ),
		text: __(
			'Click any text to edit it, add photos and set the star ratings.',
			'easy-testimonial-blocks'
		),
	},
	{
		icon: published,
		title: __( 'Publish', 'easy-testimonial-blocks' ),
		text: __(
			'Fine-tune colors and columns in the sidebar, then publish.',
			'easy-testimonial-blocks'
		),
	},
];

const WHATS_NEW = [
	__(
		'12 new card designs, hover effects and custom shadows',
		'easy-testimonial-blocks'
	),
	__( 'A brand-new dashboard', 'easy-testimonial-blocks' ),
	__(
		'Design picker when you insert the Testimonial Grid',
		'easy-testimonial-blocks'
	),
	__( '13 ready-made testimonial patterns', 'easy-testimonial-blocks' ),
	__(
		'Section background, text color, padding and margin controls',
		'easy-testimonial-blocks'
	),
];

const TIPS = [
	__(
		'Use the device icons next to a setting to give tablet and mobile their own columns, gaps and font sizes.',
		'easy-testimonial-blocks'
	),
	__(
		'Set “Reviewer Name Tag” to a paragraph or H3 to keep your page’s heading structure clean for SEO.',
		'easy-testimonial-blocks'
	),
	__(
		'Change the whole section’s background, padding and margin from the block’s Styles tab.',
		'easy-testimonial-blocks'
	),
];

const QuickStart = ( { onNavigate } ) => (
	<section className="etb-quickstart">
		<div className="etb-quickstart__header">
			<div>
				<h2>{ __( 'Quick start', 'easy-testimonial-blocks' ) }</h2>
				<p>
					{ __(
						'Your first testimonials section, live in four steps.',
						'easy-testimonial-blocks'
					) }
				</p>
			</div>
			{ settings.canEditPages && (
				<Button
					variant="primary"
					icon={ arrowRight }
					iconPosition="right"
					onClick={ () => onNavigate( 'designs' ) }
				>
					{ __( 'Start with a design', 'easy-testimonial-blocks' ) }
				</Button>
			) }
		</div>
		<ol className="etb-steps">
			{ STEPS.map( ( step, index ) => (
				<li key={ step.title } className="etb-step">
					<span className="etb-step__badge">
						<Icon icon={ step.icon } size={ 22 } />
						<span className="etb-step__number">{ index + 1 }</span>
					</span>
					<h3>{ step.title }</h3>
					<p>{ step.text }</p>
				</li>
			) ) }
		</ol>
	</section>
);

// the video loads only after a click, so YouTube isn't contacted otherwise
const Video = () => {
	const [ isPlaying, setIsPlaying ] = useState( false );

	if ( isPlaying ) {
		return (
			<div className="etb-video">
				<iframe
					src={ `https://www.youtube-nocookie.com/embed/${ settings.videoId }?autoplay=1&rel=0` }
					title={ __(
						'Easy Testimonial Blocks video tutorial',
						'easy-testimonial-blocks'
					) }
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		);
	}

	return (
		<button
			type="button"
			className="etb-video etb-video--poster"
			onClick={ () => setIsPlaying( true ) }
			style={ {
				'--etb-poster': `url(${ settings.imagesUrl }patterns/three-cards.webp)`,
			} }
		>
			<span className="etb-video__play" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="30" height="30">
					<path d="M8 5v14l11-7z" fill="currentColor" />
				</svg>
			</span>
			<span className="etb-video__label">
				{ __( 'Play the video tutorial', 'easy-testimonial-blocks' ) }
			</span>
			<span className="etb-video__note">
				{ __(
					'Loads from YouTube when you press play.',
					'easy-testimonial-blocks'
				) }
			</span>
		</button>
	);
};

const WhatsNew = () => (
	<Card
		title={ __( 'What’s new', 'easy-testimonial-blocks' ) }
		action={
			<span className="etb-version-tag">
				{ sprintf(
					/* translators: %s: plugin version */
					__( 'Version %s', 'easy-testimonial-blocks' ),
					settings.version
				) }
			</span>
		}
		className="etb-whatsnew-card"
	>
		<ul className="etb-timeline">
			{ WHATS_NEW.map( ( item ) => (
				<li key={ item }>{ item }</li>
			) ) }
		</ul>
		<Button
			variant="link"
			href="https://wordpress.org/plugins/easy-testimonial-blocks/#developers"
			target="_blank"
			rel="noreferrer"
			icon={ external }
			iconPosition="right"
			iconSize={ 16 }
		>
			{ __( 'Full changelog', 'easy-testimonial-blocks' ) }
		</Button>
	</Card>
);

const Tips = () => (
	<Card
		title={ __( 'Did you know?', 'easy-testimonial-blocks' ) }
		className="etb-tips-card"
	>
		<ul className="etb-tips">
			{ TIPS.map( ( tip ) => (
				<li key={ tip }>
					<Icon icon={ info } size={ 18 } />
					<span>{ tip }</span>
				</li>
			) ) }
		</ul>
	</Card>
);

const SupportCard = ( { icon, tone, title, text, label, href } ) => (
	<a
		className={ `etb-support-card is-${ tone }` }
		href={ href }
		target="_blank"
		rel="noreferrer"
	>
		<span className="etb-support-card__icon">
			<Icon icon={ icon } size={ 24 } />
		</span>
		<h3>{ title }</h3>
		<p>{ text }</p>
		<span className="etb-support-card__link">
			{ label }
			<Icon icon={ external } size={ 16 } />
			<span className="screen-reader-text">
				{ __( '(opens in a new tab)', 'easy-testimonial-blocks' ) }
			</span>
		</span>
	</a>
);

export default function Help( { onNavigate } ) {
	return (
		<div className="etb-view">
			<div className="etb-view__intro">
				<h2>{ __( 'Help & resources', 'easy-testimonial-blocks' ) }</h2>
				<p>
					{ __(
						'Everything you need to get the most out of Testimonial Blocks, from your first section to getting support.',
						'easy-testimonial-blocks'
					) }
				</p>
			</div>

			<QuickStart onNavigate={ onNavigate } />

			<div className="etb-media-row">
				<Card
					title={ __( 'Video tutorial', 'easy-testimonial-blocks' ) }
					className="etb-video-card"
				>
					<Video />
				</Card>
				<div className="etb-media-side">
					<WhatsNew />
					<Tips />
				</div>
			</div>

			<div>
				<h2 className="etb-section-title">
					{ __( 'Need a hand?', 'easy-testimonial-blocks' ) }
				</h2>
				<div className="etb-support-grid">
					<SupportCard
						icon={ lifesaver }
						tone="blue"
						title={ __( 'Get support', 'easy-testimonial-blocks' ) }
						text={ __(
							'Found a bug or stuck on something? Ask in the support forum and get a reply.',
							'easy-testimonial-blocks'
						) }
						label={ __(
							'Open the support forum',
							'easy-testimonial-blocks'
						) }
						href={ settings.supportUrl }
					/>
					<SupportCard
						icon={ commentContent }
						tone="violet"
						title={ __(
							'Request a feature',
							'easy-testimonial-blocks'
						) }
						text={ __(
							'Tell us what would make collecting and showing testimonials easier for you.',
							'easy-testimonial-blocks'
						) }
						label={ __(
							'Share an idea',
							'easy-testimonial-blocks'
						) }
						href={ settings.supportUrl }
					/>
					<SupportCard
						icon={ starFilled }
						tone="amber"
						title={ __(
							'Enjoying the plugin?',
							'easy-testimonial-blocks'
						) }
						text={ __(
							'A quick review takes a minute and helps other people find the plugin.',
							'easy-testimonial-blocks'
						) }
						label={ __(
							'Leave a review',
							'easy-testimonial-blocks'
						) }
						href={ settings.reviewUrl }
					/>
				</div>
			</div>
		</div>
	);
}
