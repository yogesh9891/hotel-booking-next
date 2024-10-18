import { addRoom, deleteRoom, getRooms, updateRoom } from "../../../services/Room.service";

export const ROOM_ADD = "ROOM_ADD";
export const ROOM_ADD_SUCCESS = "ROOM_ADD_SUCCESS";
export const ROOM_ADD_FAIL = "ROOM_ADD_FAIL";

export const UPDATE_ROOM_BY_ID = "UPDATE_ROOM_BY_ID";
export const UPDATE_ROOM_BY_ID_SUCCESS = "UPDATE_ROOM_BY_ID_SUCCESS";
export const UPDATE_ROOM_BY_ID_FAIL = "UPDATE_ROOM_BY_ID_FAIL";

export const SET_ROOM_OBJ = "SET_ROOM_OBJ";
export const SET_ROOM_OBJ_SUCCESS = "SET_ROOM_OBJ_SUCCESS";
export const SET_ROOM_OBJ_FAIL = "SET_ROOM_OBJ_FAIL";

export const GET_ROOM_BY_ID = "GET_ROOM_BY_ID";
export const GET_ROOM_BY_ID_SUCCESS = "GET_ROOM_BY_ID_SUCCESS";
export const GET_ROOM_BY_ID_FAIL = "GET_ROOM_BY_ID_FAIL";

export const DELETE_ROOM_BY_ID = "DELETE_ROOM_BY_ID";
export const DELETE_ROOM_BY_ID_SUCCESS = "DELETE_ROOM_BY_ID_SUCCESS";
export const DELETE_ROOM_BY_ID_FAIL = "DELETE_ROOM_BY_ID_FAIL";

export const GET_ALL_ROOM = "GET_ALL_ROOM";
export const GET_ALL_ROOM_SUCCESS = "GET_ALL_ROOM_SUCCESS";
export const GET_ALL_ROOM_FAIL = "GET_ALL_ROOM_FAIL";

export const ROOMADD = (formData) => async (dispatch) => {
    try {
        dispatch({ type: ROOM_ADD });
        let { data: response } = await addRoom(formData);
        if (response) {
            console.log(response);
            dispatch({
                type: ROOM_ADD_SUCCESS,
                payload: response.message,
            });
            dispatch(ROOMGET());
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: ROOM_ADD_FAIL, payload: err });
    }
};

export const ROOMGET = (formData) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_ROOM });
        let { data: response } = await getRooms(formData);
        if (response) {
            console.log(response);
            dispatch({
                type: GET_ALL_ROOM_SUCCESS,
                payload: { data: response.data, message: response.message },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: ROOM_ADD_FAIL, payload: err });
    }
};

export const SetROOMOBJ = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SET_ROOM_OBJ });
        if (formData) {
            dispatch({
                type: SET_ROOM_OBJ_SUCCESS,
                payload: formData,
            });
        } else {
            dispatch({
                type: SET_ROOM_OBJ_SUCCESS,
                payload: { data: null },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: SET_ROOM_OBJ_FAIL, payload: { message: "NOT FOUND" } });
    }
};

export const ROOMUPDATE = (formData, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ROOM_BY_ID });
        let { data: response } = await updateRoom(formData, id);
        if (response) {
            console.log(response);
            dispatch({
                type: UPDATE_ROOM_BY_ID_SUCCESS,
                payload: response,
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: UPDATE_ROOM_BY_ID_FAIL, payload: err });
    }
};

export const ROOMDELETE = (row) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ROOM_BY_ID });
        let { data: response } = await deleteRoom(row._id);
        if (response) {
            console.log(response);
            dispatch({
                type: DELETE_ROOM_BY_ID_SUCCESS,
                payload: response,
            });
            dispatch(ROOMGET(`hotelId=${row.hotelId}`));
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: DELETE_ROOM_BY_ID_FAIL, payload: err });
    }
};

