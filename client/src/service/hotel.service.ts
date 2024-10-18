import axios from "axios";
import { url } from "./url.service";
import { SearchDateInput } from "@/context/client-provider";

let serverUrl = `${url}/hotel`;

export const getAllHotelApi = async (query: string, source: any = null) => {
  return axios.get(`${serverUrl}/getHotels/?status=true&${query}`, {
    cancelToken: source?.token,
  });
};

export const getHotelBySlugApi = async (slug: string) => {
  return axios.get(`${serverUrl}/getHotelBySlug/${slug}`);
};
export const searchHotelFromApi = async (
  obj: SearchDateInput,
  cancelToken: any = null
) => {
  if (!cancelToken || !cancelToken?.token) {
    return axios.post(`${serverUrl}/searchHotelFromApi/`, obj);
  } else {
    return axios.post(`${serverUrl}/searchHotelFromApi/`, obj, {
      cancelToken: cancelToken?.token,
    });
  }
};
export const getHotelByIdAndRatesApi = async (
  obj: SearchDateInput,
  cancelToken: any = null
) => {

   if (!cancelToken || !cancelToken?.token) {
     return axios.post(`${serverUrl}/getHotelByIdAndRates/`, obj);
   } else {
     return axios.post(`${serverUrl}/getHotelByIdAndRates/`, obj, {
       cancelToken: cancelToken?.token,
     });
   }
};

export const getHotelByIdApi = async (slug: string) => {
  return axios.get(`${serverUrl}/getHotelById/${slug}`);
};

export const getReviewByHotelId = async (hotel: string) => {
  return axios.get(`${url}/review/getReviewByHotelId/${hotel}`);
};

export const getRoomById = async (id: string) => {
  return axios.get(`${url}/room/getRoomById/${id}`);
};

export const getRoomsApi = async (query: string) => {
  return axios.get(`${url}/room/getRooms?${query}`);
};

export const getRoomsAvailablesApi = (query: string, source: any = null) => {
  return axios.get(`${url}/room/getRoomsAvailables?${query}`, {
    cancelToken: source?.token,
  });
};

export const getAmenityCategory = (query: string) => {
  return axios.get(`${url}/amenityCategory/getAmenityCategory?${query}`);
};
