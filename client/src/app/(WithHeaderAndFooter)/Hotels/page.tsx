"use client";

import React, { useEffect, useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/Hotels/Hotels.module.scss";
// import Image from "next/image";
// import { Images } from "@/assets/Utility/Images";
// import { TbEdit } from "react-icons/tb";
import ApartmentsHotelsCard from "@/components/AparmentsHotelsCard/ApartmentsHotelsCard";
// import AboutExperience from "@/components/AboutExperience/AboutExperience";
// import Faq from "@/components/Faq/Faq";

import { getAllHotelApi } from "@/service/hotel.service";
import { SearchDateInput, useSearch } from "@/context/client-provider";
import Loading from "./loading";

export default function page(props: any) {
  const [toggle, setToggle] = useState(false);
  const [hotels, sethotels] = useState([]);
  let [locationSearch, setLocationSearch] = useSearch();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    handlegetHotel();
  }, [props]);
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

      // if(sortByData) {

      // // // console.log(sortByData,"sortByDatasortByDatasortByData11")

      //   query += `&sortByPrice=${sortByData}`;
      // }
      let query = `&order=asc`;

      let hotelType = [
        {
          name: "Hotels",
          checked: true,
        },
      ];

      if (hotelType) {
        query += `&hotelType=Hotels`;
      }

      let searchParams = props.searchParams;
      if (searchParams && searchParams?.locationId) {
        setLocationSearch(searchParams);
        query += `&locationId=${searchParams?.locationId}`;
      }

      if (searchParams && searchParams?.location) {
        query += `&location=${searchParams?.location}`;
      }

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
        {/* <div className={style.image}>
                    <Image src={""} alt='' fill />
                </div> */}

        {/* <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className={style.search}>
                                <div className={style.info}>
                                    <div className={style.detail}>
                                        <p className={style.text}>Where <span>Mussoorie</span></p>
                                    </div>
                                    <div className={style.detail}>
                                        <p className={style.text}>Check-in <span>18 jan 2024</span> to <span>22 jan 2024</span></p>
                                    </div>
                                    <div className={style.detail}>
                                        <p className={style.text}>Guest & Rooms <span>2 Guest, 1 Room</span></p>
                                    </div>
                                </div>
                                <div className={style.button}>
                                    <button className={`${style.btn3} btn`} onClick={() => setToggle(!toggle)}><TbEdit /> Edit</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> */}
      </div>

      {/* edit input */}
      {/* <div className={style.input_box}>
                {
                    toggle ?

                        <StayFormInput />
                        : ''
                }
            </div> */}

      {/* APARTMENT / HOTEL BOX CARD COMPONENT */}
      {
        isLoading ? <Loading/> :
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
    </>
  );
}
