import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";
const serverUrl = url + "/product";

export const addProduct = async (formData) => {
  // console.log(axiosApiInstance)
  return await axiosApiInstance.post(serverUrl + "/addProduct", formData);
};

export const getProducts = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getProducts?${query}`);
};

export const deleteProductById = (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateProductById = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

export const approveProductsInBulk = (formData) => {
  return axiosApiInstance.patch(`${serverUrl}/approveProductsInBulk/`, formData);
};
export const unapproveProductsInBulk = (formData) => {
  return axiosApiInstance.patch(`${serverUrl}/unapproveProductsInBulk/`, formData);
};
export const deleteProductsInBulk = (formData) => {
  return axiosApiInstance.patch(`${serverUrl}/deleteProductsInBulk/`, formData);
};

export const handleRelatedProductObjAdd = (formData) => {
  return axiosApiInstance.post(`${serverUrl}/relatedProductsAdd`, formData);
};

export const handleRelatedProductObjRemove = (formData) => {
  return axiosApiInstance.post(`${serverUrl}/relatedProductsRemove`, formData);
};

export const getAllRelatedProducts = (query) => {
  return axiosApiInstance.get(`${serverUrl}/getRelatedProducts?${query}`);
};
