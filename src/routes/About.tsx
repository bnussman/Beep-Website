import React from 'react';

function About() {
    return (
        <div className="lg:container px-4 mx-auto min-h-screen">
            <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 mb-4">
                <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    About Us
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                    Ride beep app is currently a substitute for the facebook page that people use to get around Boone, NC and Appalachian State University. This app allows college students to make money by beeping and allows for an easy and cheap way to get where they want around campus and Boone. The owners are students at App State, Ian Murphy and Banks Nussman, who saw the flaws of the facebook page and wanted to improve the experience with leaving everything that was great about the original idea.
                </p>
            </div>
            <div className="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased           bg-gray-800  pb-6 pt-4 rounded-lg leading-normal overflow-hidden">
                <div className="top mb-2 flex">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
                    <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="mt-4 flex">
                    <span className="text-green-400">➜  Beep git:(master)</span>
                    <p className="flex-1 typing items-center pl-2">
                        created by Banks Nussman
                        <br/>
                        </p>
                    </div>
                </div>
        </div>
    );
}

export default About;
