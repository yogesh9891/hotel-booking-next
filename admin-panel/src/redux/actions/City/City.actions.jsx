import { addCity, deleteCity, getCity, updateCity } from "../../../services/City.service";

export const CITY_ADD = "CITY_ADD";
export const CITY_ADD_SUCCESS = "CITY_ADD_SUCCESS";
export const CITY_ADD_FAIL = "CITY_ADD_FAIL";

export const GET_ALL_CITY = "GET_ALL_CITY";
export const GET_ALL_CITY_SUCCESS = "GET_ALL_CITY_SUCCESS";
export const GET_ALL_CITY_FAIL = "GET_ALL_CITY_FAIL";

export const UPDATE_CITY_BY_ID = "UPDATE_CITY_BY_ID";
export const UPDATE_CITY_BY_ID_SUCCESS = "UPDATE_CITY_BY_ID_SUCCESS";
export const UPDATE_CITY_BY_ID_FAIL = "UPDATE_CITY_BY_ID_FAIL";

export const SET_CITY_OBJ = "SET_CITY_OBJ";
export const SET_CITY_OBJ_SUCCESS = "SET_CITY_OBJ_SUCCESS";
export const SET_CITY_OBJ_FAIL = "SET_CITY_OBJ_FAIL";

export const GET_CITY_BY_ID = "GET_CITY_BY_ID";
export const GET_CITY_BY_ID_SUCCESS = "GET_CITY_BY_ID_SUCCESS";
export const GET_CITY_BY_ID_FAIL = "GET_CITY_BY_ID_FAIL";

export const DELETE_CITY_BY_ID = "DELETE_CITY_BY_ID";
export const DELETE_CITY_BY_ID_SUCCESS = "DELETE_CITY_BY_ID_SUCCESS";
export const DELETE_CITY_BY_ID_FAIL = "DELETE_CITY_BY_ID_FAIL";

export const CityAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CITY_ADD });
    let { data: response } = await addCity(formData);
    if (response) {
      dispatch(CityGet())
      dispatch({
        type: CITY_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: CITY_ADD_FAIL, payload: err });
  }
};

export const CityGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CITY });
    let { data: response } = await getCity(formData);
    if (response) {

      dispatch({
        type: GET_ALL_CITY_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: CITY_ADD_FAIL, payload: err });
  }
};

export const SetCityObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_CITY_OBJ });
    if (formData) {
      dispatch({
        type: SET_CITY_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_CITY_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_CITY_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const CityUpdate = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CITY_BY_ID });
    let { data: response } = await updateCity(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_CITY_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(CityGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_CITY_BY_ID_FAIL, payload: err });
  }
};

export const CityDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CITY_BY_ID });
    let { data: response } = await deleteCity(id);
    if (response) {
      console.log(response, "response");
      dispatch({
        type: DELETE_CITY_BY_ID_SUCCESS,
        payload: response
      });
      dispatch(CityGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_CITY_BY_ID_FAIL, payload: err });
  }
};