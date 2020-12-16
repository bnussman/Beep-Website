import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { reportsSelector, fetchReports } from '../../store/slices/reports';

import { Card } from '../../components/Card';
import { Table, THead, TH, TBody, TR, TDProfile, TDText, TDBadge, TDButton } from '../../components/Table';
import { Header } from '../../components/Typography';


function Reports() {
    const dispatch = useDispatch();
    const { reports, loading, hasErrors } = useSelector(reportsSelector);

    useEffect(() => {
        dispatch(fetchReports());
    }, [dispatch]);

    return <>
        <Header>Reports</Header>
        {reports && <p className="mx-2 mb-4 text-gray-600">Total: {reports.length}</p>}

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
                                <TDText>{new Date(report.timestamp).toLocaleString()}</TDText>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    </>;
}

export default Reports;
