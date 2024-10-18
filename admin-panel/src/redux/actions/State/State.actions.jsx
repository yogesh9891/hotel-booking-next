import { addState, deleteState, getStates, updateState } from "../../../services/state.service";

export const STATE_ADD = "STATE_ADD";
export const STATE_ADD_SUCCESS = "STATE_ADD_SUCCESS";
export const STATE_ADD_FAIL = "STATE_ADD_FAIL";

export const GET_ALL_STATES = "GET_ALL_STATES";
export const GET_ALL_STATES_SUCCESS = "GET_ALL_STATES_SUCCESS";
export const GET_ALL_STATES_FAIL = "GET_ALL_STATES_FAIL";

export const UPDATE_STATE_BY_ID = "UPDATE_STATE_BY_ID";
export const UPDATE_STATE_BY_ID_SUCCESS = "UPDATE_STATE_BY_ID_SUCCESS";
export const UPDATE_STATE_BY_ID_FAIL = "UPDATE_STATE_BY_ID_FAIL";

export const SET_STATE_OBJ = "SET_STATE_OBJ";
export const SET_STATE_OBJ_SUCCESS = "SET_STATE_OBJ_SUCCESS";
export const SET_STATE_OBJ_FAIL = "SET_STATE_OBJ_FAIL";

export const GET_STATE_BY_ID = "GET_STATE_BY_ID";
export const GET_STATE_BY_ID_SUCCESS = "GET_STATE_BY_ID_SUCCESS";
export const GET_STATE_BY_ID_FAIL = "GET_STATE_BY_ID_FAIL";

export const DELETE_STATE_BY_ID = "DELETE_STATE_BY_ID";
export const DELETE_STATE_BY_ID_SUCCESS = "DELETE_STATE_BY_ID_SUCCESS";
export const DELETE_STATE_BY_ID_FAIL = "DELETE_STATE_BY_ID_FAIL";
export const STATEAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: STATE_ADD });
    let { data: response } = await addState(formData);
    if (response) {
      dispatch(STATEGet())
      dispatch({
        type: STATE_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: STATE_ADD_FAIL, payload: err });
  }
};

export const STATEGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_STATES });
    let { data: response } = await getStates(formData);
    if (response) {

      dispatch({
        type: GET_ALL_STATES_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: STATE_ADD_FAIL, payload: err });
  }
};

export const SETSTATEObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_STATE_OBJ });
    if (formData) {
      dispatch({
        type: SET_STATE_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_STATE_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_STATE_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const STATEUpdate = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STATE_BY_ID });
    let { data: response } = await updateState(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_STATE_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(STATEGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_STATE_BY_ID_FAIL, payload: err });
  }
};

export const STATEDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STATE_BY_ID });
    let { data: response } = await deleteState(id);
    if (response) {
      console.log(response, "response");
      dispatch({
        type: DELETE_STATE_BY_ID_SUCCESS,
        payload: response.message
      });
      dispatch(STATEGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_STATE_BY_ID_FAIL, payload: err });
  }
};