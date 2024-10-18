import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/gallery";

export const addGallerys = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getGallerys = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getGallerys?${query}`);
};

export const deleteGallery = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateGallery = (id, formData) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

