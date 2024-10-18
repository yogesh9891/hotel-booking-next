import { addCountry, deleteCountry, getCountry, updateCountry } from "../../../services/Country.service";

export const COUNTRY_ADD = "COUNTRY_ADD";
export const COUNTRY_ADD_SUCCESS = "COUNTRY_ADD_SUCCESS";
export const COUNTRY_ADD_FAIL = "COUNTRY_ADD_FAIL";

export const GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
export const GET_ALL_COUNTRY_SUCCESS = "GET_ALL_COUNTRY_SUCCESS";
export const GET_ALL_COUNTRY_FAIL = "GET_ALL_COUNTRY_FAIL";

export const UPDATE_COUNTRY_BY_ID = "UPDATE_COUNTRY_BY_ID";
export const UPDATE_COUNTRY_BY_ID_SUCCESS = "UPDATE_COUNTRY_BY_ID_SUCCESS";
export const UPDATE_COUNTRY_BY_ID_FAIL = "UPDATE_COUNTRY_BY_ID_FAIL";

export const SET_COUNTRY_OBJ = "SET_COUNTRY_OBJ";
export const SET_COUNTRY_OBJ_SUCCESS = "SET_COUNTRY_OBJ_SUCCESS";
export const SET_COUNTRY_OBJ_FAIL = "SET_COUNTRY_OBJ_FAIL";

export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const GET_COUNTRY_BY_ID_SUCCESS = "GET_COUNTRY_BY_ID_SUCCESS";
export const GET_COUNTRY_BY_ID_FAIL = "GET_COUNTRY_BY_ID_FAIL";

export const DELETE_COUNTRY_BY_ID = "DELETE_COUNTRY_BY_ID";
export const DELETE_COUNTRY_BY_ID_SUCCESS = "DELETE_COUNTRY_BY_ID_SUCCESS";
export const DELETE_COUNTRY_BY_ID_FAIL = "DELETE_COUNTRY_BY_ID_FAIL";

export const CountryAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: COUNTRY_ADD });
    let { data: response } = await addCountry(formData);
    if (response) {
     
      dispatch({
        type: COUNTRY_ADD_SUCCESS,
        payload: response.message,
      });
      dispatch(CountryGet())
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: COUNTRY_ADD_FAIL, payload: err });
  }
};

export const CountryGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_COUNTRY });
    let { data: response } = await getCountry(formData);
    if (response) {

      dispatch({
        type: GET_ALL_COUNTRY_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: COUNTRY_ADD_FAIL, payload: err });
  }
};

export const SetCountryObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_COUNTRY_OBJ });
    if (formData) {
      dispatch({
        type: SET_COUNTRY_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_COUNTRY_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_COUNTRY_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const CountryUpdate = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COUNTRY_BY_ID });
    let { data: response } = await updateCountry(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_COUNTRY_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(CountryGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_COUNTRY_BY_ID_FAIL, payload: err });
  }
};

export const CountryDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COUNTRY_BY_ID });
    let { data: response } = await deleteCountry(id);
    if (response) {
      console.log(response, "response");
    
      dispatch({
        type: DELETE_COUNTRY_BY_ID_SUCCESS,
        payload: response.message
      });
      dispatch(CountryGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_COUNTRY_BY_ID_FAIL, payload: err });
  }
};