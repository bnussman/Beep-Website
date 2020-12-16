import React, { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux';

// import { usersSelector, fetchUsers } from '../../../store/slices/users';

import { Header } from '../../../components/Typography';
// import { Card } from '../../../components/Card';
// import { Table, THead, TH, TBody, TR, TDProfile, TDText, TDBadge, TDButton } from '../../../components/Table';

function Users() {
    
    // const dispatch = useDispatch();
    // const { users, hasErrors } = useSelector(usersSelector);

    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, [dispatch]);

    // function formatPhone(phone) {
    //     return `(${phone.substring(0,3)}) ${phone.substring(3,6)}-${phone.substring(6,10)}`;
    // }

    // const Yes = () => <div className="rounded-full bg-green-500 h-3 shadow w-3 shadow flex items-center justify-center..."></div>;
    // const No = () => <div className="rounded-full bg-red-500 h-3 shadow w-3 shadow flex items-center justify-center..."> </div>;

    return <>
        <Header>User</Header>
    </>;
}

export default Users;
