import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import api from '../../../api'
import { Beep } from '../../../types/Beep';
import { Body1, Heading1, Heading3, Heading5 } from '../../../components/Typography';

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
                        title="Map"
                        width="100%"
                        height="300"
                        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBgabJrpu7-ELWiUIKJlpBz2mL6GYjwCVI&origin=${beep?.origin}&destination=${beep?.destination}`}>
                    </iframe>
                    <Heading5>Origin</Heading5>
                    <Body1>{beep.origin}</Body1>  
                    <Heading5>Destination</Heading5>
                    <Body1>{beep.destination}</Body1>  
                    <Heading5>Group Size</Heading5>
                    <Body1>{beep.groupSize}</Body1>  
                    <Heading5>Beep Started</Heading5>
                    <Body1>{new Date(beep.timeEnteredQueue).toLocaleString()} - {dayjs().to(beep.timeEnteredQueue)}</Body1>  
                    <Heading5>Beep Ended</Heading5>
                    <Body1>{new Date(beep.doneTime).toLocaleString()} - {dayjs().to(beep.doneTime)}</Body1>  
                </div>
            :
            <Heading1>Loading</Heading1>
            }
        </>
    )
}

export default BeepPage;
