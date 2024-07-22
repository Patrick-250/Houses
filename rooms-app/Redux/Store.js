import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import tokenReducer from "./Token";
import idReducer from "./roomId";
export default configureStore({
  reducer: {
    counter: counterReducer,
    token: tokenReducer,
    id: idReducer,
  },
});
