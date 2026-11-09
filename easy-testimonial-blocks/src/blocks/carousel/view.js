/**
 * Testimonial Carousel — frontend behavior.
 *
 * The track is a native CSS scroll-snap container, so swiping, trackpads and
 * keyboard scrolling work without this script. It adds the arrows, dots,
 * loop and autoplay ( paused on hover and focus, off for reduced motion ).
 */

const reducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' );

const init = ( root ) => {
	const track = root.querySelector( '.etb-carousel__track' );
	// control rows: below, above or beside the track ( arrow position setting )
	const controls = [ ...root.querySelectorAll( '.etb-carousel__controls' ) ];
	if ( ! track || ! controls.length || root.dataset.etbReady ) {
		return;
	}
	root.dataset.etbReady = 'true';

	const prev = root.querySelector( '.etb-carousel__arrow--prev' );
	const next = root.querySelector( '.etb-carousel__arrow--next' );
	const dotsWrap = root.querySelector( '.etb-carousel__dots' );
	const pauseButton = root.querySelector( '.etb-carousel__pause' );
	const loop = root.dataset.loop === 'true';
	// autoplay stays off for visitors who prefer reduced motion
	const delay = reducedMotion.matches
		? 0
		: Number( root.dataset.autoplay ) || 0;
	const i18n = JSON.parse( root.dataset.i18n || '{}' );
	const slides = [ ...track.children ];
	const rtl = window.getComputedStyle( track ).direction === 'rtl';

	slides.forEach( ( slide, i ) => {
		slide.setAttribute( 'role', 'group' );
		slide.setAttribute( 'aria-roledescription', i18n.slide || 'slide' );
		slide.setAttribute(
			'aria-label',
			( i18n.slideOf || '%1$d of %2$d' )
				.replace( '%1$d', i + 1 )
				.replace( '%2$d', slides.length )
		);
	} );

	// distance between two neighbouring slides
	const step = () =>
		slides[ 1 ]
			? Math.abs( slides[ 1 ].offsetLeft - slides[ 0 ].offsetLeft )
			: track.clientWidth;

	// last snap position ( slides per view can change with the screen )
	const lastIndex = () =>
		Math.max(
			0,
			Math.round( ( track.scrollWidth - track.clientWidth ) / step() )
		);

	const currentIndex = () =>
		Math.min(
			lastIndex(),
			Math.round( Math.abs( track.scrollLeft ) / step() )
		);

	const goTo = ( index ) => {
		const last = lastIndex();
		let target = index;
		if ( target > last ) {
			target = loop ? 0 : last;
		} else if ( target < 0 ) {
			target = loop ? last : 0;
		}
		track.scrollTo( {
			left: target * step() * ( rtl ? -1 : 1 ),
			behavior: reducedMotion.matches ? 'auto' : 'smooth',
		} );
	};

	let dots = [];
	let hasPages = false;
	const buildDots = () => {
		const count = lastIndex() + 1;
		hasPages = count > 1;
		controls.forEach( ( row ) => ( row.hidden = ! hasPages ) );
		if ( ! dotsWrap || dots.length === count ) {
			return;
		}
		dotsWrap.textContent = '';
		dots = Array.from( { length: count }, ( _, i ) => {
			const dot = document.createElement( 'button' );
			dot.type = 'button';
			dot.className = 'etb-carousel__dot';
			dot.setAttribute(
				'aria-label',
				( i18n.goTo || 'Go to slide %d' ).replace( '%d', i + 1 )
			);
			dot.addEventListener( 'click', () => goTo( i ) );
			dotsWrap.appendChild( dot );
			return dot;
		} );
	};

	const update = () => {
		const index = currentIndex();
		const last = lastIndex();
		dots.forEach( ( dot, i ) =>
			i === index
				? dot.setAttribute( 'aria-current', 'true' )
				: dot.removeAttribute( 'aria-current' )
		);
		if ( prev && next && ! loop ) {
			prev.disabled = index <= 0;
			next.disabled = index >= last;
		}
	};

	let frame;
	track.addEventListener(
		'scroll',
		() => {
			window.cancelAnimationFrame( frame );
			frame = window.requestAnimationFrame( update );
		},
		{ passive: true }
	);

	prev?.addEventListener( 'click', () => goTo( currentIndex() - 1 ) );
	next?.addEventListener( 'click', () => goTo( currentIndex() + 1 ) );

	// autoplay: stops while hovered or focused, and when the visitor pauses it
	let timer;
	let hovered = false;
	let focused = false;
	let paused = false;

	const sync = () => {
		window.clearInterval( timer );
		if ( delay && ! paused && ! hovered && ! focused && hasPages ) {
			timer = window.setInterval(
				() => goTo( currentIndex() + 1 ),
				delay
			);
		}
	};

	if ( delay ) {
		root.addEventListener( 'mouseenter', () => {
			hovered = true;
			sync();
		} );
		root.addEventListener( 'mouseleave', () => {
			hovered = false;
			sync();
		} );
		root.addEventListener( 'focusin', () => {
			focused = true;
			sync();
		} );
		root.addEventListener( 'focusout', ( event ) => {
			focused = root.contains( event.relatedTarget );
			sync();
		} );

		if ( pauseButton ) {
			pauseButton.hidden = false;
			pauseButton.addEventListener( 'click', () => {
				paused = ! paused;
				pauseButton.dataset.paused = String( paused );
				pauseButton.setAttribute(
					'aria-label',
					paused ? i18n.play || 'Play' : i18n.pause || 'Pause'
				);
				sync();
			} );
		}
	}

	const refresh = () => {
		buildDots();
		update();
		sync();
	};

	if ( window.ResizeObserver ) {
		new window.ResizeObserver( refresh ).observe( track );
	} else {
		window.addEventListener( 'resize', refresh );
	}
	refresh();
};

const initAll = () =>
	document.querySelectorAll( '.wp-block-etb-carousel' ).forEach( init );

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initAll );
} else {
	initAll();
}
