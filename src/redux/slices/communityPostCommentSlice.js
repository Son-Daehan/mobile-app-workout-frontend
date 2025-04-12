import { createSlice } from "@reduxjs/toolkit";
import {
  addCommunityPostComment,
  addCommunityPostCommentLike,
  deleteCommunityPostCommentLike,
  fetchCommunityPostComments,
} from "../../services/api"; 
const communityPostCommentSlice = createSlice({
  name: "communityPostComments",
  initialState: {
    communityPostComments: [],
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityPostComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommunityPostComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.communityPostComments = action.payload;
      })
      .addCase(fetchCommunityPostComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCommunityPostComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCommunityPostComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const data = action.payload;
        if (data.parent) {
          state.communityPostComments.map((comment) => {
            if (comment.id === data.parent) {
              const updatedComment = comment;
              comment["replies"].push(data);
            }
          });
        } else {
          state.communityPostComments.push(action.payload);
        }
      })
      .addCase(addCommunityPostComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCommunityPostCommentLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCommunityPostCommentLike.fulfilled, (state, action) => {
        const { id } = action.payload;
        const comment = state.communityPostComments.find(
          (comment) => comment.id === id
        );
        if (comment) {
          comment.like_count = (comment.like_count || 0) + 1; 
        }
        console.log("working");
        state.status = "succeeded";
      })
      .addCase(addCommunityPostCommentLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCommunityPostCommentLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCommunityPostCommentLike.fulfilled, (state, action) => {
        const { id } = action.payload;
        const comment = state.communityPostComments.find(
          (comment) => comment.id === id
        );
        if (comment) {
          comment.like_count = (comment.like_count || 0) - 1; 
        }
        state.status = "succeeded";
      })
      .addCase(deleteCommunityPostCommentLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default communityPostCommentSlice.reducer;