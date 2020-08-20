import React from 'react';
import BeepAppBar from './AppBar.js';

function Privacy() {
    return (
        <>
            <BeepAppBar/>
            <div className="lg:container px-4 mx-auto">
                <div className="rounded overflow-hidden shadow-md">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Privacy Policy</div>
                        <p className="text-gray-700 text-base">
                            Coming soon
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Privacy;
