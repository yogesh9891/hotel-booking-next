// Faq
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/FAQ";

export const addFaq = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getFaq = (query) => {
    return axiosApiInstance.get(`${serverUrl}?${query}`);
};

export const getById = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getById/${query}`);
};

export const deleteFaqById = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateFaqById = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
