import { addWareHouses, deleteWareHouse, getWareHouses, updateWareHouse } from "../../../services/WareHouse.service";

export const WAREHOUSE_ADD = "WAREHOUSE_ADD";
export const WAREHOUSE_ADD_SUCCESS = "WAREHOUSE_ADD_SUCCESS";
export const WAREHOUSE_ADD_FAIL = "WAREHOUSE_ADD_FAIL";

export const GET_ALL_WAREHOUSE = "GET_ALL_WAREHOUSE";
export const GET_ALL_WAREHOUSE_SUCCESS = "GET_ALL_WAREHOUSE_SUCCESS";
export const GET_ALL_WAREHOUSE_FAIL = "GET_ALL_WAREHOUSE_FAIL";

export const UPDATE_WAREHOUSE_BY_ID = "UPDATE_WAREHOUSE_BY_ID";
export const UPDATE_WAREHOUSE_BY_ID_SUCCESS = "UPDATE_WAREHOUSE_BY_ID_SUCCESS";
export const UPDATE_WAREHOUSE_BY_ID_FAIL = "UPDATE_WAREHOUSE_BY_ID_FAIL";

export const SET_WAREHOUSE_OBJ = "SET_WAREHOUSE_OBJ";
export const SET_WAREHOUSE_OBJ_SUCCESS = "SET_WAREHOUSE_OBJ_SUCCESS";
export const SET_WAREHOUSE_OBJ_FAIL = "SET_WAREHOUSE_OBJ_FAIL";

export const GET_WAREHOUSE_BY_ID = "GET_WAREHOUSE_BY_ID";
export const GET_WAREHOUSE_BY_ID_SUCCESS = "GET_WAREHOUSE_BY_ID_SUCCESS";
export const GET_WAREHOUSE_BY_ID_FAIL = "GET_WAREHOUSE_BY_ID_FAIL";

export const DELETE_WAREHOUSE_BY_ID = "DELETE_WAREHOUSE_BY_ID";
export const DELETE_WAREHOUSE_BY_ID_SUCCESS = "DELETE_WAREHOUSE_BY_ID_SUCCESS";
export const DELETE_WAREHOUSE_BY_ID_FAIL = "DELETE_WAREHOUSE_BY_ID_FAIL";

export const WAREHOUSEADD = (formData) => async (dispatch) => {
  try {
    dispatch({ type: WAREHOUSE_ADD });
    let { data: response } = await addWareHouses(formData);
    if (response) {
      dispatch(WAREHOUSEGET())
      dispatch({
        type: WAREHOUSE_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: WAREHOUSE_ADD_FAIL, payload: err });
  }
};

export const WAREHOUSEGET = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_WAREHOUSE });
    let { data: response } = await getWareHouses(formData);
    if (response) {

      dispatch({
        type: GET_ALL_WAREHOUSE_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: WAREHOUSE_ADD_FAIL, payload: err });
  }
};

export const SETWAREHOUSEOBJ = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_WAREHOUSE_OBJ });
    if (formData) {
      dispatch({
        type: SET_WAREHOUSE_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_WAREHOUSE_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_WAREHOUSE_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const WAREHOUSEUPDATE = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_WAREHOUSE_BY_ID });
    let { data: response } = await updateWareHouse(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_WAREHOUSE_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(WAREHOUSEGET());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_WAREHOUSE_BY_ID_FAIL, payload: err });
  }
};

export const WAREHOUSEDELETE = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_WAREHOUSE_BY_ID });
    let { data: response } = await deleteWareHouse(id);
    if (response) {
      console.log(response.message, "response");
      dispatch({
        type: DELETE_WAREHOUSE_BY_ID_SUCCESS,
        payload: response
      });
      dispatch(WAREHOUSEGET());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_WAREHOUSE_BY_ID_FAIL, payload: err });
  }
};