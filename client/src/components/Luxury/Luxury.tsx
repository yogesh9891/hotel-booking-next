'use client'

import React, { useState } from 'react'
import style from '@/components/Luxury/Luxury.module.scss'
import Image from 'next/image'
import Link from 'next/link';
import { IoArrowForwardOutline } from "react-icons/io5";
import partner from '@/assets/images/luxury/partner.webp'
import hiring from '@/assets/images/luxury/hiring.webp'
import booking from '@/assets/images/luxury/booking.webp'
import touch from '@/assets/images/luxury/getintouch.webp'



export default function Luxury() {

    const [activeItem, setActiveItem] = useState(0);

    const [tabArr, setTabArr] = useState([
        {
            tab: 'Partner With Us',
            content: 'zgdhasgsdhagshsdd',
        },
        {
            tab: 'Corporate Booking',
            content: 'ssssss',
        },
        {
            tab: 'Get In Touch',
            content: 'aaaaaaa',
        },
        {
            tab: 'Hiring',
            content: 'fffffff',
        },
    ])


    const handleClick = (index: any) => {
        setActiveItem(index);
    };


    return (

       

        <div className={style.luxury_sec}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                        <h2 className={style.head}>Pioneers in <span>Boutique Luxury</span></h2>
                        <p className={style.para}>Explore top destinations for unforgettable experiences</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                        <div className={style.card}>
                            <div className={style.image}>
                                <Image src={partner} alt='' fill />
                            </div>
                            <div className={style.content}>
                                <h6 className={style.heading}>Partner With Us</h6>
                                <p className={style.desc}>Explore synergies with us, we love to hear what you have in mind.</p>
                                <Link href='/partnerwithus' className={style.button}>Read More <IoArrowForwardOutline /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                        <div className={style.card}>
                            <div className={style.image}>
                                <Image src={booking} alt='' fill />
                            </div>
                            <div className={style.content}>
                                <h6 className={style.heading}>Coporate Booking</h6>
                                <p className={style.desc}>Get special Corporate rates for large groups. </p>
                                <Link href='/corporatebooking' className={style.button}>Read More <IoArrowForwardOutline /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                        <div className={style.card}>
                            <div className={style.image}>
                                <Image src={hiring} alt='' fill />
                            </div>
                            <div className={style.content}>
                                <h6 className={style.heading}>Hiring</h6>
                                <p className={style.desc}> Unlock Learning and growth and join the Wabi Sabi Culture. </p>
                                <Link href='/careers' className={style.button}>Read More <IoArrowForwardOutline /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                        <div className={style.card}>
                            <div className={style.image}>
                                <Image src={touch} alt='' fill />
                            </div>
                            <div className={style.content}>
                                <h6 className={style.heading}>Get In Touch</h6>
                                <p className={style.desc}>Have something in Mind? Feel free to hit us up. </p>
                                <Link href='/Contact' className={style.button}>Read More <IoArrowForwardOutline /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
