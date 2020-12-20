import React, { useEffect, useState } from 'react'

import api from '../../api';

import { Heading3 } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Pagination } from '../../components/Pagination';
import { Table, THead, TH, TBody, TR, TDProfile, TDText, TDBadge, TDButton } from '../../components/Table';

function Beepers() {

    const [ beepers, setBeepers ] = useState<any>([]);

    async function fetchRides() {
        const { beeperList } = await api.beepers.list();
        setBeepers(beeperList);
    }

    useEffect(() => {
        fetchRides();
    }, []);

    return <>
        <Heading3>Active Beepers</Heading3>

        <Card>
            <Table>
                <THead>
                    <TH>Beeper</TH>
                    <TH>Queue size</TH>
                    <TH>Ride capacity</TH>
                    <TH>Rate</TH>
                    <TH>Masks required?</TH>
                    <TH>User level</TH>
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
                                <TDBadge>
                                    {beeper.userLevel}
                                </TDBadge>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>

        <Pagination pageNum={3} resultsCount={96}></Pagination>
    </>;
}

export default Beepers;
