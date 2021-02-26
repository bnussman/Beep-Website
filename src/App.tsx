import './assets/style.css'
import './assets/tailwind.css';
import React, { useEffect, useState } from 'react';
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
import socket, { didUserChange } from "./utils/Socket";
import About from './routes/About';
import { ApolloClient, ApolloProvider, createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { APIResponse } from './types/types';

const httpLink = createHttpLink({
    uri: 'http://192.168.1.57:3001',
});

const authLink = setContext(async (_, { headers }) => {
    const stored = localStorage.getItem('user');

    if (!stored) return;

    const auth = JSON.parse(stored);

    return {
        headers: {
            ...headers,
            Authorization: auth.tokens.id ? `Bearer ${auth.tokens.id}` : undefined
        }
    }
});

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'none',
    }
};

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        addTypename: false
    }),
    defaultOptions: defaultOptions
});

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    
    useEffect(() => {
        if (user) {
            socket.emit("getUser", user.tokens.id);
        }

        socket.on('updateUser', (data: APIResponse) => {
            if (data.status === "error") return console.log(data.message);
            
            if (didUserChange(user, data)) {
                const currentState = user;
                for (const key in data) {
                    currentState["user"][key] = data[key];
                    console.log(key, "updated");
                }
                localStorage.setItem("user", JSON.stringify(currentState));
                setUser({ ...currentState });
            }
        });
    }, []);

    return (
        <ApolloProvider client={client}>
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
                    <Route path="/about" component={About} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
            {/*<Footer/>*/}
            </UserContext.Provider>
        </ApolloProvider>
    );
}

export default App;
