import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import api from '../../../api';
import { Report } from '../../../types/Report';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Heading3, Body1, Body2, Heading5 } from '../../../components/Typography';
import { Indicator } from '../../../components/Indicator';
import { Button } from '../../../components/Input';
import { Formik, Form, Field } from 'formik';
import { Error } from "../../../utils/errors";

dayjs.extend(relativeTime);

function ReportPage(props) {

    const { reportId } = useParams<{reportId: string}>();
    const [ report, setReport ] = useState<Report>(null);
    const history = useHistory();
    const [response, setResponse] = useState<any>(null);

    async function deleteReport(id: string) {
        await api.reports.delete(id);
        history.goBack();
    }

    async function fetchReport() {
        const { report } = await api.reports.get(reportId);
        const { user: reporter } = await api.users.get(report.reporterId);
        const { user: reported } = await api.users.get(report.reportedId);
        report.reporter = reporter;
        report.reported = reported;
        setReport(report);
    }

    async function updateReport(values) {
        const data = await api.reports.updateReport(reportId, values);
        setResponse(data);
        if (data.status === "success") {
            fetchReport();
        }
    }

    useEffect(() => {
        fetchReport();
    }, []);

    return report && (
        <> 
            <Heading3>Report</Heading3>
            {response &&
            <div role="alert" className="mb-4" onClick={() => setResponse(null)}>
                <div className={response.status === "success" ?
                    "bg-green-500 text-white font-bold rounded-t px-4 py-2"
                    :
                        response.status === "warning" ?
                        "bg-yellow-500 text-white font-bold rounded-t px-4 py-2"
                        :
                            "bg-red-500 text-white font-bold rounded-t px-4 py-2"
                    }>
                    Edit profile {response.status}
                </div>
                <div className={response.status === "success" ?
                    "border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700"
                    :
                        response.status === "warning" ?
                        "border border-t-0 border-yellow-400 rounded-b bg-yellow-100 px-4 py-3 text-yellow-700"
                        :
                            "border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
                    }>
                    <Error error={response.message} />
                </div>
            </div>
            }
            <div className="flex flex-row">
                <div className="w-6/12">
                    <Heading5>Reporter</Heading5>
                    <div className="flex flex-row">
                    {report.reporter.photoUrl && (
                        <div className="flex mr-3">
                            <img className="h-10 w-10 shadow-lg rounded-full" src={report.reporter.photoUrl} alt={`${report.reporter.first} ${report.reporter.last}`}></img>
                        </div>
                    )}
                    <NavLink to={`/admin/users/${report.reporter.id}`}>
                        {report.reporter.first} {report.reporter.last}
                    </NavLink>
                    </div>
                </div>
                <div>
                    <Heading5>Reported</Heading5>
                    <div className="flex flex-row">
                    {report.reported.photoUrl && (
                        <div className="flex mr-3">
                            <img className="h-10 w-10 shadow-lg rounded-full" src={report.reported.photoUrl} alt={`${report.reported.first} ${report.reported.last}`}></img>
                        </div>
                    )}
                    <NavLink to={`/admin/users/${report.reported.id}`}>
                        {report.reported.first} {report.reported.last}
                    </NavLink>
                    </div>
                </div>
            </div>
            <Heading5>Reason</Heading5>
            <Body2>{report.reason}</Body2>  
            {/*
            <Heading5>Admin's Notes</Heading5>
            <Body2>{report.adminNotes || "N/A"}</Body2>  
              */}
            <Heading5>Created</Heading5>
            <Body1>{dayjs().to(report.timestamp)}</Body1>  
            <Heading5>Status</Heading5>
            { report.handled ?
                <>
                    <Indicator color='green' className="mr-2"/>
                    <span>Handled</span>
                </>
                :
                <>
                    <Indicator color='red' className="mr-2"/>
                    <span>Not handled</span>
                </>
            }
            <div className="mt-8">
            <Heading3>Update Report Info</Heading3>
            <Formik
                initialValues={{
                    adminNotes: report.adminNotes,
                    handled: report.handled
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    await updateReport(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Heading5>Admin Notes</Heading5>
                            <Field type="text" component="textarea" name="adminNotes" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"/>
                        </div>
                        <div>
                            <Heading5>Handled</Heading5>
                            <Field type="checkbox" name="handled"/>
                        </div>
                        <button
                            type="submit"
                            className={`mt-3 inline-flex justify-center py-2 px-4 mr-1 border  text-sm font-medium rounded-md text-white shadow-sm bg-yellow-500 hover:bg-yellow-600 focus:outline-white`}
                            disabled={isSubmitting}>
                            Update Report
                        </button>
                        <Button onClick={() => deleteReport(reportId)}>Delete Report</Button>
                    </Form>
                )}
            </Formik>
            </div>
        </>
    );
}

export default ReportPage;
