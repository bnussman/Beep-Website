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

    return <>
        <Header>Users</Header>

        <Card>
            <Table>
                <THead>
                    <TH>User</TH>
                    <TH>Email</TH>
                    <TH>Phone</TH>
                    <TH>Verified?</TH>
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
                                    subtitle={`@${user.username}`}>
                                </TDProfile>
                                <TDText>{user.email}</TDText>
                                <TDText>{formatPhone(user.phone)}</TDText>
                                <TDText>{user.verified ? 'Yes' : 'No'}</TDText>
                                <TDText>{user.isBeeping ? 'Yes' : 'No'}</TDText>
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