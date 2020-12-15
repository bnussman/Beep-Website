import React from 'react';

export function Header(props) {
    return <h2 className="mx-2 text-2xl font-bold leading-7 text-gray-800 sm:truncate">
        {props.children}
    </h2>
}