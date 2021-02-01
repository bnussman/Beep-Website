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

function QueueTable(props: Props) {

    const { user } = useContext(UserContext);
    const [queue, setQueue] = useState([]);

    async function fetchQueue() {
        const { queue } = await api.users.getQueue(props.userId);
        setQueue(queue);
    }
    function getStatus(value: number): string {
        switch (value) {
            case 0:
                return "Waiting...";
            case 1:
                return "Beeper is on the way";
            case 2:
                return "Beeper is here";
            case 3:
                return "Getting Beeped";
            default: 
                return "yikes";
        }
    }

    useEffect(() => {
        fetchQueue();
    }, []);

    if (!queue || queue.length <= 0) {
        return null;
    }

    return <>
        <div className="m-4">
        <Heading5>
            User's Queue
        </Heading5>
        <Card>
            <Table>
                <THead>
                    <TH>Rider</TH>
                    <TH>Origin</TH>
                    <TH>Destination</TH>
                    <TH>Group Size</TH>
                    <TH>Start Time</TH>
                    <TH>Is Accepted?</TH>
                    <TH>Status</TH>
                </THead>
                <TBody>
                    {queue && (queue).map(entry => {
                        return (

                            <TR key={entry.id}>
                                <TDProfile
                                    photoUrl={entry.personalInfo.photoUrl}
                                    title={`${entry.personalInfo.first} ${entry.personalInfo.last}`}
                                    to={`/admin/users/${entry.riderid}`}
                                >
                                </TDProfile>
                                <TDText>{entry.origin}</TDText>
                                <TDText>{entry.destination}</TDText>
                                <TDText>{entry.groupSize}</TDText>
                                <TDText>{dayjs().to(entry.timeEnteredQueue)}</TDText>
                                <TDText>{entry.isAccepted ? <Indicator color='green' /> : <Indicator color='red' />}</TDText>
                                <TDText>{getStatus(entry.state)}</TDText>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
        </div>
    </>;
}

export default QueueTable;
