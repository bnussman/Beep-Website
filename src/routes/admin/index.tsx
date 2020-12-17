import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Beepers from './Beepers';
import Users from './users';
import User from './users/User';
import Reports from './reports';
import Report from './reports/Report';
import Beeps from './beeps';
import Beep from './beeps/Beep';
import { VerticalNav, VerticalNavItem } from '../../components/Nav';

function Admin() {

    let match = useRouteMatch();

    return (
        <div className="flex flex-row">
            <VerticalNav title="Database">
                <VerticalNavItem to={`${match.url}/beepers`}>Beepers</VerticalNavItem>
                <VerticalNavItem to={`${match.url}/users`}>Users</VerticalNavItem>
                <VerticalNavItem to={`${match.url}/reports`}>Reports</VerticalNavItem>
                <VerticalNavItem to={`${match.url}/beeps`}>Beeps</VerticalNavItem>
            </VerticalNav>

            <div className="container mx-auto w-4/5 mb-4">
                <Switch>
                    <Route exact path={`${match.path}/beepers`}>
                        <Beepers />
                    </Route>

                    <Route exact path={`${match.path}/users`}>
                        <Users />
                    </Route>

                    <Route exact path={`${match.path}/users/:userId`}>
                        <User />
                    </Route>

                    <Route exact path={`${match.path}/reports`}>
                        <Reports />
                    </Route>

                    <Route exact path={`${match.path}/reports/:reportId`}>
                        <Report />
                    </Route>

                    <Route exact path={`${match.path}/beeps`}>
                        <Beeps />
                    </Route>

                    <Route exact path={`${match.path}/beeps/:beepId`}>
                        <Beep />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Admin;
