import React from "react";
import { Route } from "react-router";

import App from "./components/App";
import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/login/LoginPage";
import NewEventPage from "./components/events/NewEventPage";
import requireAuth from "./utils/requireAuth";
import CreateRequestPage from "./components/request/create/CreateRequestPage";
import SearchRequestPage from "./components/request/search/SearchRequestPage";

//<IndexRoute component={Greetings} />

export default (
    <Route path="/" component={App}>
        <Route path="signup" component={SignupPage} />
        <Route path="login" component={LoginPage} />
        <Route path="create-request" component={requireAuth(CreateRequestPage)} />
        <Route path="search-request" component={SearchRequestPage} />
        <Route path="new-event" component={requireAuth(NewEventPage)} />
    </Route>
);
