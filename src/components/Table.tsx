import React from 'react';
import { NavLink } from "react-router-dom";

export function Table(props) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            {props.children}
        </table>
    );
}

export function THead(props) {
    return (
        <thead className="bg-gray-50">
            <tr>
                {props.children}
            </tr>
        </thead>
    );
}

export function TH(props) {
    return (
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {props.children}
        </th>
    );
}

export function TBody(props) {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {props.children}
        </tbody>
    );
}

export function TR(props) {
    return <tr>{props.children}</tr>
}

export function TD(props) {
    return (
        <td className="px-6 py-4 whitespace-nowrap">
            {props.children}
        </td>
    );
}

export function TDProfile(props) {
    return (
        <TD>
            <NavLink to={props.to || '#'} className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={props.photoUrl || 'https://i.imgur.com/IJVpfBXs.png'} alt={props.title} />
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                        {props.title}
                    </div>
                    <div className="text-sm text-gray-500">
                        {props.subtitle}
                    </div>
                </div>
            </NavLink>
        </TD>
    );
}

export function TDText(props) {
    return (
        <TD>
            <div className="text-sm text-gray-900">{props.children}</div>
        </TD>
    )
}

export function TDButton(props) {
    return (
        <TD>
            <NavLink to={props.to || '/'} className="whitespace-nowrap text-right text-sm font-medium">
                {props.children}
            </NavLink>
        </TD>
    );
}
