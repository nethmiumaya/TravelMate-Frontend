// src/slices/activitySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Activity {
    id: string;
    destinationId: number;
    title: string;
    description: string;
    date: Date;
}

interface ActivityState {
    activities: Activity[];
}

const initialState: ActivityState = {
    activities: [],
};

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        addActivity: (state, action: PayloadAction<Activity>) => {
            state.activities.push(action.payload);
        },
    },
});

export const { addActivity } = activitySlice.actions;
export default activitySlice.reducer;