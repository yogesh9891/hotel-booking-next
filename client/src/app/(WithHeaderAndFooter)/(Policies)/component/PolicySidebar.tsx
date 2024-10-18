'use client'

import React from 'react'
import style from '@/app/(WithHeaderAndFooter)/(Policies)/component/PolicySidebar.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function PolicySidebar() {

    const currentRoute = usePathname();

    return (

        <ul className={style.sidebar}>
            <li className={`${style.items} ${`${currentRoute}` === "/Cancellation" ? `${style.active}` : ""}`} >
                <Link href='/Cancellation' className={style.text}>Refund And Cancellation Policy</Link>
            </li>
            <li className={`${style.items} ${`${currentRoute}` === "/TermAndCondition" ? `${style.active}` : ""}`} >
                <Link href='/TermAndCondition' className={style.text}>Terms and conditions</Link>
            </li>
            <li className={`${style.items} ${`${currentRoute}` === "/PrivacyPolicy" ? `${style.active}` : ""}`} >
                <Link href='/PrivacyPolicy' className={style.text}>Privacy Policy</Link>
            </li>
            <li className={`${style.items} ${`${currentRoute}` === "/ChildrenPrivacy" ? `${style.active}` : ""}`} >
                <Link href='/ChildrenPrivacy' className={style.text}>Children Privacy</Link>
            </li>
        </ul>
    )
}
