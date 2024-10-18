import { addAmenity, deleteAmenity, getAmenity, updateAmenity } from "../../../services/Amenity.service";

export const AMENITY_ADD = "AMENITY_ADD";
export const AMENITY_ADD_SUCCESS = "AMENITY_ADD_SUCCESS";
export const AMENITY_ADD_FAIL = "AMENITY_ADD_FAIL";

export const UPDATE_AMENITY_BY_ID = "UPDATE_AMENITY_BY_ID";
export const UPDATE_AMENITY_BY_ID_SUCCESS = "UPDATE_AMENITY_BY_ID_SUCCESS";
export const UPDATE_AMENITY_BY_ID_FAIL = "UPDATE_AMENITY_BY_ID_FAIL";

export const SET_AMENITY_OBJ = "SET_AMENITY_OBJ";
export const SET_AMENITY_OBJ_SUCCESS = "SET_AMENITY_OBJ_SUCCESS";
export const SET_AMENITY_OBJ_FAIL = "SET_AMENITY_OBJ_FAIL";

export const GET_AMENITY_BY_ID = "GET_AMENITY_BY_ID";
export const GET_AMENITY_BY_ID_SUCCESS = "GET_AMENITY_BY_ID_SUCCESS";
export const GET_AMENITY_BY_ID_FAIL = "GET_AMENITY_BY_ID_FAIL";

export const DELETE_AMENITY_BY_ID = "DELETE_AMENITY_BY_ID";
export const DELETE_AMENITY_BY_ID_SUCCESS = "DELETE_AMENITY_BY_ID_SUCCESS";
export const DELETE_AMENITY_BY_ID_FAIL = "DELETE_AMENITY_BY_ID_FAIL";

export const GET_ALL_AMENITY = "GET_ALL_AMENITY";
export const GET_ALL_AMENITY_SUCCESS = "GET_ALL_AMENITY_SUCCESS";
export const GET_ALL_AMENITY_FAIL = "GET_ALL_AMENITY_FAIL";

export const AMENITY_Add = (formData) => async (dispatch) => {
    try {
        dispatch({ type: AMENITY_ADD });
        let { data: response } = await addAmenity(formData);
        if (response) {
            console.log(response);
            dispatch({
                type: AMENITY_ADD_SUCCESS,
                payload: response.message,
            });
            dispatch(amenityGet());
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: AMENITY_ADD_FAIL, payload: err });
    }
};

export const amenityGet = (formData) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_AMENITY });
        let { data: response } = await getAmenity(formData);
        if (response) {
            console.log(response);
            dispatch({
                type: GET_ALL_AMENITY_SUCCESS,
                payload: { data: response.data, message: response.message },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: AMENITY_ADD_FAIL, payload: err });
    }
};

export const SetAmenityObj = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SET_AMENITY_OBJ });
        if (formData) {
            dispatch({
                type: SET_AMENITY_OBJ_SUCCESS,
                payload: { data: formData },
            });
        } else {
            dispatch({
                type: SET_AMENITY_OBJ_SUCCESS,
                payload: { data: null },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: SET_AMENITY_OBJ_FAIL, payload: { message: "NOT FOUND" } });
    }
};

export const amenityUpdate = (formData, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_AMENITY_BY_ID });
        let { data: response } = await updateAmenity(formData, id);
        if (response) {
            console.log(response);
            dispatch({
                type: UPDATE_AMENITY_BY_ID_SUCCESS,
                payload: response,

            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: UPDATE_AMENITY_BY_ID_FAIL, payload: err });
    }
};

export const amenityDelete = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_AMENITY_BY_ID });
        let { data: response } = await deleteAmenity(id);
        if (response) {
            console.log(response);
            dispatch({
                type: DELETE_AMENITY_BY_ID_SUCCESS,
                payload: response.message,
            });
            dispatch(amenityGet());
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: DELETE_AMENITY_BY_ID_FAIL, payload: err });
    }
};

