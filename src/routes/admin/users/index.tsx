import React, { useEffect, useState } from 'react'
import api from '../../../api';
import User from '../../../types/User';
import { formatPhone } from '../../../utils/formatters';
import { Heading1, Heading3 } from '../../../components/Typography';
import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDProfile, TDText } from '../../../components/Table';
import { Indicator } from '../../../components/Indicator';
import Pagination from '../../../components/Pagination';
import { TextInput } from '../../../components/Input';

function Users() {

    const [users, setUsers] = useState<User[] | null>(null),
          [currentPage, setCurrentPage] = useState<number>(1),
          [resultCount, setResultCount] = useState<number>(0),
          pageLimit = 25;

    async function fetchUsers(page: number, search?: string) {
        const { users, total } = await api.users.list(page, pageLimit, search);
        setUsers(users);
        setResultCount(total);
    }

    useEffect(() => {
        fetchUsers(0);
    }, []);

    return <>
        <Heading3>Users</Heading3>

        <Pagination
            resultCount={resultCount}
            limit={pageLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={fetchUsers}
        />
        <TextInput
            className="mb-4"
            placeholder="Search"
            onChange={(value) => fetchUsers(0, value.target.value)} 
        />
        <Card>
            <Table>
                <THead>
                    <TH>User</TH>
                    <TH>Email</TH>
                    <TH>Phone</TH>
                    <TH>Is Student?</TH>
                    <TH>Is Email Verified?</TH>
                    <TH>Is beeping?</TH>
                </THead>
                <TBody>
                    {users ? (users).map(user => {
                        return (
                            <TR key={user.id}>
                                <TDProfile
                                    to={`users/${user.id}`}
                                    photoUrl={user.photoUrl}
                                    title={`${user.first} ${user.last}`}
                                    subtitle={`@${user.username}`}>
                                </TDProfile>
                                <TDText><a href={`mailto:${user.email}`} rel="noreferrer" target="_blank">{user.email}</a></TDText>
                                <TDText>{formatPhone(user.phone)}</TDText>
                                <TDText>
                                    {user.isStudent
                                        ? <Indicator color="green" />
                                        : <Indicator color="red" />
                                    }
                                </TDText>
                                <TDText>
                                    {user.isEmailVerified
                                        ? <Indicator color="green" />
                                        : <Indicator color="red" />
                                    }
                                </TDText>
                                <TDText>
                                    {user.isBeeping
                                        ? <Indicator color="green" className="animate-pulse" />
                                        : <Indicator color="red" />
                                    }
                                </TDText>
                            </TR>
                        )
                    }) :
                        <Heading1>Loading</Heading1>
                    }
                </TBody>
            </Table>
        </Card>

        <Pagination
            resultCount={resultCount}
            limit={pageLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={fetchUsers}/>
    </>;
}

export default Users;
