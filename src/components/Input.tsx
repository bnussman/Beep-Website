import React from 'react';

export function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className={`${props.className} inline-flex justify-center py-2 px-4 mr-1 border  text-sm font-medium rounded-md ${props.raised ? 'text-white shadow-sm bg-yellow-500 hover:bg-yellow-600' : ''} focus:outline-white`}>
            {props.children}
        </button>
    )
};

export function TextInput(props) {
    return (
        <div className={props.className}>
            <label className="text-gray-500 font-bold" htmlFor={props.id}>
                {props.label}
            </label>
            
            <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" 
                id={props.id}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                disabled={props.disabled}
                onChange={props.onChange}
            />
        </div>
    )
}
