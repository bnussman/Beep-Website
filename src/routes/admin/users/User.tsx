import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import api from '../../../api';
import User from '../../../types/User';

import { Heading3, Heading4, Heading5, Subtitle, Body1, Heading6 } from '../../../components/Typography';
import { Badge, Indicator } from '../../../components/Indicator';

import { formatPhone } from '../../../utils/formatters';

function UserPage(props) {

    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User>(null);

    async function fetchUser(userId) {
        const { user } = await api.users.get(userId);
        console.log(user)
        setUser(user);
    }

    useEffect(() => {
        fetchUser(userId);
    }, [userId]);

    return <>
        {user && (
            <>
                <div className="flex flex-row mb-8 items-center">
                    {user.photoUrl && (
                        <div className="flex mr-3">
                            <img className="h-40 w-40 shadow-lg rounded-full" src={user.photoUrl} alt={`${user.first} ${user.last}`}></img>
                        </div>
                    )}
                    <div className="flex flex-col mx-3">
                        <Heading4>
                            {user.first} {user.last}
                            { user.userLevel === 1 ? <Badge className="transform -translate-y-1 mx-3">admin</Badge> : <></>}
                            { user.isStudent ?       <Badge className="transform -translate-y-1">student</Badge> : <></>}
                        </Heading4>
                        <Subtitle>⭐⭐⭐⭐⭐</Subtitle>

                        <hr className="mt-3 mb-2" />

                        <Subtitle>@{user.username}</Subtitle>
                        <Subtitle><a href={`mailto:${user.email}`}>{user.email}</a></Subtitle>
                        <Subtitle>{formatPhone(user.phone || '')}</Subtitle>
                        <Body1>{user.id}</Body1>
                    </div>
                    <div className="flex flex-col mx-3">
                        <Heading6>
                            { user.isBeeping
                                ? <><Indicator className="mr-2 animate-pulse"/>Beeping now</>
                                : <><Indicator className="mr-2" color="red"/>Not beeping</>
                            }
                        </Heading6>
                        <p>Queue size: {user.queueSize}</p>
                        <p>Capacity: {user.capacity}</p>
                        <p>Rate: ${user.singlesRate} / ${user.groupRate}</p>
                        <p>Venmo usename: {user.venmo}</p>
                        <p>{user.masksRequired ? 'Masks required' : 'Masks not required'}</p>
                    </div>

                </div>

                <div className="flex flex-row">
                    <div className="flex-grow">
                        <Heading5>Beep history</Heading5>
                    </div>

                    <div className="flex-grow">
                        <Heading5>Ride history</Heading5>
                    </div>
                </div>
            </>
        )}
    </>;
}

export default UserPage;
