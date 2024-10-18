'use client'

import React, { useState } from 'react'
import style from './PartnerFaq.module.scss'
// import faq from '@/assets/images/faq.webp'
// import Image from 'next/image'
// import Link from 'next/link'

export default function PartnerFaq() {

    const [faqArr, setFaqArr] = useState([
        {
            heading: 'What are the steps to partner with WabiSabi ?',
            para: 'Making a reservation on our website is easy! Simply go to the "Book Now" or "Reservations" section, choose your check-in and check-out dates, select the type of room you prefer, and follow the on-screen instructions to complete your booking. If you have any issues or need assistance, feel free to contact our customer support team for help.',
        },
        {
            heading: 'What types of rooms are available, and what are the amenities they offer?',
            para: 'This website is designed to provide users with a multifaceted experience, allowing them to read books, write their own content, and engage in code practice with real-time code output',
        },
        {
            heading: 'Can I modify or cancel my reservation, and what is the cancellation policy?',
            para: 'This website is designed to provide users with a multifaceted experience, allowing them to read books, write their own content, and engage in code practice with real-time code output',
        },
        {
            heading: 'Are there any special promotions or discounts available for booking through your site?',
            para: 'This website is designed to provide users with a multifaceted experience, allowing them to read books, write their own content, and engage in code practice with real-time code output',
        },
        {
            heading: 'What payment methods do you accept for reservations?',
            para: 'This website is designed to provide users with a multifaceted experience, allowing them to read books, write their own content, and engage in code practice with real-time code output',
        },
        {
            heading: 'Is my credit card information secure when booking through your website?',
            para: 'This website is designed to provide users with a multifaceted experience, allowing them to read books, write their own content, and engage in code practice with real-time code output',
        },
        {
            heading: 'Do you offer any loyalty programs or rewards for frequent guests?',
            para: 'This website is designed to provide users with a multifaceted experience, allowing them to read books, write their own content, and engage in code practice with real-time code output',
        },
        {
            heading: 'What is the check-in and check-out time at your hotel?',
            para: 'This website is designed to provide users with a multifaceted experience, allowing them to read books, write their own content, and engage in code practice with real-time code output',
        },
    ])

 

    const [activeIndex, setActiveIndex] = useState(0);
    const handleActive = (index:any) => {
        setActiveIndex(index);
    };

    return (

        <div className={style.faq_sec}>
            <div className="container">
               
                <h6 className={style.faq_head}>
                FAQ's</h6>
          
                <div className="row ">
                  

                    <div className="col-lg-12">
                    
                        <div className={`${style.faq} accordion`} id='accordionExample'>
                            {
                                faqArr && faqArr?.length && faqArr?.map((el, index) => (
                                    <div className={`${style.accd_item} accordion-item`} key={index} >
                                        <h2 className={`${style.accd_header} accordion-header`} id={`headingOne${index}`}>
                                            <button className={`${style.accd_button} accordion-button ${index == 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${index}`} aria-expanded="true" aria-controls={`collapseOne${index}`}>
                                                {el?.heading}
                                            </button>
                                        </h2>
                                        <div id={`collapseOne${index}`} className={`${style.collapse} accordion-collapse collapse ${index == 0 ? 'show' : 'collapse'}`} aria-labelledby={`headingOne${index}`} data-bs-parent='#accordionExample'>
                                            <div className={`${style.accd_body} accordion-body`}>
                                                {el?.para}
                                            </div>
                                        </div>
                                    </div>
                                ))

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
