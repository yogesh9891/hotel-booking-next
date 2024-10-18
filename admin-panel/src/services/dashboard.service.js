import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/dashboard";

export const getDashboardApi = (query) => {
  return axiosApiInstance.get(`${serverUrl}?${query}`);
};
