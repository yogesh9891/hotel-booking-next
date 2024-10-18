import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/coupon";


export const addDiscount = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getDiscount = (query) => {
    return axiosApiInstance.get(`${serverUrl}/?${query}`);
};

export const deleteDiscount = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateDiscount = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};