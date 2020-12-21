import { action } from 'mobx';
import React from 'react';
import { NavLink } from "react-router-dom";
import { Heading6 } from './Typography';

export function Nav(props) {

    // Pass direction prop to children
    const children = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
                direction: props.direction
            });
        }
        return child;
    });

    return (
        <ul
            className={`px-6 flex flex-row flex-${props.direction || 'row'}`}>
            { children }
        </ul>
    )
}

export function NavItem(props) {
    return (
        <li className={`${props.direction === 'col' ? 'py-2' : 'px-2'} mr-3 flex items-center ${props.className}`}>
            { props.to 
                ?
                // Navigation link
                <NavLink
                    to={props.to}
                    className="hover:text-yellow-500"
                    activeClassName="font-semibold text-yellow-600">
                    {props.children}
                </NavLink>
                :
                // Button with action
                <button
                    onClick={props.onClick}
                    className="hover:text-yellow-500 focus:outline-none">
                    {props.children}
                </button>
            }
        </li>
    )
}