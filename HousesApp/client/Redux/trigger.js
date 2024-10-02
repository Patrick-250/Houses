import { createSlice } from "@reduxjs/toolkit";
const triggerSlice = createSlice({
  name: "trigger",
  initialState: {
    trigger: false,
  },
  reducers: {
    callTrigger: (state, action) => {
      state.trigger = action.payload;
    },
  },
});
export const { callTrigger } = triggerSlice.actions;
export default triggerSlice.reducer;
