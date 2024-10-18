import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";
const serverUrl = url + "/reviewSetting";

export const reviewSetingsAddUpdate = async (formData) => {
    // console.log(axiosApiInstance)
    return await axiosApiInstance.post(serverUrl + "/", formData);
};

export const getreviewSetingByUserId = (id) => {
    return axiosApiInstance.get(`${serverUrl}/getreviewSetingByUserId/${id}`);
};
