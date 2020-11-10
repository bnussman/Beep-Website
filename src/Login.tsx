import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Redirect, Link } from "react-router-dom";
import BeepAppBar from './AppBar';
import { config } from './utils/config';
import { Error } from "./utils/errors";
import socket from "./utils/Socket";

function Login() {
    const {user, setUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    function handleLogin(e) {
        e.preventDefault();
        fetch(config.apiUrl + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                socket.emit("getUser", data.token);
            }
            else {
                setError(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    //if some function tells us to redirect or a user is defined
    //redirect to the home page
    if(user) {
        return <Redirect to={{ pathname: "/"}} />;
    }
    
    //Return the main login page
    return (
        <>
        <BeepAppBar/>
            <div className="lg:container px-4 mx-auto">
                { error && 
                    <div role="alert" className="mb-4" onClick={() => setError(null)}>
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Login Error
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <Error error={error} />
                        </div>
                    </div>
                }
                <form onSubmit={handleLogin}>
                    <label className="text-gray-500 font-bold" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        onChange={(value) => setUsername(value.target.value)}
                        className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"
                        type="text"
                    />
                    <label className="text-gray-500 font-bold" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        onChange={(value) => setPassword(value.target.value)}
                        className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"
                        type="password"
                    />
                    <button type="submit" className="mb-4 shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </form>
                <Link to={"/password/forgot"} className="text-gray-500">Forgot Password</Link>
                <p className="text-gray-500 pt-5 text-xs">Currently, the option to sign up is only avalible in our app (coming soon)</p>
            </div>
        </>
    );
}

export default Login;
