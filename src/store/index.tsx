
import { configureStore } from '@reduxjs/toolkit';
import rides from './slices/rides';

export default configureStore({
    reducer: {
        rides
    }
});