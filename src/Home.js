import React from 'react';
import BeepAppBar from './AppBar.js';

function Home() {
    return (
        <>
            <BeepAppBar/>
            <div className="lg:container px-4 mx-auto">
                <div className="rounded overflow-hidden shadow-md mb-4">
                    <div className="px-6 py-4">
                        <div className=" text-gray-600 font-bold text-3xl mb-2">Welcome to the Beep App!</div>
                        <p className="text-gray-600 text-base">
                            The Beep App is an app <b>launching soon</b> that aims to simplify the ride sharing system
                            in Boone.
                        </p>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="text-gray-600 font-bold text-xl">What does the app do?</div>
                        <p className="text-gray-500 mb-2"> 
                            The Beep App will easily and instantly connect you (a rider) to a driver known as a “beeper” so you can get a ride.
                        </p>


                        <div className="text-gray-600 font-bold text-xl">What is a beep?</div>
                        <p className="text-gray-500 mb-2"> 
                        A beep is our word for the transaction between a rider and driver for the service of transportation.
                        </p>


                        <div className="text-gray-600 font-bold text-xl">What is a beeper?</div>
                        <p className="text-gray-500 mb-2"> 
                        A beeper is our word for a driver.
                        </p>


                        <div className="text-gray-600 font-bold text-xl">How is this different from the Facebook pages?</div>
                        <p className="text-gray-500 mb-2"> 
                        The Beep App is a standalone iOS and Android app. Our goal is to not change the basic principles of beeping.
                        </p>


                        <div className="text-gray-600 font-bold text-xl">How much does it cost?</div>
                        <p className="text-gray-500 mb-2"> 
                        The iOS and Android apps will be free. When you get a ride, the driver picks their rate and you will know that rate before you have committed to getting a ride. Traditionally beepers charge $2.00 if you ride as a group and $3.00 if you ride alone. The Beep App will not cost any more than the prices seen on the previous Facebook pages.
                        </p>


                        <div className="text-gray-600 font-bold text-xl">How are payments made?</div>
                        <p className="text-gray-500 mb-2"> 
                        The Beep App does not process payments and does not take any cut from beepers’s rates. Payments are made by providing riders and beepers with a link to each other's Venmo. If the rider and beeper agree on paying in cash, that is allowed.
                        </p>


                        <div className="text-gray-600 font-bold text-xl">How are riders and drivers paired?</div>
                        <p className="text-gray-500 mb-2"> 
                            The rider has the opportunity to let the app pick their beeper, or they can choose from a list of beepers. If they let the app decide for them, it will pick the beeper with the shortest wait time (smallest queue).
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Home;
