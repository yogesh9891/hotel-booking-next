// logo
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/logo";

export const addLogo = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getLogo = (query) => {
    return axiosApiInstance.get(`${serverUrl}/`);
};

export const deleteLogoById = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateLogoById = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
