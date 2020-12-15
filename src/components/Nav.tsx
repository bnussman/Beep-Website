import React from 'react';
import { NavLink } from "react-router-dom";

export function VerticalNav(props) {
    return (
        <div className="px-6 mr-6">
            <h2 className="mx-2 font-bold leading-7 text-gray-800 sm:truncate">
                {props.title}
            </h2>

            <hr></hr>

            <ul>
                {props.children}
            </ul>
        </div>
    )
}

export function VerticalNavItem(props) {
    return (
        <li className="p-2">
            <NavLink to={props.to} activeClassName="font-semibold text-yellow-600">{props.children}</NavLink>
        </li>
    )
}