import React, {useEffect, useState} from 'react'

import api from '../../../api';
import { Report } from '../../../types/Report';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDText, TDButton, TDProfile } from '../../../components/Table';
import { Heading3 } from '../../../components/Typography';
import { Indicator } from '../../../components/Indicator';
import Pagination from '../../../components/Pagination';

dayjs.extend(relativeTime);

function Reports() {

    const [ reports, setReports ] = useState<Report[]>([]);
    const [resultCount, setResultCount] = useState<number>(0);
    const pageLimit = 25;

    async function fetchReports(page) {
        const { reports, total } = await api.reports.list(page, pageLimit);
        setReports(reports);
        setResultCount(total);
    }

    useEffect(() => {
        fetchReports(1);
    }, []);

    return <>
        <Heading3>Reports</Heading3>

        <Pagination resultCount={resultCount} limit={pageLimit} onPageChange={fetchReports}></Pagination>

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

        <Pagination resultCount={resultCount} limit={pageLimit} onPageChange={fetchReports}></Pagination>
    </>;
}

export default Reports;
