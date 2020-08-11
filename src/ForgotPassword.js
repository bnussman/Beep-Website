import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { Redirect } from "react-router-dom";
import BeepAppBar from './AppBar.js';
import { config } from './utils/config';

function ForgotPassword() {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState();

    function handleForgotPassword(e) {
        e.preventDefault();
        fetch(config.apiUrl + '/auth/password/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email
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
            <form onSubmit={handleForgotPassword}>
                <p>Email</p>
                <input type="email" autoComplete="email" placeholder="example@ridebeep.app" onChange={(value) => setEmail(value.target.value)} disabled={status?.status === "success"}/>
                <p variant="primary" type="submit" disabled={status?.status === "success"}>
                    Send Reset Password Email
                </p>
            </form>
        </>
    );
}

export default ForgotPassword;
