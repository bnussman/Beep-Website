import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";

import api from '../../../api';
import { Report } from '../../../types/Report';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Heading3, Body1, Body2 } from '../../../components/Typography';

dayjs.extend(relativeTime);

function ReportPage(props) {

    const { reportId } = useParams<{reportId: string}>();
    const [ report, setReport ] = useState<Report>(null);

    async function fetchReport(reportId) {
        const { report } = await api.reports.get(reportId);
        const { user: reporter } = await api.users.get(report.reporterId);
        const { user: reported } = await api.users.get(report.reportedId);
        report.reporter = reporter;
        report.reported = reported;
        setReport(report);
    }

    useEffect(() => {
        fetchReport(reportId);
    }, [reportId]);

    return report && (
        <>
            <Heading3>Report</Heading3>    
            <Body2>{report.reason}</Body2>  
            <Body2>{report.adminNotes}</Body2>  
            <Body1>{dayjs().to(report.timestamp)}</Body1>  
            <Body1>
                <NavLink to={`/admin/users/${report.reporter.id}`}>
                    {report.reporter.first} {report.reporter.last}
                </NavLink>
            </Body1>
            <Body1>
                <NavLink to={`/admin/users/${report.reported.id}`}>
                    {report.reported.first} {report.reported.last}
                </NavLink>
            </Body1>
            <Body1>{report.handled ? '✔ Handled' : '❗ Not handled'}</Body1>
        </>
    );
}

export default ReportPage;
