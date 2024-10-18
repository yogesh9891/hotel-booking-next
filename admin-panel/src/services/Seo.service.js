import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/seo";

export const addSeo = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getSeo = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getSeo?${query}`);
};

export const deleteSeo = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateSeo = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

