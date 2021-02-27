import React from 'react';

export function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className={`inline-flex justify-center py-2 px-4 mr-1 border text-sm font-medium rounded-md ${props.raised ? 'text-white shadow-sm bg-yellow-500 hover:bg-yellow-600' : ''} focus:outline-white dark:text-white`}>
            {props.children}
        </button>
    )
};

export function TextInput(props) {
    return (
        <div className={props.className}>
            <label className="font-bold text-gray-500" htmlFor={props.id}>
                {props.label}
            </label>
            
            <input
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-yellow-500 dark:bg-gray-900 dark:text-white" 
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
