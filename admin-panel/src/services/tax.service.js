import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/tax";

export const addTax = (formData) => {
  return axiosApiInstance.post(serverUrl + "/addTax", formData);
};

export const getTax = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getTax?${query}`);
};

export const deleteTax = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateTax = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
