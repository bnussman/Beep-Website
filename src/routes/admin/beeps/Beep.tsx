import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { beepSelector, fetchBeep } from '../../../store/slices/beeps';

import { Heading3, Subtitle, Body1, Body2 } from '../../../components/Typography';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function Report(props) {

    const { beepId } = useParams<{ beepId: string }>();

    const dispatch = useDispatch();
    const beep = useSelector(beepSelector(beepId));

    useEffect(() => {
        dispatch(fetchBeep(beepId));
    }, []);

    return (
        beep ? <>
            <Heading3>Beep</Heading3>

            <Body2>Origin: {beep.origin}</Body2>
            <Body2>Destination: {beep.originCoordinates[0].y}, {beep.originCoordinates[0].x}</Body2>
            <Body2>Group size: {beep.groupSize}</Body2>


            <MapContainer center={[beep.originCoordinates[0].y, beep.originCoordinates[0].x]} zoom={17} scrollWheelZoom className="h-screen">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[beep.originCoordinates[0].y, beep.originCoordinates[0].x]}>
                    <Popup>
                        Origin
                    </Popup>
                </Marker>
            </MapContainer>
        </>
        :
        <Body1>Need to implement /get/:beepId for this to work. Go to beep table and click view</Body1>
    )
}

export default Report;
