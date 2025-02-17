import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Destination {
    id: string;
    itineraryId: number;
    name: string;
    location: string;
    latitude?: number;
    longitude?: number;
}

interface DestinationState {
    destinations: Destination[];
}

const initialState: DestinationState = {
    destinations: [],
};

const destinationSlice = createSlice({
    name: 'destination',
    initialState,
    reducers: {
        addDestination: (state, action: PayloadAction<Destination>) => {
            state.destinations.push(action.payload);
        },
    },
});

export const { addDestination } = destinationSlice.actions;
export default destinationSlice.reducer;