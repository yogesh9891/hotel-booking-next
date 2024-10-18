import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/homepage";

export const addHomePage = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getHomePage = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getHomePage?${query}`);
};

export const deleteCity = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updategetHomePage = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updategetHomePage/${id}`, formData);
};

