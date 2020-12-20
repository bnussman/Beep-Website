import React, {useEffect, useState} from 'react'
import api from '../../../api';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { NavLink } from 'react-router-dom';
import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDText, TDButton } from '../../../components/Table';
import { Heading3 } from '../../../components/Typography';

dayjs.extend(duration);

function Beeps() {

    const [ beeps, setBeeps ] = useState<any>([]);

    async function fetchBeeps(page, limit) {
        const { beeps } = await api.beeps.list();
        setBeeps(beeps);
    }

    useEffect(() => {
        fetchBeeps(0, 25);
    }, []);

    return <>
        <Heading3>Beeps</Heading3>

        <Card>
            <Table>
                <THead>
                    <TH>Rider</TH>
                    <TH>Beeper</TH>
                    <TH>Origin</TH>
                    <TH>Destination</TH>
                    <TH>Group Size</TH>
                    <TH>Start Time</TH>
                    <TH>End Time</TH>
                    <TH>Duration</TH>
                    <TH></TH>
                </THead>
                <TBody>
                    {beeps && (beeps).map(beep => {
                        return (
                            
                            <TR key={beep.id}>
                                <TDText><NavLink to={`users/${beep.riderid}`}>{beep.riderid}</NavLink></TDText>
                                <TDText><NavLink to={`users/${beep.beepersid}`}>{beep.beepersid}</NavLink></TDText>
                                <TDText>{beep.origin}</TDText>
                                <TDText>{beep.destination}</TDText>
                                <TDText>{beep.groupSize}</TDText>
                                <TDText>{dayjs().to(beep.timeEnteredQueue)}</TDText>
                                <TDText>{dayjs().to(beep.doneTime)}</TDText>
                                <TDText>{dayjs.duration(beep.doneTime - beep.timeEnteredQueue).humanize()}</TDText>
                                <TDButton to={`beeps/${beep.id}`}>View</TDButton>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    </>;
}

export default Beeps;
