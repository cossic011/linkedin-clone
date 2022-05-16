import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {},
  postState: {
    key: "postState",
    default: false,
  },
  useSSRPostsState: {
    key: "useSSRPostsState",
    default: true,
  },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    handlePostState: (state, action) => {
      state.postState.default = action.payload;
    },
    handleUseSSRPostsState: (state) => {
      state.useSSRPostsState.default = false;
    },
    handlePost: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { handlePostState, handleUseSSRPostsState, handlePost } =
  postSlice.actions;
export default postSlice.reducer;
