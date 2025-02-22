import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Itinerary, ItineraryState } from '../../types';
import { getItineraries, getItineraryById, deleteItineraryById, updateItinerary } from '../../services/itineraryService';

const initialState: ItineraryState = {
    items: [],
    loading: false,
    error: null,
};

// Async thunk to fetch all itineraries
export const fetchItineraries = createAsyncThunk(
    'itineraries/fetchItineraries',
    async (_, { rejectWithValue }) => {
        try {
            // This call includes the Authorization header via getAuthHeaders()
            const data = await getItineraries();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching itineraries');
        }
    }
);


// Async thunk to fetch a single itinerary by ID
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

// Async thunk to delete an itinerary
export const deleteItineraryThunk = createAsyncThunk(
    'itineraries/deleteItinerary',
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteItineraryById(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error deleting itinerary');
        }
    }
);

// Async thunk to edit an itinerary
export const editItineraryThunk = createAsyncThunk(
    'itineraries/editItinerary',
    async ({ id, data }: { id: number, data: any }, { rejectWithValue }) => {
        try {
            const updatedItinerary = await updateItinerary(id, data);
            return updatedItinerary;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error updating itinerary');
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
            })
            .addCase(deleteItineraryThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItineraryThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteItineraryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editItineraryThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editItineraryThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(editItineraryThunk.rejected, (state, action) => {
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