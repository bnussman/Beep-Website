import React from 'react'
import { NavLink, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Body1, Heading1, Heading3, Heading5 } from '../../../components/Typography';
import {Card} from '../../../components/Card';
import {gql, useQuery} from '@apollo/client';
import {GetBeepQuery} from '../../../generated/graphql';

dayjs.extend(duration);

const GetBeep = gql`
    query GetBeep($id: String!) {
        getBeep(id: $id) {
            id
            origin
            destination
            timeEnteredQueue
            doneTime
            groupSize
            beeper {
                id
                first
                last
                photoUrl
                username
            }
            rider {
                id
                first
                last
                photoUrl
                username
            }
        }
    }
`;

function BeepPage() {
    const { beepId } = useParams<{ beepId: string }>();
    const { data, loading, error } = useQuery<GetBeepQuery>(GetBeep, { variables: { id: beepId}});

    return (
        <>
            <Heading3>Beep</Heading3>
            {data?.getBeep ?
                <div>
                    <iframe
                        className="mb-4"
                        title="Map"
                        width="100%"
                        height="300"
                        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBgabJrpu7-ELWiUIKJlpBz2mL6GYjwCVI&origin=${data.getBeep.origin}&destination=${data.getBeep.destination}`}>
                    </iframe>

                    <div className="flex flex-wrap">
                        <Card className="mb-4 flex-grow sm:mr-2">
                            <div className="m-4">
                                <Heading5>Beeper</Heading5>
                                <div className="flex flex-row items-center">
                                    {data.getBeep.beeper.photoUrl && (
                                        <div className="flex mr-3">
                                            <img className="h-10 w-10 shadow-lg rounded-full" src={data.getBeep.beeper.photoUrl} alt={`${data.getBeep.beeper.first} ${data.getBeep.beeper.last}`}></img>
                                        </div>
                                    )}
                                    <NavLink to={`/admin/users/${data.getBeep.beeper.id}`}>
                                        {data.getBeep.beeper.first} {data.getBeep.beeper.last}
                                    </NavLink>
                                </div>
                            </div>
                        </Card>
                        <Card className="mb-4 flex-grow">
                            <div className="m-4">
                                <Heading5>Rider</Heading5>
                                <div className="flex flex-row items-center">
                                    {data.getBeep.rider.photoUrl && (
                                        <div className="flex mr-3">
                                            <img className="h-10 w-10 shadow-lg rounded-full" src={data.getBeep.rider.photoUrl} alt={`${data.getBeep.rider.first} ${data.getBeep.rider.last}`}></img>
                                        </div>
                                    )}
                                    <NavLink to={`/admin/users/${data.getBeep.rider.id}`}>
                                        {data.getBeep.rider.first} {data.getBeep.rider.last}
                                    </NavLink>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex flex-wrap">
                        <Card className="mb-4 flex-grow sm:mr-2">
                            <div className="p-4">
                                <Heading5>Origin</Heading5>
                                <Body1>{data.getBeep.origin}</Body1>  
                            </div>
                        </Card>
                        <Card className="mb-4 flex-grow">
                            <div className="p-4">
                                <Heading5>Destination</Heading5>
                                <Body1>{data.getBeep.destination}</Body1>  
                            </div>
                        </Card>
                    </div>
                    <Card className="mb-4">
                        <div className="p-4">
                        <Heading5>Group Size</Heading5>
                        <Body1>{data.getBeep.groupSize}</Body1>  
                        </div>
                    </Card>
                    <div className="flex flex-wrap">
                        <Card className="mb-4 flex-grow sm:mr-2">
                            <div className="p-4">
                                <Heading5>Beep Started</Heading5>
                                <Body1>{new Date(data.getBeep.timeEnteredQueue).toLocaleString()} - {dayjs().to(data.getBeep.timeEnteredQueue)}</Body1>  
                            </div>
                        </Card>
                        <Card className="mb-4 flex-grow">
                            <div className="p-4">
                                <Heading5>Beep Ended</Heading5>
                                <Body1>{new Date(data.getBeep.doneTime).toLocaleString()} - {dayjs().to(data.getBeep.doneTime)}</Body1>  
                            </div>
                        </Card>
                    </div>
                </div>
            :
            <Heading1>Loading</Heading1>
            }
        </>
    )
}

export default BeepPage;
