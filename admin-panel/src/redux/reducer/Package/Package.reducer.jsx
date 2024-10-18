import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as PACKAGE from "../../actions/Package/Package.actions";

const initialState = {
  packages: null,
  packageObj: null,
  loading: false,
  error: null,
};

export const packageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PACKAGE.PACKAGE_ADD:
      return {
        ...state,
        loading: true,
      };
    case PACKAGE.PACKAGE_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case PACKAGE.PACKAGE_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PACKAGE.GET_ALL_PACKAGE:
      return {
        ...state,
        loading: true,
      };
    case PACKAGE.GET_ALL_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        packages: action.payload.data,
      };
    case PACKAGE.GET_ALL_PACKAGE_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PACKAGE.DELETE_PACKAGE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case PACKAGE.DELETE_PACKAGE_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case PACKAGE.DELETE_PACKAGE_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PACKAGE.UPDATE_PACKAGE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case PACKAGE.UPDATE_PACKAGE_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case PACKAGE.UPDATE_PACKAGE_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PACKAGE.SET_PACKAGE_OBJ:
      return {
        ...state,
        loading: true,
      };
    case PACKAGE.SET_PACKAGE_OBJ_SUCCESS:
      // toastSuccess(action.payload.message);
      return {
        ...state,
        packageObj: action.payload.data,
        loading: false,
        error: null,
      };
    case PACKAGE.SET_PACKAGE_OBJ_FAIL:
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
