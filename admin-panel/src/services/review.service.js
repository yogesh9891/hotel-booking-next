import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";
const serverUrl = url + "/review";

export const getReview = () => {
  return axiosApiInstance.get(`${serverUrl}/`);
};

export const deleteReview = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const getReviewBYId = (id) => {
  return axiosApiInstance.get(`${serverUrl}/getById/${id}`);
};

export const upadteReviewStatus = (id, obj) => {
  return axiosApiInstance.patch(`${serverUrl}/upadteReviewStatus/${id}`, obj);
};

export const upadteReview = (id, obj) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, obj);
};

export const AddReviewApi = async (obj) => {
  return axiosApiInstance.post(`${serverUrl}/addAdminReview`, obj);
};
