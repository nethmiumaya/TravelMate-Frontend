import { configureStore } from '@reduxjs/toolkit';
import itineraryReducer from '../slices/itinerarySlice';
import authReducer from '../slices/loginSlice';
import destinationReducer from '../slices/destinationSlice';
import activityReducer from '../slices/activitySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        itinerary: itineraryReducer,
        destination: destinationReducer,
        activity: activityReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;