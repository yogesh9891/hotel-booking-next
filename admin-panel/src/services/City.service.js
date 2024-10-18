import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/city";

export const addCity = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getCity = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getCity?${query}`);
};

export const deleteCity = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateCity = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

