import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/property";



export const getPropertys  = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getProperty?${query}`);
};
export const getById  = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getById/${query}`);
};

export const deleteProperty    = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};


