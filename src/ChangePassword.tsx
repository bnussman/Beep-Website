import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Redirect } from "react-router-dom";
import BeepAppBar from './AppBar';
import { config } from './utils/config';
import { Error } from "./utils/errors";

function ChangePassword() {

    const { user } = useContext(UserContext);
    const [status, setStatus]: [any, any] = useState();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    if(!user) {
        return <Redirect to={{ pathname: "/login"}} />;
    }

    function handleEdit(e: any) {
        e.preventDefault();


        if (password !== password2) {
            setStatus({
                "status": "error",
                "message": "Your passwords do not match."
            });
            return;
        }

        if (!password || !password2) {
            setStatus({
                "status": "error",
                "message": "Please enter a new password."
            });
            return;
        }

        fetch(config.apiUrl + '/account/password', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + user.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'password': password
            }),
        })
        .then(response => response.json())
        .then(data => {
            setStatus(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    return (
        <>
        <BeepAppBar/>
            <div className="lg:container px-4 mx-auto">
                {status && 
                    <div role="alert" className="mb-4" onClick={() => setStatus(null)}>
                        <div className={
                            status.status === "success" ?
                                "bg-green-500 text-white font-bold rounded-t px-4 py-2"
                                :
                                status.status === "warning" ?
                                "bg-yellow-500 text-white font-bold rounded-t px-4 py-2"
                                :
                                "bg-red-500 text-white font-bold rounded-t px-4 py-2"
                            }>
                            Change password {
                            status.status}
                        </div>
                        <div className={
                            status.status === "success" ?
                                "border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700"
                                :
                                status.status === "warning" ?
                                "border border-t-0 border-yellow-400 rounded-b bg-yellow-100 px-4 py-3 text-yellow-700"
                                :
                                "border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
                            }>
                            <Error error={status.message}/>
                        </div>
                    </div>
                }
                <form onSubmit={handleEdit}>
                    <label className="text-gray-500 font-bold" htmlFor="phone">Password</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" id="password" type="password" autoComplete="new-password" placeholder="Password" onChange={(value) => setPassword(value.target.value)} />
                    <label className="text-gray-500 font-bold" htmlFor="venmo">Repeat Password</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" id="password2" type="password" autoComplete="new-password" placeholder="Password" onChange={(value) => setPassword2(value.target.value)} />
                    <button type="submit" className="mb-4 shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                        Update Password
                    </button>
                </form>
            </div>
        </>
    );
}

export default ChangePassword;
