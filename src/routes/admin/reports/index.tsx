import React, {useEffect, useState} from 'react'

import api from '../../../api';
import { ReportData } from '../../../types/Report';

import { NavLink } from 'react-router-dom';
import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDText, TDButton, TDProfile } from '../../../components/Table';
import { Heading3 } from '../../../components/Typography';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function Reports() {

    const [ reports, setReports ] = useState<ReportData[]>([]);

    async function fetchReports() {
        const { reports } = await api.reports.list();
        setReports(reports);
    }

    useEffect(() => {
        fetchReports();
    }, []);

    //yeah I should make this a component
    const Yes = () => <div className="rounded-full bg-green-500 h-3 shadow w-3 shadow flex items-center justify-center..."></div>;
    const No = () => <div className="rounded-full bg-red-500 h-3 shadow w-3 shadow flex items-center justify-center..."> </div>;

    return <>
        <Heading3>Reports</Heading3>

        <Card>
            <Table>
                <THead>
                    <TH>Reporter</TH>
                    <TH>Reported User</TH>
                    <TH>Reason</TH>
                    <TH>Date</TH>
                    <TH>Handled?</TH>
                    <TH></TH>
                </THead>
                <TBody>
                    {reports && (reports).map(reportEntry => {
                        return (
                            <TR key={reportEntry.report.id}>
                                <TDProfile
                                    to={`users/${reportEntry.reporter.id}`}
                                    photoUrl={reportEntry.reporter.photoUrl}
                                    title={`${reportEntry.reporter.first} ${reportEntry.reporter.last}`}
                                    subtitle={`@${reportEntry.reporter.username}`}>
                                </TDProfile>
                                <TDProfile
                                    to={`users/${reportEntry.reported.id}`}
                                    photoUrl={reportEntry.reported.photoUrl}
                                    title={`${reportEntry.reported.first} ${reportEntry.reported.last}`}
                                    subtitle={`@${reportEntry.reported.username}`}>
                                </TDProfile>
                                <TDText>{reportEntry.report.reason}</TDText>
                                <TDText>{dayjs().to(reportEntry.report.timestamp)}</TDText>
                                <TDText>{reportEntry.report.handled ? <Yes/> : <No/>}</TDText>
                                <TDButton to={`reports/${reportEntry.report.id}`}>View</TDButton>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    </>;
}

export default Reports;
