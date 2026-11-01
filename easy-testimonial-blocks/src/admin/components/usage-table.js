import { __, _n, sprintf } from '@wordpress/i18n';
import { useState, useMemo, useEffect } from '@wordpress/element';
import { Button, SearchControl } from '@wordpress/components';
import {
	Icon,
	page,
	post,
	symbol,
	layout,
	quote,
	external,
	chevronUp,
	chevronDown,
	chevronLeft,
	chevronRight,
} from '@wordpress/icons';

import { Pill, Stars, Skeleton } from './ui';

const PAGE_SIZE = 8;

const STATUS_TONES = {
	publish: 'success',
	draft: 'warning',
	pending: 'warning',
	future: 'info',
	private: 'neutral',
};

const TYPE_ICONS = {
	page,
	post,
	wp_block: symbol,
	wp_template: layout,
	wp_template_part: layout,
};

const COLUMNS = [
	{ key: 'title', label: __( 'Content', 'easy-testimonial-blocks' ) },
	{ key: 'status', label: __( 'Status', 'easy-testimonial-blocks' ) },
	{
		key: 'averageRating',
		label: __( 'Rating', 'easy-testimonial-blocks' ),
	},
	{
		key: 'testimonials',
		label: __( 'Testimonials', 'easy-testimonial-blocks' ),
		isNumeric: true,
	},
	{ key: 'modifiedTime', label: __( 'Updated', 'easy-testimonial-blocks' ) },
];

// sort comparators; missing ratings always sort last
const compare = ( key ) => ( a, b ) => {
	if ( key === 'title' || key === 'status' ) {
		const field = key === 'status' ? 'statusLabel' : 'title';
		return a[ field ].localeCompare( b[ field ] );
	}
	return ( a[ key ] ?? -1 ) - ( b[ key ] ?? -1 );
};

const SortHeader = ( { column, sort, onSort } ) => {
	const isActive = sort.key === column.key;
	let ariaSort = 'none';
	if ( isActive ) {
		ariaSort = sort.direction === 'asc' ? 'ascending' : 'descending';
	}

	return (
		<th
			className={ column.isNumeric ? 'is-numeric' : undefined }
			aria-sort={ ariaSort }
		>
			<button
				type="button"
				className={ 'etb-sort' + ( isActive ? ' is-active' : '' ) }
				onClick={ () => onSort( column.key ) }
			>
				{ column.label }
				<Icon
					icon={
						isActive && sort.direction === 'asc'
							? chevronUp
							: chevronDown
					}
					size={ 16 }
				/>
			</button>
		</th>
	);
};

const Row = ( { item } ) => (
	<tr>
		<td data-label={ __( 'Content', 'easy-testimonial-blocks' ) }>
			<div className="etb-row-title">
				<span className="etb-row-title__icon">
					<Icon
						icon={ TYPE_ICONS[ item.postType ] ?? page }
						size={ 20 }
					/>
				</span>
				<span className="etb-row-title__text">
					<a href={ item.editUrl }>{ item.title }</a>
					<span>
						{ item.type }
						{ ' · ' }
						{ sprintf(
							/* translators: %d: number of testimonial grids */
							_n(
								'%d grid',
								'%d grids',
								item.grids,
								'easy-testimonial-blocks'
							),
							item.grids
						) }
					</span>
				</span>
			</div>
		</td>
		<td data-label={ __( 'Status', 'easy-testimonial-blocks' ) }>
			<Pill tone={ STATUS_TONES[ item.status ] ?? 'neutral' }>
				{ item.statusLabel }
			</Pill>
		</td>
		<td data-label={ __( 'Rating', 'easy-testimonial-blocks' ) }>
			{ item.averageRating !== null ? (
				<span className="etb-row-rating">
					<Stars rating={ item.averageRating } size={ 14 } />
					<span>{ item.averageRating }</span>
				</span>
			) : (
				<span className="etb-table__muted">—</span>
			) }
		</td>
		<td
			className="is-numeric"
			data-label={ __( 'Testimonials', 'easy-testimonial-blocks' ) }
		>
			<span className="etb-count">{ item.testimonials }</span>
		</td>
		<td
			className="etb-table__muted"
			data-label={ __( 'Updated', 'easy-testimonial-blocks' ) }
		>
			<time
				dateTime={ new Date( item.modifiedTime * 1000 ).toISOString() }
				title={ item.modifiedDate }
			>
				{ item.modified }
			</time>
		</td>
		<td className="etb-table__actions">
			<Button variant="secondary" size="compact" href={ item.editUrl }>
				{ __( 'Edit', 'easy-testimonial-blocks' ) }
			</Button>
			{ item.viewUrl && (
				<Button
					size="compact"
					href={ item.viewUrl }
					target="_blank"
					rel="noreferrer"
					icon={ external }
					label={ sprintf(
						/* translators: %s: post title */
						__( 'View “%s”', 'easy-testimonial-blocks' ),
						item.title
					) }
					showTooltip
				/>
			) }
		</td>
	</tr>
);

