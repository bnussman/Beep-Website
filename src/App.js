import React, { useState } from 'react';
import Home from './Home.js';
import Login from './Login.js';
import EditProfile from './EditProfile.js';
import ForgotPassword from './ForgotPassword.js';
import ResetPassword from './ResetPassword.js';
import ChangePassword from './ChangePassword.js';
import VerifyAccount from './VerifyAccount.js';
import Privacy from './Privacy.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from './UserContext.js';
import './assets/tailwind.css';

function App() {
    const [user, setUser] = useState();
    const storageUser = localStorage.getItem('user');
    
    if (!user && storageUser) {
        setUser(JSON.parse(storageUser));
    }

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
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
