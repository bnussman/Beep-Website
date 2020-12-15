import React from 'react';

export function Card(props) {
    return (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {props.children}
        </div>
    )
};