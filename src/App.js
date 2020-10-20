import React, { Component } from 'react';
import Home from './Home.js';
import Login from './Login.js';
import EditProfile from './EditProfile.js';
import ForgotPassword from './ForgotPassword.js';
import ResetPassword from './ResetPassword.js';
import ChangePassword from './ChangePassword.js';
import VerifyAccount from './VerifyAccount.js';
import Privacy from './Privacy.js';
import Terms from './Terms.js';
import Docs from './Docs.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from './UserContext.js';
import './assets/tailwind.css';
import socket, { getUpdatedUser } from "./utils/Socket";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        };
    }
    
    setUser = (user) => {
        this.setState({ user: user });
    }
    
    componentDidMount() {
        if (this.state.user) {
            socket.emit("getUser", this.state.user.token);
        }

        socket.on('updateUser', data => {
            const updated = getUpdatedUser(this.state.user, data);
            if (updated != null) {
                this.setState({ user: updated });
                localStorage.setItem("user", JSON.stringify(updated));
            }
        });
    }

    render() {
        let user = this.state.user;
        let setUser = this.setUser;

        return (
            <UserContext.Provider value={{user, setUser}}>
                <Router>
                    <Switch>
                        <Route path="/password/forgot" component={ForgotPassword} />
                        <Route path="/password/reset/:id" component={ResetPassword} />
                        <Route path="/login" component={Login} />
                        <Route path="/profile" component={EditProfile} />
                        <Route path="/password/change" component={ChangePassword} />
                        <Route path="/account/verify/:id" component={VerifyAccount} />
                        <Route path="/privacy" component={Privacy} />
                        <Route path="/terms" component={Terms} />
                        <Route path="/docs" component={Docs} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </UserContext.Provider>
        );
    }
}
