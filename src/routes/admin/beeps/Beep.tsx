import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import api from '../../../api'
import { Beep } from '../../../types/Beep';
import { Body1, Heading1, Heading3, Heading5 } from '../../../components/Typography';
import {Card} from '../../../components/Card';

dayjs.extend(duration);

function BeepPage() {

    const { beepId } = useParams<{ beepId: string }>();
    const [ beep, setBeep ] = useState<Beep>(null);

    async function fetchBeep(beepId: string) {
        const { beep } = await api.beeps.get(beepId);
        setBeep(beep);
    }

    useEffect(() => {
        fetchBeep(beepId);
    }, [beepId]);

    return (
        <>
            <Heading3>Beep</Heading3>
            {beep ?
                <div>
                    <iframe
                        className="mb-4"
                        title="Map"
                        width="100%"
                        height="300"
                        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBgabJrpu7-ELWiUIKJlpBz2mL6GYjwCVI&origin=${beep?.origin}&destination=${beep?.destination}`}>
                    </iframe>

                    <div className="flex flex-wrap">
                        <Card className="mb-4 flex-grow sm:mr-2">
                            <div className="m-4">
                                <Heading5>Beeper</Heading5>
                                <div className="flex flex-row items-center">
                                    {beep.beeper.photoUrl && (
                                        <div className="flex mr-3">
                                            <img className="h-10 w-10 shadow-lg rounded-full" src={beep.beeper.photoUrl} alt={`${beep.beeper.first} ${beep.beeper.last}`}></img>
                                        </div>
                                    )}
                                    <NavLink to={`/admin/users/${beep.beeper.id}`}>
                                        {beep.beeper.first} {beep.beeper.last}
                                    </NavLink>
                                </div>
                            </div>
                        </Card>
                        <Card className="mb-4 flex-grow">
                            <div className="m-4">
                                <Heading5>Rider</Heading5>
                                <div className="flex flex-row items-center">
                                    {beep.rider.photoUrl && (
                                        <div className="flex mr-3">
                                            <img className="h-10 w-10 shadow-lg rounded-full" src={beep.rider.photoUrl} alt={`${beep.rider.first} ${beep.rider.last}`}></img>
                                        </div>
                                    )}
                                    <NavLink to={`/admin/users/${beep.rider.id}`}>
                                        {beep.rider.first} {beep.rider.last}
                                    </NavLink>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex flex-wrap">
                        <Card className="mb-4 flex-grow sm:mr-2">
                            <div className="p-4">
                                <Heading5>Origin</Heading5>
                                <Body1>{beep.origin}</Body1>  
                            </div>
                        </Card>
                        <Card className="mb-4 flex-grow">
                            <div className="p-4">
                                <Heading5>Destination</Heading5>
                                <Body1>{beep.destination}</Body1>  
                            </div>
                        </Card>
                    </div>
                    <Card className="mb-4">
                        <div className="p-4">
                        <Heading5>Group Size</Heading5>
                        <Body1>{beep.groupSize}</Body1>  
                        </div>
                    </Card>
                    <div className="flex flex-wrap">
                        <Card className="mb-4 flex-grow sm:mr-2">
                            <div className="p-4">
                                <Heading5>Beep Started</Heading5>
                                <Body1>{new Date(beep.timeEnteredQueue).toLocaleString()} - {dayjs().to(beep.timeEnteredQueue)}</Body1>  
                            </div>
                        </Card>
                        <Card className="mb-4 flex-grow">
                            <div className="p-4">
                                <Heading5>Beep Ended</Heading5>
                                <Body1>{new Date(beep.doneTime).toLocaleString()} - {dayjs().to(beep.doneTime)}</Body1>  
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
