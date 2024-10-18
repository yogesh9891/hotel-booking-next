
import React from 'react'

import style from './style.module.scss'
import Image from 'next/image'
import ambition from  '@/assets/images/partnerwithus/ambition.svg'
import quality from  '@/assets/images/partnerwithus/quality.svg'
import honesty from  '@/assets/images/partnerwithus/honesty.svg'
import financial from  '@/assets/images/partnerwithus/financial.svg'
import Attitude from  '@/assets/images/partnerwithus/professional.svg'
import longterm from  '@/assets/images/partnerwithus/longterm.svg'

export default function WhatExpect() {

    const whatexpect = [

        {
            icon:ambition,
            heading:"Growth Mindset",
            desc:"We like our owners to share the same mindset as us, to grow business and build a name. ",
        },
        {
            icon:quality,
            heading:"Quality Matters",
            desc:"Our owners like to deliver Quality and that does not happen by cutting corners.",
        },
        {
            icon:honesty,
            heading:"Honesty",
            desc:"All long term relationships can be build with solid foundations of trust and transparency",
        },
        {
            icon:financial,
            heading:"Financial Stability",
            desc:"We help you plan your finances so that we both benefit Financially. Its Business after all.",
        },
        {
            icon:Attitude,
            heading:"Understanding",
            desc:"Market Conditions can change and while we support our Owners through thick and thin, we expect the same.",
        },
        {
            icon:longterm,
            heading:"Long Term Vision",
            desc:"Great plans and growth can be easily destroyed with short term thinking and owners understand that we work for Long term. ",
        },
        ]
  return (
    <>
    <section className={style.join_hands}>
        <div className="container">
            <div className="row">
                <h2 className={style.main_heading}>
                What We Expect from You
                </h2>

                
            </div>
            <div className="row">
                {
                    whatexpect && whatexpect.map((el,index)=>(
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6" key={index}>
                        <div className={style.card}>
                            <div className={style.icon}>
                                <Image src={el.icon} alt={`${el.icon}`} fill></Image>
                            </div>
                            <h5>{el.heading}</h5>
                            <p>{el.desc}</p>
                        </div>
                    </div>
                    ))
                }
             
            </div>
        </div>
    </section>
    
    </>
  )
}
