import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { Redirect } from "react-router-dom";
import BeepAppBar from './AppBar.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function EditProfile() {
    const {user, setUser} = useContext(UserContext);
    
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [username, setUsername] = useState(user.username);
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
        fetch('https://beep.nussman.us/api/account/edit', {
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
        <Container>
            {error ? 
                <Alert variant="danger">
                    {error}
                </Alert>
                :
                null
            }
            {success ? 
                <Alert variant="success">
                    {success}
                </Alert>
                :
                null
            }
            <Form onSubmit={handleEdit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} type="username" autoComplete="username" placeholder="Username" disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control value={first} type="text" autoComplete="given-name" placeholder="First Name" onChange={(value) => setFirst(value.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control value={last} type="text" autoComplete="family-name" placeholder="Last Name" onChange={(value) => setLast(value.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} type="text" autoComplete="email" placeholder="Email Address" onChange={(value) => setEmail(value.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control value={phone} type="text" autoComplete="tel" placeholder="Phone Number" onChange={(value) => setPhone(value.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Venmo</Form.Label>
                    <Form.Control value={venmo} type="text" autoComplete="username" placeholder="Venmo Username" onChange={(value) => setVenmo(value.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Profile
                </Button>
            </Form>
        </Container>
        </>
    );
}

export default EditProfile;
