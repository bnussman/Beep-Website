import React, { useContext } from 'react';
import { UserContext } from './UserContext.js';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const BeepAppBar = (props) => {
    const { user, setUser } = useContext(UserContext);

    function logout () {
        fetch('https://beep.nussman.us/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'token': user.token
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                localStorage.clear();
                setUser(null);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    if (user) {
        return(
            <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt=""
                        src="./favicon.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Beep App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title={user.first + " " + user.last} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">Edit Account</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <br/>
            </>
        );
    }
    else {
        return(
            <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt=""
                        src="./favicon.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Beep App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <br/>
            </>
        );
    }
}

export default BeepAppBar;
