import React from 'react'
import Link from 'next/link';
import style from '@/app/(WithHeaderAndFooter)/AboutUs/AboutUs.module.scss'
import shubham from '@/assets/images/About/shubham.webp'
import naman from '@/assets/images/About/Naman.webp'
import Image from 'next/image';
export default function Our_Founders() {
  return (
    <>
      <div className={style.founders}>
        <div className="container">
          <div className="row">
            <h1 className={style.heading}>Our Founders</h1>

            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className={style.main_box}>

                <div className={style.heading_box}>
                  <h6 className={style.name}>Shubham Sanghal</h6>
                
                </div>

                <div className={`row ${style.f_dc_cr}`}>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className={style.text_content}>
                    
                      <p className={style.para}>
                        A seasoned traveler and foodie with over 9 years of hospitality experience across diverse roles, Shubham is passionate about creating exceptional experiences in the travel and hotel industry. He has a proven track record of success, having launched startups in the food sector and overseen the complete operations of various hotels. His background brings a rich tapestry of knowledge, encompassing banking, food technology, kitchen expertise, hotel management, and finance.
                      </p>
                      <Link href="https://www.linkedin.com/in/shubhamsanghal/">Shubham Sanghal (LinkedIn)</Link>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className={style.border}>
                      <div className={style.image}>
                        <Image src={shubham} alt='' fill />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            <div className={`col-lg-12 col-md-12 col-sm-12 ${style.mt_5}`}>
              <div className={style.main_box}>

                <div className={style.heading_box}>
                  <h6 className={style.name}>Naman Sanghal</h6>
                
                </div>

                <div className={`row ${style.column_reverse}`}>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className={style.text_content}>
                      
                      <p className={style.para}>
                        Naman is a seasoned startup professional with over 5 years of experience under his belt. He's adept at wearing many hats, having tackled various roles in community building, marketing, operations, and strategy. His experience spans across well-known companies like BookMyShow, 91springboard, and ZKX, showcasing his versatility and adaptability within the dynamic startup landscape.
                      </p>
                      <Link href="https://www.linkedin.com/in/namansanghal/">Naman Sanghal (LinkedIn)</Link>
                    </div>

                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className={style.border}>
                      <div className={style.image}>
                        <Image src={naman} alt='' fill />
                      </div>
                    </div>
                  </div>


                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    
    
    </>
  )
}
