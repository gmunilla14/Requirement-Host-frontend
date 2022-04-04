import reqReducer from "./reqReducer";
import { combineReducers } from "redux";
import projReducer from "./projectReducer";
import authReducer from "./authReducer";
import settingReducer from "./settingReducer";
import catReducer from "./categoryReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
  requirements: reqReducer,
  projects: projReducer,
  auth: authReducer,
  settings: settingReducer,
  categories: catReducer,
  loading: loadingReducer
});

export default rootReducer;
