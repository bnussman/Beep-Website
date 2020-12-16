import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Beepers from './Beepers'
import Users from './Users'
import Reports from './Reports'
import { VerticalNav, VerticalNavItem } from '../../components/Nav'

function Admin() {

    let match = useRouteMatch();

    return (
        <div className="flex flex-row">
            <VerticalNav title="Database">
                <VerticalNavItem to={`${match.url}/beepers`}>Beepers</VerticalNavItem>
                <VerticalNavItem to={`${match.url}/users`}>Users</VerticalNavItem>
                <VerticalNavItem to={`${match.url}/reports`}>Reports</VerticalNavItem>
            </VerticalNav>

            <div className="container mx-auto w-4/5">
                <Switch>
                    <Route path={`${match.path}/beepers`}>
                        <Beepers />
                    </Route>

                    <Route path={`${match.path}/users`}>
                        <Users />
                    </Route>

                    <Route path={`${match.path}/reports`}>
                        <Reports />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Admin;
