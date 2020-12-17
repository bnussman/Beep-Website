import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { userSelector, fetchUser } from '../../../store/slices/users';

import { Header } from '../../../components/Typography';

function User(props) {

    const { userId } = useParams<{userId: string}>();

    const dispatch = useDispatch();
    const user = useSelector(userSelector(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, []);

    return <>
        <Header>User</Header>

        {user && (
            <>
                <p>{user.id}</p>
                <p>{user.first} {user.last}</p>
            </>
        )}
    </>;
}

export default User;
