'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import style from './style.module.scss'


export default function Careers_content() {

    const [careersArr, SetCareersArr] = useState([
        {
    department:"Finance",
          heading: "Account Manager",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    days:"50",
        },
       
        {
    department:"Food & Beverage",
          heading: "System Analysist",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          days:"119",
        },
        {
    department:"Cleaning Staff",
          heading: "Executive Officer ",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          days:"69",
        },
       
    
    
      ])
  return (
    <>
       <div className={style.Careers_content}>
        <div className="container">

          <h2 className={style.main_heading}>
            Job <span>Opportunities</span>
          </h2>
          <div className={`row ${style.jobs_avail}`}>
           

              {
                careersArr.map((el:any, index:any) => (
                  <div className={`col-xl-4 ${style.main_box}`}  key={index}>
    
                    <h4 className={style.depart}>{el.department}</h4>

                    <div className={`border border-lightgray p-3 ${style.card_box}`}>
                      <h5>{el.heading} <span>{el.days}days</span></h5>
                      <p>Delhi - <span> 3-4 </span> - <span> Full Time</span></p>
                      <Link href="#jointeam" className={style.card_link}>Apply Now</Link>
                    </div>
                  </div>
              
            

                ))
              }
          
          </div>
        </div>
      </div>
    </>
    

  )
}
