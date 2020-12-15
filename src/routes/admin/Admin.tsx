import React from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

import Rides from './Rides'
import Users from './Users'
import Reports from './Reports'

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

                <ul>
                    <li className="p-2">
                        <Link to={`${match.url}/rides`}>Active rides</Link>
                    </li>
                    <li className="p-2">
                        <Link to={`${match.url}/users`}>Users</Link>
                    </li>
                    <li className="p-2">
                        <Link to={`${match.url}/reports`}>Reports</Link>
                    </li>
                </ul>
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
