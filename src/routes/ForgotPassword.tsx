import React, { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from "react-router-dom";
import { config } from '../utils/config';
import { Button, TextInput } from '../components/Input';
import APIResultBanner from '../components/APIResultBanner';

interface Status {
    status: string;
    message: string;
}

function ForgotPassword() {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [status, setStatus]: [Status, any] = useState();

    async function handleForgotPassword(e: FormEvent): Promise<void> {
        e.preventDefault();
        try {
            const response = await fetch(config.apiUrl + '/auth/password/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                }),
            });

            const data = await response.json();

            setStatus(data);
        }
        catch(error) {
            console.error('Error:', error);
        }
    }

    if(user) {
        return <Redirect to={{ pathname: "/"}} />;
    }
    
    return (
        <div className="lg:container px-4 mx-auto">
            {status && <APIResultBanner response={status} setResponse={setStatus}/>}
            <form onSubmit={handleForgotPassword}>
                <TextInput
                    className="mb-4"
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="example@ridebeep.app"
                    onChange={(value: any) => setEmail(value.target.value)}
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
