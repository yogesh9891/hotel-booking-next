

import React from "react";
import style from "./style.module.scss";
import Link from "next/link";

export default function CareersBanner() {


    
  return (
    <>
       <section className={style.partner_withus_sec}>
        <div className="container">
          <div className={`row ${style.j_c_sb}`}>
            <div className="col-xl-6 col-lg-6 col-md-6">
            <div className={style.heading_box}>
            <h2 className={style.main_heading}>
            Become a part of WabiSabi Stays & shape the future of Hotels and Apartments.
            </h2>
            <p className={style.sub_heading}>
            Work with a team that is constantly re-inventing the hospitality landscape, discover your true potential & bloom to your best.
            </p>
            <Link className={style.apply} href="#applyhere">Apply Here</Link>
            </div>
            </div>
          
        
          </div>
        </div>
      </section>
    </>
  )
}
