import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/collection";

export const addCollection = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getCollection = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getCollection?${query}`);
};

export const deleteCollection = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateCollection = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

