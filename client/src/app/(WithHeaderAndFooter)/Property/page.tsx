"use client";

import React, { useEffect, useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/Hotels/Hotels.module.scss";
import Image from "next/image";
import { Images } from "@/assets/Utility/Images";
import { TbEdit } from "react-icons/tb";
import ApartmentsHotelsCard from "@/components/AparmentsHotelsCard/ApartmentsHotelsCard";
import AboutExperience from "@/components/AboutExperience/AboutExperience";
import Faq from "@/components/Faq/Faq";

import { getAllHotelApi, searchHotelFromApi } from "@/service/hotel.service";
import { SearchDateInput, useSearch } from "@/context/client-provider";
import axios from "axios";
import { toastError } from "@/utils/toastMessage.ts";
import Loading from "./loading";

export default function page(props: any) {
  const [hotels, sethotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [locationSearch, setLocationSearch] = useSearch();

  let cancelToken: any;

  useEffect(() => {
    let searchParams = props.searchParams;
      console.log(searchParams, "searchParamssearchParams");
      setLocationSearch(searchParams);

      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Cacencel ....");
      }
      cancelToken = axios.CancelToken.source();
      setIsLoading(true);
      handlegetHotel(searchParams, cancelToken);
      return () => cancelToken.cancel("component unmounted");
  }, [props]);
  const handlegetHotel = async (
    obj: SearchDateInput,
    cancelTokenValue: any
  ) => {
    try {
      let { data: res } = await searchHotelFromApi(obj, cancelTokenValue);
      if (res.data && res?.data?.length > 0) {
        Promise.resolve()
          .then(() => {
            sethotels(res?.data);
          })
          .then(() => {
            setIsLoading(false);
          });
      } else {
        Promise.resolve()
          .then(() => {
            sethotels([]);
          })
          .then(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(error, "errorerrorerror");
      } else {
        setIsLoading(false);
        toastError(error);
      }
    }
  };

  return (
    <>
      <div className={style.hotel_sec}></div>

      {isLoading == true ? (
        <Loading />
      ) : hotels && hotels?.length == 0 ? (
        <div className={style.border}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                <h6 className={style.nofound}>No Property Found</h6>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ApartmentsHotelsCard hotelArr={hotels} />
      )}
    </>
  );
}
