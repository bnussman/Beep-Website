import React, { Component } from 'react';
import Home from './routes/Home';
import Login from './routes/Login';
import Profile from './routes/Profile';
import EditProfile from './routes/EditProfile';
import ForgotPassword from './routes/ForgotPassword';
import ResetPassword from './routes/ResetPassword';
import ChangePassword from './routes/ChangePassword';
import VerifyAccount from './routes/VerifyAccount';
import Admin from './routes/admin';
import Privacy from './routes/Privacy';
import Terms from './routes/Terms';
import Docs from './routes/Docs';
import Faq from './routes/FAQ';
import BeepAppBar from './components/AppBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from './UserContext';
import './assets/style.css'
import './assets/tailwind.css';
import '../node_modules/leaflet/dist/leaflet.css';
import socket, { getUpdatedUser } from "./utils/Socket";



interface props {

}

interface User {
    id: any;
    token: string; 
}

interface state {
    user: User;
}

export default class App extends Component<props, state> {

    constructor(props: props) {
        super(props);
        const user = localStorage.getItem('user');
        if (user) {
            this.state = {
                user: JSON.parse(user)
            };
        }
        else {
            this.state = {
                user: null
            };
        }
    }
    
    setUser = (user: User) => {
        this.setState({ user: user });
    }
    
    componentDidMount() {
        if (this.state.user) {
            socket.emit("getUser", this.state.user.token);
        }

        socket.on('updateUser', (data: unknown) => {
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
                    <BeepAppBar/>
                    
                    <Switch>
                        <Route path="/password/forgot" component={ForgotPassword} />
                        <Route path="/password/reset/:id" component={ResetPassword} />
                        <Route path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/profile/edit/:id" component={EditProfile}/>
                        <Route path="/password/change" component={ChangePassword} />
                        <Route path="/account/verify/:id" component={VerifyAccount} />
                        <Route path="/privacy" component={Privacy} />
                        <Route path="/terms" component={Terms} />
                        <Route path="/docs" component={Docs} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/faq" component={Faq} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </UserContext.Provider>
        );
    }
}
