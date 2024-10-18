import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as CITY from "../../actions/City/City.actions";

const initialState = {
  cities: null,
  cityObj: null,
  loading: false,
  error: null,
};

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case CITY.CITY_ADD:
      return {
        ...state,
        loading: true,
      };
    case CITY.CITY_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case CITY.CITY_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CITY.GET_ALL_CITY:
      return {
        ...state,
        loading: true,
      };
    case CITY.GET_ALL_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        cities: action.payload.data,
      };
    case CITY.GET_ALL_CITY_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CITY.DELETE_CITY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case CITY.DELETE_CITY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CITY.DELETE_CITY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CITY.UPDATE_CITY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case CITY.UPDATE_CITY_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CITY.UPDATE_CITY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CITY.SET_CITY_OBJ:
      return {
        ...state,
        loading: true,
      };
    case CITY.SET_CITY_OBJ_SUCCESS:
      // toastSuccess(action.payload.message);
      return {
        ...state,
        cityObj: action.payload.data,
        loading: false,
        error: null,
      };
    case CITY.SET_CITY_OBJ_FAIL:
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
