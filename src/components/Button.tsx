import React from 'react';

export function Button(props) {
    return (
        <button type="submit" className={`inline-flex justify-center py-2 px-4 mr-1 border  text-sm font-medium rounded-md ${props.raised ? 'text-white shadow-sm bg-yellow-500 hover:bg-yellow-600' : ''} focus:outline-white`}>
            {props.children}
        </button>
    )
};