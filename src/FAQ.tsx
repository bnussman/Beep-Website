import React from 'react';
import BeepAppBar from './AppBar';

function Faq() {
    return (
        <>
            <BeepAppBar/>
            
            <div className="lg:container px-4 mx-auto">
                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        What does the app do?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        The Beep App will easily and instantly connect you (a rider) to a driver known as a “beeper” so you can get a ride.
                    </p>
                </div>

                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Who owns the app?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        It is owned by two App State students Ian Murphy and Banks Nussman.
                    </p>
                </div>

                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Is it associated with Appalachian State University?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        It is not officially associated with App State in any way. The app is run completely independent. It is only being used in Boone, NC and the area around App State and is targeted for App State students.
                    </p>
                </div>

                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        What is a beep?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        A beep is our word for the transaction between a rider and driver for the service of transportation.
                    </p>
                </div>

                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        What is a beeper?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        A beeper is our word for a driver.
                    </p>
                </div>

                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        How is this different from the Facebook pages?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        The Beep App is a stand alone iOS and Android app. Our goal is to not change the basic principles of beeping.
                    </p>
                </div>

                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        How much does it cost?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        The iOS and Android apps will be free. When you get a ride, the driver picks their rate and you will know that rate before you have committed to getting a ride. Traditionally beepers charge $2.00 if you ride as a group and $3.00 if you ride alone. The Beep App will not cost any more than the prices seen on the previous Facebook pages. 
                    </p>
                </div>

                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        How are payments made?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        The Beep App does not process payments and does not take any cut from beepers’s rates. Payments are made by providing riders and beepers with a link to each other's Venmo. If the rider and beeper agree on paying in cash, that is allowed.
                    </p>
                </div>

                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        How are riders and drivers paired?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        The rider has the opportunity to let the app pick their beeper, or they can choose from a list of beepers. If they let the app decide for them, it will pick the beeper with the shortest wait time (smallest queue).
                    </p>
                </div>

                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Is the Beep App regulated in any way?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        The beep app is not regulated in any way and nothing has been added to the app that will cost more money to anybody and still uses the fundamental principles that the facebook page was founded on.
                    </p>
                </div>


            </div>
        </>
    );
}

export default Faq;
