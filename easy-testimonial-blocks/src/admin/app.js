import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { external } from '@wordpress/icons';

import { settings } from './data';
import Overview from './components/overview';
import Designs from './components/designs';
import Help from './components/help';

const TABS = [
	{
		name: 'overview',
		label: __( 'Overview', 'easy-testimonial-blocks' ),
		View: Overview,
	},
	{
		name: 'designs',
		label: __( 'Designs', 'easy-testimonial-blocks' ),
		View: Designs,
	},
	{
		name: 'help',
		label: __( 'Help', 'easy-testimonial-blocks' ),
		View: Help,
	},
];

// the active tab lives in the URL hash so it survives reloads and links
const tabFromHash = () => {
	const name = window.location.hash.replace( '#', '' );
	return TABS.some( ( tab ) => tab.name === name ) ? name : 'overview';
};

const Logo = () => (
	<span className="etb-logo" aria-hidden="true">
		<svg viewBox="0 0 24 24" width="22" height="22">
			<path
				fill="currentColor"
				d="M10.6 5c.4 0 .7.3.7.7 0 .2-.1.5-.5.7-1.8.9-3.9 4.2-3.9 6.2 3-.1 4.3 2.6 4.3 4.3 0 2-1.7 4.1-4.3 4.1-3.2 0-4.8-2.5-4.8-5.3C2.1 9.7 8.9 5 10.6 5zm10.8 0c.4 0 .7.3.7.7 0 .2-.1.5-.5.7-1.8.9-3.9 4.2-3.9 6.2 3-.1 4.3 2.6 4.3 4.3 0 2-1.7 4.1-4.3 4.1-3.2 0-4.8-2.5-4.8-5.3 0-6 6.8-10.7 8.5-10.7z"
			/>
		</svg>
	</span>
);

export default function App() {
	const [ activeTab, setActiveTab ] = useState( tabFromHash );

	useEffect( () => {
		const onHashChange = () => setActiveTab( tabFromHash() );
		window.addEventListener( 'hashchange', onHashChange );
		return () => window.removeEventListener( 'hashchange', onHashChange );
	}, [] );

	const navigate = ( name ) => {
		window.location.hash = name;
		window.scrollTo( { top: 0, behavior: 'smooth' } );
	};

	const { View } = TABS.find( ( tab ) => tab.name === activeTab );

	return (
		<div className="etb-dash">
			<header className="etb-topbar">
				<div className="etb-topbar__inner">
					<div className="etb-brand">
						<Logo />
						<span className="etb-brand__name">
							{ __(
								'Testimonial Blocks',
								'easy-testimonial-blocks'
							) }
						</span>
						<span className="etb-brand__version">
							{ settings.version }
						</span>
					</div>
					<nav
						className="etb-tabs"
						aria-label={ __(
							'Dashboard sections',
							'easy-testimonial-blocks'
						) }
					>
						{ TABS.map( ( tab ) => (
							<a
								key={ tab.name }
								href={ `#${ tab.name }` }
								className={
									'etb-tabs__item' +
									( tab.name === activeTab
										? ' is-active'
										: '' )
								}
								aria-current={
									tab.name === activeTab ? 'page' : undefined
								}
							>
								{ tab.label }
							</a>
						) ) }
					</nav>
					<Button
						className="etb-topbar__link"
						variant="tertiary"
						href={ settings.reviewUrl }
						target="_blank"
						rel="noreferrer"
						icon={ external }
						iconPosition="right"
						iconSize={ 16 }
					>
						{ __( 'Rate the plugin', 'easy-testimonial-blocks' ) }
					</Button>
				</div>
			</header>
			<main className="etb-main">
				<View onNavigate={ navigate } />
			</main>
		</div>
	);
}
