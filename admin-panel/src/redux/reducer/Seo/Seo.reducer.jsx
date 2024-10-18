import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as SEO from "../../actions/Seo/Seo.actions";

const initialState = {
  seos: null,
  seoObj: null,
  loading: false,
  error: null,
};

export const seoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEO.SEO_ADD:
      return {
        ...state,
        loading: true,
      };
    case SEO.SEO_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case SEO.SEO_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEO.GET_ALL_SEO:
      return {
        ...state,
        loading: true,
      };
    case SEO.GET_ALL_SEO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        seos: action.payload.data,
      };
    case SEO.GET_ALL_SEO_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEO.DELETE_SEO_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case SEO.DELETE_SEO_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SEO.DELETE_SEO_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEO.UPDATE_SEO_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case SEO.UPDATE_SEO_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SEO.UPDATE_SEO_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEO.SET_SEO_OBJ:
      return {
        ...state,
        loading: true,
      };
    case SEO.SET_SEO_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        seoObj: action.payload.data,
        loading: false,
        error: null,
      };
    case SEO.SET_SEO_OBJ_FAIL:
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
