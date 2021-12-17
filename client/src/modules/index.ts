import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import mailWriteName from "./mailWriteName";
import mailWriteText from "./mailWriteText";
import mailDeleteList from "./mailDeleteList";
import issignin from "./isSignIn";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  mailWriteName,
  mailWriteText,
  mailDeleteList,
  issignin,
});

export default persistReducer(persistConfig, rootReducer);
