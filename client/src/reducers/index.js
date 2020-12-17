import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import videoList from "./videos";

export default combineReducers({ videoList, form: reduxFormReducer });
