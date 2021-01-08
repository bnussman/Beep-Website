import React, { useContext, useEffect, useState } from 'react'
import api from '../api';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Card } from './Card';
import { Table, THead, TH, TBody, TR, TDProfile, TDText } from './Table';
import { UserContext } from '../UserContext';
import {Indicator} from './Indicator';
import {Heading5} from './Typography';

dayjs.extend(duration);

interface Props {
    userId: string;
}

function LocationTable(props: Props) {

    const { user } = useContext(UserContext);
    const [locations, setLocations] = useState([]);

    async function fetchLocation() {
        const { locations } = await api.users.getLocation(props.userId);
        setLocations(locations);
    }

    useEffect(() => {
        fetchLocation();
    }, []);

    if (!locations || locations.length <= 0) {
        return null;
    }

    return <>
        <div className="m-4">
        <Heading5>
            User's Location Data
        </Heading5>
        <iframe
            title="Map"
            width="100%"
            height="450"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBgabJrpu7-ELWiUIKJlpBz2mL6GYjwCVI&q=${locations[0].latitude},${locations[0].longitude}`}>
        </iframe>
        <Card>
            <Table>
                <THead>
                    <TH>Accuracy</TH>
                    <TH>Heading</TH>
                    <TH>Latitude</TH>
                    <TH>Longitude</TH>
                    <TH>Speed</TH>
                    <TH>Timestamp</TH>
                </THead>
                <TBody>
                    {locations && (locations).map(location => {
                        return (

                            <TR key={location.id}>
                                <TDText>{location.accuracy}</TDText>
                                <TDText>{location.heading}</TDText>
                                <TDText>{location.latitude}</TDText>
                                <TDText>{location.longitude}</TDText>
                                <TDText>{location.speed}</TDText>
                                <TDText>{dayjs().to(location.timestamp)}</TDText>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
        </div>
    </>;
}

export default LocationTable;
