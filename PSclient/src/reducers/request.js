
const initialState = {
    usersData: {}
};

export default (state = initialState, action = {}) => {
    switch(action.type){

        case "GET_SELECTED_REQUESTS":
        case "GET_REQUESTS":
            return {
                ...state,
                usersData: action.users
            }
        default: return state;
    }
}
