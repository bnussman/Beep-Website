import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { Redirect } from "react-router-dom";
import BeepAppBar from './AppBar.js';
import { config } from './utils/config';

function ChangePassword() {
    const {user} = useContext(UserContext);

    const [status, setStatus] = useState();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    //if some function tells us to redirect or a user is defined
    //redirect to the home page
    if(!user) {
        return <Redirect to={{ pathname: "/login"}} />;
    }
    

    function handleEdit(e) {
        e.preventDefault();
        fetch(config.apiUrl + '/account/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'token': user.token,
                'password': password,
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
    
    //Return the main login page
    return (
        <>
        <BeepAppBar/>
            <div className="lg:container px-4 mx-auto">
                {status && 
                    <div
                        role="alert"
                        className={status.status === "success" ?
                            "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                            :
                            status.status === "warning" ?
                                "bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative mb-4"
                                :
                                "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                        }
                    >
                        {status.message}
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
