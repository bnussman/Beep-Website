import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { userSelector, fetchUser } from '../../../store/slices/users';

import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Subtitle, Body1, Body2, Caption } from '../../../components/Typography';

function User(props) {

    const { userId } = useParams<{userId: string}>();

    const dispatch = useDispatch();
    const user = useSelector(userSelector(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, []);

    return <>
        <Heading1>This is a heading 1</Heading1>
        <Heading2>This is a heading 2</Heading2>
        <Heading3>This is a heading 3</Heading3>
        <Heading4>This is a heading 4</Heading4>
        <Heading5>This is a heading 5</Heading5>
        <Heading6>This is a heading 6</Heading6>
        <Subtitle>Subtitle 1</Subtitle>
        <Body1>Body 1</Body1>
        <Body2>Body 2</Body2>
        <Caption>Caption</Caption>

        {user && (
            <>
                <img className="inline-block h-32 w-32 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                <p>{user.id}</p>
                <p>{user.first} {user.last}</p>
            </>
        )}
    </>;
}

export default User;
