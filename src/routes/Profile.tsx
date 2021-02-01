import React, { useContext } from 'react'
import { UserContext } from '../UserContext';
import UserProfile from '../components/UserProfile';
import { Heading3 } from '../components/Typography';

function Profile(props) {
    const { user } = useContext(UserContext);

    return (
        <div className="container mx-auto">
            <Heading3>My profile</Heading3>
            <UserProfile user={user.user} />
        </div>
    );
}

export default Profile;
