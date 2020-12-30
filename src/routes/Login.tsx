import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect, Link } from "react-router-dom";
import { config } from '../utils/config';
import { Error } from "../utils/errors";
import socket from "../utils/Socket";
import { TextInput } from '../components/Input';
import { Caption } from '../components/Typography';

function Login() {
    const { user, setUser } = useContext(UserContext);
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
    if (user) {
        return <Redirect to={{ pathname: "/" }} />;
    }

    //Return the main login page
    return (
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
                <TextInput
                    className="mb-4"
                    id="username"
                    label="Username"
                    onChange={(value) => setUsername(value.target.value)}
                />

                <TextInput
                    className="mb-4"
                    id="password"
                    type="password"
                    label="Password"
                    onChange={(value) => setPassword(value.target.value)}
                />

                <button type="submit" className="mb-4 shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            </form>

            <Link to={"/password/forgot"} className="text-gray-500">Forgot Password</Link>
            <Caption className="mt-4">Currently, the option to sign up is only avalible in our app (coming soon)</Caption>
        </div>
    );
}

export default Login;
