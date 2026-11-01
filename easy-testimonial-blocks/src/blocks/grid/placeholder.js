import { __ } from '@wordpress/i18n';
import { useState, useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	BlockPreview,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { createBlock, cloneBlock, parse } from '@wordpress/blocks';
import { Placeholder, Button, Modal } from '@wordpress/components';

import icon from './icon';

// blocks the "Start blank" option creates ( the grid's former template )
const createBlankItems = () => [
	createBlock( 'etb/grid-item' ),
	createBlock( 'etb/grid-item' ),
];

// first etb/grid block inside a pattern, searched depth first
const findGrid = ( blocks ) => {
	for ( const block of blocks ) {
		if ( block.name === 'etb/grid' ) {
			return block;
		}
		const inner = findGrid( block.innerBlocks );
		if ( inner ) {
			return inner;
		}
	}
	return null;
};

const PatternOption = ( { pattern, onSelect } ) => (
	<div
		className="etb-pattern-picker__item"
		role="option"
		aria-selected="false"
		tabIndex={ 0 }
		aria-label={ pattern.title }
		onClick={ () => onSelect( pattern ) }
		onKeyDown={ ( event ) => {
			if ( event.key === 'Enter' || event.key === ' ' ) {
				event.preventDefault();
				onSelect( pattern );
			}
		} }
	>
		<div className="etb-pattern-picker__preview">
			<BlockPreview blocks={ pattern.blocks } viewportWidth={ 1400 } />
		</div>
		<div className="etb-pattern-picker__title">{ pattern.title }</div>
	</div>
);

/**
 * Shown while a grid has no testimonials: offers the bundled patterns in a
 * modal, or a blank grid with two empty testimonials.
 *
 * A top-level grid is replaced by the full pattern ( heading and section
 * background ); a nested grid ( e.g. inside a column ) only takes the
 * pattern's testimonial grid so it doesn't pull a full-width section into
 * its parent.
 *
 * @param {Object} props          Component props.
 * @param {string} props.clientId Client id of the empty grid.
 */
export default function GridPlaceholder( { clientId } ) {
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	const { rawPatterns, isNested } = useSelect(
		( select ) => {
			const { getBlockRootClientId, getPatternsByBlockTypes } =
				select( blockEditorStore );
			const rootClientId = getBlockRootClientId( clientId );
			return {
				rawPatterns: getPatternsByBlockTypes(
					'etb/grid',
					rootClientId
				),
				isNested: !! rootClientId,
			};
		},
		[ clientId ]
	);

	const patterns = useMemo(
		() =>
			rawPatterns
				.filter( ( pattern ) =>
					pattern.name.startsWith( 'easy-testimonial-blocks/' )
				)
				.map( ( pattern ) => ( {
					...pattern,
					blocks: pattern.blocks?.length
						? pattern.blocks
						: parse( pattern.content ),
				} ) ),
		[ rawPatterns ]
	);

	const { replaceBlocks, replaceInnerBlocks } =
		useDispatch( blockEditorStore );

	const onSelectPattern = ( pattern ) => {
		let blocks = pattern.blocks;
		if ( isNested ) {
			const grid = findGrid( blocks );
			blocks = grid ? [ grid ] : blocks;
		}
		replaceBlocks(
			clientId,
			blocks.map( ( block ) => cloneBlock( block ) )
		);
	};

	return (
		<Placeholder
			className="etb-grid-placeholder"
			icon={ icon }
			label={ __( 'Testimonial Grid', 'easy-testimonial-blocks' ) }
			instructions={ __(
				'Start with a ready-made testimonial design, or build your own from blank cards.',
				'easy-testimonial-blocks'
			) }
		>
			{ patterns.length > 0 && (
				<Button
					variant="primary"
					onClick={ () => setIsModalOpen( true ) }
				>
					{ __( 'Choose a design', 'easy-testimonial-blocks' ) }
				</Button>
			) }
			<Button
				variant="secondary"
				onClick={ () =>
					replaceInnerBlocks( clientId, createBlankItems(), false )
				}
			>
				{ __( 'Start blank', 'easy-testimonial-blocks' ) }
			</Button>
			{ isModalOpen && (
				<Modal
					className="etb-pattern-picker"
					title={ __(
						'Choose a testimonial design',
						'easy-testimonial-blocks'
					) }
					onRequestClose={ () => setIsModalOpen( false ) }
					isFullScreen
				>
					<p className="etb-pattern-picker__intro">
						{ isNested
							? __(
									'The testimonial cards from the design you pick replace this grid. Everything stays editable.',
									'easy-testimonial-blocks'
							  )
							: __(
									'The design you pick replaces this grid with a full section. Everything stays editable.',
									'easy-testimonial-blocks'
							  ) }
					</p>
					<div
						className="etb-pattern-picker__list"
						role="listbox"
						aria-label={ __(
							'Testimonial designs',
							'easy-testimonial-blocks'
						) }
					>
						{ patterns.map( ( pattern ) => (
							<PatternOption
								key={ pattern.name }
								pattern={ pattern }
								onSelect={ onSelectPattern }
							/>
						) ) }
					</div>
				</Modal>
			) }
		</Placeholder>
	);
}
