import React from 'react';
import BeepAppBar from './AppBar.js';

function Home() {
    return (
        <>
            <BeepAppBar/>
            <div className="lg:container px-4 mx-auto">
                <div className="rounded overflow-hidden shadow-md">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Welcome to the Beep App!</div>
                        <p className="text-gray-700 text-base">
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
