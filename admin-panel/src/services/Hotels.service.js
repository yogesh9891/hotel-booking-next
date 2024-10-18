import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/hotel";

export const addHotel = (formData) => {
    // console.log(formData, `${serverUrl}/as`)
    return axiosApiInstance.post(`${serverUrl}/`, formData);
};

export const getHotels = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getHotels?${query}`);
};

export const deleteHotel = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const getHotelByIdApi = (id) => {
    return axiosApiInstance.get(`${serverUrl}/getHotelById/${id}`);
};


export const updateHotel = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};
export const saveHotelposition = (formData) => {
    return axiosApiInstance.post(`${serverUrl}/saveHotelposition/`, formData);
};


export const getHotelWithRoomApi = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getHotelWithRoom?${query}`);
};


export const getHotelTypeApi = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getHotelType?${query}`);
};



