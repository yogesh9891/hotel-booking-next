import { addHotel, deleteHotel, getHotels, updateHotel } from "../../../services/Hotels.service";

export const HOTEL_ADD = "HOTEL_ADD";
export const HOTEL_ADD_SUCCESS = "HOTEL_ADD_SUCCESS";
export const HOTEL_ADD_FAIL = "HOTEL_ADD_FAIL";

export const UPDATE_HOTEL_BY_ID = "UPDATE_HOTEL_BY_ID";
export const UPDATE_HOTEL_BY_ID_SUCCESS = "UPDATE_HOTEL_BY_ID_SUCCESS";
export const UPDATE_HOTEL_BY_ID_FAIL = "UPDATE_HOTEL_BY_ID_FAIL";

export const SET_HOTEL_OBJ = "SET_HOTEL_OBJ";
export const SET_HOTEL_OBJ_SUCCESS = "SET_HOTEL_OBJ_SUCCESS";
export const SET_HOTEL_OBJ_FAIL = "SET_HOTEL_OBJ_FAIL";

export const GET_HOTEL_BY_ID = "GET_HOTEL_BY_ID";
export const GET_HOTEL_BY_ID_SUCCESS = "GET_HOTEL_BY_ID_SUCCESS";
export const GET_HOTEL_BY_ID_FAIL = "GET_HOTEL_BY_ID_FAIL";

export const DELETE_HOTEL_BY_ID = "DELETE_HOTEL_BY_ID";
export const DELETE_HOTEL_BY_ID_SUCCESS = "DELETE_HOTEL_BY_ID_SUCCESS";
export const DELETE_HOTEL_BY_ID_FAIL = "DELETE_HOTEL_BY_ID_FAIL";

export const GET_ALL_HOTEL = "GET_ALL_HOTEL";
export const GET_ALL_HOTEL_SUCCESS = "GET_ALL_HOTEL_SUCCESS";
export const GET_ALL_HOTEL_FAIL = "GET_ALL_HOTEL_FAIL";

export const HOTELADD = (formData) => async (dispatch) => {
    try {
        dispatch({ type: HOTEL_ADD });
        let { data: response } = await addHotel(formData);
        if (response) {
            console.log(response);
            dispatch({
                type: HOTEL_ADD_SUCCESS,
                payload: response.message,
            });
            dispatch(HOTELGET());
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: HOTEL_ADD_FAIL, payload: err });
    }
};

export const HOTELGET = (formData) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_HOTEL });
        let { data: response } = await getHotels(formData);
        if (response) {
            console.log(response);
            dispatch({
                type: GET_ALL_HOTEL_SUCCESS,
                payload: { data: response.data, message: response.message },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: HOTEL_ADD_FAIL, payload: err });
    }
};

export const SetHOTELOBJ = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SET_HOTEL_OBJ });
        if (formData) {
            dispatch({
                type: SET_HOTEL_OBJ_SUCCESS,
                payload: formData,
            });
        } else {
            dispatch({
                type: SET_HOTEL_OBJ_SUCCESS,
                payload: { data: null },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: SET_HOTEL_OBJ_FAIL, payload: { message: "NOT FOUND" } });
    }
};

export const HOTELUPDATE = (formData, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_HOTEL_BY_ID });
        let { data: response } = await updateHotel(formData, id);
        if (response) {
            console.log(response);
            dispatch({
                type: UPDATE_HOTEL_BY_ID_SUCCESS,
                payload: response,
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: UPDATE_HOTEL_BY_ID_FAIL, payload: err });
    }
};

export const HOTELDELETE = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_HOTEL_BY_ID });
        let { data: response } = await deleteHotel(id);
        if (response) {
            console.log(response);
            dispatch({
                type: DELETE_HOTEL_BY_ID_SUCCESS,
                payload: response,
            });
            dispatch(HOTELGET());
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: DELETE_HOTEL_BY_ID_FAIL, payload: err });
    }
};

