import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { userSelector, fetchUser } from '../../../store/slices/users';

import { Heading3, Subtitle, Body1 } from '../../../components/Typography';

import { formatPhone } from '../../../utils/formatters';

function User(props) {

    const { userId } = useParams<{userId: string}>();

    const dispatch = useDispatch();
    const user = useSelector(userSelector(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, []);

    return <>

        {user && (
            <div className="flex flex-row">
                <div className="flex flex-wrap content-center">
                    <img className="h-40 w-40 shadow-lg rounded-full" src={user.photoUrl} alt={`${user.first} ${user.last}`}></img>
                </div>
                <div className="px-6 pb-2 flex flex-col justify-center">
                    <Heading3>{user.first} {user.last}</Heading3>
                    <Subtitle>@{user.username}</Subtitle>
                    <Subtitle><a href={`mailto:${user.email}`}>{user.email}</a></Subtitle>
                    <Subtitle>{formatPhone(user.phone)}</Subtitle>
                    <Body1>{user.id}</Body1>
                </div>
            </div>
        )}
    </>;
}

export default User;
