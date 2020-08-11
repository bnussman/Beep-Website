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
            {status && 
                <p variant={status.status === "success" ? "success" : "danger" }>
                    {status.message}
                </p>
            }
            <form onSubmit={handleResetPassword}>
                <p>New Password</p>
                <input type="password" autoComplete="password" placeholder="Password" onChange={(value) => setPassword(value.target.value)} disabled={status?.status === "success"}/>
                <p variant="primary" type="submit" disabled={status?.status === "success"}>
                    Reset Password
                </p>
            </form>
        </>
    );
}

export default ResetPassword;
