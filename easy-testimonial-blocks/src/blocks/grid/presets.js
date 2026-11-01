/**
 * Card design presets for the Testimonial Grid.
 *
 * Choosing a preset writes regular style attributes ( colors, sizes,
 * padding … ) so every value stays editable in the sidebar, and adds an
 * `etb-preset-{slug}` class for what attributes can't express ( layout,
 * gradients, decorative details — see presets.scss ).
 */
import { __ } from '@wordpress/i18n';

import metadata from './block.json';

// attributes a preset owns; they reset to their defaults before a preset applies
const STYLE_KEYS = [
	'showIcon',
	'icon',
	'iconSizes',
	'iconColor',
	'iconOpacity',
	'showNumericalRating',
	'ratingColor',
	'ttmFontSizes',
	'ttmFontColor',
	'ttmAlign',
	'photoSizes',
	'photoBorder',
	'photoBorderRadius',
	'infoAlign',
	'nameFontSizes',
	'nameFontColor',
	'titleFontSizes',
	'titleFontColor',
	'companyFontSizes',
	'companyFontColor',
	'containerBorder',
	'containerBorderRadius',
	'containerPadding',
	'enableBoxShadow',
	'customShadow',
	'containerBg',
	'accentColor',
];

const NO_BORDER = { width: 0, style: 'solid', color: '' };
const NO_PHOTO_BORDER = { width: '0px', style: 'solid', color: '' };
const border = ( color, width = '1px' ) => ( { width, style: 'solid', color } );
const sizes = ( desktop, tablet, mobile ) => ( { desktop, tablet, mobile } );
const box = ( top, right, bottom, left ) => ( {
	top: `${ top }px`,
	right: `${ right }px`,
	bottom: `${ bottom }px`,
	left: `${ left }px`,
} );

// shared modern baseline: generous spacing, calm type, no numeric rating
const MODERN = {
	containerPadding: sizes( 32, 28, 24 ),
	containerBorderRadius: 16,
	containerBorder: NO_BORDER,
	enableBoxShadow: false,
	iconSizes: sizes( 36, 32, 28 ),
	iconColor: '#4f46e5',
	iconOpacity: 1,
	showNumericalRating: false,
	ratingColor: '#f59e0b',
	ttmFontSizes: sizes( 17, 16, 16 ),
	ttmFontColor: '#334155',
	photoSizes: sizes( 48, 44, 40 ),
	photoBorder: NO_PHOTO_BORDER,
	nameFontSizes: sizes( 16, 16, 15 ),
	nameFontColor: '#0f172a',
	titleFontSizes: sizes( 14, 13, 13 ),
	titleFontColor: '#64748b',
	companyFontSizes: sizes( 14, 13, 13 ),
	companyFontColor: '#64748b',
};

const ON_COLOR = {
	ttmFontColor: '#ffffff',
	nameFontColor: '#ffffff',
	titleFontColor: 'rgba(255,255,255,0.75)',
	companyFontColor: 'rgba(255,255,255,0.75)',
	iconColor: '#ffffff',
	ratingColor: '#fde68a',
};

