import axios from "axios";
import { GET_DRIVERS, GET_BY_NAME, GET_TEAMS, FILTER_BY_TEAM, FILTER_BY_SOURCE, RESTART, ORDER_BY_ABC, ORDER_BY_DOB, PAGINATION } from "./actions-types";

const URL = "http://localhost:3001";

export const getDrivers = () => {
    return async (dispatch) => {
        try {
            const response = (await axios.get(`${URL}/drivers`)).data;
            dispatch({
                type: GET_DRIVERS,
                payload: response
            });
        } catch(error) {
            console.log(error.message);
        }
    };
};

export const getByName = (name) => {
    return async (dispatch) => {
        try {
            const response = (await axios.get(`${URL}/drivers?name=${name}`)).data;
            dispatch({
                type: GET_BY_NAME,
                payload: response
            });
        } catch(error) {
            console.log(error.message);
        }
    };
};

export const getByTeams = () => {
    return async (dispatch) => {
        try {
            const response = (await axios.get(`${URL}/teams`)).data;
            dispatch({
                type: GET_TEAMS,
                payload: response
            });
        } catch(error) {
            console.log(error.message);
        }
    };
};

export const filterByTeams = (order) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FILTER_BY_TEAM,
                payload: order
            });
        } catch(error) {
            console.log(error.message);
        }
    };
};
// order tomara el valor del Team que se seleccione en el select

export const filterBySource = (order) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FILTER_BY_SOURCE,
                payload: order
            })
        } catch(error) {
            console.log(error.message);
        }
    };
};
// order sera api o db

export const orderByABC = (order) => {
    return{
        type: ORDER_BY_ABC,
        payload: order
    };
};
// order sera ascendente o descendente

export const orderByDOB = (order) => {
    return{
        type: ORDER_BY_DOB,
        payload: order
    };
};
// order sera ascendente o descendente

export const changePage = (order) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: PAGINATION,
                payload: order
            })
        } catch(error) {
            console.log(error.message);
        }
    };
};
// ORDER: Es la direccion de la paginacion "prev" o "next"

export const restart = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: RESTART
            })
        } catch(error) {
            alert(error.respose.data.error)
        }
    };
};

