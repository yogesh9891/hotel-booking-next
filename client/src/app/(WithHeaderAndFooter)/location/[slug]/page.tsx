"use client";

import React, { useEffect, useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/Apartments/Apartments.module.scss";
// import Image from "next/image";
// import { Images } from "@/assets/Utility/Images";
import ApartmentsHotelsCard from "@/components/AparmentsHotelsCard/ApartmentsHotelsCard";
import AboutExperience from "@/components/AboutExperience/AboutExperience";
import Faq from "@/components/Faq/Faq";
import StayFormInput from "@/components/StayFormInput/StayFormInput";
import { getAllHotelApi } from "@/service/hotel.service";
// import Filters from "@/components/Filters/Filters";
import { getLocationFromSlugApi } from "@/service/home.service";
import { toastError } from "@/utils/toastMessage.ts";
import Loading from "../../Property/loading";

export default function page(props: any) {
  const [toggle, setToggle] = useState(false);
  const [hotels, sethotels] = useState([]);
  const [locationId, setlocationId] = useState("");
  const [locationObj, setlocationObj] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.params && props.params.slug) {
      getProductFormSlug(props.params.slug);
    }
  }, [props]);

  useEffect(() => {
    if (locationId && locationId != "") {
      handlegetHotel();
    }
  }, [locationId]);

  const getProductFormSlug = async (slug: string) => {
    try {
      let { data: res } = await getLocationFromSlugApi(slug);
      if (res.data) {
        setlocationId(res.data._id);
        setlocationObj(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };
  const handlegetHotel = async () => {
    try {
      let query = `&order=asc`;
      if (locationId && locationId) {
        query += `&locationArr=${encodeURIComponent(
          JSON.stringify([locationId])
        )}`;
      }
      let { data: res } = await getAllHotelApi(query, null);
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
      setIsLoading(false);
      toastError(error);
    }
  };

  return (
    <>
      {/* <div className={style.hotel_sec}>
        <div className="container">
          <div className="row">
          </div>
        </div>
      </div> */}

      {/* APARTMENT / HOTEL BOX CARD COMPONENT */}
      <div className={style.margin}>
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

        {/* APARTMENT / HOTEL PARTICULAR STATE EXPERIENCE */}
        {locationObj && locationObj?._id && (
          <AboutExperience data={locationObj} />
        )}

        <Faq />
      </div>
    </>
  );
}
