'use client'

import React from 'react'
import style from "@/layout/layout.module.scss"
import Image from 'next/image'
import Link from 'next/link'
// import { Images } from '@/assets/Utility/Images'
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
// import { MdOutlinePhone } from "react-icons/md";
import { FaLocationDot, FaWhatsapp } from 'react-icons/fa6';
import { FiMail } from "react-icons/fi";
import footerlogo from '@/assets/images/footerlogo.webp'

export default function Footer() {

  return (

    <div className={`footer ${style.Footer}`} id="uparrow">
      <div className='container'>
        <div className='row' >

          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 d-flex flex-column align-items-center">
            <div className={style.content}>
              <Link href="/">
              <div className={`${style.image} ${style.footerlogo}`}>
                <Image src={footerlogo} alt='' fill priority />
              </div>
              </Link>
              <p className={style.para}>Wabi Sabi Stays celebrates Imperfection. We transform Imperfect properties to perfect vacation stays.
</p>

              <div className={style.subscribe_box}>
                <input type="text" placeholder="Enter Your Email" />
                <button className={style.signup}>Submit</button>
              </div>

            </div>
          </div>

          <div className="col-xl-3  col-lg-3 col-md-3 col-sm-6 d-flex flex-column align-items-center">
            <div className={style.footer_links_card}>
              <h5 className={style.heading}>Quick Links</h5>
              <ul className={style.footer_links_list}>
                <li>
                  <Link href="/PrivacyPolicy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/Cancellation">Refunds Policy</Link>
                </li>
                <li>
                  <Link href="/Cancellation">Cancellation</Link>
                </li>
                <li>
                  <Link href="/TermAndCondition">Terms and Conditions</Link>
                </li>
             
              </ul>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 d-flex flex-column align-items-center">
            <div className={style.footer_links_card}>
              <h5 className={style.heading}>About</h5>

              <ul className={style.footer_links_list}>
                <li><Link href="/AboutUs">About Us</Link></li>
                <li><Link href="/Blogs">Blogs</Link></li>
                <li><Link href="/Faq">FAQ’s</Link></li>
                <li><Link href="/Contact">Contact Us</Link></li>
               
              </ul>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 d-flex flex-column align-items-center">
            <div className={style.footer_contact_card}>
              <h5 className={style.heading}>Contact Us</h5>
              <ul className={style.list}>
                <li className={style.item}><Link href='mailto:sales@wabisabistays.com'><FiMail /> <span>sales@wabisabistays.com</span></Link></li>
                <li className={style.item}><Link href='http://wa.me/919667065066'><FaWhatsapp /> <span>+91-9667065066</span></Link></li>
                <li className={style.item}><Link href='https://maps.app.goo.gl/AMhDNYVbqiB7JmPJ7'><FaLocationDot /> <span> Wabi Sabi Stays Pride Inn, 
Palpitation Slope Rd, Kulri, Mussoorie, Uttarakhand 248179</span></Link></li>
              </ul>

              <ul className={style.social_links_list}>
                <li><Link href=""><FaFacebookF /></Link></li>
                <li><Link href=""><FaTwitter /></Link></li>
                <li><Link href=""><FaInstagram /></Link></li>
                <li><Link href="https://www.linkedin.com/in/shubhamsanghal/"><FaLinkedin /></Link></li>
              </ul>

            </div>
          </div>

        </div>
      </div>

      <div className="row g-0">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className={style.bottom_bar}>
            {/* Copyright © 2023, WabiSabi, Design & Developed by <a href="https://ebslon.com/" target='_blank'>Ebslon Infotech</a>  */}
            Copyright © 2023, Wabi Sabi Stays - A unit of NVS Hospitality Pvt. Ltd.
          </div>
        </div>
      </div>
    </div >


  )
}
