import React from 'react';

export function Card(props) {
    return (
        <div className="p-4 overflow-hidden border border-gray-200 sm:rounded-lg dark:bg-black dark:text-white dark:border-black">
            {props.children}
        </div>
    )
};
