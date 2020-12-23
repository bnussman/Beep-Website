import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { config } from "../utils/config";
import socket from "../utils/Socket";
import { Nav, NavItem } from './Nav';

interface props {
    noErrors?: boolean;
}

const BeepAppBar = (props: props) => {

    const { user, setUser } = useContext(UserContext);
    const [toggleNav, setToggle] = useState(false);
    const [resendStatus, setResendStatus] = useState();
    const [refreshStatus, setRefreshStatus] = useState();
    let history = useHistory();

    // Collapse nav on route change
    history.listen((location, action) => {
        setToggle(false);
    })

    function logout() {
        fetch(config.apiUrl + '/auth/logout', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.clear();
                history.push("/");
                setUser(null);
                socket.emit("stopGetUser");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function resendVarificationEmail() {
        fetch(config.apiUrl + '/account/verify/resend', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setResendStatus(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap p-6 mb-2">
                {/* Logo */}
                <div className="flex items-center flex-shrink-0 text-black mr-6">
                    <img
                        alt=""
                        src="/favicon.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    <NavLink to="/" className="font-semibold text-xl tracking-tight pl-2">Beep App</NavLink>
                </div>

                {/* Menu button */}
                <div className="block lg:hidden">
                    <button onClick={() => setToggle(!toggleNav)} className="flex items-center px-3 py-2 border rounded text-black border-black-400 hover:text-black hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>

                {/* Nav items */}
                <div className={!toggleNav ? "hidden w-full lg:items-center lg:w-auto lg:block items-end" : "w-full lg:items-center lg:w-auto lg:block"}>


                    <Nav direction={toggleNav ? 'col' : 'row'} className={toggleNav ? 'pl-0 pt-4' : ''}>
                        {user && user.isBeeping &&
                            <div className="block mt-4 lg:inline-block lg:mt-0 text-black-200 ">
                                <div className="flex">
                                    <p className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black mr-8">You are beeping!</p>
                                </div>
                            </div>
                        }

                        <NavItem to="/faq">FAQ</NavItem>
                        {user && user.userLevel > 0 &&
                            <NavItem to="/admin/beepers">Admin</NavItem>
                        }

                        {user
                            ? <NavItem onClick={logout}>Logout</NavItem>
                            : <NavItem to="/login">Login</NavItem>
                        }


                        {user &&
                            <NavItem to="/profile" className="mt-1 flex flex-row items-center">
                                {user.photoUrl &&
                                    <img className="block lg:inline-block mr-4 w-10 h-10 rounded-full object-cover" alt="profile" src={user.photoUrl} />
                                }
                                <span className="mb-1">{user.first + " " + user.last}</span>
                            </NavItem>
                        }
                    </Nav>
                </div>
            </nav>

            {(user && !user.isEmailVerified && !props.noErrors) &&

                <div className="lg:container px-4 mx-auto mb-4" >
                    <div role="alert">
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Email Varification
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <p>You need to verify your email</p>
                            <p className="text-sm mt-2 underline cursor-pointer" onClick={resendVarificationEmail}>Resend my varification email</p>
                        </div>
                    </div>
                    {refreshStatus &&
                        <div role="alert" className="mt-4" onClick={() => { setRefreshStatus(null) }}>
                            <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
                                Refresh Message
                            </div>
                            <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700">
                                <p>{refreshStatus}</p>
                                <p className="text-xs">Click to dismiss</p>
                            </div>
                        </div>
                    }
                    {resendStatus &&
                        <div role="alert" className="mt-4" onClick={() => { setResendStatus(null) }}>
                            <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
                                Resend Email Message
                            </div>
                            <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700">
                                <p>{resendStatus}</p>
                                <p className="text-xs">Click to dismiss</p>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    );
}

export default BeepAppBar;
