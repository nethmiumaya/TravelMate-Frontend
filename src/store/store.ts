import { configureStore } from '@reduxjs/toolkit';
import itineraryReducer from '../slices/itinerarySlice';
import authReducer from "../slices/loginSlice.ts";
import destinationReducer from "../slices/destinationSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        itinerary: itineraryReducer,
        destination: destinationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;