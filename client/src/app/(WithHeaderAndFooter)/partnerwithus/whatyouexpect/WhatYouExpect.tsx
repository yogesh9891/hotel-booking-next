import React from 'react'
import style from './style.module.scss'
import Image from 'next/image'
import hotelimg from '@/assets/images/partnerwithus/hotelmainimage.webp'

export default function WhatYouExpect() {

    const whatyouexpect =[

    {
        heading:"Thorough Review",
        desc:"We study your business and property in full details and plan a future for you",
    },
    {
        heading:"Quick Response",
        desc:"Once the application is submitted and expected, we work rapidly to get things started and we’ll be there with you at every step",
    },
    {
        heading:"Systems Approach",
        desc:"We manage everything with System and you get a data for the smallest of details",
    },
    {
        heading:"Mutual Understanding",
        desc:"We work together and make decisions mutually for both our Benefits. We understand things are not always under your control.",
    },
   
    ]

  return (
    <>
    <section className={style.join_hands}>
        <div className="container">
            <div className="row">
                <h2 className={style.main_heading}>
                What You can expect from us

                </h2>

                
            </div>
            <div className="row align-items-center">
            
                <div className="col-xl-5 col-lg-5">
<div className={style.image}>
    <Image src={hotelimg} alt='' fill></Image>
</div>
                </div>

                <div className="col-xl-7 col-lg-7">
           <div className={style.content_box}>
           {
                    whatyouexpect && whatyouexpect.map((el,index)=>(
                        <div className="col-xl-12" key={index}>
                        <div className={style.card}>
                            <h5>{el.heading}</h5>
                            <p>{el.desc}</p>
                        </div>
                    </div>
                    ))
                }
           </div>
                </div>
             
             
            </div>
        </div>
    </section>
    
    </>
  )
}
