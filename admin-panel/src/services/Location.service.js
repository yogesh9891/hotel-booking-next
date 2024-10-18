import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/location";

export const addLocation = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getLocation = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getLocation?${query}`);
};

export const deleteLocation = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateLocation = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

