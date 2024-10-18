import { addSeo, deleteSeo, getSeo, updateSeo } from "../../../services/Seo.service";

export const SEO_ADD = "SEO_ADD";
export const SEO_ADD_SUCCESS = "SEO_ADD_SUCCESS";
export const SEO_ADD_FAIL = "SEO_ADD_FAIL";

export const GET_ALL_SEO = "GET_ALL_SEO";
export const GET_ALL_SEO_SUCCESS = "GET_ALL_SEO_SUCCESS";
export const GET_ALL_SEO_FAIL = "GET_ALL_SEO_FAIL";

export const UPDATE_SEO_BY_ID = "UPDATE_SEO_BY_ID";
export const UPDATE_SEO_BY_ID_SUCCESS = "UPDATE_SEO_BY_ID_SUCCESS";
export const UPDATE_SEO_BY_ID_FAIL = "UPDATE_SEO_BY_ID_FAIL";

export const SET_SEO_OBJ = "SET_SEO_OBJ";
export const SET_SEO_OBJ_SUCCESS = "SET_SEO_OBJ_SUCCESS";
export const SET_SEO_OBJ_FAIL = "SET_SEO_OBJ_FAIL";

export const GET_SEO_BY_ID = "GET_SEO_BY_ID";
export const GET_SEO_BY_ID_SUCCESS = "GET_SEO_BY_ID_SUCCESS";
export const GET_SEO_BY_ID_FAIL = "GET_SEO_BY_ID_FAIL";

export const DELETE_SEO_BY_ID = "DELETE_SEO_BY_ID";
export const DELETE_SEO_BY_ID_SUCCESS = "DELETE_SEO_BY_ID_SUCCESS";
export const DELETE_SEO_BY_ID_FAIL = "DELETE_SEO_BY_ID_FAIL";

export const SeoAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SEO_ADD });
    let { data: response } = await addSeo(formData);
    if (response) {
     
      dispatch({
        type: SEO_ADD_SUCCESS,
        payload: response.message,
      });
      dispatch(SeoGet())
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SEO_ADD_FAIL, payload: err });
  }
};

export const SeoGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SEO });
    let { data: response } = await getSeo(formData);
    if (response) {

      dispatch({
        type: GET_ALL_SEO_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SEO_ADD_FAIL, payload: err });
  }
};

export const SetSeoObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEO_OBJ });
    if (formData) {
      dispatch({
        type: SET_SEO_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_SEO_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_SEO_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const SeoUpdate = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SEO_BY_ID });
    let { data: response } = await updateSeo(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_SEO_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(SeoGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_SEO_BY_ID_FAIL, payload: err });
  }
};

export const SeoDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SEO_BY_ID });
    let { data: response } = await deleteSeo(id);
    if (response) {
      console.log(response, "response");
    
      dispatch({
        type: DELETE_SEO_BY_ID_SUCCESS,
        payload: response.message
      });
      dispatch(SeoGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_SEO_BY_ID_FAIL, payload: err });
  }
};