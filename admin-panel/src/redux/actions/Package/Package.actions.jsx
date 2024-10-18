import { addPackage, deletePackage, getPackage, updatePackage } from "../../../services/Package.service";

export const PACKAGE_ADD = "PACKAGE_ADD";
export const PACKAGE_ADD_SUCCESS = "PACKAGE_ADD_SUCCESS";
export const PACKAGE_ADD_FAIL = "PACKAGE_ADD_FAIL";

export const GET_ALL_PACKAGE = "GET_ALL_PACKAGE";
export const GET_ALL_PACKAGE_SUCCESS = "GET_ALL_PACKAGE_SUCCESS";
export const GET_ALL_PACKAGE_FAIL = "GET_ALL_PACKAGE_FAIL";

export const UPDATE_PACKAGE_BY_ID = "UPDATE_PACKAGE_BY_ID";
export const UPDATE_PACKAGE_BY_ID_SUCCESS = "UPDATE_PACKAGE_BY_ID_SUCCESS";
export const UPDATE_PACKAGE_BY_ID_FAIL = "UPDATE_PACKAGE_BY_ID_FAIL";

export const SET_PACKAGE_OBJ = "SET_PACKAGE_OBJ";
export const SET_PACKAGE_OBJ_SUCCESS = "SET_PACKAGE_OBJ_SUCCESS";
export const SET_PACKAGE_OBJ_FAIL = "SET_PACKAGE_OBJ_FAIL";

export const GET_PACKAGE_BY_ID = "GET_PACKAGE_BY_ID";
export const GET_PACKAGE_BY_ID_SUCCESS = "GET_PACKAGE_BY_ID_SUCCESS";
export const GET_PACKAGE_BY_ID_FAIL = "GET_PACKAGE_BY_ID_FAIL";

export const DELETE_PACKAGE_BY_ID = "DELETE_PACKAGE_BY_ID";
export const DELETE_PACKAGE_BY_ID_SUCCESS = "DELETE_PACKAGE_BY_ID_SUCCESS";
export const DELETE_PACKAGE_BY_ID_FAIL = "DELETE_PACKAGE_BY_ID_FAIL";

export const PackageAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: PACKAGE_ADD });
    let { data: response } = await addPackage(formData);
    if (response) {
      dispatch(PackageGet())
      dispatch({
        type: PACKAGE_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: PACKAGE_ADD_FAIL, payload: err });
  }
};

export const PackageGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PACKAGE });
    let { data: response } = await getPackage(formData);
    if (response) {

      dispatch({
        type: GET_ALL_PACKAGE_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: PACKAGE_ADD_FAIL, payload: err });
  }
};

export const SetPackageObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_PACKAGE_OBJ });
    if (formData) {
      dispatch({
        type: SET_PACKAGE_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_PACKAGE_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_PACKAGE_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const PackageUpdate = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PACKAGE_BY_ID });
    let { data: response } = await updatePackage(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_PACKAGE_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(PackageGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_PACKAGE_BY_ID_FAIL, payload: err });
  }
};

export const PackageDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PACKAGE_BY_ID });
    let { data: response } = await deletePackage(id);
    if (response) {
      console.log(response, "response");
      dispatch({
        type: DELETE_PACKAGE_BY_ID_SUCCESS,
        payload: response
      });
      dispatch(PackageGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_PACKAGE_BY_ID_FAIL, payload: err });
  }
};