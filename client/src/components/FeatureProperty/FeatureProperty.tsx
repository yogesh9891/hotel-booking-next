"use client";

import React, { useEffect, useState } from "react";
import style from "@/components/FeatureProperty/FeatureProperty.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
// import feature_property1 from "@/assets/images/featuredproperty/dining.webp";
// import feature_property2 from "@/assets/images/featuredproperty/bonfire.webp";
// import feature_property3 from "@/assets/images/featuredproperty/nightview.webp";
import Link from "next/link";
import { IoBed, IoLocationOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { generateImageUrl } from "@/service/url.service";
import { toastError } from "@/utils/toastMessage.ts";
// import { generateImageUrl } from "@/service/url.service";

export default function FeatureProperty({
  propertyArr,
}: {
  propertyArr: any[];
}) {
  const [featureArr, setFeatureArr] = useState<any>([]);
  const [hoteType, setHoteType] = useState<string>("Home Stays");

  const handleRemoveCoupon = async () => {
    try {
      localStorage.setItem("cart-discount", "");
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
handleRemoveCoupon()
    if (propertyArr && propertyArr?.length > 0) {
      let tempPropertyArr: any = propertyArr.filter(
        (elx) => elx.hotelType == "Home Stays"
      );
  
      setFeatureArr(tempPropertyArr);
    }
  }, [propertyArr]);

  const handleTabHotel = (type: string) => {
    setHoteType(type);
    if (propertyArr && propertyArr?.length > 0) {
      let tempPropertyArr: any = propertyArr.filter(
        (elx) => elx.hotelType == type
      );
      setFeatureArr(tempPropertyArr);
    }
  };

  const mobilebreakpoint = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    360: {
      slidesPerView: 1.3,
      spaceBetween: 15,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    992: {
      slidesPerView: 3,
      spaceBetween:20,
    },
  
  };


  return (
    <div className={style.slider}>
      <div className="container">
        <div className={`row ${style.a_i_c} ${style.mb_30}`}>
          <div className="col-xl-8 col-lg-8 col-md-6 col-sm-5 col-5">
            <h2 className={style.head}>
              Featured <span>Properties</span>
            </h2>
            {/* <p className={style.para}>
              Explore top destinations for unforgettable experiences
            </p> */}
          </div>
          <div className={`col-xl-4 col-lg-4 col-md-6 col-sm-7 col-7 ${style.d_fj_c}`}>
            <button
              type="button"
              onClick={() => handleTabHotel("Home Stays")}
              className={`${style.category_buttn} ${
                hoteType == "Home Stays" ? style.active : ""
              } btn`}
            >
              Apartments
            </button>
            <button
              type="button"
              onClick={() => handleTabHotel("Hotels")}
              className={`${style.category_buttn} ${
                hoteType == "Hotels" ? style.active : ""
              } btn`}
            >
              Hotels
            </button>
          </div>
        </div>

     
        {featureArr && featureArr?.length ? (
          <Swiper
            breakpoints={mobilebreakpoint}
            slidesPerView={3}
            spaceBetween={30}
            // navigation={true}
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[Autoplay,Scrollbar, Navigation,Pagination]}
            loop
            className="mySwipercollect"
          >
            {featureArr?.map((el: any, index: number) => (
              <SwiperSlide key={index}>
                <Link href={`/PropertyDetail/${el.slug}`}>
                  <div className={style.slide}>
                    <div className={style.image}>
                      <Image
                        src={generateImageUrl(el?.mainImage)}
                        alt=""
                        fill
                      />

                      <div className={style.effect}></div>
                    </div>
                    <div className={style.content}>
                      <h6 className={style.name}>{el?.name}</h6>
                      <span className={style.location}>
                        <IoLocationOutline /> {el.locationObj.name}
                      </span>
             
                      <div className={style.list}>
                             
                             <span className={style.item}>
                               {el?.bedroom} Bedrooms{" "}
                             </span>
                             <span className={style.item}>
                               {el?.bathroom} Bathrooms{" "}
                             </span>
                             <span className={style.item}>
                               {el?.guest} Guests{" "}
                             </span>
                           </div>

                      <div className={style.price_text}>
                        <p className={style.price}>
                          <span className={style.text}>Starts from</span>₹{" "}
                          {el?.price}
                          <span className={style.day}>/Night</span>
                        </p>
                      </div>
                      <Link
                        href={`/PropertyDetail/${el.slug}`}
                        className={`${style.btn22} btn`}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <h4>No Property Found</h4>
        )}
      </div>
    </div>
  );
}
