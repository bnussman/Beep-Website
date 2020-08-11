import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { Redirect } from "react-router-dom";
import BeepAppBar from './AppBar.js';
import { config } from './utils/config';

function EditProfile() {
    const {user, setUser} = useContext(UserContext);
    
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [username] = useState(user.username);
    const [first, setFirst] = useState(user.first);
    const [last, setLast] = useState(user.last);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [venmo, setVenmo] = useState(user.venmo);

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
                localStorage.setItem("user", JSON.stringify(tempUser));
                setUser(tempUser);
                setSuccess(data.message);
            }
            else {
                setError(data.message);
            }
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
                {error && <p>{error}</p> }
                {success && <p>{success}</p> }
                <form onSubmit={handleEdit}>
                    <label className="text-gray-500 font-bold" htmlFor="username">Username</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={username} id="username" type="username" autoComplete="username" placeholder="Username" disabled />
                    <label className="text-gray-500 font-bold" htmlFor="first">First Name</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={first} id="first" type="text" autoComplete="given-name" placeholder="First Name" onChange={(value) => setFirst(value.target.value)} />
                    <label className="text-gray-500 font-bold" htmlFor="last">Last Name</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={last} id="last" type="text" autoComplete="family-name" placeholder="Last Name" onChange={(value) => setLast(value.target.value)} />
                    <label className="text-gray-500 font-bold" htmlFor="email">Email</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={email} id="email" type="text" autoComplete="email" placeholder="Email Address" onChange={(value) => setEmail(value.target.value)} />
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
