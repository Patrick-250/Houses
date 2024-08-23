import { createSlice } from "@reduxjs/toolkit";
const userHouseSlice = createSlice({
  name: "userId",
  initialState: {
    userHouse: sessionStorage.getItem("houseIds"),
  },
  reducers: {
    getUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});
export const { getUserId } = userHouseSlice.actions;
export default userHouseSlice.reducer;
