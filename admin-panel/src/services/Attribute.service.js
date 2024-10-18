import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/attribute";

export const addAttributValue = (formData) => {
  return axiosApiInstance.post(serverUrl + "/addAttributValue", formData);
};

export const getAttributeValue = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getAttributeValue?${query}`);
};

export const deleteAttributeValue = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteAttributeValueById/${id}`);
};

export const updateAttributeValue = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateAttributeValueById/${id}`, formData);
};

export const addAttribute = (formData) => {
  return axiosApiInstance.post(serverUrl + "/addAttribute", formData);
};

export const getAttribute = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getAttribute?${query}`);
};

export const deleteAttribute = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateAttribute = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
