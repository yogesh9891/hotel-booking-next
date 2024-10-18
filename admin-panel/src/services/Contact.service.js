import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/contact";

export const addContact = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getContacts  = (query) => {
    return axiosApiInstance.get(`${serverUrl}/?${query}`);
};
export const getById  = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getById/${query}`);
};

export const deleteContact  = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};


