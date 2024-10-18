import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/Country";

export const addCountry = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getCountry = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getCountry?${query}`);
};

export const deleteCountry = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateCountry = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

