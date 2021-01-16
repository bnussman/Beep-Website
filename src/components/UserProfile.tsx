import React from 'react'
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Heading4, Heading5, Subtitle, Body1, Heading6 } from './Typography';
import { Badge, Indicator } from './Indicator';
import { Button } from './Input';
import { formatPhone } from '../utils/formatters';
import RideHistoryTable from './RideHistoryTable';
import BeepHistoryTable from './BeepHistoryTable';
import QueueTable from './QueueTable';
import api from '../api';
import LocationTable from './LocationTable';

function UserProfile(props) {
    const history = useHistory();

    async function deleteUser(id: string) {
        await api.users.delete(id);
        history.goBack();
    }

    const { user } = props;

    return <>
        {user && (
            <>
                <div className="flex flex-col lg:flex-row mb-8 items-center">
                    {user.photoUrl && (
                        <div className="flex mr-3">
                            <img className="h-40 w-40 shadow-lg rounded-full" src={user.photoUrl} alt={`${user.first} ${user.last}`}></img>
                        </div>
                    )}
                    <div className="flex flex-col mx-3 items-center lg:items-start">
                        <Heading4>
                            <span className="mr-2">{user.first} {user.last}</span>
                        </Heading4>
                        <div>
                            {user.userLevel === 1 ? <Badge className="transform -translate-y-1">admin</Badge> : <></>}
                            {user.isStudent ? <Badge className="transform -translate-y-1">student</Badge> : <></>}
                        </div>
                        <Subtitle>
                            <span>⭐⭐⭐⭐⭐</span>
                        </Subtitle>
                        <Subtitle>@{user.username}</Subtitle>
                        <Subtitle><a href={`mailto:${user.email}`}>{user.email}</a></Subtitle>
                        <Subtitle>{formatPhone(user.phone || '')}</Subtitle>
                        <Body1>{user.id}</Body1>
                    </div>
                    <div className="flex flex-col m-6">
                        <Heading6>
                            {user.isBeeping
                                ? <><Indicator className="mr-2 animate-pulse" />Beeping now</>
                                : <><Indicator className="mr-2" color="red" />Not beeping</>
                            }
                        </Heading6>
                        <p>Queue size: {user.queueSize}</p>
                        <p>Capacity: {user.capacity}</p>
                        <p>Rate: ${user.singlesRate} / ${user.groupRate}</p>
                        <p>Venmo usename: {user.venmo}</p>
                        <p>{user.masksRequired ? 'Masks required' : 'Masks not required'}</p>
                    </div>
                    <div className="flex-grow"></div>
                    <div>
                        <NavLink to={props.admin ? `/admin/users/${user.id}/edit` : `/profile/edit/${user.id}`}>
                            <Button>Edit {props.admin ? 'user' : 'profile'}</Button>
                        </NavLink>

                        {props.admin && <Button onClick={() => deleteUser(user.id)} className="text-white bg-red-500 hover:bg-red-700">Delete User</Button>}

                        { !props.admin &&
                            <NavLink to={'password/change'}>
                                <Button>Change password</Button>
                            </NavLink>
                        }
                    </div>
                </div>

                <div>
                    <QueueTable userId={user.id}/>
                </div>

                <div>
                    {props.admin && <LocationTable userId={user.id}/>}
                </div>

                <Heading5>Beep history</Heading5>
                <BeepHistoryTable userId={user.id} />
                <Heading5>Ride history</Heading5>
                <RideHistoryTable userId={user.id} />
            </>
        )}
    </>;
}

export default UserProfile;
