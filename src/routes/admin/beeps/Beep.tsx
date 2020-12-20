/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import api from '../../../api'
import { Beep } from '../../../types/Beep';

import { Heading3 } from '../../../components/Typography';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function BeepPage(props) {

    const { beepId } = useParams<{ beepId: string }>();
    const [ beep, setBeep ] = useState<Beep>(null);

    async function fetchBeep(beepId) {
        // const { beep } = await api.beeps.get(beepId);
        // setBeep(beep);
    }

    useEffect(() => {
        // fetchBeep(beepId);
    }, [beepId]);

    return (
        <>
            <Heading3>Beep</Heading3>

            <MapContainer center={[36.2145799,-81.6806805]} zoom={17} scrollWheelZoom className="h-screen">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={[]}>
                    <Popup>
                        Origin
                    </Popup>
                </Marker> */}
            </MapContainer>
        </>
    )
}

export default BeepPage;
