"use client";

import React from "react";
import style from "@/components/Collection/Collection.module.scss";
import Image from "next/image";
import Link from "next/link";
import { generateImageUrl } from "@/service/url.service";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import corporatestaff from '@/assets/images/collection/enjoyingpool.webp'
// import himachal from '@/assets/images/collection/2nd.webp'

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import 'swiper/css/scrollbar';


// import required modules
import { Navigation, Scrollbar,Pagination } from 'swiper/modules';


export default function Collection({
  collectionArr,
}: {
  collectionArr: any[];
}) {

  const collection_box = {
    0: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView:2.5,
      spaceBetween: 25,
    },
    992: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 3.5,
    },
  };

 
  return (
    <>
     




      <div className={style.collection_sec}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
              <h2 className={style.head}>
                Choose A <span>Collection</span>
              </h2>
              <p className={style.para}>
                Explore top destinations for unforgettable experiences
              </p>
            </div>

           
              <Swiper
              loop={true}
              breakpoints={collection_box}
                slidesPerView={3.2}
                spaceBetween={30}
                // navigation={true}
                freeMode={true}
                speed={700}
                pagination={{ clickable: true }}
                modules={[Scrollbar,Navigation,Pagination]}
                className={`mySwipercollect ${style.collect_swiper}`}
              >

                {collectionArr && collectionArr.length > 0 && collectionArr?.map((el: any, index: any) => (
                  <SwiperSlide className={style.slide} key={index}>
                      <Link  href={`/collection/${el.slug}`}>

<Image src={generateImageUrl(el.imageUrl)} alt="" fill></Image>

<div className={style.title_container}>
  <h5>{el.name} </h5>
  <p className={style.desc}>{el.description} </p>
</div>



                  </Link>
</SwiperSlide>
                ))}




{/* 
//         <SwiperSlide className={style.slide}>

// <Image src={himachal} alt="" fill></Image>

// <div className={style.title_container}>
// <h5>Corporate Office Villas</h5>
// <p className={style.desc}>"Go as colleagues, Come back as Family". WFH has strained relations with colleagues, and left many new joinees clueless on Company culture and feeling left out.  Bring your flock together, organise </p>
// </div>



//           </SwiperSlide>
//         <SwiperSlide className={style.slide}>

// <Image src={himachal} alt="" fill></Image>

// <div className={style.title_container}>
// <h5>Corporate Office Villas</h5>
// <p className={style.desc}>"Go as colleagues, Come back as Family". WFH has strained relations with colleagues, and left many new joinees clueless on Company culture and feeling left out.  Bring your flock together, organise </p>
// </div>



//           </SwiperSlide>
//           <SwiperSlide className={style.slide}>

//           <Image src={corporatestaff} alt="" fill></Image>

//           <div className={style.title_container}>
//           <h5>Corporate Office Villas</h5>
//           <p className={style.desc}>"Go as colleagues, Come back as Family". WFH has strained relations with colleagues, and left many new joinees clueless on Company culture and feeling left out.  Bring your flock together, organise </p>
//           </div>



//                     </SwiperSlide> */}


              </Swiper>



      

            {/* <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                {collectionArr && collectionArr?.length > 0 && (
                  <div className="col-lg-8 col-md-8 col-sm-8 col-6">
                    <div className={style.mobilemb5}>
                    <Link
                      href={`/collection/${collectionArr[0].slug}`}
                      className={style.box}
                    >
                      <div className={style.image}>
                        <Image
                          src={generateImageUrl(collectionArr[0].imageUrl)}
                          alt=""
                          fill
                          priority
                        />
                      </div>

                      <div className={style.content}>
                        <h6 className={style.text}>{collectionArr[0].name}</h6>
                      </div>

                      <div className={style.hover_content}>
                        <h6 className={style.title}>{collectionArr[0].name}</h6>
                        <p className={style.para}>
                          {collectionArr[0].description}{" "}
                        </p>
                      </div>
                    </Link>
                    </div>
                  </div>
                )}

                {collectionArr && collectionArr?.length > 3 && (
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <Link
                      href={`/collection/${collectionArr[3].slug}`}
                      className={style.box}
                    >
                      <div className={style.image}>
                        <Image
                          src={generateImageUrl(collectionArr[3].imageUrl)}
                          alt=""
                          fill
                          priority
                        />
                      </div>
                      <div className={style.content}>
                        <h6 className={style.text}>{collectionArr[3].name}</h6>
                      </div>

                      <div className={style.hover_content}>
                        <h6 className={style.title}>{collectionArr[3].name}</h6>
                        <p className={style.para}>
                          {collectionArr[3].description}{" "}
                        </p>
                      </div>
                    </Link>
                  </div>
                )}

                {collectionArr && collectionArr?.length > 2 && (
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6 mt-3">
                    <Link
                      href={`/collection/${collectionArr[2].slug}`}
                      className={style.box}
                    >
                      <div className={style.image}>
                        <Image
                          src={generateImageUrl(collectionArr[2].imageUrl)}
                          alt=""
                          fill
                          priority
                        />
                      </div>
                      <div className={style.content}>
                        <h6 className={style.text}>{collectionArr[2].name}</h6>
                      </div>

                      <div className={style.hover_content}>
                        <h6 className={style.title}>{collectionArr[2].name}</h6>
                        <p className={style.para}>
                          {collectionArr[2].description}{" "}
                        </p>
                      </div>
                    </Link>
                  </div>
                )}

                {collectionArr && collectionArr?.length > 1 && (
                  <div className="col-lg-8 col-md-8 col-sm-8 col-6 mt-3">
                    <Link
                      href={`/collection/${collectionArr[1].slug}`}
                      className={style.box}
                    >
                      <div className={style.image}>
                        <Image
                          src={generateImageUrl(collectionArr[1].imageUrl)}
                          alt=""
                          fill
                          priority
                        />
                      </div>

                      <div className={style.content}>
                        <h6 className={style.text}>{collectionArr[1].name}</h6>
                      </div>

                      <div className={style.hover_content}>
                        <h6 className={style.title}>{collectionArr[1].name}</h6>
                        <p className={style.para}>
                          {collectionArr[1].description}{" "}
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>

















     
    </>
  );
}
