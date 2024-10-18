import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as ROOM from "../../actions/Room/Room.action";

const initialState = {
  roomsArr: null,
  roomObj: null,
  loading: false,
  error: null,
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOM.ROOM_ADD:
      return {
        ...state,
        loading: true,
      };
    case ROOM.ROOM_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case ROOM.ROOM_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ROOM.GET_ALL_ROOM:
      return {
        ...state,
        loading: true,
      };
    case ROOM.GET_ALL_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        roomsArr: action.payload.data,
      };
    case ROOM.GET_ALL_ROOM_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ROOM.DELETE_ROOM_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case ROOM.DELETE_ROOM_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ROOM.DELETE_ROOM_BY_ID_FAIL:
      toastError(action.payload.message);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ROOM.SET_ROOM_OBJ:
      return {
        ...state,
        loading: true,
      };
    case ROOM.SET_ROOM_OBJ_SUCCESS:
      return {
        ...state,
        roomObj: action.payload,
        loading: false,
        error: null,
      };
    case ROOM.SET_ROOM_OBJ_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    case ROOM.UPDATE_ROOM_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case ROOM.UPDATE_ROOM_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ROOM.UPDATE_ROOM_BY_ID_FAIL:
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