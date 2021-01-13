import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Beepers from './Beepers';
import Users from './users';
import User from './users/User';
import EditUserPage from './users/Edit';
import Reports from './reports';
import Report from './reports/Report';
import Beeps from './beeps';
import Beep from './beeps/Beep';

import { Nav, NavItem } from '../../components/Nav';
import { Heading6 } from '../../components/Typography';

function Admin() {

    let match = useRouteMatch();

    return (
        <div className="sm:flex flex-row">
            <Nav title="Database" direction="col">
                <Heading6>Database</Heading6>
                <hr/>
                <NavItem to={`${match.url}/beepers`}>Beepers</NavItem>
                <NavItem to={`${match.url}/beeps`}>Beeps</NavItem>
                <NavItem to={`${match.url}/users`}>Users</NavItem>
                <NavItem to={`${match.url}/reports`}>Reports</NavItem>
            </Nav>

            <div className="container mx-auto w-4/5 mb-4">
                <Switch>
                    <Route exact path={`${match.path}/beepers`}>
                        <Beepers />
                    </Route>

                    <Route exact path={`${match.path}/beeps`}>
                        <Beeps />
                    </Route>

                    <Route exact path={`${match.path}/beeps/:beepId`}>
                        <Beep />
                    </Route>

                    <Route exact path={`${match.path}/users`}>
                        <Users />
                    </Route>

                    <Route exact path={`${match.path}/users/:userId`}>
                        <User />
                    </Route>

                    <Route exact path={`${match.path}/users/:userId/edit`}>
                        <EditUserPage />
                    </Route>

                    <Route exact path={`${match.path}/reports`}>
                        <Reports />
                    </Route>

                    <Route exact path={`${match.path}/reports/:reportId`}>
                        <Report />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Admin;
