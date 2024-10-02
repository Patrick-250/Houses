import { createSlice } from "@reduxjs/toolkit";
const userHouseSlice = createSlice({
  name: "userHoueIds",
  initialState: {
    userHouse: JSON.parse(sessionStorage.getItem("houseIds")),
  },
  reducers: {
    setHouse: (state, action) => {
      state.userId = action.payload;
    },
  },
});
export const { setHouse } = userHouseSlice.actions;
export default userHouseSlice.reducer;
