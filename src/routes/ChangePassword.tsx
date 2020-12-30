import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from "react-router-dom";
import { config } from '../utils/config';
import { Error } from "../utils/errors";
import { Button, TextInput } from '../components/Input';

function ChangePassword() {

    const { user } = useContext(UserContext);
    const [status, setStatus]: [any, any] = useState();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    if (!user) {
        return <Redirect to={{ pathname: "/login" }} />;
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
                        <Error error={status.message} />
                    </div>
                </div>
            }
            <form onSubmit={handleEdit}>
                <TextInput
                    className="mb-4"
                    id="password"
                    label="Password"
                    type="password"
                    onChange={(value) => setPassword(value.target.value)}
                />

                <TextInput
                    className="mb-4"
                    id="password2"
                    label="Repeat password"
                    type="password"
                    onChange={(value) => setPassword2(value.target.value)}
                />

                <Button raised type="submit">Update password</Button>
            </form>
        </div>
    );
}

export default ChangePassword;
