import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { Redirect } from "react-router-dom";
import BeepAppBar from './AppBar.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { config } from './utils/config';

function ForgotPassword() {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState();

    function handleForgotPassword(e) {
        e.preventDefault();
        fetch(config.apiUrl + '/auth/password/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email
            }),
        })
        .then(response => response.json())
        .then(data => {
            setStatus(data);
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
            {status && 
                <Alert variant={status.status === "success" ? "success" : "danger" }>
                    {status.message}
                </Alert>
            }
            <Form onSubmit={handleForgotPassword}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" autoComplete="email" placeholder="example@ridebeep.app" onChange={(value) => setEmail(value.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={status?.status === "success"}>
                    Send Reset Password Email
                </Button>
            </Form>
        </Container>
        </>
    );
}

export default ForgotPassword;
