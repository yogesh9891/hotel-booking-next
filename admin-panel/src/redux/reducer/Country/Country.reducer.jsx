import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as COUNTRY from "../../actions/Country/Country.actions";

const initialState = {
  countries: null,
  countryObj: null,
  loading: false,
  error: null,
};

export const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY.COUNTRY_ADD:
      return {
        ...state,
        loading: true,
      };
    case COUNTRY.COUNTRY_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case COUNTRY.COUNTRY_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COUNTRY.GET_ALL_COUNTRY:
      return {
        ...state,
        loading: true,
      };
    case COUNTRY.GET_ALL_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        countries: action.payload.data,
      };
    case COUNTRY.GET_ALL_COUNTRY_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COUNTRY.DELETE_COUNTRY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case COUNTRY.DELETE_COUNTRY_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case COUNTRY.DELETE_COUNTRY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COUNTRY.UPDATE_COUNTRY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case COUNTRY.UPDATE_COUNTRY_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case COUNTRY.UPDATE_COUNTRY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COUNTRY.SET_COUNTRY_OBJ:
      return {
        ...state,
        loading: true,
      };
    case COUNTRY.SET_COUNTRY_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        countryObj: action.payload.data,
        loading: false,
        error: null,
      };
    case COUNTRY.SET_COUNTRY_OBJ_FAIL:
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
