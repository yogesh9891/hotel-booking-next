import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/package";

export const addPackage = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getPackage = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getPackage?${query}`);
};

export const deletePackage = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updatePackage = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

