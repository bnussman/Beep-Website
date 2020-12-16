import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { usersSelector, fetchUsers } from '../../store/slices/users';

import { Header } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Table, THead, TH, TBody, TR, TDProfile, TDText, TDBadge, TDButton } from '../../components/Table';

function Users() {
    
    const dispatch = useDispatch();
    const { users, loading, hasErrors } = useSelector(usersSelector);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    function formatPhone(phone) {
        return `(${phone.substring(0,3)}) ${phone.substring(3,6)}-${phone.substring(6,10)}`;
    }

    const Yes = () => <div className="rounded-full bg-green-500 h-3 shadow w-3 shadow flex items-center justify-center..."></div>;
    const No = () => <div className="rounded-full bg-red-500 h-3 shadow w-3 shadow flex items-center justify-center..."> </div>;


    return <>
        <Header>Users</Header>
        {users && <p className="mx-2 mb-4 text-gray-600">Total: {users.length}</p>}

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
                                    photoUrl={user.photoUrl}
                                    title={`${user.first} ${user.last} ${user.isStudent ? '🎓' : ''}`}
                                    subtitle={`@${user.username}`}
                                    subtitle2={`${user.id}`}>
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
