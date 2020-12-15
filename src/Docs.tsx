import React, { Component } from 'react';
import { config } from "./utils/config";
import { RedocStandalone } from 'redoc';

class Docs extends Component {
    render() {
        return (
            <RedocStandalone
                specUrl={config.apiUrl + "/docs"}
                options={{
                    theme: { colors: { primary: { main: '#ecc94b' } } },
                }}
            />
        );
    }
}

export default Docs;
