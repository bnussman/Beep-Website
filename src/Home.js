import React from 'react';
import BeepAppBar from './AppBar.js';

function Home() {
    return (
        <>
            <BeepAppBar/>
            <div class="container mx-auto">
                <h1 class="text-4xl">Welcome to the Beep App!</h1>
                <p>
                    The Beep App is an app <b>launching soon</b> that aims to simplify the ride sharing system
                    in Boone.
                </p>
                <p>
                    More coming soon!
                </p>
            </div>
        </>
    );

}

export default Home;
