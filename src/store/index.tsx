
import { configureStore } from '@reduxjs/toolkit';
import users from './slices/users';
import rides from './slices/rides';
import reports from './slices/reports';
import beeps from './slices/beeps';

export default configureStore({
    reducer: {
        users,
        reports,
        rides,
        beeps
    }
});
