import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as GALLERY from "../../actions/Gallery/Gallery.actions";

const initialState = {
  gallerys: null,
  galleryObj: null,
  loading: false,
  error: null,
};

export const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GALLERY.GALLERY_ADD:
      return {
        ...state,
        loading: true,
      };
    case GALLERY.GALLERY_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case GALLERY.GALLERY_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GALLERY.GET_ALL_GALLERYS:
      return {
        ...state,
        loading: true,
      };
    case GALLERY.GET_ALL_GALLERYS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        gallerys: action.payload.data,
      };
    case GALLERY.GET_ALL_GALLERYS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GALLERY.DELETE_GALLERY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case GALLERY.DELETE_GALLERY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case GALLERY.DELETE_GALLERY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GALLERY.UPDATE_GALLERY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case GALLERY.UPDATE_GALLERY_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case GALLERY.UPDATE_GALLERY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GALLERY.SET_GALLERY_OBJ:
      return {
        ...state,
        loading: true,
      };
    case GALLERY.SET_GALLERY_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        galleryObj: action.payload.data,
        loading: false,
        error: null,
      };
    case GALLERY.SET_GALLERY_OBJ_FAIL:
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
