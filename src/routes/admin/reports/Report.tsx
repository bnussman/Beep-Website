import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";

import Report from '../../../types/Report';

import { Heading3, Body1 } from '../../../components/Typography';

function ReportPage(props) {

    const { reportId } = useParams<{reportId: string}>();


    useEffect(() => {
        // dispatch(fetchUser(userId));
    }, [reportId]);

    return <>
        <Heading3>Report</Heading3>        
        <Body1>{reportId}</Body1>
    </>;
}

export default ReportPage;
