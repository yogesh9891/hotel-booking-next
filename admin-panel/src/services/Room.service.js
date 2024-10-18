import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/room";

export const addRoom = (formData) => {
    // console.log(formData, `${serverUrl}/as`)
    return axiosApiInstance.post(`${serverUrl}/`, formData);
};

export const getRooms = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getRooms?${query}`);
};

export const deleteRoom = (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateRoom = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};


export const getRoomsAvailablesApi  = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getRoomsAvailables?${query}`);
};

export const getCalendarAvailablesApi  = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getCalendarAvailables?${query}`);
};

export const updateRoomDatesApi = (formData) => {
    // console.log(formData, `${serverUrl}/as`)
    return axiosApiInstance.post(`${serverUrl}/updateRoomDates`, formData);
};

export const AddRoomDatesPriceApi = (formData) => {
       console.log(formData, `${serverUrl}/as`)
    return axiosApiInstance.post(`${serverUrl}/AddRoomDatesPrice`, formData);
};