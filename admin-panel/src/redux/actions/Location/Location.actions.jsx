import { addLocation, deleteLocation, getLocation, updateLocation } from "../../../services/Location.service";

export const LOCATION_ADD = "LOCATION_ADD";
export const LOCATION_ADD_SUCCESS = "LOCATION_ADD_SUCCESS";
export const LOCATION_ADD_FAIL = "LOCATION_ADD_FAIL";

export const GET_ALL_LOCATION = "GET_ALL_LOCATION";
export const GET_ALL_LOCATION_SUCCESS = "GET_ALL_LOCATION_SUCCESS";
export const GET_ALL_LOCATION_FAIL = "GET_ALL_LOCATION_FAIL";

export const UPDATE_LOCATION_BY_ID = "UPDATE_LOCATION_BY_ID";
export const UPDATE_LOCATION_BY_ID_SUCCESS = "UPDATE_LOCATION_BY_ID_SUCCESS";
export const UPDATE_LOCATION_BY_ID_FAIL = "UPDATE_LOCATION_BY_ID_FAIL";

export const SET_LOCATION_OBJ = "SET_LOCATION_OBJ";
export const SET_LOCATION_OBJ_SUCCESS = "SET_LOCATION_OBJ_SUCCESS";
export const SET_LOCATION_OBJ_FAIL = "SET_LOCATION_OBJ_FAIL";

export const GET_LOCATION_BY_ID = "GET_LOCATION_BY_ID";
export const GET_LOCATION_BY_ID_SUCCESS = "GET_LOCATION_BY_ID_SUCCESS";
export const GET_LOCATION_BY_ID_FAIL = "GET_LOCATION_BY_ID_FAIL";

export const DELETE_LOCATION_BY_ID = "DELETE_LOCATION_BY_ID";
export const DELETE_LOCATION_BY_ID_SUCCESS = "DELETE_LOCATION_BY_ID_SUCCESS";
export const DELETE_LOCATION_BY_ID_FAIL = "DELETE_LOCATION_BY_ID_FAIL";

export const LocationAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOCATION_ADD });
    let { data: response } = await addLocation(formData);
    if (response) {
     
      dispatch({
        type: LOCATION_ADD_SUCCESS,
        payload: response.message,
      });
      dispatch(LocationGet())
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: LOCATION_ADD_FAIL, payload: err });
  }
};

export const LocationGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LOCATION });
    let { data: response } = await getLocation(formData);
    if (response) {

      dispatch({
        type: GET_ALL_LOCATION_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: LOCATION_ADD_FAIL, payload: err });
  }
};

export const SetLocationObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOCATION_OBJ });
    if (formData) {
      dispatch({
        type: SET_LOCATION_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_LOCATION_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_LOCATION_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const LocationUpdate = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LOCATION_BY_ID });
    let { data: response } = await updateLocation(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_LOCATION_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(LocationGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_LOCATION_BY_ID_FAIL, payload: err });
  }
};

export const LocationDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LOCATION_BY_ID });
    let { data: response } = await deleteLocation(id);
    if (response) {
      console.log(response, "response");
    
      dispatch({
        type: DELETE_LOCATION_BY_ID_SUCCESS,
        payload: response.message
      });
      dispatch(LocationGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_LOCATION_BY_ID_FAIL, payload: err });
  }
};