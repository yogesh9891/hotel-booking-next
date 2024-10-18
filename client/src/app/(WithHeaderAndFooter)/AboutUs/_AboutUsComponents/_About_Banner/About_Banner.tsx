import React from 'react'

import style from '@/app/(WithHeaderAndFooter)/AboutUs/AboutUs.module.scss'
export default function About_Banner() {
  return (
   <>
     <div className={style.about_sec}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-10 col-sm-10">
              <div className={style.content}>
                <h1 className={style.heading}>About Us</h1>

            <div className='d-xl-block d-none'>
                <div className="row ">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3">
                    <div className={style.main_content}>
                    <h2 className={style.head}>10+</h2>
                      <p className={style.title}>Years Experience</p>
                    
                    </div>
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3">
                    <div className={style.main_content}>
                    <h2 className={style.head}>5.3K</h2>
                      <p className={style.title}>Travellers Hosted</p>
                   
                    </div>                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3">
                    <div className={style.main_content}>
                    <h2 className={style.head}>50+</h2>
                      <p className={style.title}>Rooms</p>
                      
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
