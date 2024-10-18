import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as LOCATION from "../../actions/Location/Location.actions";

const initialState = {
  locations: null,
  locationObj: null,
  loading: false,
  error: null,
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION.LOCATION_ADD:
      return {
        ...state,
        loading: true,
      };
    case LOCATION.LOCATION_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case LOCATION.LOCATION_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOCATION.GET_ALL_LOCATION:
      return {
        ...state,
        loading: true,
      };
    case LOCATION.GET_ALL_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        locations: action.payload.data,
      };
    case LOCATION.GET_ALL_LOCATION_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOCATION.DELETE_LOCATION_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case LOCATION.DELETE_LOCATION_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LOCATION.DELETE_LOCATION_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOCATION.UPDATE_LOCATION_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case LOCATION.UPDATE_LOCATION_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LOCATION.UPDATE_LOCATION_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOCATION.SET_LOCATION_OBJ:
      return {
        ...state,
        loading: true,
      };
    case LOCATION.SET_LOCATION_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        locationObj: action.payload.data,
        loading: false,
        error: null,
      };
    case LOCATION.SET_LOCATION_OBJ_FAIL:
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
