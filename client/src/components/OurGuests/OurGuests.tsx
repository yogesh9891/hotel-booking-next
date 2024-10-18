"use client";

import React from "react";
import Image from "next/image";
import style from "@/components/OurGuests/OurGuests.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import guest from "@/assets/images/guest.webp";
import { generateImageUrl } from "@/service/url.service";
import moment from "moment";

export default function OurGuests({
  testimonialArr,
}: {
  testimonialArr: any[];
}) {


  const mobilebreakpoint = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },

    576: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween:25,
    },
  };
  return (
    <div className={style.guest_sec}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 text-center">
            <h2 className={style.head}>
              Trusted By <span>Our guests</span>
            </h2>
            <p className={style.para}>
            Memorable and Homely Stays : Trusted by Our Guests for Unparalleled
              Service and Unforgettable Stays Worldwide
            </p>
          </div>
        </div>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          spaceBetween={40}
          centeredSlides={false}
          rewind={true}
          loop={true}
          // autoplay={{
          //     delay:1500,
          //     disableOnInteraction:false,
          // }}
          
           slidesPerView={"auto"}
          breakpoints={mobilebreakpoint}
          coverflowEffect={{
            rotate: 0,
            stretch: -20,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className={`${style.swiper1} myswiper3`}
        >
          {testimonialArr &&
            testimonialArr?.length > 0 &&
            testimonialArr.map((testimonial: any, testimonialIndex: number) => (
              <SwiperSlide className={style.slide} key={testimonialIndex}>
                <div className={style.main_content}>
                  <div className={style.image}>
                    {testimonial.imageUrl != "" ? (
                      <Image
                        src={generateImageUrl(testimonial.imageUrl)}
                        alt=""
                        fill
                      />
                    ) : (
                      <Image src={guest} alt="" fill />
                    )}
                  </div>

                  <div className={style.content}>
                    <h6 className={style.review_name}>{testimonial.name}</h6>
                    <p className={style.place_date}>
                      {testimonial.place},{" "}
                      {moment(testimonial.createdAt).format("M Y")}
                    </p>
                    <p className={style.comment}> {testimonial?.comment}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
