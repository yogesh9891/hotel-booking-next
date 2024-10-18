import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/banner";

export const addBanner = (formData) => {
  return axiosApiInstance.post(serverUrl + "/addBanner", formData);
};

export const getBanner = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getBanner?${query}`);
};

export const deleteBanner = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateBanner = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
