import React, {useEffect, useState} from 'react'

import api from '../../../api';
import { BeepEntry } from '../../../types/Beep';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { NavLink } from 'react-router-dom';
import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDText, TDButton } from '../../../components/Table';
import { Heading3 } from '../../../components/Typography';

dayjs.extend(duration);

function Beeps() {

    const [ beeps, setBeeps ] = useState<BeepEntry[]>([]);

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
                    {beeps && (beeps).map(beepEntry => {
                        return (
                            
                            <TR key={beepEntry.beep.id}>
                                <TDText><NavLink to={`users/${beepEntry.rider.id}`}>{beepEntry.rider.first} {beepEntry.rider.last}</NavLink></TDText>
                                <TDText><NavLink to={`users/${beepEntry.beeper.id}`}>{beepEntry.beeper.first} {beepEntry.beeper.last}</NavLink></TDText>
                                <TDText>{beepEntry.beep.origin}</TDText>
                                <TDText>{beepEntry.beep.destination}</TDText>
                                <TDText>{beepEntry.beep.groupSize}</TDText>
                                <TDText>{dayjs().to(beepEntry.beep.timeEnteredQueue)}</TDText>
                                <TDText>{dayjs().to(beepEntry.beep.doneTime)}</TDText>
                                <TDText>{dayjs.duration(beepEntry.beep.doneTime - beepEntry.beep.timeEnteredQueue).humanize()}</TDText>
                                <TDButton to={`beeps/${beepEntry.beep.id}`}>View</TDButton>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    </>;
}

export default Beeps;
