"use client"

import React, { useEffect, useState, Ref, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
// import { Images } from '@/assets/Utility/Images';
import { TiArrowSortedDown } from "react-icons/ti";
import style from '@/layout/layout.module.scss';
import StayFormInput from '../StayFormInput/StayFormInput';
import { generateImageUrl } from '@/service/url.service';
import Aos from 'aos'
import 'aos/dist/aos.css'
// import { SearchDateInput, useSearch } from '@/context/client-provider';
import { IoSearchOutline } from 'react-icons/io5';
import { FaAngleLeft } from 'react-icons/fa6';
import Typewriter from 'typewriter-effect';
import mainbanner from '@/assets/images/banner/mainbanner.webp'
import { AiFillCloseCircle } from 'react-icons/ai';



export default function Banner({ bannerArr }: { bannerArr: any[] },{handleClosetop}:{handleClosetop:any,handleopenmodalsearchbar:any}) {

  useEffect(() => {
    Aos.init({
      duration: 1000,
    })
  }, [])


  const revierref = useRef()
  const [searchoption, setsearchoption] = useState(['goa', 'delhi', 'mumbai']);

  const [openmodelsearchbar, setOpenmodelsearchbar] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleopenmodalsearchbar = () => {
    setOpenmodelsearchbar(!openmodelsearchbar)
  }

  useEffect(() => {

    const timer = setInterval(() => {
      // Calculate the next index, loop back to the beginning if at the end
      setCurrentIndex((prevIndex) => (prevIndex + 1) % searchoption.length);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount


  }, [currentIndex, 1000, searchoption.length])

  return (
    <>
      {/* <div className="position-relative">

        <Swiper
          slidesPerView={1}
          autoplay={true}
          modules={[Navigation, Autoplay]}
          className={`${style.swiper} mySwiper1`}>
          {
            bannerArr && bannerArr?.length > 0 && bannerArr.map((el) => (
              <SwiperSlide className={style.slide}>
                <div className={style.image}>
                  <Image src={generateImageUrl(el.image)} alt='' fill />
                </div>

                <div className={style.content}>
                  <h4 className={style.banner_head} data-aos="fade-right">Find Your Best Stay</h4>
                  <p className={style.para} data-aos="fade-left">With the Wabi Sabi Stay</p>
                </div>
              </SwiperSlide>
            ))
          }

        </Swiper>

        <div className={style.icon} >
          <TiArrowSortedDown />
        </div>
      </div> */}
      {
        bannerArr && bannerArr?.length > 0 ?

          <div className={`position-relative ${style.main_banner}`}>
            <div className={style.image}>
              <Image src={generateImageUrl(bannerArr[0].image)} alt='mainbanner' fill priority />
            </div>

            <div className={style.content}>
              <h4 className={style.banner_head} data-aos="fade-right">{bannerArr[0].name}</h4>
              <p className={style.para} data-aos="fade-left">{bannerArr[0].description}</p>
            </div>
          </div>

          :

          <div className={`position-relative ${style.main_banner}`}>
            <div className={style.image}>
              <Image src={mainbanner} alt='mainbanner' fill priority />
            </div>

            <div className={style.content}>
              <h4 className={style.banner_head} data-aos="fade-right">Find The Best</h4>
              <p className={style.para} data-aos="fade-left">with wabi sabi</p>
            </div>
          </div>
      }



      <div onClick={() => setOpenmodelsearchbar(!openmodelsearchbar)} className={`d-xl-none py-3 ${style.mobilesearchbar}`}>
        <div className={style.customeinput}>
          <IoSearchOutline />
          <h5>Search for a <Typewriter
            options={{
              strings: ['Hotel', 'Property', 'Apartment'],
              autoStart: true,
              loop: true,
            }}
          /></h5>

        </div>
      </div>


      <div className={`${openmodelsearchbar ? 'opensearchbarmobile' : 'opensearchbardesktop'}`}>


        <div className="headersearbar d-xl-none">
          <div className="backtbn" onClick={() => setOpenmodelsearchbar(!openmodelsearchbar)}><FaAngleLeft />   Back</div>
          <div className="backtbn1" onClick={() => setOpenmodelsearchbar(!openmodelsearchbar)}><AiFillCloseCircle /></div>
        </div>

        <div className={style.input_box}>
          <div className="container">
            <div className="row">
              <div className={style.input}>
                <StayFormInput handleClosetop={handleClosetop}  handleopenmodalsearchbar={handleopenmodalsearchbar} />
              </div>
            </div>
          </div>
        </div>
      </div>


    </>

  )
}