export default function UsageTable( { items, isLoading, onNavigate } ) {
	const [ search, setSearch ] = useState( '' );
	const [ status, setStatus ] = useState( 'all' );
	const [ sort, setSort ] = useState( {
		key: 'modifiedTime',
		direction: 'desc',
	} );
	const [ pageIndex, setPageIndex ] = useState( 0 );

	// status filters that actually occur, with counts
	const statuses = useMemo( () => {
		const found = new Map();
		items.forEach( ( item ) => {
			const entry = found.get( item.status ) ?? {
				label: item.statusLabel,
				count: 0,
			};
			found.set( item.status, { ...entry, count: entry.count + 1 } );
		} );
		return [ ...found.entries() ];
	}, [ items ] );

	const rows = useMemo( () => {
		const term = search.trim().toLowerCase();
		const filtered = items.filter(
			( item ) =>
				( status === 'all' || item.status === status ) &&
				( ! term || item.title.toLowerCase().includes( term ) )
		);
		const sorted = [ ...filtered ].sort( compare( sort.key ) );
		return sort.direction === 'desc' ? sorted.reverse() : sorted;
	}, [ items, search, status, sort ] );

	// back to the first page whenever the visible set changes
	useEffect( () => setPageIndex( 0 ), [ search, status, sort ] );

	const pageCount = Math.max( 1, Math.ceil( rows.length / PAGE_SIZE ) );
	const visibleRows = rows.slice(
		pageIndex * PAGE_SIZE,
		( pageIndex + 1 ) * PAGE_SIZE
	);

	const onSort = ( key ) =>
		setSort( ( current ) => {
			if ( current.key === key ) {
				return {
					key,
					direction: current.direction === 'asc' ? 'desc' : 'asc',
				};
			}
			// text columns start A→Z, numbers and dates start highest first
			return {
				key,
				direction: key === 'title' || key === 'status' ? 'asc' : 'desc',
			};
		} );

	if ( isLoading ) {
		return (
			<div className="etb-usage__loading">
				{ [ 1, 2, 3, 4 ].map( ( row ) => (
					<Skeleton key={ row } height={ 52 } />
				) ) }
			</div>
		);
	}

	if ( ! items.length ) {
		return (
			<div className="etb-empty">
				<span className="etb-empty__icon">
					<Icon icon={ quote } size={ 32 } />
				</span>
				<h3>
					{ __( 'No testimonials yet', 'easy-testimonial-blocks' ) }
				</h3>
				<p>
					{ __(
						'Pick a ready-made design to create your first testimonials page.',
						'easy-testimonial-blocks'
					) }
				</p>
				<Button
					variant="primary"
					onClick={ () => onNavigate( 'designs' ) }
				>
					{ __( 'Browse designs', 'easy-testimonial-blocks' ) }
				</Button>
			</div>
		);
	}

	return (
		<div className="etb-usage">
			<div className="etb-usage__toolbar">
				<div
					className="etb-segmented"
					role="group"
					aria-label={ __(
						'Filter by status',
						'easy-testimonial-blocks'
					) }
				>
					{ [
						[
							'all',
							{
								label: __( 'All', 'easy-testimonial-blocks' ),
								count: items.length,
							},
						],
						...statuses,
					].map( ( [ key, entry ] ) => (
						<button
							key={ key }
							type="button"
							className={ status === key ? 'is-active' : '' }
							aria-pressed={ status === key }
							onClick={ () => setStatus( key ) }
						>
							{ entry.label }
							<span className="etb-segmented__count">
								{ entry.count }
							</span>
						</button>
					) ) }
				</div>
				<SearchControl
					className="etb-usage__search"
					value={ search }
					onChange={ setSearch }
					placeholder={ __(
						'Search by title',
						'easy-testimonial-blocks'
					) }
					__nextHasNoMarginBottom
				/>
			</div>

			<div className="etb-usage__scroll">
				<table className="etb-table">
					<thead>
						<tr>
							{ COLUMNS.map( ( column ) => (
								<SortHeader
									key={ column.key }
									column={ column }
									sort={ sort }
									onSort={ onSort }
								/>
							) ) }
							<th>
								<span className="screen-reader-text">
									{ __(
										'Actions',
										'easy-testimonial-blocks'
									) }
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{ visibleRows.map( ( item ) => (
							<Row key={ item.id } item={ item } />
						) ) }
						{ ! rows.length && (
							<tr className="etb-table__empty">
								<td colSpan={ COLUMNS.length + 1 }>
									<p>
										{ __(
											'Nothing matches these filters.',
											'easy-testimonial-blocks'
										) }
									</p>
									<Button
										variant="link"
										onClick={ () => {
											setSearch( '' );
											setStatus( 'all' );
										} }
									>
										{ __(
											'Clear filters',
											'easy-testimonial-blocks'
										) }
									</Button>
								</td>
							</tr>
						) }
					</tbody>
				</table>
			</div>

			{ rows.length > PAGE_SIZE && (
				<div className="etb-pagination">
					<span>
						{ sprintf(
							/* translators: 1: first row number, 2: last row number, 3: total rows */
							__(
								'%1$d–%2$d of %3$d',
								'easy-testimonial-blocks'
							),
							pageIndex * PAGE_SIZE + 1,
							Math.min(
								( pageIndex + 1 ) * PAGE_SIZE,
								rows.length
							),
							rows.length
						) }
					</span>
					<div>
						<Button
							size="compact"
							icon={ chevronLeft }
							label={ __(
								'Previous page',
								'easy-testimonial-blocks'
							) }
							disabled={ pageIndex === 0 }
							accessibleWhenDisabled
							onClick={ () => setPageIndex( pageIndex - 1 ) }
						/>
						<Button
							size="compact"
							icon={ chevronRight }
							label={ __(
								'Next page',
								'easy-testimonial-blocks'
							) }
							disabled={ pageIndex >= pageCount - 1 }
							accessibleWhenDisabled
							onClick={ () => setPageIndex( pageIndex + 1 ) }
						/>
					</div>
				</div>
			) }
		</div>
	);
}
