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
                            The Beep App is an iOS, Android, and web app <b>launching soon</b> that aims to simplify the ride sharing system
                            in Boone.
                        </p>
                    </div>
                </div>



                <div className="rounded overflow-hidden shadow-md mb-4">
                    <div className="px-6 py-4">
                        <div className="flex flex-row ml-2 justify-center">
                            <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=app.ridebeep.App">
                                <img style={{height: "51px"}} className="m-1" alt="Download on Google Play" src="/google.png"/>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/ride-beep-app/id1528601773">
                                <img style={{height: "50px"}} className="m-1" alt="Download on The App Store" src="/apple.svg"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="rounded shadow-md mb-4">
                    <div className="flex flex-wrap justify-center">
                        <img style={{width: "250px", height: "500px"}} className="mt-5 mb-5" src="/ios.png" alt="iOS Example" />
                    </div>
                </div>
            </div>
        </>
    );

}


export default Home;
