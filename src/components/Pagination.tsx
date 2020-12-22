import React, { useState } from 'react';
import ChevronLeft from '../assets/icons/chevron_left.svg';
import ChevronRight from '../assets/icons/chevron_right.svg';

function PagElement(props) {
	return (
		<span className={`inline-flex justify-center items-center px-4 py-2 w-10 border text-sm font-medium hover:bg-gray-50 \
						  ${props.active ? 'text-yellow-500' : 'text-gray-700'}`}>
			{props.children}
		</span>
	);
}

function PagButton(props) {
	return (
		<button onClick={props.onClick} className="focus:outline-none justify-self-stretch">
			<PagElement active={props.active}>{props.children}</PagElement>
		</button>
	);
}

function PagLeft(props) {
	return (
		<button
			disabled={props.disabled}
			onClick={props.onClick}
			className={`relative inline-flex items-center px-2 py-2 focus:outline-none \
						rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 \
						${props.className}`}>
			
			<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
			</svg>
		</button>
	)
}

function PagRight(props) {
	return (
		<button
			disabled={props.disabled}
			onClick={props.onClick}
			className={`relative inline-flex items-center px-2 py-2 focus:outline-none \
						rounded-r-md border border-gray-300 text-sm font-medium text-gray-500 \
						${props.className}`}>
			
			<span className="sr-only">Next</span>
			{/* Heroicon name: chevron-right */}
			<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
			</svg>
		</button>
	)
}

export function Pagination(props) {

	/* 
	   [1]  2   3    4     5     6     7     ...   184   >
	<   1  [2]  3    4     5     6     7     ...   184   >
	<   1   2  [3]   4     5     6     7     ...   184   >
	<   1   2   3   [4]    5     6     7     ...   184   >
	
	<   1  ...  3    4    [5]    6     7     ...   184   >
	<   1  ...  4    5    [6]    7     8     ...   184   >
	<   1  ...  5    6    [7]    8     9     ...   184   >    
	<   1  ...  6    7    [8]    9     10    ...   184   >
	<   1  ...  7    8    [9]    10    11    ...   184   >
	<   1  ...  8    9    [10]   11    12    ...   184   >
	<   1  ...  177  178  [179]  180   181   ...   184   >

	<   1  ...  178  179  [180]  181   182   183   184   >
	<   1  ...  178  179  180   [181]   182   183   184   >
	<   1  ...  178  179  180    182  [182]  183   184   >
	<   1  ...  178  179  180    182   182  [183]  184   >
	<   1  ...  178  179  180    182   182   183  [184]   >
	*/

	let [currentPage, setCurrentPage] = useState<number>(1);

	let resultCount = 182, limit = 25, cutoff = 3, neighbors = 1,
		pages = [], numButtons = ((cutoff * 2) + 1), pageCount = Math.ceil(resultCount / limit);

	function increment() {
		if (currentPage < pageCount) {
			setCurrentPage(++currentPage);
		}
	}
	function decrement() {
		if (currentPage > 0) {
			setCurrentPage(--currentPage);
		}
	}
	function navigateTo(pageNum: number) {
		setCurrentPage(pageNum);
	}

	// Beginning of sequence
	if (currentPage <= cutoff) {
		for (let pageNum = 1; pageNum <= numButtons - 2; pageNum++) {
			pages.push(pageNum);
		}
		pages.push(null);
		pages.push(pageCount)
	}
	// End of sequence
	else if (currentPage >= (pageCount - cutoff)) {
		pages.push(1)
		pages.push(null);
		for (let pageNum = pageCount - (numButtons - 3); pageNum <= pageCount; pageNum++) {
			pages.push(pageNum);
		}
	}
	// Middle of sequence
	else {
		pages.push(1);
		pages.push(null);
		for (let pageNum = currentPage - neighbors; pageNum <= currentPage + neighbors; pageNum++) {
			pages.push(pageNum);
		}
		pages.push(null);
		pages.push(pageCount);
	}

	return (
		<div className="flex-1 py-3 sm:flex sm:items-center sm:justify-between">
			<div>
				<p className="text-sm text-gray-700 mb-3">
					Showing
					<span className="font-medium mx-1">{(currentPage - 1) * limit + 1}</span>
					to
					<span className="font-medium mx-1">{currentPage * limit <= resultCount ? currentPage * limit : resultCount}</span>
					of
					<span className="font-medium mx-1">{resultCount}</span>
					results
				</p>
			</div>

			<nav className="relative z-0 inline-flex -space-x-px" aria-label="Pagination">
				<PagLeft disabled={currentPage === 1} onClick={decrement}/>
				{
					pages.map(page => {
						return page
								? <PagButton active={currentPage === page} onClick={() => navigateTo(page)}>
									{page}
								</PagButton>
								: <PagElement>...</PagElement>
					})
				}
				<PagRight disabled={currentPage === pageCount} onClick={increment}/>
			</nav>
		</div>
	);
};