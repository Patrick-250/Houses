import { createSlice } from "@reduxjs/toolkit";
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    getCount: (state, action) => {
      state.count = action.payload;
    },
  },
});
export const { getCount } = counterSlice.actions;
export default counterSlice.reducer;
