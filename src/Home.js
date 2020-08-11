import React from 'react';
import BeepAppBar from './AppBar.js';

function Home() {
    return (
        <>
            <BeepAppBar/>
            <div className="lg:container px-4 mx-auto">
                <h1 className="text-gray-800 text-2xl pb-4">Welcome to the Beep App!</h1>
                <p className="text-gray-700 pb-4">
                    The Beep App is an app <b>launching soon</b> that aims to simplify the ride sharing system
                    in Boone.
                </p>
                <p className="text-gray-400">
                    More coming soon!
                </p>
            </div>
        </>
    );

}

export default Home;
