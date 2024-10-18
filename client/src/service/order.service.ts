import axios from "axios";
import { url } from "./url.service";

let serverUrl = `${url}/order`;

export const createOrder = async () => {
  return await axios.post(`${serverUrl}/createOrder`);
};

export const createGuestOrder = async (obj: any) => {
  return await axios.post(`${serverUrl}/createGuestOrder`, obj);
};
export const orderCallback = async (obj: any, id: string) => {
  return await axios.get(`${serverUrl}/paymentCallback/${id}?${obj}`);
};

export const phonepePayment = async (id: string, obj: any) => {
  return await axios.post(`${serverUrl}/phonepePayment/${id}?${obj}`);
};

export const phonepePaymentStatusCheck = async (id: string) => {
  return await axios.get(`${serverUrl}/phonepePaymentStatusCheck/${id}`);
};
export const orderCallbackApi = async (obj: any, id: string) => {
  return await axios.get(`${serverUrl}/paymentCallback/${id}`, obj);
};

export const getOrderById = async (id: string) => {
  return await axios.get(`${serverUrl}/getOrderById/${id}`);
};
