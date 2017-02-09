import { combineReducers } from "redux";

import flashMessages from "./reducers/flashMessages";
import auth from "./reducers/auth";
import request from "./reducers/request";

export default combineReducers({
    flashMessages,
    auth,
    request
});
