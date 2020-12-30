/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import api from '../../../api'
import { Beep } from '../../../types/Beep';

import { Heading3 } from '../../../components/Typography';

function BeepPage() {

    const { beepId } = useParams<{ beepId: string }>();
    const [ beep, setBeep ] = useState<Beep>(null);

    async function fetchBeep(beepId: string) {
        const { beep } = await api.beeps.get(beepId);
        setBeep(beep);
        console.log(beep);
    }

    useEffect(() => {
        fetchBeep(beepId);
    }, [beepId]);

    return (
        <>
            <Heading3>Beep</Heading3>
            <iframe
                title="Map"
                width="100%"
                height="450"
                src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBgabJrpu7-ELWiUIKJlpBz2mL6GYjwCVI&origin=${beep?.origin}&destination=${beep?.destination}`}>
            </iframe>
        </>
    )
}

export default BeepPage;
