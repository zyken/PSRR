import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import { addFlashMessage } from "./flashMessages";

export function setCurrentUser(user){
    return {
        type: "SET_CURRENT_USER",
        user
    };
}

export function logout(){
    return dispatch => {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
        dispatch(addFlashMessage({type: "success", text: "You successfully logged out!"}));
    };
}

export function login(data){
    return dispatch => {
        return axios.post("/api/auth", data).then(res => {
            const token = res.data.token;
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwtDecode(token)));
        });
    }
}
