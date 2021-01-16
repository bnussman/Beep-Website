import React from 'react';

export function Card(props) {
    return (
        <div className={`${props.className} overflow-hidden border border-gray-200 sm:rounded-lg`}>
            {props.children}
        </div>
    )
};
