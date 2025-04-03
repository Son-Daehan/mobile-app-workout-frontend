import { createSlice } from "@reduxjs/toolkit";
import { fetchCommunities } from "../../services/api"; // Import the async thunk from api.js

const communitySlice = createSlice({
  name: "communities",
  initialState: {
    communities: [],
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default communitySlice.reducer;
