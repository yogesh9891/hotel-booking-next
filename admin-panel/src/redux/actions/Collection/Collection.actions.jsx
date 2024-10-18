import { addCollection, deleteCollection, getCollection, updateCollection } from "../../../services/Collection.service";

export const COLLECTION_ADD = "COLLECTION_ADD";
export const COLLECTION_ADD_SUCCESS = "COLLECTION_ADD_SUCCESS";
export const COLLECTION_ADD_FAIL = "COLLECTION_ADD_FAIL";

export const GET_ALL_COLLECTION = "GET_ALL_COLLECTION";
export const GET_ALL_COLLECTION_SUCCESS = "GET_ALL_COLLECTION_SUCCESS";
export const GET_ALL_COLLECTION_FAIL = "GET_ALL_COLLECTION_FAIL";

export const UPDATE_COLLECTION_BY_ID = "UPDATE_COLLECTION_BY_ID";
export const UPDATE_COLLECTION_BY_ID_SUCCESS = "UPDATE_COLLECTION_BY_ID_SUCCESS";
export const UPDATE_COLLECTION_BY_ID_FAIL = "UPDATE_COLLECTION_BY_ID_FAIL";

export const SET_COLLECTION_OBJ = "SET_COLLECTION_OBJ";
export const SET_COLLECTION_OBJ_SUCCESS = "SET_COLLECTION_OBJ_SUCCESS";
export const SET_COLLECTION_OBJ_FAIL = "SET_COLLECTION_OBJ_FAIL";

export const GET_COLLECTION_BY_ID = "GET_COLLECTION_BY_ID";
export const GET_COLLECTION_BY_ID_SUCCESS = "GET_COLLECTION_BY_ID_SUCCESS";
export const GET_COLLECTION_BY_ID_FAIL = "GET_COLLECTION_BY_ID_FAIL";

export const DELETE_COLLECTION_BY_ID = "DELETE_COLLECTION_BY_ID";
export const DELETE_COLLECTION_BY_ID_SUCCESS = "DELETE_COLLECTION_BY_ID_SUCCESS";
export const DELETE_COLLECTION_BY_ID_FAIL = "DELETE_COLLECTION_BY_ID_FAIL";

export const CollectionAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_ADD });
    let { data: response } = await addCollection(formData);
    if (response) {
     
      dispatch({
        type: COLLECTION_ADD_SUCCESS,
        payload: response.message,
      });
      dispatch(CollectionGet())
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: COLLECTION_ADD_FAIL, payload: err });
  }
};

export const CollectionGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_COLLECTION });
    let { data: response } = await getCollection(formData);
    if (response) {

      dispatch({
        type: GET_ALL_COLLECTION_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: COLLECTION_ADD_FAIL, payload: err });
  }
};

export const SetCollectionObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_COLLECTION_OBJ });
    if (formData) {
      dispatch({
        type: SET_COLLECTION_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_COLLECTION_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_COLLECTION_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const CollectionUpdate = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COLLECTION_BY_ID });
    let { data: response } = await updateCollection(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_COLLECTION_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(CollectionGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_COLLECTION_BY_ID_FAIL, payload: err });
  }
};

export const CollectionDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COLLECTION_BY_ID });
    let { data: response } = await deleteCollection(id);
    if (response) {
      console.log(response, "response");
    
      dispatch({
        type: DELETE_COLLECTION_BY_ID_SUCCESS,
        payload: response.message
      });
      dispatch(CollectionGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_COLLECTION_BY_ID_FAIL, payload: err });
  }
};