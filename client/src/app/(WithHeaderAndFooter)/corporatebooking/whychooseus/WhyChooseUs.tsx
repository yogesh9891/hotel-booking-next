import React from 'react'
import style from '../style.module.scss'
import Image from "next/image";
import leftimg from "@/assets/images/whychooseus/left.webp";
import rightimg from "@/assets/images/whychooseus/right.webp";
export default function WhyChooseUs() {
  return (
  <>
    <section className={style.why_choose_sec}>
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className={style.content}>
                <h3>Why Choose our Corporate Retreats</h3>
                <p className={style.desc}>
                  At Wabi Sabi Stays, we understand that successful corporate
                  retreats go beyond mere business strategies. Our exquisite
                  properties provide the ideal blend of relaxation and
                  productivity, featuring a variety of amenities and activities.
                  We can tailor your itinerary to include team-building
                  exercises, outdoor adventures, wellness sessions, and gourmet
                  dining experiences. Enjoy exceptional hospitality with Wabi
                  Sabi Stays and create unforgettable retreats for your teams
                  and colleagues!
                </p>
              </div>
            </div>
            <div className="col-xl-6">
              <div className={style.images}>
                <div className="row">
                  <div className="col-xl-6">
                    <div className={style.left}>
                      <Image src={leftimg} alt="" fill></Image>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className={style.right}>
                      <Image src={rightimg} alt="" fill></Image>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
  </>
  )
}
