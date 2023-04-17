import { combineReducers } from "redux";

import reducer from "./appReducer";

const rootReducer = combineReducers({
  app: reducer,
});

export default rootReducer;
