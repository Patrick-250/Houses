import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import tokenReducer from "./Token";
import idReducer from "./roomId";
import userIdReduser from "./userID";
export default configureStore({
  reducer: {
    counter: counterReducer,
    token: tokenReducer,
    id: idReducer,
    userId: userIdReduser,
  },
});
