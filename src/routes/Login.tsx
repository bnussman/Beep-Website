import React, { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect, Link } from "react-router-dom";
import { config } from '../utils/config';
import socket from "../utils/Socket";
import { TextInput } from '../components/Input';
import { Caption } from '../components/Typography';
import APIResultBanner from '../components/APIResultBanner';

function Login() {
    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleLogin(e: FormEvent): Promise<void> {
        e.preventDefault();
        try {
            const response = await fetch(config.apiUrl + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            const data = await response.json();
            if (data.status === "success") {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                socket.emit("getUser", data.token);
            }
            else {
                setError(data);
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    if (user) {
        return <Redirect to={{ pathname: "/" }} />;
    }

    return (
        <div className="lg:container px-4 mx-auto">
            {error && <APIResultBanner response={error} setResponse={setError}/>}
            <form onSubmit={handleLogin}>
                <TextInput
                    className="mb-4"
                    id="username"
                    label="Username"
                    onChange={(value: any) => setUsername(value.target.value)}
                />
                <TextInput
                    className="mb-4"
                    id="password"
                    type="password"
                    label="Password"
                    onChange={(value: any) => setPassword(value.target.value)}
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
