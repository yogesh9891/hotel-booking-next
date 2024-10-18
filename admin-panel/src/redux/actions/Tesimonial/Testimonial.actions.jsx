import { addTestimonials, deleteTestimonial, getTestimonials, updateTestimonial } from "../../../services/testimonial.service";

export const TESTIMONIAL_ADD = "TESTIMONIAL_ADD";
export const TESTIMONIAL_ADD_SUCCESS = "TESTIMONIAL_ADD_SUCCESS";
export const TESTIMONIAL_ADD_FAIL = "TESTIMONIAL_ADD_FAIL";

export const GET_ALL_TESTIMONIALS = "GET_ALL_TESTIMONIALS";
export const GET_ALL_TESTIMONIALS_SUCCESS = "GET_ALL_TESTIMONIALS_SUCCESS";
export const GET_ALL_TESTIMONIALS_FAIL = "GET_ALL_TESTIMONIALS_FAIL";

export const UPDATE_TESTIMONIAL_BY_ID = "UPDATE_TESTIMONIAL_BY_ID";
export const UPDATE_TESTIMONIAL_BY_ID_SUCCESS = "UPDATE_TESTIMONIAL_BY_ID_SUCCESS";
export const UPDATE_TESTIMONIAL_BY_ID_FAIL = "UPDATE_TESTIMONIAL_BY_ID_FAIL";

export const SET_TESTIMONIAL_OBJ = "SET_TESTIMONIAL_OBJ";
export const SET_TESTIMONIAL_OBJ_SUCCESS = "SET_TESTIMONIAL_OBJ_SUCCESS";
export const SET_TESTIMONIAL_OBJ_FAIL = "SET_TESTIMONIAL_OBJ_FAIL";

export const GET_TESTIMONIAL_BY_ID = "GET_TESTIMONIAL_BY_ID";
export const GET_TESTIMONIAL_BY_ID_SUCCESS = "GET_TESTIMONIAL_BY_ID_SUCCESS";
export const GET_TESTIMONIAL_BY_ID_FAIL = "GET_TESTIMONIAL_BY_ID_FAIL";

export const DELETE_TESTIMONIAL_BY_ID = "DELETE_TESTIMONIAL_BY_ID";
export const DELETE_TESTIMONIAL_BY_ID_SUCCESS = "DELETE_TESTIMONIAL_BY_ID_SUCCESS";
export const DELETE_TESTIMONIAL_BY_ID_FAIL = "DELETE_TESTIMONIAL_BY_ID_FAIL";

export const TESTIMONIALADD = (formData) => async (dispatch) => {
  try {
    dispatch({ type: TESTIMONIAL_ADD });
    let { data: response } = await addTestimonials(formData);
    if (response) {
      dispatch(TESTIMONIALGET())
      dispatch({
        type: TESTIMONIAL_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: TESTIMONIAL_ADD_FAIL, payload: err });
  }
};

export const TESTIMONIALGET = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TESTIMONIALS });
    let { data: response } = await getTestimonials(formData);
    console.log(response, "response356")
    if (response) {

      dispatch({
        type: GET_ALL_TESTIMONIALS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: TESTIMONIAL_ADD_FAIL, payload: err });
  }
};

export const SETTESTIMONIALOBJ = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_TESTIMONIAL_OBJ });
    if (formData) {
      dispatch({
        type: SET_TESTIMONIAL_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_TESTIMONIAL_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_TESTIMONIAL_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const TESTIMONIALUPDATE = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TESTIMONIAL_BY_ID });
    console.log(id, "id", formData, "form");
    let { data: response } = await updateTestimonial(id, formData);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_TESTIMONIAL_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(TESTIMONIALGET());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_TESTIMONIAL_BY_ID_FAIL, payload: err });
  }
};

export const TESTIMONIALDELETE = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TESTIMONIAL_BY_ID });
    let { data: response } = await deleteTestimonial(id);
    if (response) {
      console.log(response, "response");
      dispatch({
        type: DELETE_TESTIMONIAL_BY_ID_SUCCESS,
        payload: response
      });
      dispatch(TESTIMONIALGET());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_TESTIMONIAL_BY_ID_FAIL, payload: err });
  }
};