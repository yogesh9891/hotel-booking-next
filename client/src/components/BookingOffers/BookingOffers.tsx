'use client'

import React, { useState } from 'react'
import style from '@/components/BookingOffers/BookingOffers.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { MdOutlineLocationOn } from 'react-icons/md'
import offer1 from '@/assets/images/offer1.webp';
import offer2 from '@/assets/images/offer2.webp';
import offer3 from '@/assets/images/offer3.webp';
import offer4 from '@/assets/images/offer4.webp';
import { generateImageUrl } from '@/service/url.service';

export default function BookingOffers({ propertyArr }: { propertyArr: any[] }) {



    return (

        // <div className={style.offer_sec}>
        //     <div className="container">
        //         <div className="row justify-content-center">
        //             <p className={style.title}>
        //                 <span className={style.text}>Hotel Offer & Discount</span>
        //             </p>
        //             <div className="col-lg-9 col-md-9 col-sm-9 d-flex flex-column align-items-center">
        //                 <h1 className={style.head}>Special Hotel <span>Booking Offer</span></h1>
        //                 <p className={style.para}>Mollit voluptatem perspiciatis convallis elementum
        //                     corporis quo veritatis aliquid blandit, blandit torquent, odit placeat.
        //                     Adipiscing repudiandae eius cursus? Nostrum magnis maxime curae placeat.</p>
        //             </div>
        //         </div>

        //         <Swiper
        //             slidesPerView={4}
        //             spaceBetween={20}
        //             autoplay={{
        //                 delay: 2000,
        //                 disableOnInteraction: false,
        //             }}
        //             modules={[Autoplay]}
        //             loop={true}
        //             className='mySwiper2'>

        //             {
        //                 propertyArr && propertyArr?.length && propertyArr?.map((hotel, ind) => (
        //                     <SwiperSlide className={style.slide} key={ind}>
        //                         <div className={style.card_box}>
        //                             <div className={style.image}>
        //                             <Link href={`/PropertyDetail/${hotel.slug}`}><Image src={generateImageUrl(hotel.mainImage)} alt='' fill /></Link>

        //                             </div>
        //                             <div className={style.offer}>Upto<br /> 10%<br /> OFF</div>
        //                         </div>
        //                         <div className={style.content}>
        //                             <div className={style.location}>
        //                                 <MdOutlineLocationOn />
        //                                 <span className={style.text}>{hotel?.locationObj?.name}</span>
        //                             </div>
        //                             <Link href={`/PropertyDetail/${hotel.slug}`} ><h6 className={style.heading}>{hotel.name}</h6></Link>
        //                         </div>

        //                         <p className={style.price}>
        //                             Price:
        //                             {/* <span className={style.cutprice}>₹12,000</span> */}
        //                             <span className={style.mainprice}>₹ {hotel?.price}</span>
        //                         </p>
        //                     </SwiperSlide>
        //                 ))
        //             }

        //         </Swiper>
        //     </div>
        // </div>


        <div className={style.offer_sec}>
            <div className="container">
                <div className="row justify-content-center">
                    <p className={style.title}>
                        <span className={style.text}>Hotel Offer & Discount</span>
                    </p>
                    <div className="col-lg-9 col-md-9 col-sm-9 d-flex flex-column align-items-center">
                        <h1 className={style.head}>Special Hotel <span>Booking Offer</span></h1>
                        <p className={style.para}>Mollit voluptatem perspiciatis convallis elementum
                            corporis quo veritatis aliquid blandit, blandit torquent, odit placeat.
                            Adipiscing repudiandae eius cursus? Nostrum magnis maxime curae placeat.</p>
                    </div>
                </div>

                <div className="row">

                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        // autoplay={{
                        //     delay: 2000,
                        //     disableOnInteraction: false,
                        // }}
                        // modules={[Autoplay]}
                        loop={true}
                        className='mySwiper1'>


                        <SwiperSlide>
                            <div className={style.slide}>
                                <div className={style.image}>
                                    <Image src={offer1} alt='' fill />
                                </div>
                                <div className={style.content}>
                                    <p className={style.offer}>Upto<br /> 10%<br /> OFF</p>
                                    <h6 className={style.name}>Wind 2BHK</h6>
                                    <p className={style.location}><MdOutlineLocationOn />Mussoorie</p>
                                    <p className={style.price}>
                                        <span className={style.text}>Price:</span>
                                        <span className={style.cut_price}>₹12,000</span>
                                        <span className={style.main_price}>₹10,800</span>
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.slide}>
                                <div className={style.image}>
                                    <Image src={offer1} alt='' fill />
                                </div>
                                <div className={style.content}>
                                    <p className={style.offer}>Upto<br /> 10%<br /> OFF</p>
                                    <h6 className={style.name}>Wind 2BHK</h6>
                                    <p className={style.location}><MdOutlineLocationOn />Mussoorie</p>
                                    <p className={style.price}>
                                        <span className={style.text}>Price:</span>
                                        <span className={style.cut_price}>₹12,000</span>
                                        <span className={style.main_price}>₹10,800</span>
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.slide}>
                                <div className={style.image}>
                                    <Image src={offer1} alt='' fill />
                                </div>
                                <div className={style.content}>
                                    <p className={style.offer}>Upto<br /> 10%<br /> OFF</p>
                                    <h6 className={style.name}>Wind 2BHK</h6>
                                    <p className={style.location}><MdOutlineLocationOn />Mussoorie</p>
                                    <p className={style.price}>
                                        <span className={style.text}>Price:</span>
                                        <span className={style.cut_price}>₹12,000</span>
                                        <span className={style.main_price}>₹10,800</span>
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.slide}>
                                <div className={style.image}>
                                    <Image src={offer1} alt='' fill />
                                </div>
                                <div className={style.content}>
                                    <p className={style.offer}>Upto<br /> 10%<br /> OFF</p>
                                    <h6 className={style.name}>Wind 2BHK</h6>
                                    <p className={style.location}><MdOutlineLocationOn />Mussoorie</p>
                                    <p className={style.price}>
                                        <span className={style.text}>Price:</span>
                                        <span className={style.cut_price}>₹12,000</span>
                                        <span className={style.main_price}>₹10,800</span>
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.slide}>
                                <div className={style.image}>
                                    <Image src={offer1} alt='' fill />
                                </div>
                                <div className={style.content}>
                                    <p className={style.offer}>Upto<br /> 10%<br /> OFF</p>
                                    <h6 className={style.name}>Wind 2BHK</h6>
                                    <p className={style.location}><MdOutlineLocationOn />Mussoorie</p>
                                    <p className={style.price}>
                                        <span className={style.text}>Price:</span>
                                        <span className={style.cut_price}>₹12,000</span>
                                        <span className={style.main_price}>₹10,800</span>
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>
        </div >
    )
}
