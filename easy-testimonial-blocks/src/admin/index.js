/**
 * Easy Testimonial Blocks — admin dashboard ( Settings → Testimonial Blocks ).
 */
import { createRoot } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

import App from './app';
import './style.scss';

domReady( () => {
	const root = document.getElementById( 'etb-dashboard' );
	if ( root ) {
		createRoot( root ).render( <App /> );
	}
} );
