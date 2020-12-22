import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import api from '../../../api';
import User from '../../../types/User';
import UserProfile from '../../../components/UserProfile';

function UserPage(props) {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User>(null);

    async function fetchUser(userId) {
        const { user } = await api.users.get(userId);
        console.log(user)
        setUser(user);
    }

    useEffect(() => {
        fetchUser(userId);
    }, [userId]);

    return <UserProfile user={user} admin/>;
}

export default UserPage;
