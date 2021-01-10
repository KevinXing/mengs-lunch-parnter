import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import videoList from "./videos";
import subscriptions from "./subscriptions";

export default combineReducers({
  videoList,
  subscriptions,
  form: reduxFormReducer,
});
