import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from "react-router-dom";
import { config } from '../utils/config';
import { Button, TextInput } from '../components/Input';
import APIResultBanner from '../components/APIResultBanner';

function ChangePassword() {
    const { user } = useContext(UserContext);
    const [status, setStatus]: [any, any] = useState();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    if (!user) {
        return <Redirect to={{ pathname: "/login" }} />;
    }

    async function handleEdit(e: any): Promise<void> {
        e.preventDefault();

        if (password !== password2) {
            return setStatus({
                status: "error",
                message: "Your passwords do not match."
            });
        }

        if (!password || !password2) {
            return setStatus({
                status: "error",
                message: "Please enter a new password."
            });
        }

        try {
            const response = await fetch(config.apiUrl + '/account/password', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.tokens.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: password
                }),
            });
            const data = await response.json();
            setStatus(data);
        }
        catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="lg:container px-4 mx-auto">
            {status && <APIResultBanner response={status} setResponse={setStatus}/>}
            <form onSubmit={handleEdit}>
                <TextInput
                    className="mb-4"
                    id="password"
                    label="Password"
                    type="password"
                    onChange={(value: any) => setPassword(value.target.value)}
                />
                <TextInput
                    className="mb-4"
                    id="password2"
                    label="Repeat password"
                    type="password"
                    onChange={(value: any) => setPassword2(value.target.value)}
                />
                <Button raised type="submit">Update password</Button>
            </form>
        </div>
    );
}

export default ChangePassword;
