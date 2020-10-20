import React from 'react';
import { RedocStandalone } from 'redoc';

export function Docs() {
    return (
        <RedocStandalone specUrl="https://ridebeep.app/api/docs"/>
    );
}
