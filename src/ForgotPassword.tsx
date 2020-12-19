import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Redirect } from "react-router-dom";
import { config } from './utils/config';
import { Error } from "./utils/errors";
import { Button, TextInput } from './components/Input';

interface Status {
    status: string;
    message: string;
}

function ForgotPassword() {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [status, setStatus]: [Status, any] = useState();

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
        <div className="lg:container px-4 mx-auto">
            {status  && 
                <div role="alert" className="mb-4" onClick={() => setStatus(null)}>
                    <div className={status!.status === "success" ?
                            "bg-green-500 text-white font-bold rounded-t px-4 py-2"
                            :
                            status!.status === "warning" ?
                            "bg-yellow-500 text-white font-bold rounded-t px-4 py-2"
                            :
                            "bg-red-500 text-white font-bold rounded-t px-4 py-2"
                        }>
                        Edit profile {status.status}
                    </div>
                    <div className={status.status === "success" ?
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
            <form onSubmit={handleForgotPassword}>
                <TextInput
                    className="mb-4"
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="example@ridebeep.app"
                    onChange={(value) => setEmail(value.target.value)}
                    disabled={status?.status === "success"}
                />
                
                <Button raised className={status?.status !== 'success' ? 'opacity-50 cursor-not-allowed' : ''}>
                    Send Reset Password Email
                </Button>
            </form>
        </div>
    );
}

export default ForgotPassword;
