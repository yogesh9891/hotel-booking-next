import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/state";

export const addState = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getStates = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getStates?${query}`);
};

export const deleteState = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateState = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

