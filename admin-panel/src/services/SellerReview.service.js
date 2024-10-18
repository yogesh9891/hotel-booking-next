import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";
const serverUrl = url + "/sellerReview";


export const getSellerReview = () => {
    return axiosApiInstance.get(`${serverUrl}/`);
};

export const upadteReviewStatus = (id, obj) => {
    return axiosApiInstance.patch(`${serverUrl}/upadteReviewStatus/${id}`, obj);
};
