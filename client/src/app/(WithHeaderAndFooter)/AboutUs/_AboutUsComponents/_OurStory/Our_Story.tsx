import React from 'react'
import style from '@/app/(WithHeaderAndFooter)/AboutUs/AboutUs.module.scss'
import ourstory from '@/assets/images/About/ourstory.webp'
import Image from 'next/image'

export default function Our_Story() {
  return (
   <>
     <div className={style.aboutus_sec}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5 col-md-6 col-sm-6">
              <div className={style.left_side}>
                <div className={style.top}>
                  <span className={style.border}></span>
                  <p className={style.heads}>About Wabi Sabi Stays</p>
                </div>

                <h2 className={style.heading}>Our Story</h2>
                <p className={style.para}>Wabi Sabi Stays was born in the tumultuous aftermath of the COVID-19 pandemic as a response to the burgeoning need of accessible, clean, and professionally managed accommodations. Echoing the Japanese philosophy of embracing imperfection, we transform flaws into livable beauty.
 </p>
                <p className={style.para1}>Wabi Sabi Stays was, and still is, a bootstrapped company. Starting from a single apartment in a small town, the brand has grown organically, brick by brick. Today, we manage over 16 properties across three different cities, each one imbued with the Wabi-sabi charm of handcrafted comfort and local character. Our vision is to redefine hospitality, one handcrafted haven at a time.
</p>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className={style.images}>
                <div className={style.image1}>
                  <Image src={ourstory} alt='' fill  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div> 
   
   
   </>
  )
}