export const PRESETS = [
	{
		slug: 'classic',
		label: __( 'Classic', 'easy-testimonial-blocks' ),
		attributes: {},
	},
	{
		slug: 'elevated',
		label: __( 'Elevated', 'easy-testimonial-blocks' ),
		attributes: {
			...MODERN,
			containerBg: '#ffffff',
			enableBoxShadow: true,
			iconSizes: sizes( 44, 40, 36 ),
			iconOpacity: 0.16,
		},
	},
	{
		slug: 'outline',
		label: __( 'Outline', 'easy-testimonial-blocks' ),
		// what the accent color changes in this design
		accent: __(
			'Tints the quote icon tile and the card border on hover.',
			'easy-testimonial-blocks'
		),
		attributes: {
			...MODERN,
			containerBg: '#ffffff',
			containerBorder: border( '#e2e8f0' ),
			containerBorderRadius: 14,
			iconSizes: sizes( 22, 22, 20 ),
		},
	},
	{
		slug: 'minimal',
		label: __( 'Minimal', 'easy-testimonial-blocks' ),
		// what the accent color changes in this design
		accent: __(
			'Colors the line across the top of each card.',
			'easy-testimonial-blocks'
		),
		attributes: {
			...MODERN,
			containerBg: '',
			containerPadding: box( 28, 0, 8, 0 ),
			containerBorderRadius: 0,
			showIcon: false,
			ttmFontSizes: sizes( 19, 18, 17 ),
			ttmFontColor: '#0f172a',
			photoSizes: sizes( 40, 40, 36 ),
		},
	},
	{
		slug: 'bubble',
		label: __( 'Speech bubble', 'easy-testimonial-blocks' ),
		attributes: {
			...MODERN,
			containerBg: '',
			containerPadding: box( 0, 0, 0, 0 ),
			containerBorderRadius: 0,
			iconSizes: sizes( 30, 28, 26 ),
			iconOpacity: 0.9,
		},
	},
	{
		slug: 'spotlight',
		label: __( 'Spotlight', 'easy-testimonial-blocks' ),
		// what the accent color changes in this design
		accent: __(
			'Colors the ring around the reviewer photo.',
			'easy-testimonial-blocks'
		),
		attributes: {
			...MODERN,
			containerBg: '#ffffff',
			enableBoxShadow: true,
			containerPadding: sizes( 40, 32, 28 ),
			showIcon: false,
			ttmAlign: 'center',
			infoAlign: 'center',
			photoSizes: sizes( 72, 64, 60 ),
			photoBorder: border( '#ffffff', '4px' ),
		},
	},
	{
		slug: 'midnight',
		label: __( 'Midnight', 'easy-testimonial-blocks' ),
		// what the accent color changes in this design
		accent: __(
			'Colors the glow in the card corner.',
			'easy-testimonial-blocks'
		),
		attributes: {
			...MODERN,
			containerBg: '#0f172a',
			containerBorder: border( '#1e293b' ),
			ttmFontColor: '#cbd5e1',
			nameFontColor: '#f8fafc',
			titleFontColor: '#94a3b8',
			companyFontColor: '#94a3b8',
			iconColor: '#818cf8',
			ratingColor: '#fbbf24',
		},
	},
	{
		slug: 'aurora',
		label: __( 'Aurora', 'easy-testimonial-blocks' ),
		// what the accent color changes in this design
		accent: __(
			'Sets the start color of the card gradient.',
			'easy-testimonial-blocks'
		),
		attributes: {
			...MODERN,
			...ON_COLOR,
			containerBg: '',
			containerBorderRadius: 20,
			iconOpacity: 0.4,
			photoBorder: border( 'rgba(255,255,255,0.7)', '2px' ),
		},
	},
	{
		slug: 'glass',
		label: __( 'Glass', 'easy-testimonial-blocks' ),
		// what the accent color changes in this design
		accent: __(
			'Sets the color of the backdrop behind the cards.',
			'easy-testimonial-blocks'
		),
		attributes: {
			...MODERN,
			...ON_COLOR,
			containerBg: '',
			containerBorder: border( 'rgba(255,255,255,0.35)' ),
			containerBorderRadius: 18,
			iconOpacity: 0.5,
			photoBorder: border( 'rgba(255,255,255,0.6)', '2px' ),
		},
	},
	{
		slug: 'stripe',
		label: __( 'Accent stripe', 'easy-testimonial-blocks' ),
		// what the accent color changes in this design
		accent: __(
			'Colors the bar across the top of each card.',
			'easy-testimonial-blocks'
		),
		attributes: {
			...MODERN,
			containerBg: '#ffffff',
			enableBoxShadow: true,
			containerBorderRadius: 12,
			containerPadding: sizes( 36, 30, 26 ),
			iconSizes: sizes( 64, 56, 48 ),
			iconOpacity: 0.1,
		},
	},
	{
		slug: 'editorial',
		label: __( 'Editorial', 'easy-testimonial-blocks' ),
		attributes: {
			...MODERN,
			containerBg: '#fffcf5',
			containerBorder: border( '#efe7d6' ),
			containerBorderRadius: 6,
			icon: 'one',
			iconColor: '#b45309',
			iconOpacity: 0.85,
			iconSizes: sizes( 34, 30, 28 ),
			ratingColor: '#b45309',
			ttmFontSizes: sizes( 20, 19, 18 ),
			ttmFontColor: '#292524',
			nameFontSizes: sizes( 13, 13, 12 ),
			nameFontColor: '#1c1917',
			titleFontColor: '#78716c',
			companyFontColor: '#78716c',
			photoSizes: sizes( 44, 40, 40 ),
		},
	},
	{
		slug: 'pastel',
		label: __( 'Pastel', 'easy-testimonial-blocks' ),
		attributes: {
			...MODERN,
			containerBg: '#eef2ff',
			containerBorderRadius: 24,
			iconColor: '#6366f1',
			iconOpacity: 0.9,
			photoBorder: border( '#ffffff', '3px' ),
		},
	},
	{
		slug: 'split',
		label: __( 'Side by side', 'easy-testimonial-blocks' ),
		attributes: {
			...MODERN,
			containerBg: '#ffffff',
			containerBorder: border( '#e2e8f0' ),
			infoAlign: 'center',
			photoSizes: sizes( 64, 56, 52 ),
			iconSizes: sizes( 28, 26, 24 ),
		},
	},
];

/**
 * Attributes to set when a preset is chosen: every preset-owned style
 * attribute back to its default, then the preset's own values.
 *
 * @param {string} slug Preset slug.
 * @return {Object} Attributes for setAttributes().
 */
export const getPresetAttributes = ( slug ) => {
	const preset =
		PRESETS.find( ( item ) => item.slug === slug ) ?? PRESETS[ 0 ];
	const defaults = Object.fromEntries(
		STYLE_KEYS.map( ( key ) => [
			key,
			metadata.attributes[ key ]?.default,
		] )
	);
	return { ...defaults, ...preset.attributes, preset: preset.slug };
};

// card hover effects; the slug becomes a `has-hover-{slug}` class
export const HOVER_STYLES = [
	{ value: 'none', label: __( 'None', 'easy-testimonial-blocks' ) },
	{ value: 'lift', label: __( 'Lift', 'easy-testimonial-blocks' ) },
	{ value: 'grow', label: __( 'Grow', 'easy-testimonial-blocks' ) },
	{ value: 'glow', label: __( 'Glow', 'easy-testimonial-blocks' ) },
	{
		value: 'border',
		label: __( 'Highlight border', 'easy-testimonial-blocks' ),
	},
	{
		value: 'focus',
		label: __( 'Focus (fade the others)', 'easy-testimonial-blocks' ),
	},
];

// wrapper class for a hover effect; unknown values add nothing
export const hoverClassName = ( style ) =>
	style !== 'none' && HOVER_STYLES.some( ( item ) => item.value === style )
		? `has-hover-${ style }`
		: '';

// what the accent color changes in a preset; empty when the preset ignores it
export const getAccentHint = ( slug ) =>
	PRESETS.find( ( item ) => item.slug === slug )?.accent ?? '';

// wrapper class for a preset; Classic ( the original look ) adds none
export const presetClassName = ( slug ) =>
	slug && slug !== 'classic' ? `etb-preset-${ slug }` : '';
