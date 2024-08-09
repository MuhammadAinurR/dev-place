// src/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from './utils/axios';

// Define an initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Create an async thunk for data fetching
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await request.get('/github-trending');
  return response.data;
});

// Create a slice of the store
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default dataSlice.reducer;
