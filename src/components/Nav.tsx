import React from 'react';
import { NavLink } from "react-router-dom";
import { Heading6 } from './Typography';

export function VerticalNav(props) {
    return (
        <div className="px-6 mr-6">
            <Heading6>{props.title}</Heading6>

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