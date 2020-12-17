import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { reportsSelector, fetchReports } from '../../../store/slices/reports';

import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDProfile, TDText, TDBadge, TDButton } from '../../../components/Table';
import { Heading1 } from '../../../components/Typography';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

function Reports() {
    const dispatch = useDispatch();
    const { reports } = useSelector(reportsSelector);

    useEffect(() => {
        dispatch(fetchReports());
    }, []);

    return <>
        <Heading1>Reports</Heading1>

        <Card>
            <Table>
                <THead>
                    <TH>Reporter</TH>
                    <TH>Reported User</TH>
                    <TH>Reason</TH>
                    <TH>Date</TH>
                </THead>
                <TBody>
                    {reports && (reports).map(report => {
                        return (
                            <TR key={report.id}>
                                <TDText>{report.reporterId}</TDText>
                                <TDText>{report.reportedId}</TDText>
                                <TDText>{report.reason}</TDText>
                                <TDText>{dayjs().to(report.timestamp)}</TDText>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    </>;
}

export default Reports;
