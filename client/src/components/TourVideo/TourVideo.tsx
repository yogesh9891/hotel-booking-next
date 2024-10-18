
import React from 'react'
import style from '@/components/TourVideo/TourVideo.module.scss'
import { IoPlayOutline } from "react-icons/io5";

export default function TourVideo() {

    return (

        <div className={style.tour_sec}>
            <div className="row g-0">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className={style.overlay}>
                        <div className={style.content}>
                            <span className={style.text}>SEE OUR LUXURIOUS APARTMENT</span>
                            <h6 className={style.head}>Take A Tour</h6>
                            <div className={style.button}>
                                <IoPlayOutline />
                            </div>
                        </div>
                    </div>
                    <video
                        // poster='./cover.webp'
                        src='./tourvideo.mp4'
                        // ref={videoSectionRef}
                        className={style.tour}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
            </div>
        </div>

    )
}
