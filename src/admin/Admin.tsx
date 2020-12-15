import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { config } from './../utils/config';
import { Header } from '../components/Typography';
import { Table, THead, TH, TBody, TR, TD, TDProfile, TDText, TDBadge, TDButton } from '../components/Table';


function Admin() {

    let [beepers, setBeepers] = useState(null);
    let match = useRouteMatch();

    const fetchBeepers = async () => {
        // const response = await fetch(config.apiUrl + '/rider/list', {
        //     method: 'GET',
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });
        // const data = await response.json();
        const data = {beeperList: [
            {
              "capacity": 7,
              "first": "Dean",
              "groupRate": "3",
              "id": "87a09dc0-053d-44b6-9e92-d9844ee5f8e2",
              "isStudent": true,
              "last": "Sejdia",
              "masksRequired": false,
              "photoUrl": "https://ridebeepapp.s3.amazonaws.com/images/87a09dc0-053d-44b6-9e92-d9844ee5f8e2-1607571143970.jpg",
              "queueSize": 0,
              "singlesRate": "4",
              "userLevel": 0
            },
            {
              "capacity": 4,
              "first": "Samantha",
              "groupRate": "3",
              "id": "2014062f-f74d-429f-a4a6-387504e9b3a1",
              "isStudent": true,
              "last": "Bunn",
              "masksRequired": false,
              "photoUrl": "https://ridebeepapp.s3.amazonaws.com/images/2014062f-f74d-429f-a4a6-387504e9b3a1-1607535432013.jpg",
              "queueSize": 0,
              "singlesRate": "5",
              "userLevel": 0
            }
          ]};
        
        setBeepers(data.beeperList);
    }

    useEffect(() => {
        fetchBeepers();
    }, []);

    return (
        <div className="flex flex-row">

            {/* Navigation pane */}
            <div className="px-6 mr-6">
                <h2 className="mx-2 font-bold leading-7 text-gray-800 sm:truncate">
                    Database
                </h2>

                <hr></hr>

                <ul>
                    <li className="p-2">
                        <Link to={`${match.url}/rides`}>Active rides</Link>
                    </li>
                    <li className="p-2">
                        <Link to={`${match.url}/users`}>Users</Link>
                    </li>
                    <li className="p-2">
                        <Link to={`${match.url}/reports`}>Reports</Link>
                    </li>
                </ul>
            </div>

            {/* View container */}
            <div className="container mx-auto w-4/5">

                <Switch>
                    <Route path={`${match.path}/rides`}>
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

                    </Route>

                    <Route path={`${match.path}/users`}>
                        <Header>Users</Header>
                    </Route>

                    <Route path={`${match.path}/reports`}>
                        <Header>Reports</Header>
                    </Route>
                </Switch>

            </div>


        </div>
    );

}

export default Admin;
