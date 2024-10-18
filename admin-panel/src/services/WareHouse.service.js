import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/warehouse";

export const addWareHouses = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getWareHouses = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getWareHouses?${query}`);
};

export const deleteWareHouse = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateWareHouse = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

