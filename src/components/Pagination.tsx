import React from 'react';

function PagElement(props) {
	return (
		<span className={`inline-flex px-4 py-2 border text-sm font-medium hover:bg-gray-50 ${props.active ? 'text-blue-500' : 'text-gray-700'}`}>
			{props.children}
		</span>
	);
}

function PagButton(props) {
	return (
		<a href="#">
			<PagElement active={props.active}>{props.children}</PagElement>
		</a>
	);
}

function PagLeft(props) {
	return (
		<a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
			<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
			</svg>
		</a>
	)
}

function PagRight(props) {
	return (
		<a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
			<span className="sr-only">Next</span>
			{/* Heroicon name: chevron-right */}
			<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
			</svg>
		</a>
	)
}

export function Pagination(props) {

	// cutoff: How many pages to count until cutoff, ex. cutoff = 3:  1 2 3 ... 8 9 10
	let { pageNum = 1, resultsCount = 0, pageSize = 10, cutoff = 3 } = props;

	let pageCount = Math.ceil(resultsCount / pageSize);

	let splitPages = (pageCount - pageNum) > (cutoff * 2);

	return (
		<div className="flex-1 py-3 sm:flex sm:items-center sm:justify-between">
			<div>
				<p className="text-sm text-gray-700 mb-3">
					Showing
					<span className="font-medium mx-1">{pageNum}</span>
					to
					<span className="font-medium mx-1">{pageCount}</span>
					of
					<span className="font-medium mx-1">{resultsCount}</span>
					results
				</p>
			</div>
			<div>
				<nav className="relative z-0 inline-flex shadow -space-x-px" aria-label="Pagination">
					<PagLeft/>
					{
						Array.from({ length: splitPages ? cutoff : (pageCount - pageNum + 1) }, (o, i) => (
							<PagButton active={pageNum == i + pageNum}>{i + pageNum}</PagButton>
						))
					}
					
					{
						splitPages && (<PagElement>...</PagElement>)
					}
					
					{
						splitPages && Array.from({ length: cutoff }, (o, i) => (
							<PagButton>{i + 1 + pageCount - cutoff}</PagButton>
						))
					}
				</nav>
			</div>
		</div>
	);
};