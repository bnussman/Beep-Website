import React, { useState } from 'react';
import Home from './Home.js';
import Login from './Login.js';
import EditProfile from './EditProfile.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from './UserContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={EditProfile} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
