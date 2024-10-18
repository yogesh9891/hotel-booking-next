
import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";
const serverUrl = url + "/sellerCategory";

export const addSellerCategory = async (formData) => {
    // console.log(axiosApiInstance)
    return await axiosApiInstance.post(serverUrl + "/", formData);
};

export const getSellerCategorys = (query) => {
    return axiosApiInstance.get(`${serverUrl}/`);
};

export const deleteSellerCategoryById = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateSellerCategoryById = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
