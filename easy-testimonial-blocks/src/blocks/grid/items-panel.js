import { __, sprintf } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { store as editorStore } from '@wordpress/editor';
import { createBlock } from '@wordpress/blocks';
import {
	Button,
	DropdownMenu,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';
import { SVG, Path } from '@wordpress/primitives';

// core icon paths, so the panel matches the editor's own controls
const coreIcon = ( d ) => (
	<SVG
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
	>
		<Path d={ d } />
	</SVG>
);
const plusIcon = coreIcon(
	'M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z'
);
const upIcon = coreIcon(
	'M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z'
);
const downIcon = coreIcon(
	'M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z'
);
const moreIcon = coreIcon( 'M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z' );
const starIcon = coreIcon(
	'M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z'
);

// reviewer fields are rich text; the list shows them as plain text
const toText = ( html = '' ) =>
	new window.DOMParser().parseFromString( html, 'text/html' ).body
		.textContent || '';

const initials = ( name ) =>
	name
		.split( /\s+/ )
		.filter( Boolean )
		.slice( 0, 2 )
		.map( ( part ) => part[ 0 ].toUpperCase() )
		.join( '' );

// the card's element in the editor canvas ( iframed or not )
const getBlockNode = ( clientId ) => {
	const canvas = document.querySelector( 'iframe[name="editor-canvas"]' );
	return ( canvas?.contentDocument || document ).getElementById(
		`block-${ clientId }`
	);
};

// outline the card a row points at, scrolling it into view when hidden
const locate = ( clientId ) => {
	const node = getBlockNode( clientId );
	if ( ! node ) {
		return;
	}
	node.classList.add( 'etb-is-located' );
	const rect = node.getBoundingClientRect();
	if (
		rect.bottom < 0 ||
		rect.top > node.ownerDocument.defaultView.innerHeight
	) {
		node.scrollIntoView( { block: 'center' } );
	}
};

const unlocate = ( clientId ) =>
	getBlockNode( clientId )?.classList.remove( 'etb-is-located' );

const ItemRow = ( { item, index, count, actions } ) => {
	const {
		reviewerName,
		reviewerTitle,
		reviewerCompany,
		photo,
		showRating,
		rating = 5,
	} = item.attributes;
	const name = toText( reviewerName ).trim();
	const role = [ toText( reviewerTitle ), toText( reviewerCompany ) ]
		.map( ( part ) => part.trim() )
		.filter( Boolean )
		.join( ' · ' );
	const label =
		name ||
		sprintf(
			/* translators: %d: position of the testimonial in the grid */
			__( 'Testimonial %d', 'easy-testimonial-blocks' ),
			index + 1
		);
	const stars = Math.round( rating );

	return (
		<li
			className="etb-items__item"
			onMouseEnter={ () => locate( item.clientId ) }
			onMouseLeave={ () => unlocate( item.clientId ) }
		>
			{ count > 1 && (
				<span className="etb-items__mover">
					<Button
						size="small"
						icon={ upIcon }
						label={ __( 'Move up', 'easy-testimonial-blocks' ) }
						disabled={ index === 0 }
						accessibleWhenDisabled
						onClick={ () => actions.moveUp( item.clientId ) }
					/>
					<Button
						size="small"
						icon={ downIcon }
						label={ __( 'Move down', 'easy-testimonial-blocks' ) }
						disabled={ index === count - 1 }
						accessibleWhenDisabled
						onClick={ () => actions.moveDown( item.clientId ) }
					/>
				</span>
			) }

			<span className="etb-items__body">
				<button
					type="button"
					className="etb-items__select"
					onClick={ () => actions.edit( item.clientId ) }
					aria-label={ sprintf(
						/* translators: %s: reviewer name or "Testimonial 2" */
						__( 'Edit %s', 'easy-testimonial-blocks' ),
						label
					) }
				>
					<span className="etb-items__avatar" aria-hidden="true">
						{ photo?.url ? (
							<img src={ photo.url } alt="" />
						) : (
							initials( name ) || index + 1
						) }
					</span>
					<span className="etb-items__text">
						<span
							className={
								'etb-items__name' +
								( name ? '' : ' is-placeholder' )
							}
						>
							{ label }
						</span>
						{ role && (
							<span className="etb-items__role">{ role }</span>
						) }
					</span>
				</button>

				{ showRating !== false && (
					<span
						className="etb-items__stars"
						role="group"
						aria-label={ __( 'Rating', 'easy-testimonial-blocks' ) }
					>
						{ [ 1, 2, 3, 4, 5 ].map( ( star ) => (
							<button
								key={ star }
								type="button"
								className={
									'etb-items__star' +
									( star <= stars ? ' is-on' : '' )
								}
								aria-pressed={ star === stars }
								aria-label={ sprintf(
									/* translators: %d: number of stars */
									__( '%d stars', 'easy-testimonial-blocks' ),
									star
								) }
								onClick={ () =>
									actions.update( item.clientId, {
										rating: star,
									} )
								}
							>
								{ starIcon }
							</button>
						) ) }
					</span>
				) }
			</span>

			<DropdownMenu
				className="etb-items__menu"
				icon={ moreIcon }
				label={ sprintf(
					/* translators: %s: reviewer name */
					__( 'Options for %s', 'easy-testimonial-blocks' ),
					label
				) }
				toggleProps={ { size: 'small' } }
				popoverProps={ { placement: 'bottom-end' } }
			>
				{ ( { onClose } ) => (
					<>
						<MenuGroup>
							<MenuItem
								onClick={ () => {
									actions.duplicate( item.clientId );
									onClose();
								} }
							>
								{ __( 'Duplicate', 'easy-testimonial-blocks' ) }
							</MenuItem>
							<MenuItem
								onClick={ () => {
									actions.update( item.clientId, {
										showRating: showRating === false,
									} );
									onClose();
								} }
							>
								{ showRating === false
									? __(
											'Show rating',
											'easy-testimonial-blocks'
									  )
									: __(
											'Hide rating',
											'easy-testimonial-blocks'
									  ) }
							</MenuItem>
						</MenuGroup>
						<MenuGroup>
							<MenuItem
								isDestructive
								onClick={ () => {
									actions.remove( item.clientId, label );
									onClose();
								} }
							>
								{ __( 'Delete', 'easy-testimonial-blocks' ) }
							</MenuItem>
						</MenuGroup>
					</>
				) }
			</DropdownMenu>
		</li>
	);
};

/**
 * Manages the grid's testimonials from the sidebar: edit, reorder, rate,
 * duplicate and delete, and point at the matching card in the canvas.
 *
 * @param {Object} props          Component props.
 * @param {string} props.clientId Client id of the grid block.
 */
export default function ItemsPanelContent( { clientId } ) {
	const items = useSelect(
		( select ) => select( blockEditorStore ).getBlocks( clientId ),
		[ clientId ]
	);
	const {
		selectBlock,
		insertBlock,
		moveBlocksUp,
		moveBlocksDown,
		duplicateBlocks,
		removeBlock,
		updateBlockAttributes,
	} = useDispatch( blockEditorStore );
	const { undo } = useDispatch( editorStore );
	const { createNotice } = useDispatch( 'core/notices' );

	// clear any canvas outline left behind when the list changes or closes
	useEffect(
		() => () => items.forEach( ( item ) => unlocate( item.clientId ) ),
		[ items ]
	);

	const actions = {
		edit: ( id ) => {
			unlocate( id );
			selectBlock( id );
		},
		update: ( id, attributes ) => updateBlockAttributes( id, attributes ),
		moveUp: ( id ) => moveBlocksUp( [ id ], clientId ),
		moveDown: ( id ) => moveBlocksDown( [ id ], clientId ),
		duplicate: ( id ) => duplicateBlocks( [ id ], false ),
		remove: ( id, label ) => {
			unlocate( id );
			removeBlock( id, false );
			createNotice(
				'info',
				sprintf(
					/* translators: %s: reviewer name */
					__( '“%s” deleted.', 'easy-testimonial-blocks' ),
					label
				),
				{
					type: 'snackbar',
					actions: [
						{
							label: __( 'Undo', 'easy-testimonial-blocks' ),
							onClick: () => undo(),
						},
					],
				}
			);
		},
	};

	return (
		<div className="etb-items">
			{ items.length > 0 ? (
				<ol className="etb-items__list">
					{ items.map( ( item, index ) => (
						<ItemRow
							key={ item.clientId }
							item={ item }
							index={ index }
							count={ items.length }
							actions={ actions }
						/>
					) ) }
				</ol>
			) : (
				<p className="etb-items__empty">
					{ __( 'No testimonials yet.', 'easy-testimonial-blocks' ) }
				</p>
			) }
			<Button
				variant="secondary"
				icon={ plusIcon }
				className="etb-items__add"
				onClick={ () =>
					// appended and selected, ready to type in
					insertBlock(
						createBlock( 'etb/grid-item' ),
						items.length,
						clientId
					)
				}
			>
				{ __( 'Add new', 'easy-testimonial-blocks' ) }
			</Button>
		</div>
	);
}
