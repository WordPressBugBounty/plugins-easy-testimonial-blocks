import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import metadata from './block.json';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import deprecated from './deprecated';
import icon from './icon';

/**
 * Block Registration
 */

registerBlockType( metadata, {
	icon: { src: icon },
	edit: Edit,
	save: Save,
	deprecated,
} );
