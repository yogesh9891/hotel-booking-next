import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as AMENITIYCATEGORY from "../../actions/AmenityCategory/AmenityCategory.action";

const initialState = {
  amenityCategoryArr: null,
  amenityCategoryObj: null,
  loading: false,
  error: null,
};

export const AmenityCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case AMENITIYCATEGORY.AMENITY_CATEGORY_ADD:
      return {
        ...state,
        loading: true,
      };
    case AMENITIYCATEGORY.AMENITY_CATEGORY_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case AMENITIYCATEGORY.AMENITY_CATEGORY_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AMENITIYCATEGORY.GET_ALL_AMENITY_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case AMENITIYCATEGORY.GET_ALL_AMENITY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        amenityCategoryArr: action.payload.data,
      };
    case AMENITIYCATEGORY.GET_ALL_AMENITY_CATEGORY_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AMENITIYCATEGORY.DELETE_AMENITY_CATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case AMENITIYCATEGORY.DELETE_AMENITY_CATEGORY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AMENITIYCATEGORY.DELETE_AMENITY_CATEGORY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AMENITIYCATEGORY.SET_AMENITY_CATEGORY_OBJ:
      return {
        ...state,
        loading: true,
      };
    case AMENITIYCATEGORY.SET_AMENITY_CATEGORY_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        amenityCategoryObj: action.payload.data,
        loading: false,
        error: null,
      };
    case AMENITIYCATEGORY.SET_AMENITY_CATEGORY_OBJ_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    case AMENITIYCATEGORY.UPDATE_AMENITY_CATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case AMENITIYCATEGORY.UPDATE_AMENITY_CATEGORY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AMENITIYCATEGORY.UPDATE_AMENITY_CATEGORY_BY_ID_FAIL:
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










