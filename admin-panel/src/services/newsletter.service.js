// logo
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/newsletter";

export const newNewsletter = (formData) => {
  return axiosApiInstance.post(serverUrl + "/", formData);
};

export const getNewsletters = (query) => {
  return axiosApiInstance.get(`${serverUrl}/`);
};
