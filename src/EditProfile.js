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
            {error && {error} }
            {success && {success} }
            <form onSubmit={handleEdit}>
                <p>Username</p>
                <input value={username} type="username" autoComplete="username" placeholder="Username" disabled />
                <p>First Name</p>
                <input value={first} type="text" autoComplete="given-name" placeholder="First Name" onChange={(value) => setFirst(value.target.value)} />
                <p>Last Name</p>
                <input value={last} type="text" autoComplete="family-name" placeholder="Last Name" onChange={(value) => setLast(value.target.value)} />
                <p>Email</p>
                <input value={email} type="text" autoComplete="email" placeholder="Email Address" onChange={(value) => setEmail(value.target.value)} />
                <p>Phone</p>
                <input value={phone} type="text" autoComplete="tel" placeholder="Phone Number" onChange={(value) => setPhone(value.target.value)} />
                <p>Venmo</p>
                <input value={venmo} type="text" autoComplete="username" placeholder="Venmo Username" onChange={(value) => setVenmo(value.target.value)} />
                Update Profile
            </form>
        </>
    );
}

export default EditProfile;
