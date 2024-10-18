'use client'

import React, {useEffect, useState} from 'react'
import style from '@/app/(WithHeaderAndFooter)/(MyAccountPages)/component/Sidebar.module.scss'
import Link from 'next/link'
import { FaUser } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';
import { Button, Col, Container, Modal, Nav, Row } from 'react-bootstrap'
import { LuLogOut } from 'react-icons/lu';
import { signOut, useSession } from 'next-auth/react';

export default function Sidebar() {

    const currentRoute = usePathname();
    
  const { data: session } = useSession();
    const router = useRouter()
    const [show, setShow] = useState(false);
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
    //  console.log(currentRoute , "currentRoutecurrentRoutecurrentRoute")
    }, [currentRoute])
    
    const [name, setName] = useState("");   


    useEffect(()=>{
        if(session && session?.user && session?.user?.name){
            let namArr:string[] =session?.user.name.split(" ")
            // console.log(namArr,"namArrnamArrnamArr")
            let nam  = namArr[0].charAt(0) ;
            if(namArr?.length > 1){
                nam += namArr[1].charAt(0) ;
            } else {
                nam += namArr[0].charAt(namArr[0].length-1) ;
            }
            setName(nam)
        } else {
            router.push('/')
       
        }
    },[session])

    return (

        <>
            <div className={`${style.tab_bar}`}>
                <div className={style.top_sec}>
                    <div className={style.circle}>
                      {name.toLocaleUpperCase()}
                    </div>
                    <h6 className={style.name}>Hi {session?.user?.name}</h6>
                </div>

                <ul className={style.navs} >
                    <li className={`${style.items} ${`${currentRoute}` === "/MyAccount" ? `${style.active}` : ""}`}>
                        <Link href='/MyAccount' className={style.text}> <FaUser /> My Account</Link>
                    </li>
                    <li className={`${style.items} ${`${currentRoute}` === "/MyBooking" || `${currentRoute}` ==='/MyBookingDetails' ? `${style.active}` : ""}`}>
                        <Link href='/MyBooking' className={style.text}><FaBuilding /> My Booking</Link>
                    </li>
                    <li className={`${style.items} ${`${currentRoute}` === "/AboutUs" ? `${style.active}` : ""}`}>
                        <Link href='/AboutUs' className={style.text}><MdInfo /> About Us</Link>
                    </li>
                    <li className={style.items} onClick={handleShow}>
                        <Link href='#' className={style.text} > <IoLogOut /> Logout</Link>
                    </li>
                </ul>

            </div>



            {/* Logout Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${style.logout_modal} modal1`}
                
            >

                <Modal.Body className={style.logout_body}>
                    <div className={style.icon}>
                        <LuLogOut />
                    </div>
                    <p className={style.para}>Are you sure you want to logout?</p>
                </Modal.Body>
                <Modal.Footer className={style.logout_footer}>
                    
                        <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                        <Button className={`${style.cancel} btn`} onClick={handleClose}>
                        Cancel
                    </Button>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                        <Button className={`${style.logout} btn`}  onClick={()=>signOut()}  type="button">Logout</Button>
                        </div>
                
                   
                </Modal.Footer>
            </Modal>

        </>
    )
}
