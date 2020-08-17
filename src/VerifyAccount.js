import React, { useState, useEffect } from 'react';
import BeepAppBar from './AppBar.js';
import { config } from './utils/config';

function VerifyAccount({ match }) {
    const id = match.params.id;
    const [status, setStatus] = useState();
    
    async function handleVerify() {
        fetch(config.apiUrl + '/account/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': id
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

    useEffect(() => {
        handleVerify();
    }, []);

    
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
            </div>
        </>
    );
}

export default VerifyAccount;
