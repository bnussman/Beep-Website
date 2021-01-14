import React, { useState, useEffect, useContext } from 'react';
import { config } from '../utils/config';
import { UserContext } from '../UserContext';
import { Heading1 } from '../components/Typography';

function VerifyAccount({ match }) {
    const { user, setUser } = useContext(UserContext);
    const id = match.params.id;
    const [status, setStatus]: [any, any] = useState();
    
    async function handleVerify(): Promise<void> {
        try {
            const response = await fetch(config.apiUrl + '/account/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id })
            });

            const data = await response.json();

            setStatus(data);

            if (data.status === "success" && user) {
                let tempUser = JSON.parse(JSON.stringify(user));
                if (data.data.isStudent) {
                    tempUser.isStudent = data.data.isStudent;
                }
                tempUser.isEmailVerified = data.data.isEmailVerified;
                tempUser.email = data.data.email;
                localStorage.setItem("user", JSON.stringify(tempUser));
                setUser(tempUser);
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleVerify();
    }, []);

    return (
        <div className="lg:container px-4 mx-auto">
            {status ? 
                <div role="alert" className={status.status === "success" ? "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" }>
                    {status.message}
                </div>
                :
                <Heading1>Loading</Heading1>
            }
        </div>
    );
}

export default VerifyAccount;
