import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as TESTIMONIAL from "../../actions/Tesimonial/Testimonial.actions";

const initialState = {
  testimonials: null,
  testimonialObj: null,
  loading: false,
  error: null,
};

export const testimonialReducer = (state = initialState, action) => {
  switch (action.type) {
    case TESTIMONIAL.TESTIMONIAL_ADD:
      return {
        ...state,
        loading: true,
      };
    case TESTIMONIAL.TESTIMONIAL_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case TESTIMONIAL.TESTIMONIAL_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TESTIMONIAL.GET_ALL_TESTIMONIALS:
      return {
        ...state,
        loading: true,
      };
    case TESTIMONIAL.GET_ALL_TESTIMONIALS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        testimonials: action.payload.data,
      };
    case TESTIMONIAL.GET_ALL_TESTIMONIALS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TESTIMONIAL.DELETE_TESTIMONIAL_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case TESTIMONIAL.DELETE_TESTIMONIAL_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case TESTIMONIAL.DELETE_TESTIMONIAL_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TESTIMONIAL.UPDATE_TESTIMONIAL_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case TESTIMONIAL.UPDATE_TESTIMONIAL_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case TESTIMONIAL.UPDATE_TESTIMONIAL_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TESTIMONIAL.SET_TESTIMONIAL_OBJ:
      return {
        ...state,
        loading: true,
      };
    case TESTIMONIAL.SET_TESTIMONIAL_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        testimonialObj: action.payload.data,
        loading: false,
        error: null,
      };
    case TESTIMONIAL.SET_TESTIMONIAL_OBJ_FAIL:
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
