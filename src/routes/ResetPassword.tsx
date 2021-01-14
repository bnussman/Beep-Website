import React, { FormEvent, useState } from 'react';
import APIResultBanner from '../components/APIResultBanner';
import { config } from '../utils/config';

interface Status {
    status: string;
    message: string;
}

function ResetPassword({ match }) {
    const id = match.params.id;
    const [password, setPassword] = useState("");
    const [status, setStatus]: [Status, any] = useState();
    
    async function handleResetPassword(e: FormEvent): Promise<void> {
        e.preventDefault();
        try {
            const response = await fetch(config.apiUrl + '/auth/password/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    password: password
                })
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
    );
}

export default ResetPassword;
