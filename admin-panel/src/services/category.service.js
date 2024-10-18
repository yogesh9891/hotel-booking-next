import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/category";

export const addCategory = (formData) => {
  return axiosApiInstance.post(serverUrl + "/addCategory", formData);
};

export const getCategory = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getCategory?${query}`);
};

export const deleteCategory = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateCategory = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

export const getNestedCategories = () => {
  return axiosApiInstance.get(`${serverUrl}/getNestedCategories`);
};
