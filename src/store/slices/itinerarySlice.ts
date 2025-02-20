import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Itinerary, ItineraryState } from '../../types';
import { getItineraries, getItineraryById } from '../../services/itineraryService';

const initialState: ItineraryState = {
    items: [],
    loading: false,
    error: null,
};
// Fetch a single itinerary by ID
export const fetchItineraryById = createAsyncThunk(
    'itineraries/fetchItineraryById',
    async (id: number, { rejectWithValue }) => {
        try {
            const data = await getItineraryById(id);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching itinerary');
        }
    }
);
// Async thunk to fetch all itineraries
export const fetchItineraries = createAsyncThunk(
    'itineraries/fetchItineraries',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getItineraries();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching itineraries');
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchItineraries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItineraries.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItineraries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchItineraryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItineraryById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(fetchItineraryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
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