import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as WareHouse from "../../actions/WareHouse/WareHouse.actions";

const initialState = {
  warehouses: null,
  warehousesObj: null,
  loading: false,
  error: null,
};

export const wareHouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case WareHouse.WAREHOUSE_ADD:
      return {
        ...state,
        loading: true,
      };
    case WareHouse.WAREHOUSE_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case WareHouse.WAREHOUSE_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case WareHouse.GET_ALL_WAREHOUSE:
      return {
        ...state,
        loading: true,
      };
    case WareHouse.GET_ALL_WAREHOUSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        warehouses: action.payload.data,
      };
    case WareHouse.GET_ALL_WAREHOUSE_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case WareHouse.DELETE_WAREHOUSE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case WareHouse.DELETE_WAREHOUSE_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case WareHouse.DELETE_WAREHOUSE_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case WareHouse.UPDATE_WAREHOUSE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case WareHouse.UPDATE_WAREHOUSE_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case WareHouse.UPDATE_WAREHOUSE_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case WareHouse.SET_WAREHOUSE_OBJ:
      return {
        ...state,
        loading: true,
      };
    case WareHouse.SET_WAREHOUSE_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        warehousesObj: action.payload.data,
        loading: false,
        error: null,
      };
    case WareHouse.SET_WAREHOUSE_OBJ_FAIL:
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
