import React from 'react';
import { NavLink } from "react-router-dom";

export function VerticalNav(props) {
    return <ul>
        {props.children}
    </ul>
}

export function VerticalNavItem(props) {
    return <li className="p-2">
        <NavLink to={props.to} activeClassName="font-semibold text-yellow-600">{props.children}</NavLink>
    </li>
}