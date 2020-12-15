import React from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    NavLink
} from "react-router-dom";

import Rides from './Rides'
import Users from './Users'
import Reports from './Reports'
import { VerticalNav, VerticalNavItem } from '../../components/Nav'

function Admin() {

    let match = useRouteMatch();

    return (
        <div className="flex flex-row">

            {/* Navigation pane */}
            <div className="px-6 mr-6">
                <h2 className="mx-2 font-bold leading-7 text-gray-800 sm:truncate">
                    Database
                </h2>

                <hr></hr>

                <VerticalNav>
                    <VerticalNavItem to={`${match.url}/rides`}>Rides</VerticalNavItem>
                    <VerticalNavItem to={`${match.url}/users`}>Users</VerticalNavItem>
                    <VerticalNavItem to={`${match.url}/reports`}>Reports</VerticalNavItem>
                </VerticalNav>
            </div>

            {/* View container */}
            <div className="container mx-auto w-4/5">

                <Switch>
                    <Route path={`${match.path}/rides`}>
                        <Rides></Rides>
                    </Route>

                    <Route path={`${match.path}/users`}>
                        <Users></Users>
                    </Route>

                    <Route path={`${match.path}/reports`}>
                        <Reports></Reports>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Admin;
