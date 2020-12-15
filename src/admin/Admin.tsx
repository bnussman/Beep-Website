import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { config } from './../utils/config';

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

    function Table(props) {
        return <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                {props.children}
            </table>
        </div>
    }

    function THead(props) {
        return <thead className="bg-gray-50">
            <tr>
                {props.children}
            </tr>
        </thead>
    }

    function TH(props) {
        return <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {props.children}
        </th>
    }

    function TBody(props) {
        return <tbody className="bg-white divide-y divide-gray-200">
            {props.children}
        </tbody>
    }

    function TR(props) {
        return <tr>{props.children}</tr>
    }

    function TD(props) {
        return <td className="px-6 py-4 whitespace-nowrap">
            {props.children}
        </td>
    }

    function TDProfile(props) {
        return <TD>
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={props.photoUrl} alt="" />
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                        {props.title}
                    </div>
                    <div className="text-sm text-gray-500">
                        {props.subtitle}
                    </div>
                </div>
            </div>
        </TD>

    }

    function TDText(props) {
        return <TD>
            <div className="text-sm text-gray-900">{props.children}</div>
        </TD>
    }

    function TDBadge(props) {
        return <TD>
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {props.children}
            </span> 
        </TD>
    }

    function TDButton(props) {
        return <TD>
            <a href="#" className="whitespace-nowrap text-right text-sm font-medium">Edit</a>
        </TD>
    }

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
                        <h2 className="mx-2 text-2xl font-bold leading-7 text-gray-800 sm:truncate">
                            Active rides
                        </h2>

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
                                { beepers && (beepers).map(function (beeper, i) {
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
                        <h3>Users</h3>
                    </Route>
                    <Route path={`${match.path}/reports`}>
                        <h3>Reports</h3>
                    </Route>
                </Switch>

            </div>


        </div>
    );

}

export default Admin;
