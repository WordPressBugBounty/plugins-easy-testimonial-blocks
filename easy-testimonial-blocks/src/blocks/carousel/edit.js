import { __, sprintf } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';

// dynamic editor styles
import getCarouselStyles from './get-carousel-styles';

// sidebar settings, shared with the grid ( only the Layout panel differs )
import Inspector from '../grid/inspector';
import { presetClassName, hoverClassName } from '../grid/presets';

import ColorControl from '../../utilities/components/colorcontrol/colorcontrol';
import SingleInput from '../../utilities/components/singleinput/singleinput';

// arrow icons, same paths as includes/carousel.php
export const chevronLeft = (
	<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
		<path d="M14.6 7l-1.2-1L8 12l5.4 6 1.2-1-4.6-5z" />
	</svg>
);
export const chevronRight = (
	<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
		<path d="M10.6 6L9.4 7l4.6 5-4.6 5 1.2 1 5.4-6z" />
	</svg>
);

// a new carousel starts with sample testimonials to edit
const TEMPLATE = [
	[
		'etb/grid-item',
		{
			testimonial: __(
				'Working with this team was the best decision we made this year. The results speak for themselves.',
				'easy-testimonial-blocks'
			),
			reviewerName: 'Sarah Mitchell',
			reviewerTitle: __(
				'Marketing Director',
				'easy-testimonial-blocks'
			),
			reviewerCompany: 'Brightline Studio',
			rating: 5,
		},
	],
	[
		'etb/grid-item',
		{
			testimonial: __(
				'Professional, responsive and genuinely invested in our success. Our conversion rate has doubled since launch.',
				'easy-testimonial-blocks'
			),
			reviewerName: 'David Okafor',
			reviewerTitle: __( 'Founder', 'easy-testimonial-blocks' ),
			reviewerCompany: 'Northpeak Consulting',
			rating: 5,
		},
	],
	[
		'etb/grid-item',
		{
			testimonial: __(
				'From the first call to the final handoff, everything felt effortless. I recommend them to everyone who asks.',
				'easy-testimonial-blocks'
			),
			reviewerName: 'Elena Rossi',
			reviewerTitle: __( 'Creative Director', 'easy-testimonial-blocks' ),
			reviewerCompany: 'Rossi Creative',
			rating: 4.8,
		},
	],
	[
		'etb/grid-item',
		{
			testimonial: __(
				'Clear communication, on-time delivery and a result our customers love. We will be back for the next project.',
				'easy-testimonial-blocks'
			),
			reviewerName: 'Marcus Lee',
			reviewerTitle: __( 'Head of Product', 'easy-testimonial-blocks' ),
			reviewerCompany: 'Fieldnote',
			rating: 5,
		},
	],
];

// the testimonial cards inside the track ( skips the block appender )
const getSlides = ( track ) =>
	track
		? [ ...track.querySelectorAll( ':scope > .wp-block-etb-grid-item' ) ]
		: [];

