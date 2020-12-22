import React, { useContext } from 'react'
import { UserContext } from '../UserContext';
import UserProfile from '../components/UserProfile';

function Profile(props) {
    const { user } = useContext(UserContext);

    console.log(user);

    return (
        <div className="container mx-auto">
            <UserProfile user={user} />
        </div>
    );
}

export default Profile;
