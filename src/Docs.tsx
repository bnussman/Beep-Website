import React, { Component } from 'react';
import { config } from "./utils/config";
import { RedocStandalone } from 'redoc';
import BeepAppBar from './AppBar';

class Docs extends Component {
    render() {
        return (
            <div>
                <BeepAppBar/>
                <RedocStandalone
                    specUrl={config.apiUrl + "/docs"}
                    options={{
                        theme: { colors: { primary: { main: '#ecc94b' } } },
                    }}
                />
            </div>
        );
    }
}

export default Docs;
