import { createSlice } from "@reduxjs/toolkit";
const idSlice = createSlice({
  name: "id",
  initialState: {
    id: null,
  },
  reducers: {
    getId: (state, action) => {
      state.id = action.payload;
    },
  },
});
export const { getId } = idSlice.actions;
export default idSlice.reducer;
