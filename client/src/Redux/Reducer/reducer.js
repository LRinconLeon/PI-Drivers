import { GET_DRIVERS, GET_BY_NAME, PAGINATION, FILTER_BY_SOURCE, GET_TEAMS, FILTER_BY_TEAM, RESTART, ORDER_BY_ABC, ORDER_BY_DOB, GET_BY_ID, CLEAN_DETAIL } from "../Actions/actions-types";

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
        
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload
            };

        case GET_BY_NAME:
            return {
                ...state,
                drivers: [...action.payload].splice(0, DRIVERS_PER_PAGE),
                driverFiltered: action.payload,
                filterOn: true
            };
        
        case GET_BY_ID:
            return {
                ...state,
                drivers: action.payload,
                filterOn: true
            }

        case FILTER_BY_SOURCE: {
            const source = action.payload === "DB"
            ? [...state.driversBackUp].filter(driver => driver.createDB)
            : [...state.driversBackUp].filter(driver => !driver.createDB)

            return {
                ...state,
                drivers: source.splice(0, DRIVERS_PER_PAGE),
                driverFiltered: source,
                filterOn: true
            };
        }

        case FILTER_BY_TEAM: {
            const filteredByTeam = action.payload
            ? [...state.driversBackUp].filter(driver => {
                for (let i in driver.Teams) {
                    if (driver.Teams[i].name === action.payload) return driver;
                }
            }) : [...state.driversBackUp];
                
            return {
                ...state,
                drivers: filteredByTeam.splice(0, DRIVERS_PER_PAGE),
                driverFiltered: filteredByTeam,
                filterOn: true
            };
            // return {
            //     ...state,
            //     drivers: [...state.driversBackUp].filter((driver) => driver.Teams.includes(action.payload)).splice(0, DRIVERS_PER_PAGE),
            //     driverFiltered: [...state.driversBackUp].filter((driver) => driver.Teams.includes(action.payload))
            // }
        }

        case ORDER_BY_ABC: {
            const orderDriver = action.payload === "A"
            ? [...state.driversBackUp].sort((a, b) => a.forename.localeCompare(b.forename))
            : [...state.driversBackUp].sort((a, b) => b.forename.localeCompare(a.forename))

            return {
                ...state,
                drivers: orderDriver.splice(0, DRIVERS_PER_PAGE),
                driverFiltered: orderDriver,
                filterOn: true
            };
        }

        case ORDER_BY_DOB: {
            const dobSorted = action.payload === "Higher"
            ? [...state.driversBackUp].sort((a, b) => {
                const dateA = new Date(a.dob);
                const dateB = new Date(b.dob);
                return dateA - dateB;
            })
            : [...state.driversBackUp].sort((a, b) => {
                const dateA = new Date(a.dob);
                const dateB = new Date(b.dob);
                return dateB - dateA;
            })

            return {
                ...state,
                drivers: dobSorted.splice(0, DRIVERS_PER_PAGE),
                driverFiltered: dobSorted,
                filterOn: true
            };
        }

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
        
        case CLEAN_DETAIL:
            return {
                ...state,
                drivers: {}
            }

        case RESTART:
            return{
                ...state,
                drivers: [...state.driversBackUp].splice(0, DRIVERS_PER_PAGE),
                driverFiltered: []
            }

        default:
            return { ...state };
    }
};

export default rootReducer;