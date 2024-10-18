"use client";

import React, { useLayoutEffect, useState } from "react";
import style from "@/components/ThisSeason/ThisSeason.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Image from "next/image";
// import season1 from "@/assets/images/season1.webp";
// import season2 from "@/assets/images/season2.webp";
// import season3 from "@/assets/images/season3.webp";
// import season4 from "@/assets/images/season4.webp";
// import { IoBed } from "react-icons/io5";
// import { FaUsers } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import { generateImageUrl } from "@/service/url.service";
import Slider from "react-slick";
import 'swiper/css/scrollbar';

export default function ThisSeason({ propertyArr }: { propertyArr: any[] }) {
  const [swiperArr, setSwiperArr] = useState(propertyArr);



  // const [cardArr, setCardArr] = useState([
  //   {
  //     images: [
  //       {
  //         img: season1,
  //       },
  //       {
  //         img: season2,
  //       },
  //       {
  //         img: season3,
  //       },
  //       {
  //         img: season4,
  //       },
  //     ],
  //     property: "Berry 3 BHK",
  //     location: "Mussoorie",
  //     rooms: "3",
  //     guests: "8",
  //     price: "27000 ",
  //     day: "Night",
  //   },
  //   {
  //     images: [
  //       {
  //         img: season2,
  //       },
  //       {
  //         img: season3,
  //       },
  //       {
  //         img: season4,
  //       },
  //       {
  //         img: season1,
  //       },
  //     ],
  //     property: "Berry 3 BHK",
  //     location: " Mussoorie ",
  //     rooms: "3",
  //     guests: "8",
  //     price: "27000 ",
  //     day: "Night",
  //   },
  //   {
  //     images: [
  //       {
  //         img: season3,
  //       },
  //       {
  //         img: season2,
  //       },
  //       {
  //         img: season1,
  //       },
  //       {
  //         img: season4,
  //       },
  //     ],
  //     property: "Berry 3 BHK",
  //     location: " Mussoorie",
  //     rooms: "3",
  //     guests: "8",
  //     price: "27000 ",
  //     day: "Night",
  //   },
  //   {
  //     images: [
  //       {
  //         img: season3,
  //       },
  //       {
  //         img: season4,
  //       },
  //       {
  //         img: season3,
  //       },
  //       {
  //         img: season2,
  //       },
  //     ],
  //     property: "Berry 3 BHK",
  //     location: " Mussoorie ",
  //     rooms: "3",
  //     guests: "8",
  //     price: "27000 ",
  //     day: "Night",
  //   },
  //   {
  //     images: [
  //       {
  //         img: season1,
  //       },
  //       {
  //         img: season2,
  //       },
  //       {
  //         img: season3,
  //       },
  //       {
  //         img: season4,
  //       },
  //     ],
  //     property: "Berry 3 BHK",
  //     location: "Mussoorie ",
  //     rooms: "3",
  //     guests: "8",
  //     price: "27000 ",
  //     day: "Night",
  //   },
  //   {
  //     images: [
  //       {
  //         img: season4,
  //       },
  //       {
  //         img: season2,
  //       },
  //       {
  //         img: season1,
  //       },
  //       {
  //         img: season3,
  //       },
  //     ],
  //     property: "Berry 3 BHK",
  //     location: " Mussoorie ",
  //     rooms: "3",
  //     guests: "8",
  //     price: "27000 ",
  //     day: "Night",
  //   },
  // ]);

  // const collection_box = {
  //   320: {
  //     slidesPerView: 1,
  //     spaceBetween: 10,
  //   },
  //   360: {
  //     slidesPerView: 1.3,
  //     spaceBetween: 15,
  //   },
  //   768: {
  //     slidesPerView: 2.3,
  //     spaceBetween: 10,
  //   },
  //   992: {
  //     slidesPerView: 3.3,
  //   },
  //   1600: {
  //     slidesPerView: 4,
  //   },
  // };

  // slick slider

  var settings = {
    dots: true,
    infinite: true,
    // autoplay: true,
    speed: 500,
    // autoplaySpeed: 2500,
    // cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
     
  
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // autoplay: true,
           speed: 900,
        }
      }
    ]
  };


  useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 767) {
        setSwiperArr(propertyArr.slice(0, 4)); // Show only the first 4 elements
      } else {
        setSwiperArr(propertyArr); // Show all elements
      }
    };

    // Initial call to set swiperArr based on the current width
    updateSize();

    // Add event listener for window resize
    window.addEventListener("resize", updateSize);
    
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updateSize);
  }, [propertyArr]); // Dependency on propertyArr

  


  return (
   

    <div className={style.trending_sec}>
      <div className={style.container_fluid}>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 text-center">
            <h2 className={style.head}>
              Trending <span>This Season</span>
            </h2>
            <p className={style.para}>
              Explore top destinations for unforgettable experiences
            </p>
          </div>

        

         {/* <div className="col-xl-12"> */}
          
     

            {/* <div className="trend_season_mob_view">
            <Swiper
             loop={true}
             breakpoints={collection_box}
               slidesPerView={3.2}
               spaceBetween={30}
               freeMode={true}
               pagination={{ clickable: true }}
               modules={[Scrollbar,Pagination]}
               className={`mySwipercollect1 ${style.swiper}`}>

{swiperArr &&
  swiperArr?.length &&
  swiperArr?.map((hotel, i) => (
    <SwiperSlide key={i}>
      <div className={style.card_box}>
        <Swiper
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={false}
          autoplay={false}
          freeMode={true}
          modules={[Autoplay,Scrollbar, Navigation]}
          className="myswiper4"
        >
          <SwiperSlide>
            <Link
              href={`/PropertyDetail/${hotel.slug}`}
            >
              <div className={`${style.slide} hoverclass`}>
                <div className={style.image}>
                  <Link href={`/PropertyDetail/${hotel.slug}`}>
                    <Image
                    className="skeleton"
                      src={generateImageUrl(hotel?.mainImage)}
                      alt="mainimage"
                      fill
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </Link>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          {hotel?.imagesArr &&
            hotel?.imagesArr?.length &&
            hotel?.imagesArr?.map(
              (ele: { imageUrl: string }, index: number) => (
                <SwiperSlide key={index}>
                  <div className={`${style.slide} hoverclass`}>
                    <div className={style.image}>
                      <Link
                        href={`/PropertyDetail/${hotel.slug}`}
                      >
                        <img
                          src={generateImageUrl(ele?.imageUrl)}
                          alt="innerimages"
                          className="img-fluid"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
        </Swiper>

        <div className={style.card_content}>
          <Link href={`/PropertyDetail/${hotel.slug}`}>
            <h6 className={style.heading}>{hotel?.name}</h6>
          </Link>
          <span className={style.location}>
            <IoLocationOutline /> {hotel?.locationObj?.name}
          </span>
          <div className={style.list}>
                             
                             <span className={style.item}>
                               {hotel?.bedroom} Bedrooms{" "}
                             </span>
                             <span className={style.item}>
                               {hotel?.bathroom} Bathrooms{" "}
                             </span>
                             <span className={style.item}>
                               {hotel?.guest} Guests{" "}
                             </span>
                           </div>
          <div className={style.price_text}>
            <p className={style.price}>
              <span className={style.text}>Starts from</span>₹{" "}
              {hotel?.price}{" "}
              <span className={style.day}>/Night</span>
            </p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))}

</Swiper>
          
        </div> */}


         {/* </div> */}
         </div>
             <div className="trend_season_desktop_view1">
      <Slider {...settings} className={`${style.swiper} slick1`}>

              {swiperArr &&
                swiperArr?.length &&
                swiperArr?.map((hotel, i) => (
                  <div key={i}>
                    <div className={style.card_box}>
                      <Swiper
                        slidesPerView={1}
                        loop={true}
                        navigation={true}
                        pagination={false}
                        autoplay={false}
                        freeMode={true}
                        modules={[Autoplay, Navigation]}
                        className="myswiper4"
                      >
                        <SwiperSlide>
                          <Link
                            href={`/PropertyDetail/${hotel.slug}`}
                          >
                            <div className={`${style.slide} hoverclass`}>
                            <Link href={`/PropertyDetail/${hotel.slug}`}>
                              <div className={style.image}>
                               
                                  <img
                                  className="skeleton"
                                    src={generateImageUrl(hotel?.mainImage)}
                                    alt="mainimage"
                                  
                                  
                                  />
                              </div>
                                </Link>
                            </div>
                          </Link>
                        </SwiperSlide>
                        {hotel?.imagesArr &&
                          hotel?.imagesArr?.length &&
                          hotel?.imagesArr?.map(
                            (ele: { imageUrl: string }, index: number) => (
                              <SwiperSlide key={index}>
                                <div className={`${style.slide} hoverclass`}>
                                <Link
                                      href={`/PropertyDetail/${hotel.slug}`}
                                    >
                                  <div className={style.image}>
                                   
                                      <img
                                        src={generateImageUrl(ele?.imageUrl)}
                                        alt="innerimages"
                                       
                                        
                                      />
                                  </div>
                                    </Link>
                                </div>
                              </SwiperSlide>
                            )
                          )}
                      </Swiper>

                      <div className={style.card_content}>
                        <Link href={`/PropertyDetail/${hotel.slug}`}>
                          <h6 className={style.heading}>{hotel?.name}</h6>
                        </Link>
                        <span className={style.location}>
                          <IoLocationOutline /> {hotel?.locationObj?.name}
                        </span>
                        <div className={style.list}>
                             
                              <span className={style.item}>
                                {hotel?.bedroom} Bedrooms{" "}
                              </span>
                              <span className={style.item}>
                                {hotel?.bathroom} Bathrooms{" "}
                              </span>
                              <span className={style.item}>
                                {hotel?.guest} Guests{" "}
                              </span>
                            </div>
                        <div className={style.price_text}>
                          <p className={style.price}>
                            <span className={style.text}>Starts from</span>₹{" "}
                            {hotel?.price}{" "}
                            <span className={style.day}>/Night</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

            </Slider>
      </div>
      </div>
    </div>
  );
}
