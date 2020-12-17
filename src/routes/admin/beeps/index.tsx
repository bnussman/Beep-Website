import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { beepsSelector, fetchBeeps } from '../../../store/slices/beeps';

import { Card } from '../../../components/Card';
import { Table, THead, TH, TBody, TR, TDText, TDButton } from '../../../components/Table';
import { Heading3 } from '../../../components/Typography';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NavLink } from 'react-router-dom';
dayjs.extend(relativeTime);

function Beeps() {
    const dispatch = useDispatch();
    const { beeps } = useSelector(beepsSelector);

    useEffect(() => {
        dispatch(fetchBeeps());
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
                                <TDText>{beep.timeEnteredQueue}</TDText>
                                <TDText>{beep.timeDone}</TDText>
                                <TDText>{beep.timeDone - beep.timeEnteredQueue}</TDText>
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
