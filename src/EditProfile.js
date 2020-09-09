import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { Redirect } from "react-router-dom";
import BeepAppBar from './AppBar.js';
import { config } from './utils/config';
import { Error } from "./utils/errors";

function EditProfile() {
    const {user, setUser} = useContext(UserContext);

    const [status, setStatus] = useState();
    const [username] = useState(user?.username);
    const [first, setFirst] = useState(user?.first);
    const [last, setLast] = useState(user?.last);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [venmo, setVenmo] = useState(user?.venmo);

    //if some function tells us to redirect or a user is defined
    //redirect to the home page
    if(!user) {
        return <Redirect to={{ pathname: "/login"}} />;
    }
    

    function handleEdit(e) {
        e.preventDefault();
        fetch(config.apiUrl + '/account/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'token': user.token,
                'first': first,
                'last': last,
                'email': email,
                'phone': phone,
                'venmo': venmo
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                let tempUser = JSON.parse(JSON.stringify(user));
                tempUser.first = first;
                tempUser.last = last;
                tempUser.email = email;
                tempUser.phone = phone;
                tempUser.venmo = venmo;
                if (email !== user.email) {
                    //if user changed their email
                    tempUser.isEmailVerified = false;
                    tempUser.isStudent = false;
                }
                localStorage.setItem("user", JSON.stringify(tempUser));
                setUser(tempUser);
            }
            setStatus(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    //Return the main login page
    return (
        <>
        <BeepAppBar/>
            <div className="lg:container px-4 mx-auto">
                {status && 
                    <div role="alert" className="mb-4" onClick={() => setStatus(null)}>
                        <div className={status.status === "success" ?
                                "bg-green-500 text-white font-bold rounded-t px-4 py-2"
                                :
                                status.status === "warning" ?
                                "bg-yellow-500 text-white font-bold rounded-t px-4 py-2"
                                :
                                "bg-red-500 text-white font-bold rounded-t px-4 py-2"
                            }>
                            Edit profile {status.status}
                        </div>
                        <div className={status.status === "success" ?
                                "border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700"
                                :
                                status.status === "warning" ?
                                "border border-t-0 border-yellow-400 rounded-b bg-yellow-100 px-4 py-3 text-yellow-700"
                                :
                                "border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
                            }>
                            <Error error={status.message}/>
                        </div>
                    </div>
                }

                <form onSubmit={handleEdit}>
                    <label className="text-gray-500 font-bold" htmlFor="username">Username</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={username} id="username" type="username" autoComplete="username" placeholder="Username" disabled />
                    <label className="text-gray-500 font-bold" htmlFor="first">First Name</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={first} id="first" type="text" autoComplete="given-name" placeholder="First Name" onChange={(value) => setFirst(value.target.value)} />
                    <label className="text-gray-500 font-bold" htmlFor="last">Last Name</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={last} id="last" type="text" autoComplete="family-name" placeholder="Last Name" onChange={(value) => setLast(value.target.value)} />
                    <label className="text-gray-500 font-bold" htmlFor="email">Email</label>
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={email} id="email" type="text" autoComplete="email" placeholder="Email Address" onChange={(value) => setEmail(value.target.value)} />
                    <p className="mb-2 text-xs text-gray-500">{user.isEmailVerified ? user.isStudent ? "Your email is verified and you are a student" : "Your email is verified" : "Your email is not verified"}</p>
                    <label className="text-gray-500 font-bold" htmlFor="phone">Phone</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={phone} id="phone" type="text" autoComplete="tel" placeholder="Phone Number" onChange={(value) => setPhone(value.target.value)} />
                    <label className="text-gray-500 font-bold" htmlFor="venmo">Venmo</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={venmo} id="venmo" type="text" autoComplete="username" placeholder="Venmo Username" onChange={(value) => setVenmo(value.target.value)} />
                    <button type="submit" className="mb-4 shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                        Update Profile
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditProfile;
