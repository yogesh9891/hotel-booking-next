import axios from "axios";
import { url } from "./url.service";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
const prefix = "/users";

export const loginApi = (formData: any) => {
  return axios.post(`${url}${prefix}/login`, formData);
};

export const registerApi = (formData: any) => {
  return axios.post(`${url}${prefix}/register`, formData);
};
export const refreshTokenApi = (formData: any) => {
  return axios.post(`${url}${prefix}/refreshToken`, formData);
};
export const sendOtpApi = (formData: any) => {
  return axios.post(`${url}${prefix}/sendOtp`, formData);
};
export const verifyOtpApi = (formData: any) => {
  return axios.post(`${url}${prefix}/verifyOtp`, formData);
};
export const otpLoginApi = (formData: any) => {
  return axios.post(`${url}${prefix}/otpLogin`, formData);
};

export const createForPassApi = (obj: any) => {
  return axios.post(`${url}${prefix}/createForPass`, obj);
};

export const matchPasswordApi = (obj: any) => {
  return axios.post(`${url}${prefix}/matchPass`, obj);
};

export const useUserApiHook = () => {
  const axiosAuth = useAxiosAuth();
  const addUserApi = (formData: any) => {
    return axiosAuth.post(`${prefix}/addUser`, formData);
  };

  const updateSelfProfileApi = (formData: any) => {
    return axiosAuth.patch(`${prefix}/updateUser`, formData);
  };
  const getUserbyIdApi = (id: string) => {
    return axiosAuth.get(`${prefix}/getById/${id}`);
  };

  const deleteUserById = (id: string) => {
    return axiosAuth.delete(`${prefix}/deleteUserById/${id}`);
  };
  const getUserById = (id: string) => {
    return axiosAuth.get(`${prefix}/getUserById/${id}`);
  };

  const getAllActiveOrdersByUserIdApi = async () => {
    return await axiosAuth.get(`${url}/order/getAllActiveOrdersByUserId`);
  };
  const getOrderByIdApi = async (id: string) => {
    return await axiosAuth.get(`${url}/order/getOrderById/${id}`);
  };

  const updateById = (id: string, formData: any) => {
    return axiosAuth.patch(`${prefix}/updateById/${id}`, formData);
  };

  return {
    addUserApi,
    getUserbyIdApi,
    deleteUserById,
    getUserById,
    updateById,
    updateSelfProfileApi,
    createForPassApi,
    matchPasswordApi,
    getAllActiveOrdersByUserIdApi,
    getOrderByIdApi,
  };
};
