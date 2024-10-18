"use client";

import React, { useEffect, useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/Apartments/Apartments.module.scss";
// import Image from "next/image";
// import { Images } from "@/assets/Utility/Images";
import ApartmentsHotelsCard from "@/components/AparmentsHotelsCard/ApartmentsHotelsCard";
// import AboutExperience from "@/components/AboutExperience/AboutExperience";
// import Faq from "@/components/Faq/Faq";
// import StayFormInput from "@/components/StayFormInput/StayFormInput";
import { getAllHotelApi } from "@/service/hotel.service";
import Loading from "../Hotels/loading";
// import Filters from "@/components/Filters/Filters";

export default function page() {
  const [toggle, setToggle] = useState(false);
  const [hotels, sethotels] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    handlegetHotel();
  }, []);

  const handlegetHotel = async () => {
    try {
      setisLoading(true)
      //   let tempAmentityArr = amentityArr.filter(el => el?.checked);
      //   let tempLocationArr = locationAllArr.filter(el => el?.checked).map((el) => ({_id:el?._id,name:el?.name}));
      //   let tempCollectionArr = collectionAllArr.filter(el => el?.checked).map((el) => ({_id:el?._id,name:el?.name}));
      //   let temprppertyType = hotelsSelected.filter(el => el?.checked);
      //   if (min && max) {
      //     query += `&min=${min}&max=${max}`
      //   }

      //   if (tempLocationArr && tempLocationArr?.length > 0) {
      //     query += `&locationArr=${encodeURIComponent(JSON.stringify(tempLocationArr))}`
      //   }
      // if (hotelHomeStays && hotelHomeStays.length > 0) {
      //   query = `${query}&propertyType=${hotelHomeStays}`
      // }

      //   if (tempCollectionArr && tempCollectionArr?.length > 0) {
      //     query += `&collectionArr=${encodeURIComponent(JSON.stringify(tempCollectionArr))}`
      //   }

      //   if (temprppertyType && temprppertyType?.length > 0) {
      //     query += `&propertyType=${encodeURIComponent(JSON.stringify(temprppertyType))}`
      //   }

      // if (sbd) {
      //   query = `${query}&sortBy=${encodeURIComponent(sbd)}`
      // }

      // if (hotelsSelected && hotelsSelected.length > 0) {

      //   query = `${query}&propertyType=${encodeURIComponent(hotelsSelected)}`
      // }
      let query = `&order=asc`;

      let hotelType = [
        {
          name: "Home Stays",
          checked: true,
        },
      ];

      if (hotelType) {
        query += `&propertyType=${encodeURIComponent(
          JSON.stringify(hotelType)
        )}`;
      }
      // if(sortByData) {

      // // // console.log(sortByData,"sortByDatasortByDatasortByData11")

      //   query += `&sortByPrice=${sortByData}`;
      // }

      // &collectionArr=${encodeURIComponent(JSON.stringify(tempCollectionArr))}&propertyType=${encodeURIComponent(JSON.stringify(temprppertyType))}`
      // // query = `${query}&amenityArr=${encodeURIComponent(JSON.stringify(tempAmentityArr))}&locationArr=${encodeURIComponent(JSON.stringify(tempLocationArr))}&collectionArr=${encodeURIComponent(JSON.stringify(tempCollectionArr))}&propertyType=${encodeURIComponent(JSON.stringify(temprppertyType))}`
      // // console.log(query,"queryqueryqueryqueryquery")

      let { data: res } = await getAllHotelApi(query, null);
      if (res.data) {
        // // console.log(res.data,"dfdf")
        sethotels(res.data);
        setisLoading(false)
      }
    } catch (error) {
      // console.error(error);
      setisLoading(false)
    }
  };

  return (
    <>
      <div className={style.hotel_sec}>
        <div className="container">
          <div className="row">
            {/* <div className={style.filter_content}>
                            <Filters />
                        </div> */}
          </div>
        </div>
      </div>

      {/* APARTMENT / HOTEL BOX CARD COMPONENT */}

      <div className={style.margin}>
        {
          isLoading == true ? <Loading/> :
        
      hotels && hotels?.length == 0 ? (
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
        {/* <AboutExperience /> */}

        {/* <Faq /> */}
      </div>
    </>
  );
}
