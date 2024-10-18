import {url} from "@/service/url.service";
import axios from "axios";
export const generateFilePath = (fileName:string) => {
  return `${url}/uploads/${fileName}`;
};
export default axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
});
export const axiosAuth = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
});
