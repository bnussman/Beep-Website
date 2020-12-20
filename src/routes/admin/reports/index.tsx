import React, {useEffect, useState} from 'react'

import api from '../../../api';
import Report from '../../../types/Report';

import { NavLink } from 'react-router-dom';
import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDText, TDButton } from '../../../components/Table';
import { Heading3 } from '../../../components/Typography';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function Reports() {

    const [ reports, setReports ] = useState<Report[]>([]);

    async function fetchReports() {
        const { reports } = await api.reports.list();
        setReports(reports);
    }

    useEffect(() => {
        fetchReports();
    }, []);

    return <>
        <Heading3>Reports</Heading3>

        <Card>
            <Table>
                <THead>
                    <TH>Reporter</TH>
                    <TH>Reported User</TH>
                    <TH>Reason</TH>
                    <TH>Date</TH>
                    <TH></TH>
                </THead>
                <TBody>
                    {reports && (reports).map(report => {
                        return (
                            <TR key={report.id}>
                                <TDText><NavLink to={`users/${report.reporterId}`}>{report.reporterId}</NavLink></TDText>
                                <TDText><NavLink to={`users/${report.reportedId}`}>{report.reportedId}</NavLink></TDText>
                                <TDText>{report.reason}</TDText>
                                <TDText>{dayjs().to(report.timestamp)}</TDText>
                                <TDButton to={`reports/${report.id}`}>View</TDButton>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    </>;
}

export default Reports;
