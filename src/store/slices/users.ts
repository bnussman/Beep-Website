import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const initialState = {
    users: [],
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsersSuccess: (state, { payload }) => {
            state.users = payload;
        },
        getUsersFailure: state => {
        },
        getUserSuccess: (state, { payload }) => {
            const index = state.users.findIndex(user => {
                return user.id === payload.id;
            });

            if (index === -1) state.users.push(payload);
            else state.users[index] = payload;
        },
        getUserFailure: state => {
        }
    }, 
});

export const {
    getUserSuccess,
    getUserFailure,
    getUsersSuccess,
    getUsersFailure
} = usersSlice.actions;

export const userSelector = userId => state => {
    return state.users.users.find(user => user.id === userId);
}
export const usersSelector = state => state.users;

export default usersSlice.reducer;

export function fetchUser(userId) {
    return async dispatch => {
        try {
            const { user } = await api.users.get(userId);
            dispatch(getUserSuccess(user))
        }
        catch(error) {
            dispatch(getUserFailure());
        }
    }
}

export function fetchUsers() {
    return async dispatch => {
        try {
            const { users } = await api.users.list();
            dispatch(getUsersSuccess(users));
        }
        catch (error) {
            dispatch(getUsersFailure());
        }
    }
}
