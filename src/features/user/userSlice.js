import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
    synced: false,
  },
  reducers: {
    logout: (state) => {
      state.user = "";
    },
    login: (state, action) => {
      state.synced = true;
      state.user = action.payload;
    },
  },
});

export const { logout, login } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
