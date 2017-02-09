import axios from "axios";

export function addRequest(data){
    return dispatch => {
        return axios.post("/api/requests", data);
    }
}

export function getRequests(){
    return dispatch => {
        axios.get("/api/requests").then((res) => {
            dispatch({
                type: "GET_REQUESTS",
                users: res.data
            });
        });
    }
}


export function getProducts(){
    return dispatch => {
        return [
            "halskæde",
            "armbånd",
            "ring",
            "ørering",
            "andet"
        ]
    };
}

export function getAreas(){
    return dispatch => {
        return [
            "nordjylland",
            "midtjylland",
            "syddanmark",
            "fyn",
            "nordsjælland",
            "sjælland",
            "sydhavsøerne"
        ];
    }
}

export function getMaterials(){
    return dispatch => {
        return [
            "bronze",
            "sølv",
            "guld",
            "diamant",
            "andet"
        ];
    }
}

export function addSearchFormInput(data){
    return dispatch => {
        getSelectedRequests(data).then((res) => {
            dispatch({
                type: "GET_SELECTED_REQUESTS",
                users: res.data
            });
        });
    }
}

export function getSelectedRequests(data){
        return axios.get("/api/requests/q", {params: {
            data: data
        }});
}
