import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { Redirect } from "react-router-dom";
import BeepAppBar from './AppBar.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function ResetPassword({ match }) {
    const id = match.params.id;
    const { user } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState();

    function handleResetPassword(e) {
        e.preventDefault();
        fetch('https://beep.nussman.us/api/auth/password/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': id,
                'password': password
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
            <Form onSubmit={handleResetPassword}>
                <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" autoComplete="password" placeholder="password" onChange={(value) => setPassword(value.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Reset Password
                </Button>
            </Form>
        </Container>
        </>
    );
}

export default ResetPassword;
