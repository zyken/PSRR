
const initialState = {
    requestsData: {}
};

export default (state = initialState, action = {}) => {
    switch(action.type){

        case "GET_SELECTED_REQUESTS":
        case "GET_REQUESTS":
            return {
                ...state,
                requestsData: action.requests
            }
        default: return state;
    }
}
