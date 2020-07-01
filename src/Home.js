import React from 'react';
import BeepAppBar from './AppBar.js';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

function Home() {
    return (
        <>
            <BeepAppBar/>
            <Container>
                <Jumbotron>
                    <h1>Welcome to the Beep App!</h1>
                    <p>
                    The Beep App is an app <b>launching soon</b> that aims to simplify the ride sharing system
                    in Boone.
                    </p>
                    <p>
                    <Button variant="primary">More coming soon!</Button>
                    </p>
                </Jumbotron>
            </Container>
        </>
    );

}

export default Home;
