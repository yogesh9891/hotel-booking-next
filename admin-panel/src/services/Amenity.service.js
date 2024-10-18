import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/amenity";

export const addAmenity = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getAmenity = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getAmenity?${query}`);
};

export const deleteAmenity = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateAmenity = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
