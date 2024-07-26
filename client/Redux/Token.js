import { createSlice } from "@reduxjs/toolkit";
const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: sessionStorage.getItem("token"),
  },
  reducers: {
    getToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { getToken } = tokenSlice.actions;
export default tokenSlice.reducer;
