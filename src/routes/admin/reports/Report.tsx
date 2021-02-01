import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from '../../../api';
import { Report } from '../../../types/Report';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Heading3, Body1, Heading5, Heading1 } from '../../../components/Typography';
import { Indicator } from '../../../components/Indicator';
import { Button } from '../../../components/Input';
import { Formik, Form, Field } from 'formik';
import APIResultBanner from '../../../components/APIResultBanner';
import {Card} from '../../../components/Card';

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


    return (
        <>
        <Heading3>Report</Heading3>
        {response && <APIResultBanner response={response} setResponse={setResponse}/>}

        {report ?
            <>
                <div className="flex flex-wrap">
                    <Card className="mb-4 flex-grow sm:mr-2">
                        <div className="m-4">
                            <Heading5>Reporter</Heading5>
                            <div className="flex flex-row items-center">
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
                    </Card>
                    <Card className="mb-4 flex-grow">
                        <div className="m-4">
                            <Heading5>Reported</Heading5>
                            <div className="flex flex-row items-center">
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
                    </Card>
                </div>
                <Card className="mb-4">
                    <div className="m-4">
                        <Heading5>Reason</Heading5>
                        <Body1>{report.reason}</Body1>  
                    </div>
                </Card>
            {/*
            <Heading5>Admin's Notes</Heading5>
            <Body2>{report.adminNotes || "N/A"}</Body2>  
              */}
                <Card className="mb-4">
                    <div className="m-4">
                        <Heading5>Created</Heading5>
                        <Body1>{dayjs().to(report.timestamp)}</Body1>  
                    </div>
                </Card>
                <Card className="mb-4">
                    <div className="m-4">
                        <Heading5>Associated Beep Event</Heading5>
                        <NavLink to={`/admin/beeps/${report.beepEventId}`}>
                            {report.beepEventId}  
                        </NavLink>
                    </div>
                </Card>
                <Card className="mb-4">
                    <div className="m-4">
                        {report.handled ?
                            <div>
                                <div>
                                    <Heading5>Status</Heading5>
                                </div>
                                <div className="flex flex-row items-center">
                                    <Indicator color='green' className="mr-2"/>
                                    <span className="mr-2">Handled by</span>
                                    <div className="flex flex-row items-center">
                                        {report.handledBy.photoUrl && (
                                            <div className="flex mr-3">
                                                <img className="h-10 w-10 shadow-lg rounded-full" src={report.handledBy.photoUrl} alt={`${report.handledBy.first} ${report.handledBy.last}`}></img>
                                            </div>
                                        )}
                                        <NavLink to={`/admin/users/${report.handledBy.id}`}>
                                            {report.handledBy.first} {report.handledBy.last}
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                <div>
                                    <Heading5>Status</Heading5>
                                </div>
                                <Indicator color='red' className="mr-2"/>
                                <span>Not handled</span>
                            </>
                        }
                    </div>
                </Card>
            <div className="mt-8">
            <Heading3>Update Report Info</Heading3>
            <Formik
                initialValues={{
                    notes: report.notes,
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
                            <Field type="text" component="textarea" name="notes" className="h-32 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"/>
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
                        <Button onClick={() => deleteReport(reportId)} className="text-white bg-red-500 hover:bg-red-700">Delete Report</Button>
                    </Form>
                )}
            </Formik>
            </div>
        </>
        :
        <Heading1>Loading</Heading1>
        }
    </>
)}

export default ReportPage;
