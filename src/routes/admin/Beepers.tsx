import React, { useEffect, useState } from 'react'
import api from '../../api';
import Beeper from '../../types/Beeper';
import { Heading3 } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Table, THead, TH, TBody, TR, TDProfile, TDText } from '../../components/Table';
import { Map } from '../../components/Map';

function Beepers() {

    const [ beepers, setBeepers ] = useState<Beeper[]>([]);

    async function fetchRides() {
        const { beeperList } = await api.beepers.list();
        setBeepers(beeperList);
    }

    useEffect(() => {
        fetchRides();
    }, []);

    return <>
        <Heading3>Active Beepers</Heading3>

        <Map/>

        <Card>
            <Table>
                <THead>
                    <TH>Beeper</TH>
                    <TH>Queue size</TH>
                    <TH>Ride capacity</TH>
                    <TH>Rate</TH>
                    <TH>Masks required?</TH>
                </THead>
                <TBody>
                    {beepers && (beepers).map(beeper => {
                        return (
                            <TR key={beeper.id}>
                                <TDProfile
                                    to={`users/${beeper.id}`}
                                    photoUrl={beeper.photoUrl}
                                    title={`${beeper.first} ${beeper.last} ${beeper.isStudent ? '🎓' : ''}`}>
                                </TDProfile>
                                <TDText>{beeper.queueSize} riders</TDText>
                                <TDText>{beeper.capacity} riders</TDText>
                                <TDText>${beeper.singlesRate} / ${beeper.groupRate}</TDText>
                                <TDText>{beeper.masksRequired ? 'Yes' : 'No'}</TDText>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    </>;
}

export default Beepers;
