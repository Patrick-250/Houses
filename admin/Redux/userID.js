import { createSlice } from "@reduxjs/toolkit";
const userIdSlice = createSlice({
  name: "userId",
  initialState: {
    userId: sessionStorage.getItem("userId"),
  },
  reducers: {
    getUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});
export const { getUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
