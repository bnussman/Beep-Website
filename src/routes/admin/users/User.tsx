import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import api from '../../../api';
import { User } from '../../../types/User';

import UserProfile from '../../../components/UserProfile';
import { Heading1, Heading3 } from '../../../components/Typography';

function UserPage(props) {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User>(null);

    async function fetchUser(userId) {
        const { user } = await api.users.get(userId);
        setUser(user);
    }

    useEffect(() => {
        fetchUser(userId);

        //TODO: open socket to listen for user changes

        return function cleanup() {
            //TODO: close socket connection
        }
    }, [userId]);

    return (
        <>
            <Heading3>User</Heading3>
            {!user ? <Heading1>Loading</Heading1> : <UserProfile user={user} admin />}
        </>
    );
}

export default UserPage;
