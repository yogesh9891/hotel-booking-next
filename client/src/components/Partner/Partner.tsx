
import React from 'react'
import style from '@/components/Partner/Partner.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import partner from '@/assets/images/partner.webp'
import list_property2 from '@/assets/images/list_property2.webp'
import list_property3 from '@/assets/images/list_property3.webp'
import list_property4 from '@/assets/images/list_property4.webp'

export default function () {

    return (

        <div className={style.partner_sec}>
            <div className={style.overlay}></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-7 col-sm-7">
                        <div className={style.content}>
                            <h6 className={style.heading}>Partner as a Homeowner</h6>
                            <p className={style.para}>If you own a beautiful, one of a kind home that you feel exudes exclusivity and fits the Wabi Sabi style and vibe, register here to list with us!</p>
                        </div>
                    </div>
                </div>


                <div className={style.box}>
                    <div className={style.main_content}>
                        <div className={style.image}>
                            <Image src={list_property2} alt='' fill />
                        </div>
                        <h6 className={style.title}> Full Disclosure</h6>
                        <p className={style.head}>The Wabi Sabi lets you view bookings and revenue in real time.</p>
                    </div>

                    <div className={style.main_content}>
                        <div className={style.image}>
                            <Image src={list_property3} alt='' fill />
                        </div>
                        <h6 className={style.title}>Seamless Disbursements</h6>
                        <p className={style.head}>The Wabi Sabi lets you view bookings and revenue in real time.</p>
                    </div>

                    <div className={style.main_content}>
                        <div className={style.image}>
                            <Image src={list_property4} alt='' fill />
                        </div>
                        <h6 className={style.title}> Proficient Administration</h6>
                        <p className={style.head}>The Wabi Sabi lets you view bookings and revenue in real time.</p>
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className={style.button}>
                            <Link href='/Contact' className={`${style.btn1} btn`}>Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
