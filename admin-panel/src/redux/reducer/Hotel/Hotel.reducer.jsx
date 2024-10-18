import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as HOTEL from "../../actions/Hotels/Hotel.action";

const initialState = {
  hotelsArr: null,
  hotelObj: null,
  loading: false,
  error: null,
};

export const HotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOTEL.HOTEL_ADD:
      return {
        ...state,
        loading: true,
      };
    case HOTEL.HOTEL_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case HOTEL.HOTEL_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case HOTEL.GET_ALL_HOTEL:
      return {
        ...state,
        loading: true,
      };
    case HOTEL.GET_ALL_HOTEL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        hotelsArr: action.payload.data,
      };
    case HOTEL.GET_ALL_HOTEL_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case HOTEL.DELETE_HOTEL_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case HOTEL.DELETE_HOTEL_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case HOTEL.DELETE_HOTEL_BY_ID_FAIL:
      toastError(action.payload.message);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case HOTEL.SET_HOTEL_OBJ:
      return {
        ...state,
        loading: true,
      };
    case HOTEL.SET_HOTEL_OBJ_SUCCESS:
      return {
        ...state,
        hotelObj: action.payload,
        loading: false,
        error: null,
      };
    case HOTEL.SET_HOTEL_OBJ_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    case HOTEL.UPDATE_HOTEL_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case HOTEL.UPDATE_HOTEL_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case HOTEL.UPDATE_HOTEL_BY_ID_FAIL:
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