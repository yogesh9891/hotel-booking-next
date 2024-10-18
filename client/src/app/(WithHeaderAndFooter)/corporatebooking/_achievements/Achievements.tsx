import React from 'react'
import style from  '../style.module.scss'

export default function Achievements() {

    
  const achievements = [

    {
      heading:"Unique Accommodations",
      desc:" Wabisabi focuses on providing distinctive stays, allowing guests to experience local culture and aesthetics.",
    },
    {
      heading:"Scenic Locations",
      desc:"Their properties are often situated in picturesque settings, offering stunning views of the mountains and valleys.",
    },
    {
      heading:"Comfort and Amenities",
      desc:"Guests can expect modern amenities while enjoying the charm of traditional architecture and design.",
    },
    {
      heading:"Wellness Experiences",
      desc:"Many accommodations offer wellness activities like yoga, spa services, or nature walks, promoting relaxation and rejuvenation.",
    },
  ]
  return (
 <>
   <div className={style.achievements}>
        <div className="container">
        <div className="row">
            <h2 className={style.main_heading}>
                    Benefits of Booking With Us
                  </h2>
                  {
                    achievements && achievements.map((el,index)=>(
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6" key={index}>
                      <div className={style.main_content}>
                        <h2 className={style.head}>{el.heading}
                       </h2>
                        <p className={style.desc}> {el.desc}</p>
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
