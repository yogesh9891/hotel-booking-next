import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as COLLECTION from "../../actions/Blog/Blog.actions";

const initialState = {
  blogs: null,
  blogObj: null,
  loading: false,
  error: null,
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION.BLOG:
      return {
        ...state,
        loading: true,
      };
    case COLLECTION.BLOG_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case COLLECTION.BLOG_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COLLECTION.GET_ALL_COLLECTION:
      return {
        ...state,
        loading: true,
      };
    case COLLECTION.GET_ALL_COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        blogs: action.payload.data,
      };
    case COLLECTION.GET_ALL_COLLECTION_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COLLECTION.DELETE_COLLECTION_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case COLLECTION.DELETE_COLLECTION_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case COLLECTION.DELETE_COLLECTION_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COLLECTION.UPDATE_COLLECTION_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case COLLECTION.UPDATE_COLLECTION_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case COLLECTION.UPDATE_COLLECTION_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COLLECTION.SET_COLLECTION_OBJ:
      return {
        ...state,
        loading: true,
      };
    case COLLECTION.SET_COLLECTION_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        blogObj: action.payload.data,
        loading: false,
        error: null,
      };
    case COLLECTION.SET_COLLECTION_OBJ_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
