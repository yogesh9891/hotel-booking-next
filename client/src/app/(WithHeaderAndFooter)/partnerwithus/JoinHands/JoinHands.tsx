import React from 'react'
import style from './style.module.scss'

export default function JoinHands() {

  

    
    const joinArr = [

        {
            heading:"Owner First",
            desc:"We believe in supporting the Owners and we work with you to find the best solution for your Property",
        },
        {
            heading:"Expenditure Plan",
            desc:"Unlike many global brands, we help you plan your renovations over time. No Initial setup pressure.",
        },
        {
            heading:"Transparency",
            desc:"Our Industry is full of Complexities and we are happy to simplify the business for you. ",
        },
        {
            heading:"Maximise Your Returns",
            desc:"We help you maximise your current returns with a Systems Approach. No Unrealistic numbers.",
        },
        {
            heading:"Various Partnership Models",
            desc:"One size does not fit all and we work with you to find the best model for your business.",
        },
        {
            heading:"Top Returns",
            desc:" We consistently drive the highest occupancies & rates, boasting industry-leading repeat rates, at all our hotels.",
        },
        ]

  return (
    <>
    <section className={style.join_hands}>
        <div className="container">
            <div className="row">
                <h2 className={style.main_heading}>
                List your Property with Us!
                </h2>

                
            </div>
            <div className="row">
                {
                    joinArr && joinArr.map((el,index)=>(
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6" key={index}>
                        <div className={style.card}>
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
