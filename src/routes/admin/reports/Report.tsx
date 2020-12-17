import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { userSelector, fetchUser } from '../../../store/slices/users';

import { Heading3, Subtitle, Body1 } from '../../../components/Typography';

function Report(props) {

    const { reportId } = useParams<{reportId: string}>();

    // const dispatch = useDispatch();
    // const user = useSelector(userSelector(userId));

    useEffect(() => {
        // dispatch(fetchUser(userId));
    }, []);

    return <>
        <Heading3>Report</Heading3>        
        <Body1>{reportId}</Body1>
    </>;
}

export default Report;
