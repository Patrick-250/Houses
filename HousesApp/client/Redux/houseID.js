import { createSlice } from "@reduxjs/toolkit";
const houseIdSlice = createSlice({
  name: "house_id",
  initialState: {
    house_id: null,
  },
  reducers: {
    getHouseId: (state, action) => {
      state.house_id = action.payload;
    },
  },
});
export const { getHouseId } = houseIdSlice.actions;
export default houseIdSlice.reducer;
