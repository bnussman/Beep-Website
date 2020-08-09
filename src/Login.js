import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { Redirect, Link } from "react-router-dom";
import BeepAppBar from './AppBar.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function Login() {
    const {user, setUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    function handleLogin(e) {
        e.preventDefault();
        fetch('https://api.ridebeep.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
            }
            else {
                setError(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    //if some function tells us to redirect or a user is defined
    //redirect to the home page
    if(user) {
        return <Redirect to={{ pathname: "/"}} />;
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
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" autoComplete="username" placeholder="Username" onChange={(value) => setUsername(value.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" autoComplete="password" placeholder="Password" onChange={(value) => setPassword(value.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <Link to={"/password/forgot"}>Forgot Password</Link>
        </Container>
        </>
    );
}

export default Login;
