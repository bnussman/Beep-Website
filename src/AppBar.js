import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext.js';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { config } from "./utils/config";

const BeepAppBar = () => {
    const { user, setUser } = useContext(UserContext);
    const [toggle, setToggle] = useState(false);
    let history = useHistory();

    function logout () {
        fetch(config.apiUrl + '/auth/logout', {
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
            if (data.status === "success" || (data.status === "error" && data.message === "Your auth token is not valid.")) {
                localStorage.clear();
                history.push("/");
                setUser(null);
            }
            else {
                console.log("yikes", data);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    if (user) {
        return(
            <>
                <nav className="flex items-center justify-between flex-wrap bg-yellow-500 p-6 mb-8">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <img
                            alt=""
                            src="/favicon.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        <Link to="/" className="font-semibold text-xl tracking-tight pl-2">Beep App</Link>
                    </div>
                    <div className="block lg:hidden">
                        <button onClick={() => setToggle(!toggle)} className="flex items-center px-3 py-2 border rounded text-yellow-200 border-yellow-400 hover:text-white hover:border-white">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                    <div className={!toggle ? "hidden w-full lg:items-center lg:w-auto lg:block" : "w-full lg:items-center lg:w-auto lg:block" }>
                        <div className="text-sm">
                            <Link to="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-yellow-200 hover:text-white mr-4">
                                <div className="flex">
                                    <p>Profile</p>
                                </div>
                            </Link>
                            <p onClick={logout} className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-yellow-200 hover:text-white mr-4">
                                Logout
                            </p>
                            <p className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0">{user.first + " " + user.last}</p>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
    else {
        return(
            <>
                <nav className="flex items-center justify-between flex-wrap bg-yellow-500 p-6 mb-8">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <img
                            alt=""
                            src="/favicon.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        <Link to="/" className="font-semibold text-xl tracking-tight pl-2">Beep App</Link>
                    </div>
                    <div className="block lg:hidden">
                        <button onClick={() => setToggle(!toggle)} className="flex items-center px-3 py-2 border rounded text-yellow-200 border-yellow-400 hover:text-white hover:border-white">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                    <div className={!toggle ? "hidden w-full lg:items-center lg:w-auto lg:block" : "w-full lg:items-center lg:w-auto lg:block" }>
                        <div className="lg:flex-grow">
                            <Link to="/login" href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0">
                                Login
                            </Link>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

export default BeepAppBar;
