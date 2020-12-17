import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

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
    }, 
});

export const { getBeepsSuccess, getBeepsFailure } = beepsSlice.actions;

export const beepsSelector = state => state.beeps;

export default beepsSlice.reducer;

export function fetchBeeps() {
    return async dispatch => {
        try {
            const { beeps } = await api.beeps.get();
            dispatch(getBeepsSuccess(beeps));
        }
        catch (error) {
            dispatch(getBeepsFailure());
        }
    }
}
