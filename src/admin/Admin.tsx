import React, { useState, useEffect } from 'react';
import BeepAppBar from '../AppBar';
import { config } from './../utils/config';

function Admin() {


    const [beepers, setBeepers] = useState(null);

    const fetchBeepers = async () => {
        const response = await fetch(config.apiUrl + '/rider/list', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        setBeepers(data.beeperList);
    }

    useEffect(() => {
        fetchBeepers();
    }, []);


    return (
        <>
            <BeepAppBar />


            <div className="flex flex-row">

                {/* Navigation pane */}
                <div className="px-6 mr-6">
                    <h2 className="mx-2 font-bold leading-7 text-gray-800 sm:truncate">
                        Database
                    </h2>

                    <hr></hr>

                    <ul>
                        <li className="p-2">
                            <a href="">Active rides</a>
                        </li>
                        <li className="p-2">
                            <a href="">Users</a>
                        </li>
                        <li className="p-2">
                            <a href="">Reports</a>
                        </li>
                    </ul>
                </div>

                {/* View container */}
                <div className="container mx-auto w-4/5">

                    <h2 className="mx-2 text-2xl font-bold leading-7 text-gray-800 sm:truncate">
                        Active rides
                    </h2>

                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Profile
                                </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Queue size
                                </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ride capacity
                                </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rate
                                </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Masks required?
                                </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User level
                                </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    beepers && (beepers).map(function (beeper, i) {
                                        return (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full" src={beeper.photoUrl} alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {beeper.first} {beeper.last} {beeper.isStudent ? '🎓' : ''}
                                                            </div>
                                                            <div className="text-sm text-gray-500">

                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{beeper.queueSize} riders</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{beeper.capacity} riders</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">${beeper.singlesRate} / ${beeper.groupRate}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{beeper.masksRequired ? 'Yes' : 'No'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {beeper.userLevel}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Admin;
