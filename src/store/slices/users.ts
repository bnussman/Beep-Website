import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const initialState = {
    loading: false,
    hasErrors: false,
    users: [],
}

// A slice for recipes with our 3 reducers
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsersSuccess: (state, { payload }) => {
            state.users = payload
            state.hasErrors = false
        },
        getUsersFailure: state => {
            state.hasErrors = true
        },
    }, 
});

export const { getUsersSuccess, getUsersFailure } = usersSlice.actions;

export const usersSelector = state => state.users;

export default usersSlice.reducer;

export function fetchUsers() {
    return async dispatch => {
        try {
            const { users } = await api.user.get();
            dispatch(getUsersSuccess(users));
        }
        catch (error) {
            dispatch(getUsersFailure());
        }
    }
}
