import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/blogCategory";

export const addBlogCategory = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getBlogCategory = (query) => {
    return axiosApiInstance.get(`${serverUrl}?${query}`);
};

export const getBlogCategoryById = (id) => {
    return axiosApiInstance.get(`${serverUrl}/getBlogCategoryById/${id}`);
};
export const deleteBlogCategory = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateBlogCategory = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