// distance between two neighbouring slides
const getStep = ( track ) => {
	const slides = getSlides( track );
	if ( ! slides.length ) {
		return 0;
	}
	return slides[ 1 ]
		? Math.abs( slides[ 1 ].offsetLeft - slides[ 0 ].offsetLeft )
		: track.clientWidth;
};

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		id,
		enableBoxShadow,
		customClases,
		preset,
		hoverStyle,
		customShadow,
		slidesPerView,
		slideGap,
		showArrows,
		arrowPosition,
		showDots,
		autoplay,
		autoplayDelay,
		showPauseButton,
		loop,
		navColor,
		navHoverColor,
	} = attributes;

	// active editor device preview ( Desktop | Tablet | Mobile )
	const deviceType = useSelect(
		( select ) => select( editorStore )?.getDeviceType?.() ?? 'Desktop',
		[]
	);

	const itemCount = useSelect(
		( select ) => select( blockEditorStore ).getBlockCount( clientId ),
		[ clientId ]
	);

	// another carousel in the editor already uses this id ( e.g. after duplicating )
	const isDuplicateId = useSelect(
		( select ) => {
			if ( ! id ) {
				return false;
			}
			const {
				getClientIdsWithDescendants,
				getBlockName,
				getBlockAttributes,
			} = select( blockEditorStore );
			return getClientIdsWithDescendants().some(
				( otherId ) =>
					otherId !== clientId &&
					getBlockName( otherId ) === 'etb/carousel' &&
					getBlockAttributes( otherId )?.id === id
			);
		},
		[ clientId, id ]
	);

	// assign a unique id once — only when missing or duplicated, so opening
	// a saved post never marks it as changed
	useEffect( () => {
		if ( ! id || isDuplicateId ) {
			setAttributes( { id: 'etb-carousel-' + clientId.slice( 0, 8 ) } );
		}
	}, [ id, isDuplicateId, clientId, setAttributes ] );

	// preview navigation: the arrows and dots scroll the track in the editor too
	const trackRef = useRef();
	const [ index, setIndex ] = useState( 0 );
	const device = deviceType?.toLowerCase() ?? 'desktop';
	const perView = Math.max( 1, slidesPerView?.[ device ] ?? 1 );
	const pageCount = Math.max( 1, itemCount - perView + 1 );

	const goTo = ( next ) => {
		const track = trackRef.current;
		const target = Math.min( Math.max( next, 0 ), pageCount - 1 );
		track?.scrollTo( {
			left: target * getStep( track ),
			behavior: 'smooth',
		} );
	};

	useEffect( () => {
		const track = trackRef.current;
		if ( ! track ) {
			return;
		}
		const onScroll = () => {
			const step = getStep( track );
			setIndex(
				step ? Math.round( Math.abs( track.scrollLeft ) / step ) : 0
			);
		};
		track.addEventListener( 'scroll', onScroll, { passive: true } );
		return () => track.removeEventListener( 'scroll', onScroll );
	}, [] );

	const blockProps = useBlockProps( {
		className: [
			id,
			presetClassName( preset ),
			enableBoxShadow ? 'has-box-shadow' : '',
			hoverClassName( hoverStyle ),
			enableBoxShadow && customShadow?.enabled ? 'has-custom-shadow' : '',
			customClases || '',
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'etb-carousel__track', ref: trackRef },
		{
			allowedBlocks: [ 'etb/grid-item' ],
			template: TEMPLATE,
			orientation: 'horizontal',
		}
	);

	const layoutPanel = (
		<>
			<SingleInput
				label={ __( 'Slides per view', 'easy-testimonial-blocks' ) }
				attribute={ slidesPerView }
				attributeName="slidesPerView"
				setAttributes={ setAttributes }
				min={ 1 }
				max={ 6 }
			/>
			<SingleInput
				label={ __( 'Gap', 'easy-testimonial-blocks' ) }
				attribute={ slideGap }
				attributeName="slideGap"
				setAttributes={ setAttributes }
				min={ 0 }
				max={ 120 }
			/>
			<ToggleControl
				label={ __( 'Arrows', 'easy-testimonial-blocks' ) }
				checked={ showArrows }
				onChange={ () => setAttributes( { showArrows: ! showArrows } ) }
				__nextHasNoMarginBottom
			/>
			{ showArrows && (
				<SelectControl
					label={ __( 'Arrow position', 'easy-testimonial-blocks' ) }
					value={ arrowPosition }
					options={ [
						{
							value: 'bottom',
							label: __( 'Below', 'easy-testimonial-blocks' ),
						},
						{
							value: 'sides',
							label: __( 'Sides', 'easy-testimonial-blocks' ),
						},
						{
							value: 'top',
							label: __( 'Top', 'easy-testimonial-blocks' ),
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { arrowPosition: value } )
					}
					__nextHasNoMarginBottom
				/>
			) }
			<ToggleControl
				label={ __( 'Dots', 'easy-testimonial-blocks' ) }
				checked={ showDots }
				onChange={ () => setAttributes( { showDots: ! showDots } ) }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Loop', 'easy-testimonial-blocks' ) }
				checked={ loop }
				onChange={ () => setAttributes( { loop: ! loop } ) }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Autoplay', 'easy-testimonial-blocks' ) }
				checked={ autoplay }
				onChange={ () => setAttributes( { autoplay: ! autoplay } ) }
				__nextHasNoMarginBottom
			/>
			{ autoplay && (
				<>
					<RangeControl
						label={ __(
							'Delay (seconds)',
							'easy-testimonial-blocks'
						) }
						value={ autoplayDelay }
						onChange={ ( value ) =>
							setAttributes( { autoplayDelay: value } )
						}
						min={ 2 }
						max={ 15 }
						step={ 0.5 }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __(
							'Pause button',
							'easy-testimonial-blocks'
						) }
						checked={ showPauseButton }
						onChange={ () =>
							setAttributes( {
								showPauseButton: ! showPauseButton,
							} )
						}
						__nextHasNoMarginBottom
					/>
				</>
			) }
			{ ( showArrows || showDots ) && (
				<ColorControl
					label={ __(
						'Navigation color',
						'easy-testimonial-blocks'
					) }
					colorValue={ navColor }
					colorName="navColor"
					setAttributes={ setAttributes }
				/>
			) }
			{ ( showArrows || showDots ) && (
				<ColorControl
					label={ __(
						'Navigation hover color',
						'easy-testimonial-blocks'
					) }
					colorValue={ navHoverColor }
					colorName="navHoverColor"
					setAttributes={ setAttributes }
				/>
			) }
		</>
	);

	const hasPages = pageCount > 1;
	const position = [ 'bottom', 'sides', 'top' ].includes( arrowPosition )
		? arrowPosition
		: 'bottom';
	const arrowsAt = ( where ) => hasPages && showArrows && position === where;

	const prevArrow = (
		<button
			type="button"
			className="etb-carousel__arrow etb-carousel__arrow--prev"
			aria-label={ __(
				'Previous testimonial',
				'easy-testimonial-blocks'
			) }
			disabled={ ! loop && index <= 0 }
			onClick={ () =>
				goTo( loop && index <= 0 ? pageCount - 1 : index - 1 )
			}
		>
			{ chevronLeft }
		</button>
	);
	const nextArrow = (
		<button
			type="button"
			className="etb-carousel__arrow etb-carousel__arrow--next"
			aria-label={ __( 'Next testimonial', 'easy-testimonial-blocks' ) }
			disabled={ ! loop && index >= pageCount - 1 }
			onClick={ () =>
				goTo( loop && index >= pageCount - 1 ? 0 : index + 1 )
			}
		>
			{ chevronRight }
		</button>
	);
	const dotsRow = hasPages && showDots && (
		<div className="etb-carousel__dots">
			{ Array.from( { length: pageCount } ).map( ( _, dot ) => (
				<button
					key={ dot }
					type="button"
					className="etb-carousel__dot"
					aria-label={ sprintf(
						/* translators: %d: slide number */
						__( 'Go to slide %d', 'easy-testimonial-blocks' ),
						dot + 1
					) }
					aria-current={ dot === index ? 'true' : undefined }
					onClick={ () => goTo( dot ) }
				/>
			) ) }
		</div>
	);

	return (
		<Fragment>
			<style
				dangerouslySetInnerHTML={ {
					__html: getCarouselStyles( attributes, deviceType ),
				} }
			/>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				clientId={ clientId }
				name="etb/carousel"
				layoutPanel={ layoutPanel }
			/>
			<div { ...blockProps }>
				{ arrowsAt( 'top' ) && (
					<div className="etb-carousel__controls etb-carousel__controls--top">
						{ prevArrow }
						{ nextArrow }
					</div>
				) }
				<div className="etb-carousel__viewport">
					<div { ...innerBlocksProps } />
					{ arrowsAt( 'sides' ) && (
						<div className="etb-carousel__controls etb-carousel__controls--sides">
							{ prevArrow }
							{ nextArrow }
						</div>
					) }
				</div>
				{ ( dotsRow || arrowsAt( 'bottom' ) ) && (
					<div className="etb-carousel__controls etb-carousel__controls--bottom">
						{ arrowsAt( 'bottom' ) && prevArrow }
						{ dotsRow }
						{ arrowsAt( 'bottom' ) && nextArrow }
					</div>
				) }
			</div>
		</Fragment>
	);
}
