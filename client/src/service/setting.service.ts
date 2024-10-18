import axios from "@/lib/axios";
import { url } from "./url.service";

let serverUrl = `${url}/hotel`;

export const getSettingApi = async () => {
  return axios.get(`${serverUrl}/get`);
};
