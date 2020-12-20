import React, {useEffect, useState} from 'react'

import api from '../../../api';
import { Report } from '../../../types/Report';

import { NavLink } from 'react-router-dom';
import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDText, TDButton, TDProfile } from '../../../components/Table';
import { Heading3 } from '../../../components/Typography';
import { Indicator } from '../../../components/Indicator';

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
                    <TH>Handled?</TH>
                    <TH></TH>
                </THead>
                <TBody>
                    {reports && (reports).map(report => {
                        return (
                            <TR key={report.id}>
                                <TDProfile
                                    to={`users/${report.reporter.id}`}
                                    photoUrl={report.reporter.photoUrl}
                                    title={`${report.reporter.first} ${report.reporter.last}`}
                                    subtitle={`@${report.reporter.username}`}>
                                </TDProfile>
                                <TDProfile
                                    to={`users/${report.reported.id}`}
                                    photoUrl={report.reported.photoUrl}
                                    title={`${report.reported.first} ${report.reported.last}`}
                                    subtitle={`@${report.reported.username}`}>
                                </TDProfile>
                                <TDText>{report.reason}</TDText>
                                <TDText>{dayjs().to(report.timestamp)}</TDText>
                                <TDText>
                                    { report.handled
                                        ? <Indicator color='green'/>
                                        : <Indicator color='red'/>
                                    }
                                </TDText>
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
