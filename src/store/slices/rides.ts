import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

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
            const { beeperList } = await api.ride.list();
            dispatch(getRidesSuccess(beeperList));
        }
        catch (error) {
            dispatch(getRidesFailure());
        }
    }
}
