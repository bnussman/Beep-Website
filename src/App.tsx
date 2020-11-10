import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import EditProfile from './EditProfile';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ChangePassword from './ChangePassword';
import VerifyAccount from './VerifyAccount';
import Admin from './admin/Admin';
import Privacy from './Privacy';
import Terms from './Terms';
import Docs from './Docs';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from './UserContext';
import './assets/tailwind.css';
import socket, { getUpdatedUser } from "./utils/Socket";

export default class App extends Component {

    constructor(props) {
        super(props);
        const user = localStorage.getItem('user');
        if (user) {
            this.state = {
                user: JSON.parse(user)
            };
        }
    }
    
    setUser = (user) => {
        this.setState({ user: user });
    }
    
    componentDidMount() {
        //@ts-ignore
        if (this.state.user) {
            //@ts-ignore
            socket.emit("getUser", this.state.user.token);
        }

        socket.on('updateUser', data => {
            //@ts-ignore
            const updated = getUpdatedUser(this.state.user, data);
            if (updated != null) {
                this.setState({ user: updated });
                localStorage.setItem("user", JSON.stringify(updated));
            }
        });
    }

    render() {
        //@ts-ignore
        let user = this.state.user;
        let setUser = this.setUser;

        return (
            //@ts-ignore
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
                        <Route path="/admin" component={Admin} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </UserContext.Provider>
        );
    }
}
