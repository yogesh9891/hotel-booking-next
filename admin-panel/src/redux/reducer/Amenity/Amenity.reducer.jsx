import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as AMENITIY from "../../actions/Amenity/Amenity.action";

const initialState = {
  amenityArr: null,
  amenityObj: null,
  loading: false,
  error: null,
};

export const AmenityReducer = (state = initialState, action) => {
  switch (action.type) {
    case AMENITIY.AMENITY_ADD:
      return {
        ...state,
        loading: true,
      };
    case AMENITIY.AMENITY_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case AMENITIY.AMENITY_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AMENITIY.GET_ALL_AMENITY:
      return {
        ...state,
        loading: true,
      };
    case AMENITIY.GET_ALL_AMENITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        amenityArr: action.payload.data,
      };
    case AMENITIY.GET_ALL_AMENITY_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AMENITIY.DELETE_AMENITY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case AMENITIY.DELETE_AMENITY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AMENITIY.DELETE_AMENITY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AMENITIY.SET_AMENITY_OBJ:
      return {
        ...state,
        loading: true,
      };
    case AMENITIY.SET_AMENITY_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        amenityObj: action.payload.data,
        loading: false,
        error: null,
      };
    case AMENITIY.SET_AMENITY_OBJ_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    case AMENITIY.UPDATE_AMENITY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case AMENITIY.UPDATE_AMENITY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AMENITIY.UPDATE_AMENITY_BY_ID_FAIL:
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










