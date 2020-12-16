import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { ridesSelector, fetchRides } from '../../store/slices/rides';

import { Header } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Table, THead, TH, TBody, TR, TDProfile, TDText, TDBadge, TDButton } from '../../components/Table';

function Beepers() {

    const dispatch = useDispatch();
    const { rides, loading, hasErrors } = useSelector(ridesSelector);

    useEffect(() => {
        dispatch(fetchRides());
    }, [dispatch]);

    return <>
        <Header>Active Beepers</Header>

        <Card>
            <Table>
                <THead>
                    <TH>Beeper</TH>
                    <TH>Queue size</TH>
                    <TH>Ride capacity</TH>
                    <TH>Rate</TH>
                    <TH>Masks required?</TH>
                    <TH>User level</TH>
                    <TH>Edit</TH>
                </THead>
                <TBody>
                    {rides && (rides).map(ride => {
                        return (
                            <TR key={ride.id}>
                                <TDProfile
                                    photoUrl={ride.photoUrl}
                                    title={`${ride.first} ${ride.last} ${ride.isStudent ? '🎓' : ''}`}>
                                </TDProfile>
                                <TDText>{ride.queueSize} riders</TDText>
                                <TDText>{ride.capacity} riders</TDText>
                                <TDText>${ride.singlesRate} / ${ride.groupRate}</TDText>
                                <TDText>{ride.masksRequired ? 'Yes' : 'No'}</TDText>
                                <TDBadge>
                                    {ride.userLevel}
                                </TDBadge>
                                <TDButton></TDButton>
                            </TR>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    </>;
}

export default Beepers;
