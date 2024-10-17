import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
  name: "id",
  initialState: {
    id: null,
    houseId: null,
    count: null,
  },
  reducers: {
    getId: (state, action) => {
      state.id = action.payload;
    },
    getHouseId: (state, action) => {
      state.houseId = action.payload;
    },
    getCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { getId, getHouseId, getCount } = idSlice.actions;
export default idSlice.reducer;
