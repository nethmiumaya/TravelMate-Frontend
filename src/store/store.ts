import { configureStore } from '@reduxjs/toolkit';
import { itineraryReducer } from './slices/itinerarySlice';
import { authReducer } from './slices/authSlice';

export const store = configureStore({
    reducer: {
        itineraries: itineraryReducer,
        auth: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;