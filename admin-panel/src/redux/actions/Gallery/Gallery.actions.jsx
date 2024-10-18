import { addGallerys, deleteGallery, getGallerys, updateGallery } from "../../../services/gallery.service";

export const GALLERY_ADD = "GALLERY_ADD";
export const GALLERY_ADD_SUCCESS = "GALLERY_ADD_SUCCESS";
export const GALLERY_ADD_FAIL = "GALLERY_ADD_FAIL";

export const GET_ALL_GALLERYS = "GET_ALL_GALLERYS";
export const GET_ALL_GALLERYS_SUCCESS = "GET_ALL_GALLERYS_SUCCESS";
export const GET_ALL_GALLERYS_FAIL = "GET_ALL_GALLERYS_FAIL";

export const UPDATE_GALLERY_BY_ID = "UPDATE_GALLERY_BY_ID";
export const UPDATE_GALLERY_BY_ID_SUCCESS = "UPDATE_GALLERY_BY_ID_SUCCESS";
export const UPDATE_GALLERY_BY_ID_FAIL = "UPDATE_GALLERY_BY_ID_FAIL";

export const SET_GALLERY_OBJ = "SET_GALLERY_OBJ";
export const SET_GALLERY_OBJ_SUCCESS = "SET_GALLERY_OBJ_SUCCESS";
export const SET_GALLERY_OBJ_FAIL = "SET_GALLERY_OBJ_FAIL";

export const GET_GALLERY_BY_ID = "GET_GALLERY_BY_ID";
export const GET_GALLERY_BY_ID_SUCCESS = "GET_GALLERY_BY_ID_SUCCESS";
export const GET_GALLERY_BY_ID_FAIL = "GET_GALLERY_BY_ID_FAIL";

export const DELETE_GALLERY_BY_ID = "DELETE_GALLERY_BY_ID";
export const DELETE_GALLERY_BY_ID_SUCCESS = "DELETE_GALLERY_BY_ID_SUCCESS";
export const DELETE_GALLERY_BY_ID_FAIL = "DELETE_GALLERY_BY_ID_FAIL";

export const GALLERYADD = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GALLERY_ADD });
    let { data: response } = await addGallerys(formData);
    if (response) {
      dispatch(GALLERYGET())
      dispatch({
        type: GALLERY_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: GALLERY_ADD_FAIL, payload: err });
  }
};

export const GALLERYGET = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_GALLERYS });
    let { data: response } = await getGallerys(formData);
    console.log(response, "response356")
    if (response) {

      dispatch({
        type: GET_ALL_GALLERYS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: GALLERY_ADD_FAIL, payload: err });
  }
};

export const SETGALLERYOBJ = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_GALLERY_OBJ });
    if (formData) {
      dispatch({
        type: SET_GALLERY_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_GALLERY_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_GALLERY_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const GALLERYUPDATE = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_GALLERY_BY_ID });
    console.log(id, "id", formData, "form");
    let { data: response } = await updateGallery(id, formData);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_GALLERY_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(GALLERYGET());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_GALLERY_BY_ID_FAIL, payload: err });
  }
};

export const GALLERYDELETE = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_GALLERY_BY_ID });
    let { data: response } = await deleteGallery(id);
    if (response) {
      console.log(response, "response");
      dispatch({
        type: DELETE_GALLERY_BY_ID_SUCCESS,
        payload: response
      });
      dispatch(GALLERYGET());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_GALLERY_BY_ID_FAIL, payload: err });
  }
};