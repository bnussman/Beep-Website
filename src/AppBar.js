import React, { useContext } from 'react';
import { UserContext } from './UserContext.js';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { config } from "./utils/config";

const BeepAppBar = () => {
    const { user, setUser } = useContext(UserContext);
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
            console.log(data);
            if (data.status === "success") {
                localStorage.clear();
                history.push("/");
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
                <nav class="flex items-center justify-between flex-wrap bg-yellow-500 p-6 mb-8">
                    <div class="flex items-center flex-shrink-0 text-white mr-6">
                        <img
                            alt=""
                            src="/favicon.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        <Link to="/" class="font-semibold text-xl tracking-tight">Beep App</Link>
                    </div>
                    <div class="block lg:hidden">
                        <button class="flex items-center px-3 py-2 border rounded text-yellow-200 border-yellow-400 hover:text-white hover:border-white">
                            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div class="text-sm lg:flex-grow">
                            <Link to="/profile" class="block mt-4 lg:inline-block lg:mt-0 text-yellow-200 hover:text-white mr-4">
                                Profile
                            </Link>
                            <Link onClick={logout} class="block mt-4 lg:inline-block lg:mt-0 text-yellow-200 hover:text-white mr-4">
                                Logout
                            </Link>
                        </div>
                        <div>
                            <a class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0">{user.first + " " + user.last}</a>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
    else {
        return(
            <>
                <nav class="flex items-center justify-between flex-wrap bg-yellow-500 p-6 mb-8">
                    <div class="flex items-center flex-shrink-0 text-white mr-6">
                        <img
                            alt=""
                            src="/favicon.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        <Link to="/" class="font-semibold text-xl tracking-tight">Beep App</Link>
                    </div>
                    <div class="block lg:hidden">
                        <button class="flex items-center px-3 py-2 border rounded text-yellow-200 border-yellow-400 hover:text-white hover:border-white">
                            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div class="text-sm lg:flex-grow">
                        </div>
                        <div>
                            <Link to="/login" href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0">Login</Link>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

export default BeepAppBar;
