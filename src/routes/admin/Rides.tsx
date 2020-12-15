import React, { useState, useEffect } from 'react'
import { config } from '../../utils/config';

import { Header } from '../../components/Typography';
import { Table, THead, TH, TBody, TR, TDProfile, TDText, TDBadge, TDButton } from '../../components/Table';

function Rides() {

    let [beepers, setBeepers] = useState(null);

    const fetchBeepers = async () => {
        const response = await fetch(config.apiUrl + '/rider/list', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        // const data = {beeperList: [
        //     {
        //       "capacity": 7,
        //       "first": "Dean",
        //       "groupRate": "3",
        //       "id": "87a09dc0-053d-44b6-9e92-d9844ee5f8e2",
        //       "isStudent": true,
        //       "last": "Sejdia",
        //       "masksRequired": false,
        //       "photoUrl": "https://ridebeepapp.s3.amazonaws.com/images/87a09dc0-053d-44b6-9e92-d9844ee5f8e2-1607571143970.jpg",
        //       "queueSize": 0,
        //       "singlesRate": "4",
        //       "userLevel": 0
        //     },
        //     {
        //       "capacity": 4,
        //       "first": "Samantha",
        //       "groupRate": "3",
        //       "id": "2014062f-f74d-429f-a4a6-387504e9b3a1",
        //       "isStudent": true,
        //       "last": "Bunn",
        //       "masksRequired": false,
        //       "photoUrl": "https://ridebeepapp.s3.amazonaws.com/images/2014062f-f74d-429f-a4a6-387504e9b3a1-1607535432013.jpg",
        //       "queueSize": 0,
        //       "singlesRate": "5",
        //       "userLevel": 0
        //     }
        //   ]};
        
        setBeepers(data.beeperList);
    }

    useEffect(() => {
        fetchBeepers();
    }, []);

    return <>
        <Header>Active rides</Header>

        <Table>
            <THead>
                <TH>Beepers</TH>
                <TH>Queue size</TH>
                <TH>Ride capacity</TH>
                <TH>Rate</TH>
                <TH>Masks required?</TH>
                <TH>User level</TH>
                <TH>Edit</TH>
            </THead>
            <TBody>
                { beepers && (beepers).map(beeper => {
                    return (
                        <TR key={beeper.id}>
                            <TDProfile
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
                            <TDButton></TDButton>
                        </TR>
                    )
                })}
            </TBody>
        </Table>
    </>;
}

export default Rides;