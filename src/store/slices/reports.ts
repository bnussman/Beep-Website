import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const initialState = {
    hasErrors: false,
    reports: [],
}

// A slice for recipes with our 3 reducers
const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        getReportsSuccess: (state, { payload }) => {
            state.reports = payload
            state.hasErrors = false
        },
        getReportsFailure: state => {
            state.hasErrors = true
        },
    }, 
});

export const { getReportsSuccess, getReportsFailure } = reportsSlice.actions;

export const reportsSelector = state => state.reports;

export default reportsSlice.reducer;

export function fetchReports() {
    return async dispatch => {
        try {
            const { reports } = await api.report.get();
            dispatch(getReportsSuccess(reports));
        }
        catch (error) {
            dispatch(getReportsFailure());
        }
    }
}
