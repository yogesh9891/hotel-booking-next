import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/blog";

export const addBlog = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getBlog = (query) => {
    return axiosApiInstance.get(`${serverUrl}?${query}`);
};

export const deleteBlog = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateBlog = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

