import {combineReducers} from "redux";
import counter from "./counter";
import mailWriteRedux from "./maillWriteRedux";

const rootReducer = combineReducers({counter, mailWriteRedux});

export default rootReducer;
