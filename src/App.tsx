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
import './assets/style.css'
import './assets/tailwind.css';
import socket, { didUserChange } from "./utils/Socket";
import About from './routes/About';
import { ApolloClient, ApolloProvider, createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://192.168.1.57:3001',
});

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const tit = JSON.parse(localStorage.getItem('user'));

    if (!tit) return;

    const auth = JSON.parse(tit);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: auth.tokens.id ? `Bearer ${auth.tokens.id}` : "",
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
    },
    mutate: {
        errorPolicy: 'none',
    }
};

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
});

interface Props {

}

interface User {
    user: any;
    tokens: {
        id: string;
        tokenid: string;
    }; 
}

function App(props: Props) {
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user')) || null);
    
    useEffect(() => {
        if (user) {
            socket.emit("getUser", user.tokens.id);
        }

        socket.on('updateUser', (data) => {
            if (data.status === "error") return console.log(data.message);
            
            if (didUserChange(user, data)) {
                const currentState = user;
                for (const key in data) {
                    currentState["user"][key] = data[key];
                    console.log(key, "updated");
                }
                localStorage.setItem("user", JSON.stringify(currentState));
                setUser(currentState);
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
            {/*
                <footer className="bg-white pt-10 sm:mt-10 pt-10 flex items-center bottom-0">
                <div className="w-11/12 m-4 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
                <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
                <div className="text-xs uppercase text-gray-800 font-medium mb-6">
                Getting Started
                </div>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Installation
                </a>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Release Notes
                </a>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Upgrade Guide
                </a>
                </div>

                <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
                <div className="text-xs uppercase text-gray-800 font-medium mb-6">
                Core Concepts
                </div>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Installation
                </a>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Release Notes
                </a>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Upgrade Guide
                </a>
                </div>

                <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
                <div className="text-xs uppercase text-gray-800 font-medium mb-6">
                Customization
                </div>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Utility-First
                </a>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Responsive Design
                </a>

                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Hover, Focus, & Other States
                </a>
                </div>

                <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
                <div className="text-xs uppercase text-gray-800 font-medium mb-6">
                Community
                </div>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                GitHub
                </a>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Discord
                </a>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                Twitter
                </a>
                <a href="#" className="my-3 block text-gray-600 hover:text-gray-100 text-sm font-medium duration-700">
                YouTube
                </a>
                </div>
                </div>
                <div className="pt-2">
                <div className="flex pb-5 px-3 m-auto pt-5 
                border-t border-gray-500 text-gray-800 text-sm 
                flex-col md:flex-row max-w-6xl">

                    <div className="mt-2">
                    © Ride Beep App - Ian & Banks LLC - All Rights Reserved.
                    </div>

                    <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
                    <a href="#" className="w-6 mx-1">
                    <i className="uil uil-facebook-f"></i>
                    </a>

                    <a href="#" className="w-6 mx-1">
                    <i className="uil uil-twitter-alt"></i>
                    </a>

                    <a href="#" className="w-6 mx-1">
                    <i className="uil uil-youtube"></i>
                    </a>

                    <a href="#" className="w-6 mx-1">
                    <i className="uil uil-linkedin"></i>
                    </a>

                    <a href="#" className="w-6 mx-1">
                    <i className="uil uil-instagram"></i>
                    </a>
                    </div>
                    </div>
                    </div>
                    </div>
                    </footer>
                    */}
            </UserContext.Provider>
        </ApolloProvider>
    );
}

export default App;
