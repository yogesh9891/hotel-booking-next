import { addAmenityCategory, deleteAmenityCategory, getAmenityCategory, updateAmenityCategory } from "../../../services/AmenityCategory.service";

export const AMENITY_CATEGORY_ADD = "AMENITY_CATEGORY_ADD";
export const AMENITY_CATEGORY_ADD_SUCCESS = "AMENITY_CATEGORY_ADD_SUCCESS";
export const AMENITY_CATEGORY_ADD_FAIL = "AMENITY_CATEGORY_ADD_FAIL";

export const UPDATE_AMENITY_CATEGORY_BY_ID = "UPDATE_AMENITY_CATEGORY_BY_ID";
export const UPDATE_AMENITY_CATEGORY_BY_ID_SUCCESS = "UPDATE_AMENITY_CATEGORY_BY_ID_SUCCESS";
export const UPDATE_AMENITY_CATEGORY_BY_ID_FAIL = "UPDATE_AMENITY_CATEGORY_BY_ID_FAIL";

export const SET_AMENITY_CATEGORY_OBJ = "SET_AMENITY_CATEGORY_OBJ";
export const SET_AMENITY_CATEGORY_OBJ_SUCCESS = "SET_AMENITY_CATEGORY_OBJ_SUCCESS";
export const SET_AMENITY_CATEGORY_OBJ_FAIL = "SET_AMENITY_CATEGORY_OBJ_FAIL";

export const GET_AMENITY_CATEGORY_BY_ID = "GET_AMENITY_CATEGORY_BY_ID";
export const GET_AMENITY_CATEGORY_BY_ID_SUCCESS = "GET_AMENITY_CATEGORY_BY_ID_SUCCESS";
export const GET_AMENITY_CATEGORY_BY_ID_FAIL = "GET_AMENITY_CATEGORY_BY_ID_FAIL";

export const DELETE_AMENITY_CATEGORY_BY_ID = "DELETE_AMENITY_CATEGORY_BY_ID";
export const DELETE_AMENITY_CATEGORY_BY_ID_SUCCESS = "DELETE_AMENITY_CATEGORY_BY_ID_SUCCESS";
export const DELETE_AMENITY_CATEGORY_BY_ID_FAIL = "DELETE_AMENITY_CATEGORY_BY_ID_FAIL";

export const GET_ALL_AMENITY_CATEGORY = "GET_ALL_AMENITY_CATEGORY";
export const GET_ALL_AMENITY_CATEGORY_SUCCESS = "GET_ALL_AMENITY_CATEGORY_SUCCESS";
export const GET_ALL_AMENITY_CATEGORY_FAIL = "GET_ALL_AMENITY_CATEGORY_FAIL";

export const AMENITY_CATEGORY_Add = (formData) => async (dispatch) => {
    try {
        dispatch({ type: AMENITY_CATEGORY_ADD });
        let { data: response } = await addAmenityCategory(formData);
        if (response) {
            console.log(response);
            dispatch({
                type: AMENITY_CATEGORY_ADD_SUCCESS,
                payload: response.message,
            });
            dispatch(amenityCategoryGet());
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: AMENITY_CATEGORY_ADD_FAIL, payload: err });
    }
};

export const amenityCategoryGet = (formData) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_AMENITY_CATEGORY });
        let { data: response } = await getAmenityCategory(formData);
        if (response) {
            console.log(response);
            dispatch({
                type: GET_ALL_AMENITY_CATEGORY_SUCCESS,
                payload: { data: response.data, message: response.message },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: AMENITY_CATEGORY_ADD_FAIL, payload: err });
    }
};

export const SetAmenityCategoryObj = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SET_AMENITY_CATEGORY_OBJ });
        if (formData) {
            dispatch({
                type: SET_AMENITY_CATEGORY_OBJ_SUCCESS,
                payload: { data: formData },
            });
        } else {
            dispatch({
                type: SET_AMENITY_CATEGORY_OBJ_SUCCESS,
                payload: { data: null },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: SET_AMENITY_CATEGORY_OBJ_FAIL, payload: { message: "NOT FOUND" } });
    }
};

export const amenityCategoryUpdate = (formData, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_AMENITY_CATEGORY_BY_ID });
        let { data: response } = await updateAmenityCategory(formData, id);
        if (response) {
            console.log(response);
            dispatch({
                type: UPDATE_AMENITY_CATEGORY_BY_ID_SUCCESS,
                payload: { message: response.message },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: UPDATE_AMENITY_CATEGORY_BY_ID_FAIL, payload: err });
    }
};

export const amenityCategoryDelete = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_AMENITY_CATEGORY_BY_ID });
        let { data: response } = await deleteAmenityCategory(id);
        if (response) {
            console.log(response);
            dispatch({
                type: DELETE_AMENITY_CATEGORY_BY_ID_SUCCESS,
                payload: response.message,
            });
            dispatch(amenityCategoryGet());
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: DELETE_AMENITY_CATEGORY_BY_ID_FAIL, payload: err });
    }
};

