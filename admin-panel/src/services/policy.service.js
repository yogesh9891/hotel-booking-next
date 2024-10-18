// Policy
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/policy";

export const addPolicy = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getPolicy = (query) => {
    return axiosApiInstance.get(`${serverUrl}/`);
};

export const deletePolicyById = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updatePolicyById = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
