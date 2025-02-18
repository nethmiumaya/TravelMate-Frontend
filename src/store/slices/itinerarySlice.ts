import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Itinerary, ItineraryState } from '../../types';

const initialState: ItineraryState = {
    items: [],
    loading: false,
    error: null,
};

const itinerarySlice = createSlice({
    name: 'itineraries',
    initialState,
    reducers: {
        setItineraries: (state, action: PayloadAction<Itinerary[]>) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        addItinerary: (state, action: PayloadAction<Itinerary>) => {
            state.items.push(action.payload);
        },
        updateItinerary: (state, action: PayloadAction<Itinerary>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteItinerary: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setItineraries,
    addItinerary,
    updateItinerary,
    deleteItinerary,
    setLoading,
    setError,
} = itinerarySlice.actions;

export const itineraryReducer = itinerarySlice.reducer;