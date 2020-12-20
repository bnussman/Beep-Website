import React from 'react';

export function Indicator(props) {
    return (
        <div className={`rounded-full bg-${props.color || 'green'}-500 h-3 shadow w-3 shadow`}>
        </div>
    );
}
