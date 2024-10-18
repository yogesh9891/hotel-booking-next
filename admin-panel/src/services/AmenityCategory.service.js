import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/amenityCategory";

export const addAmenityCategory = (formData) => {
    // console.log(formData, `${serverUrl}/as`)
    return axiosApiInstance.post(`${serverUrl}/`, formData);
};

export const getAmenityCategory = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getAmenityCategory?${query}`);
};

export const deleteAmenityCategory = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateAmenityCategory = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
