import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

import { EsriProvider } from 'leaflet-geosearch';

export const initialState = {
    hasErrors: false,
    beeps: [],
}

// A slice for recipes with our 3 reducers
const beepsSlice = createSlice({
    name: 'beeps',
    initialState,
    reducers: {
        getBeepsSuccess: (state, { payload }) => {
            state.beeps = payload
            state.hasErrors = false
        },
        getBeepsFailure: state => {
            state.hasErrors = true
        },
        getBeepSuccess: (state, { payload }) => {
            const index = state.beeps.findIndex(beep => {
                return beep.id === payload.id;
            });

            if (index === -1) state.beeps.push(payload);
            else state.beeps[index] = payload;
        },
        getBeepFailure: state => {
        }
    }, 
});

export const {
    getBeepSuccess,
    getBeepFailure,
    getBeepsSuccess,
    getBeepsFailure
} = beepsSlice.actions;

export const beepSelector = beepId => state => {
    return state.beeps.beeps.find(beep => beep.id === beepId);
}
export const beepsSelector = state => state.beeps;

export default beepsSlice.reducer;

export function fetchBeep(beepId) {
    return async dispatch => {
        dispatch(getBeepFailure());
    }
    // return async dispatch => {
    //     try {
    //         const { beep } = await api.beeps.get(beepId);
    //         dispatch(getBeepSuccess(beep));
    //     }
    //     catch (error) {
    //         dispatch(getBeepFailure());
    //     }
    // }
}


export function fetchBeeps() {
    const provider = new EsriProvider();

    let count = 0;
    async function getCoordinates(beep) {
        try {
            if (count > 5) return beep;
            count++;

            let { origin, destination } = beep;

            beep.originCoordinates = await provider.search({ query: origin });
            beep.destinationCoordinates = await provider.search({ query: destination });
            

            return beep;
        }
        catch (err) {
            console.error(err);
            return beep;
        }
    }

    return async dispatch => {
        try {
            let { beeps } = await api.beeps.list();

            beeps = await Promise.all(beeps.map(async beep => {
                return await getCoordinates(beep); 
            }));
            

            dispatch(getBeepsSuccess(beeps));
        }
        catch (error) {
            dispatch(getBeepsFailure());
        }
    }
}
