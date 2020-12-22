import React, { useEffect, useState } from 'react'

import api from '../../../api';
import User from '../../../types/User';

import { formatPhone } from '../../../utils/formatters';

import { Heading3 } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDProfile, TDText } from '../../../components/Table';
import { Badge, Indicator } from '../../../components/Indicator';
import Pagination from '../../../components/Pagination';


function Users() {

    const [users, setUsers] = useState<User[]>([]);
    const [resultCount, setResultCount] = useState<number>(0);
    const pageLimit = 25;

    async function fetchUsers(page) {
        const { users, total } = await api.users.list(page, pageLimit);
        setUsers(users);
        setResultCount(total);
    }

    useEffect(() => {
        fetchUsers(1);
    }, []);

    const Yes = () => <div className="rounded-full bg-green-500 h-3 shadow w-3 shadow flex items-center justify-center..."></div>;
    const No = () => <div className="rounded-full bg-red-500 h-3 shadow w-3 shadow flex items-center justify-center..."> </div>;

    return <>
        <Heading3>Users</Heading3>

        <Pagination resultCount={resultCount} limit={pageLimit} onPageChange={fetchUsers}></Pagination>

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
                                <TDText>
                                    {user.isStudent
                                        ? <Indicator color='green' />
                                        : <Indicator color='red' />
                                    }
                                </TDText>
                                <TDText>
                                    {user.isEmailVerified
                                        ? <Indicator color='green' />
                                        : <Indicator color='red' />
                                    }
                                </TDText>
                                <TDText>
                                    {user.isBeeping
                                        ? <Indicator color='green' />
                                        : <Indicator color='red' />
                                    }
                                </TDText>
                                <TDText>
                                    <Badge>{user.userLevel === 0 ? 'normal' : 'admin'}</Badge>
                                </TDText>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>

        <Pagination resultCount={resultCount} limit={pageLimit} onPageChange={fetchUsers}></Pagination>
    </>;
}

export default Users;
