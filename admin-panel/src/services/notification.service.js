// logo
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/notification";

export const newNotification = (formData) => {
  return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getNotifications = (query) => {
  return axiosApiInstance.get(`${serverUrl}/`);
};
