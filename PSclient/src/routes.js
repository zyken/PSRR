import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/login/LoginPage";
import NewEventPage from "./components/events/NewEventPage";
import requireAuth from "./utils/requireAuth";
import CreateRequestPage from "./components/request/create/CreateRequestPage";
import SearchRequestPage from "./components/request/search/SearchRequestPage";
import StartButtons from "./components/start/StartButtons";
import Customize from "./components/customize/Customize";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={StartButtons} />
        <Route path="customize" component={Customize} >
            <Route path="signup" component={SignupPage} />
            <Route path="login" component={LoginPage} />
            <Route path="create-request" component={CreateRequestPage} />
            <Route path="search-request" component={SearchRequestPage} />
            <Route path="new-event" component={requireAuth(NewEventPage)} />
        </Route>
    </Route>
);
