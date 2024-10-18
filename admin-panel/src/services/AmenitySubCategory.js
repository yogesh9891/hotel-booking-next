import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/amenitySubCategory";

export const addAmenitySubCategory = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getAmenitySubCategory = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getAmenitySubCategory?${query}`);
};

export const deleteAmenitySubCategory = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateAmenitySubCategory = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
