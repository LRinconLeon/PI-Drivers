import { GET_DRIVERS, GET_BY_NAME, PAGINATION } from "../Actions/actions-types";

const initialState = {
    drivers: [],
    teams: [],
    driversBackUp: [],
    driverFiltered: [],
    filterOn: false,
    currentPage: 0
};

const rootReducer = (state = initialState, action) => {
    const DRIVERS_PER_PAGE = 9;

    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                drivers: [...action.payload].splice(0, DRIVERS_PER_PAGE),
                driversBackUp: action.payload
            };

        case GET_BY_NAME:
            return {
                ...state,
                drivers: [...action.payload].splice(0, DRIVERS_PER_PAGE),
                driverFiltered: action.payload,
                filterOn: true
            };

        case PAGINATION: {
            const nextPage = state.currentPage + 1;
            const prevPage = state.currentPage - 1;
            const firstIndex = action.payload === "next" ? nextPage * DRIVERS_PER_PAGE : prevPage * DRIVERS_PER_PAGE; 
            // supongamos que estamos en currentPage 2, 2+1 (nextPage = 3) * 9 = 27 drivers. firstIndex = 27. drivers: splice(27, 9) 

            if(state.filterOn) { //es para que siga paginando en caso de que exista un filtro
                if(action.payload === "next" && firstIndex >= state.driverFiltered.length) return state;
                if(action.payload === "prev" && prevPage < 0) return state;
                return {
                    ...state,
                    drivers: [...state.driverFiltered].splice(firstIndex, DRIVERS_PER_PAGE),
                    currentPage: action.payload === "next" ? nextPage : prevPage
                };
            }

            if(action.payload === "next" && firstIndex >= state.driversBackUp.length) return state;
            if(action.payload === "prev" && prevPage < 0) return state;

            return {
                ...state,
                drivers: [...state.driversBackUp].splice(firstIndex, DRIVERS_PER_PAGE), 
                currentPage: action.payload === "next" ? nextPage : prevPage
            };
        }

        default:
            return { ...state };
    }
};

export default rootReducer;