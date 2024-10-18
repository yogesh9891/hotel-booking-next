import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/brand";

export const addBrand = (formData) => {
  return axiosApiInstance.post(serverUrl + "/registerBrand", formData);
};

export const getBrand = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getBrand?${query}`);
};

export const deleteBrand = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};
export const excelUploadBrand = (obj) => {
  return axiosApiInstance.post(`${serverUrl}/bulkUpload/`, obj);
};

export const updateBrand = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
