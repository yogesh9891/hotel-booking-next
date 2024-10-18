import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/testimonial";

export const addTestimonials = (formData) => {
    return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getTestimonials = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getTestimonials?${query}`);
};

export const deleteTestimonial = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateTestimonial = (id, formData) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

