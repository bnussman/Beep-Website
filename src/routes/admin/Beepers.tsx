import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { ridesSelector, fetchRides } from '../../store/slices/rides';

import { Heading3 } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Pagination } from '../../components/Pagination';
import { Table, THead, TH, TBody, TR, TDProfile, TDText, TDBadge, TDButton } from '../../components/Table';

function Beepers() {

    const dispatch = useDispatch();
    const { rides, loading, hasErrors } = useSelector(ridesSelector);

    useEffect(() => {
        dispatch(fetchRides());
    }, [dispatch]);

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
                    {rides && (rides).map(ride => {
                        return (
                            <TR key={ride.id}>
                                <TDProfile
                                    to={`users/${ride.id}`}
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
