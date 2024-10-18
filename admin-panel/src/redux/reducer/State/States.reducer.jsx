import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as STATE from "../../actions/State/State.actions";



const initialState = {
  states: null,
  stateObj: null,
  loading: false,
  error: null,
};

export const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATE.STATE_ADD:
      return {
        ...state,
        loading: true,
      };
    case STATE.STATE_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case STATE.STATE_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case STATE.GET_ALL_STATES:
      return {
        ...state,
        loading: true,
      };
    case STATE.GET_ALL_STATES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        states: action.payload.data,
      };
    case STATE.GET_ALL_STATES_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case STATE.DELETE_STATE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case STATE.DELETE_STATE_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case STATE.DELETE_STATE_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case STATE.UPDATE_STATE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case STATE.UPDATE_STATE_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case STATE.UPDATE_STATE_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case STATE.SET_STATE_OBJ:
      return {
        ...state,
        loading: true,
      };
    case STATE.SET_STATE_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        stateObj: action.payload.data,
        loading: false,
        error: null,
      };
    case STATE.SET_STATE_OBJ_FAIL:
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
