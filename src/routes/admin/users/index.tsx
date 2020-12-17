import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { usersSelector, fetchUsers } from '../../../store/slices/users';

import { Heading1 } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDProfile, TDText, TDBadge, TDButton } from '../../../components/Table';

function Users() {
    
    const dispatch = useDispatch();
    const { users } = useSelector(usersSelector);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    function formatPhone(phone) {
        return `(${phone.substring(0,3)}) ${phone.substring(3,6)}-${phone.substring(6,10)}`;
    }

    const Yes = () => <div className="rounded-full bg-green-500 h-3 shadow w-3 shadow flex items-center justify-center..."></div>;
    const No = () => <div className="rounded-full bg-red-500 h-3 shadow w-3 shadow flex items-center justify-center..."> </div>;

    return <>
        <Heading1>Users</Heading1>

        <Card>
            <Table>
                <THead>
                    <TH>User</TH>
                    <TH>Email</TH>
                    <TH>Phone</TH>
                    <TH>Is Student?</TH>
                    <TH>Is Email Verified?</TH>
                    <TH>Is beeping?</TH>
                    <TH>User level</TH>
                </THead>
                <TBody>
                    {users && (users).map(user => {
                        return (
                            <TR key={user.id}>
                                <TDProfile
                                    to={`users/${user.id}`}
                                    photoUrl={user.photoUrl}
                                    title={`${user.first} ${user.last}`}
                                    subtitle={`@${user.username}`}>
                                </TDProfile>
                                <TDText><a href={`mailto:${user.email}`} target="_blank">{user.email}</a></TDText>
                                <TDText>{formatPhone(user.phone)}</TDText>
                                <TDText>{user.isStudent ? <Yes/> : <No/>}</TDText>
                                <TDText>{user.isEmailVerified ? <Yes/> : <No/>}</TDText>
                                <TDText>{user.isBeeping ? <Yes/> : <No/>}</TDText>
                                <TDBadge>
                                    {user.userLevel}
                                </TDBadge>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    </>;
}

export default Users;
