import React, { useContext, useEffect, useState } from 'react'
import api from '../api';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Card } from './Card';
import { Table, THead, TH, TBody, TR, TDProfile, TDText } from './Table';
import { UserContext } from '../UserContext';

dayjs.extend(duration);

interface Props {
    userId: string;
}

function BeepHistoryTable(props: Props) {

    const { user } = useContext(UserContext);
    const [beeps, setBeeps] = useState([]);

    async function fetchBeepHistory() {
        const { data } = await api.users.getBeepHistory(props.userId);
        setBeeps(data);
    }

    useEffect(() => {
        fetchBeepHistory();
    }, []);

    return <>
        <div className="m-4">
        <Card>
            <Table>
                <THead>
                    <TH>Rider</TH>
                    <TH>Origin</TH>
                    <TH>Destination</TH>
                    <TH>Group Size</TH>
                    <TH>Start Time</TH>
                    <TH>End Time</TH>
                    <TH>Duration</TH>
                </THead>
                <TBody>
                    {beeps && (beeps).map(beep => {
                        return (

                            <TR key={beep.beep.id}>
                                <TDProfile
                                    photoUrl={beep.rider.photoUrl}
                                    title={`${beep.rider.first} ${beep.rider.last}`}
                                    subtitle={`@${beep.rider.username}`}
                                    to={`/admin/users/${beep.rider.id}`}
                                >
                                </TDProfile>
                                <TDText>{beep.beep.origin}</TDText>
                                <TDText>{beep.beep.destination}</TDText>
                                <TDText>{beep.beep.groupSize}</TDText>
                                <TDText>{dayjs().to(beep.beep.timeEnteredQueue)}</TDText>
                                <TDText>{dayjs().to(beep.beep.doneTime)}</TDText>
                                <TDText>{dayjs.duration(beep.beep.doneTime - beep.beep.timeEnteredQueue).humanize()}</TDText>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
        </div>
    </>;
}

export default BeepHistoryTable;
