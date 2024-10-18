// ContactInfo
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/contactInfo";

export const addContactInfo = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getContactInfo = (query) => {
    return axiosApiInstance.get(`${serverUrl}/`);
};

export const deleteContactInfoById = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateContactInfoById = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
