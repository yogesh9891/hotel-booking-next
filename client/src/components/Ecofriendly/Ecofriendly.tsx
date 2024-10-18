"use client"
import React, { useEffect, useState } from 'react'
import style from '@/components/Ecofriendly/Ecofriendly.module.scss'
// import Image from 'next/image'
// import tags1 from '@/assets/images/tags1.webp'
// import tags2 from '@/assets/images/tags2.webp'
// import tags3 from '@/assets/images/tags3.webp'
// import tags4 from '@/assets/images/tags4.webp'
// import Slider from "react-slick";
import { getOfferApi } from '@/service/home.service';
import { toastSuccess } from '../../utils/toastMessage.ts';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";



export default function Ecofriendly() {


  const handlegetOffers = async () => {
    try {
      let { data: res } = await getOfferApi("active=true");
      if (res.data) {
       SetCouponArr(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlegetOffers();
  }, []);

const [couponArr,SetCouponArr] = useState<any>([])

  // swiper

  const collection_box = {
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
    },
    1400: {
      slidesPerView: 3,
    },
  };




    return (
      <>
       {couponArr && couponArr.length > 0 &&
       <div className={style.tags}>
       <div className="container">
       <div className="col-lg-12 col-md-12 col-sm-12">
       
       <div className="row justify-content-center">
         <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 text-center">
           <h2 className={style.head}>
            Available  <span> Offers</span> For You
           </h2>
          
         </div>
       </div>
       {couponArr && couponArr?.length ? (

            <Swiper
            slidesPerView={3}
             loop={true}
             breakpoints={collection_box}
             navigation={true}
             pagination={true}
             autoplay={false}
             modules={[Autoplay, Navigation]}
             className="myswiper4"
             >
                {couponArr?.map((el: any, index: number) => (
               <SwiperSlide key={index}>
 <div className={style.tag_box}>
                   <div className="row">
                     <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7 col-6">
                       <div className={style.coupon_text}>
                         <h5>{el.discountCode}</h5>
                       </div>
                     </div>
                     <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-6">
                       <div className={style.coupon_buttn}>
                         <button
                           onClick={() => {
                             navigator.clipboard.writeText(el.discountCode);toastSuccess("Copy to Clipboard")
                           }
                           }
                         >
                           COPY CODE
                         </button>
                       </div>
                     </div>
                   </div>
                     <p className={style.coupon_desc}> {el.description}</p>

                   <p className={style.expiry_date}>
                     Expires: {new Date(el.expiryDate).toDateString()}
                   </p>
                 </div>


               </SwiperSlide>
                ))}


             </Swiper>
       ): (
         <h5 className='text-center fw_500 mt-4'>No Offers Available</h5>
       )}
        </div>

       
       </div>
     </div>}
      </>
      
    );
}
