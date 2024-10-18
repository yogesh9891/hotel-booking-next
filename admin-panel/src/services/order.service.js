import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/Order";

export const getAllOrders = (query) => {
  return axios.get(`${serverUrl}/getAllActiveOrders?${query}`);
};

export const getOrderById = async (id) => {
  return axios.get(`${serverUrl}/getOrderById/${id}`);
};

export const updateOrderById = async (id, obj) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, obj);
};
export const updateStatusOrderById = async (id, obj) => {
  return axios.patch(`${serverUrl}/updateStatusOrderById/${id}`, obj);
};

export const updateStatusProductsInBulk = async (obj) => {
  return axios.patch(`${serverUrl}/updateStatusProductsInBulk`, obj);
};
