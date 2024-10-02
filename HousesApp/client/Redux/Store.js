import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import tokenReducer from "./Token";
import idReducer from "./roomId";
import userIdReduser from "./userID";
import houseIdReducer from "./houseID";
import triggerReducer from "./trigger";
import userHouseReducer from "./userHouses";
export default configureStore({
  reducer: {
    counter: counterReducer,
    token: tokenReducer,
    id: idReducer,
    userId: userIdReduser,
    houseId: houseIdReducer,
    trigger: triggerReducer,
    housesArray: userHouseReducer,
  },
});
