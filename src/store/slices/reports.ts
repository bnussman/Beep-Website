import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const initialState = {
    loading: false,
    hasErrors: false,
    reports: [],
}

// A slice for recipes with our 3 reducers
const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        getReports: state => {
            state.loading = true
        },
        getReportsSuccess: (state, { payload }) => {
            state.reports = payload
            state.loading = false
            state.hasErrors = false
        },
        getReportsFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
    }, 
});

export const { getReports, getReportsSuccess, getReportsFailure } = reportsSlice.actions;

export const reportsSelector = state => state.reports;

export default reportsSlice.reducer;

export function fetchReports() {
    return async dispatch => {
        dispatch(getReports());

        try {
            const { reports } = await api.report.get();
            dispatch(getReportsSuccess(reports));
        }
        catch (error) {
            dispatch(getReportsFailure());
        }
    }
}
