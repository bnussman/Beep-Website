import React from 'react';
import BeepAppBar from './AppBar.js';

function Home() {
    return (
        <>
            <BeepAppBar/>
            <div className="lg:container px-4 mx-auto">
                <div className="rounded overflow-hidden shadow-md mb-4">
                    <div className="px-6 py-4">
                        <div className="flex">
                            <img src="/icon.png" alt="app icon" className="rounded-lg w-10 h-10"/>
                            <div className="ml-2 text-gray-800 font-bold text-3xl mb-2">Welcome to the Beep App!</div>
                        </div>
                        <p className="text-gray-800 text-base">
                            The Beep App is an app <b>launching soon</b> that aims to simplify the ride sharing system
                            in Boone.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Home;
