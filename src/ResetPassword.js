import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { Redirect } from "react-router-dom";
import BeepAppBar from './AppBar.js';
import { config } from './utils/config';

function ResetPassword({ match }) {
    const id = match.params.id;
    const { user } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState();
    
    function handleResetPassword(e) {
        e.preventDefault();
        fetch(config.apiUrl + '/auth/password/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': id,
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
                {status && 
                    <div role="alert" className={status.status === "success" ? "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" }>
                        {status.message}
                    </div>
                }
                <form onSubmit={handleResetPassword}>
                    <label className="text-gray-500 font-bold" htmlFor="password">
                        New Password
                    </label>
                    <input
                        className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"
                        id="password"
                        type="password"
                        autoComplete="password"
                        placeholder="Password"
                        onChange={(value) => setPassword(value.target.value)}
                        disabled={status?.status === "success"}
                    />
                    <button 
                        type="submit"
                        disabled={status?.status === "success"}
                        className={ status?.status === "success" ? "mb-4 shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" : "mb-4 shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" }
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </>
    );
}

export default ResetPassword;
