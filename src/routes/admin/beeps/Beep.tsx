import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { userSelector, fetchUser } from '../../../store/slices/users';

import { Heading3, Subtitle, Body1 } from '../../../components/Typography';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function Report(props) {

    const { beepId } = useParams<{ beepId: string }>();

    // const dispatch = useDispatch();
    // const user = useSelector(userSelector(userId));

    useEffect(() => {
        // dispatch(fetchUser(userId));
        // var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        //     maxZoom: 18,
        //     id: 'mapbox/streets-v11',
        //     tileSize: 512,
        //     zoomOffset: -1,
        // }).addTo(mymap);
    }, []);

    return <>
        <Heading3>Beep</Heading3>
        <Body1>{beepId}</Body1>

        <MapContainer center={[36.2143, -81.6807]} zoom={17} scrollWheelZoom className="h-screen">
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    </>;
}

export default Report;
