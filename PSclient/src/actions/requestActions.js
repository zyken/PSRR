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
                requests: res.data
            });
        });
    }
}


export function getProducts(){
    return dispatch => {
        return [
            "armbånd",
            "halskæder",
            "ringe",
            "vedhæng",
            "øreringe",
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
            "guld - 8 karat",
            "guld - 9 karat",
            "guld - 14 karat",
            "guld - 18 karat",
            "hvidguld - 8 karat",
            "hvidguld - 9 karat",
            "hvidguld - 14 karat",
            "hvidguld - 18 karat",
            "rosaguld - 8 karat",
            "rosaguld - 9 karat",
            "rosaguld - 14 karat",
            "rosaguld - 18 karat",
            "sølv",
            "oxideret sølv",
            "forgyldt sølv - guld",
            "forgyldt sølv - rosa",
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
