import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { reportsSelector, fetchReports } from '../../../store/slices/reports';

import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDText, TDButton } from '../../../components/Table';
import { Heading3 } from '../../../components/Typography';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NavLink } from 'react-router-dom';
dayjs.extend(relativeTime);

function Reports() {
    const dispatch = useDispatch();
    const { reports } = useSelector(reportsSelector);

    useEffect(() => {
        dispatch(fetchReports());
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
