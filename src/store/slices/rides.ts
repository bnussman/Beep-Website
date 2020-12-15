import { createSlice } from '@reduxjs/toolkit';
import { config } from '../../utils/config';

export const initialState = {
    loading: false,
    hasErrors: false,
    rides: [],
}

// A slice for recipes with our 3 reducers
const ridesSlice = createSlice({
    name: 'rides',
    initialState,
    reducers: {
        getRides: state => {
            state.loading = true
        },
        getRidesSuccess: (state, { payload }) => {
            state.rides = payload
            state.loading = false
            state.hasErrors = false
        },
        getRidesFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
    },
});

export const { getRides, getRidesSuccess, getRidesFailure } = ridesSlice.actions;

export const ridesSelector = state => state.rides;

export default ridesSlice.reducer;

export function fetchRides() {
    return async dispatch => {
        dispatch(getRides());

        try {
            const response = await fetch(config.apiUrl + '/rider/list', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const { beeperList } = await response.json();
            
            dispatch(getRidesSuccess(beeperList));
        }
        catch (error) {
            dispatch(getRidesFailure());
        }
    }
}
