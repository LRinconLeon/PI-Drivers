import { GET_DRIVERS, GET_BY_NAME } from "../Actions/actions-types";

const initialState = {
    drivers: [],
    teams: [],
    driversBackUp: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                drivers: action.payload
            };

        case GET_BY_NAME:
            return {
                ...state,
                drivers: action.payload
            };

        default:
            return { ...state };
    }
};

export default rootReducer;