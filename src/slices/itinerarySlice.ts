import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Activity {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
}

export interface Destination {
    id: string;
    name: string;
    location: string;
    activities: Activity[];
}

export interface Itinerary {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    destinations: Destination[];
}

interface ItineraryState {
    itineraries: Itinerary[];
    loading: boolean;
    error: string | null;
}

const initialState: ItineraryState = {
    itineraries: [],
    loading: false,
    error: null,
};

const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState,
    reducers: {
        addItinerary: (state, action: PayloadAction<Itinerary>) => {
            state.itineraries.push(action.payload);
        },
        updateItinerary: (state, action: PayloadAction<Itinerary>) => {
            const index = state.itineraries.findIndex(i => i.id === action.payload.id);
            if (index !== -1) {
                state.itineraries[index] = action.payload;
            }
        },
        deleteItinerary: (state, action: PayloadAction<string>) => {
            state.itineraries = state.itineraries.filter(i => i.id !== action.payload);
        },
        addDestination: (state, action: PayloadAction<{ itineraryId: string; destination: Destination }>) => {
            const itinerary = state.itineraries.find(i => i.id === action.payload.itineraryId);
            if (itinerary) {
                itinerary.destinations.push(action.payload.destination);
            }
        },
        addActivity: (state, action: PayloadAction<{
            itineraryId: string;
            destinationId: string;
            activity: Activity
        }>) => {
            const itinerary = state.itineraries.find(i => i.id === action.payload.itineraryId);
            if (itinerary) {
                const destination = itinerary.destinations.find(d => d.id === action.payload.destinationId);
                if (destination) {
                    destination.activities.push(action.payload.activity);
                }
            }
        },
    },
});

export const {
    addItinerary,
    updateItinerary,
    deleteItinerary,
    addDestination,
    addActivity,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;