import React, { useContext, useEffect, useState } from 'react'
import api from '../api';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Card } from './Card';
import { Table, THead, TH, TBody, TR, TDText } from './Table';
import { UserContext } from '../UserContext';
import {Heading5} from './Typography';
import Pagination from './Pagination';

dayjs.extend(duration);

interface Props {
    userId: string;
}

function LocationTable(props: Props) {

    const { user } = useContext(UserContext);
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultCount, setResultCount] = useState<number>(0);
    const pageLimit = 5;

    async function fetchLocation(page: number) {
        const { locations, total } = await api.users.getLocation(props.userId, page, pageLimit);
        setLocations(locations);
        setResultCount(total);
    }

    useEffect(() => {
        fetchLocation(0);
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
            height="250"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBgabJrpu7-ELWiUIKJlpBz2mL6GYjwCVI&q=${locations[0].latitude},${locations[0].longitude}`}>
        </iframe>
        <Pagination
            resultCount={resultCount}
            limit={pageLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={fetchLocation}/>
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
                                <TDText>{location.accuracy} meters</TDText>
                                <TDText>{location.heading}°</TDText>
                                <TDText>{location.latitude}</TDText>
                                <TDText>{location.longitude}</TDText>
                                <TDText>{Math.round(location.speed * 2.237)} mph</TDText>
                                <TDText>{dayjs().to(location.timestamp)}</TDText>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
        <Pagination
            resultCount={resultCount}
            limit={pageLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={fetchLocation}/>
        </div>
    </>;
}

export default LocationTable;
