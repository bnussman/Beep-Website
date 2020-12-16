
import { configureStore } from '@reduxjs/toolkit';
import users from './slices/users';
import rides from './slices/rides';

export default configureStore({
    reducer: {
        users,
        rides
    }
});