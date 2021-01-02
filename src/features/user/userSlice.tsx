import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    synced: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    login: (state, action: { payload: User }) => {
      state.synced = true;
      state.user = action.payload;
    },
  },
});

export const { logout, login } = userSlice.actions;

export const selectUser = (state: { user: { user: User } }) => state.user.user;

export default userSlice.reducer;
