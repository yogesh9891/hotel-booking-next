'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from '@/layout/layout.module.scss'
// import { Images } from '@/assets/Utility/Images'
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaAngleDown, FaUserLarge, FaWhatsapp } from "react-icons/fa6";
import { useParams, usePathname, useRouter } from 'next/navigation'
import { FaUser } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
// import { MdInfo } from "react-icons/md";
import { IoLogOut, IoSearchOutline } from "react-icons/io5";
import { Modal, Row } from 'react-bootstrap'
import { LuLogOut } from 'react-icons/lu';
import Login from '@/components/Login/Login'
import { signOut, useSession } from 'next-auth/react';
// import Banner from '@/components/Banner/Banner'
import SearchInput from '@/components/SearchInput/SearchInput'
// import { PiPhoneCall } from "react-icons/pi";
import blacklogo from '@/assets/images/blacklogo/logo.webp'
import footerlogo from '@/assets/images/blacklogo/footerlogo.webp'
// import TopOffCanvas from '@/components/TopOffCanvas/TopOffCanvas'
import { CgMenuRight } from "react-icons/cg";


export default function Header({ params }: { params: { slug: string } }) {

    let { data: session } = useSession();

    let slug = params
         // State to manage the offcanvas visibility
         const [showOffcanvas, setShowOffcanvas] = useState(false);

         // Toggle offcanvas visibility
         const handleShowOffcanvas = () => setShowOffcanvas(true);
         const handleCloseOffcanvas = () => setShowOffcanvas(false);

    const router = useRouter()

    const currentRoute = usePathname();

    const [toggle, setToggle] = useState(false);

    const [toggleoffcanvas,SetToggleOffcanvas] = useState(false)

    const handletoggleoffcanvas = () => {
        SetToggleOffcanvas(!toggleoffcanvas)
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");

    const [show1, setShow1] = useState(false);

    const handleShow1 = () =>
    {
       
        setShow1(true)
        setShowOffcanvas(false)
    
    }

    useEffect(() => {
        if (session && session?.user && session?.user?.name) {
            let namArr: string[] = session?.user.name.split(" ")
            console.log(namArr, "namArrnamArrnamArr")
            let nam = namArr[0].charAt(0);
            if (namArr?.length > 1) {
                nam += namArr[1].charAt(0);
            } else {
                nam += namArr[0].charAt(namArr[0].length - 1);
            }
            setName(nam)
        }
    }, [session])


    const handleScroll = () => {
        let header: any = document.getElementById("myheader");
        // Get the offset position of the navbar
        var sticky = header.offsetTop;

        if (window.pageYOffset > sticky) {
            if (currentRoute == '/' || currentRoute == "/Hotels/"  || currentRoute == "/Apartments" ) {
                header.classList.add("header");
            }

        } else {
            header.classList.remove("header");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

          // handle top offcanvas
        //   const [showtop, setShowTop] = useState(false);
        //   const handleClosetop = () => setShowTop(false);
        //   const handleShowtop = () => setShowTop(true);




    return (

        <>
           {/* <div className={style.sticky_top}> */}
           <Navbar expand='xl' className={`${currentRoute === "/" ? `${style.header}` : `${style.other_header}`}  `} id='myheader'>
                <div className='container'>
                    <Navbar.Brand href="/" className={style.logo}>
                       

                        <Image src={footerlogo} alt='' fill  />
                    
                        </Navbar.Brand>


                    <div className={style.dflexmobile}>
                        <div className='d-lg-none'>
                            {
                                session && session?.user ? (
                                    <div className={style.profile} onClick={() => setToggle(!toggle)}>
                                        <div className={style.mobileuserlogin}>
                                            <div className={`${style.image}  ${style.usericonmobile}`}>
                                                <FaUserLarge />
                                            </div>
                                            <h6 className={`d-none d-lg-block ${style.name}`}>{name}  <span> <FaAngleDown /> </span> </h6>
                                        </div>

                                        {
                                            toggle ?
                                                <div className={`${style.dropdown} ${style.mobiledropdown}`}>
                                                    <ul className={style.navs} >
                                                        <li className={style.items} >
                                                            <a href='/MyAccount' className={style.text}> <FaUser /> My Account</a>
                                                        </li>
                                                        <li className={style.items}>
                                                            <a href='/MyBooking' className={style.text}><FaBuilding /> My Booking</a>
                                                        </li>
                                                        <li className={style.items}>
                                                            <button type='button' onClick={handleShow} className={style.text}><IoLogOut />  Logout</button>
                                                        </li>
                                                    </ul>

                                                    {/* <button className={`${style.btn7} btn`} onClick={handleShow}><IoLogOut /> Logout</button> */}

                                                </div>
                                                : ''
                                        }
                                    </div>) : ''
                            }
                        </div>
                        <button type='button' onClick={handleShowOffcanvas} className={style.offcanvas_open}> <CgMenuRight /></button>

                        {/* <Navbar.Toggle aria-controls='offcanvasNavbar-expand' /> */}
                        <Navbar.Offcanvas
                            id='offcanvasNavbar-expand'
                            aria-labelledby='offcanvasNavbarLabel-expand'
                           
                            show={showOffcanvas}  // Control visibility with state
          onHide={handleCloseOffcanvas}  // Close offcanvas
                            className={style.main}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id='offcanvasNavbarLabel-expand' className='headingmain'>
                                    
                                <Link href="/" className={style.black_logo}>
                       

                       <Image src={blacklogo} alt='' fill  />
                   
                       </Link>

                    
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className={`${style.body} d-flex `}>
                               <div className="desktp_view">
                               {
                                    currentRoute == '/Hotels' || currentRoute == '/Apartments' || currentRoute.includes("/Property/")  || currentRoute.includes("/PropertyDetail/") || currentRoute == "/location/mussoorie" || currentRoute == "/location/dehradun"  || currentRoute == "location/rishikesh" || currentRoute == "/collection"
                                        ?
                                       
                                         '':  <SearchInput  />
                                }

                               </div>



                                <Nav className={`${style.nav} justify-content-center `}>

                               
                                {/* <div className="mob_view11">
                                    {
                                        showtop == false &&
<div className={style.search_input_buttn} >
                                            <input onClick={handleShowtop} type="text" placeholder='Search for Hotels, Apartments, facilities...' />
                                           <button className={style.search_buttn} >
                                             <IoSearchOutline /></button>
                                        </div>
                                       
                                    }
                                    </div> */}
                                    
                                {/* {
                                    currentRoute == "/" ? */}
                                    <Nav.Link href="/AboutUs" className={`${style.link} link`}>About Us</Nav.Link> 
                                    {/* :
                                    ""
                                    
                                } */}
                                    
                                    <Nav.Link href="/Hotels" className={`${style.link} link`}>Hotels</Nav.Link>
                                    <Nav.Link href="/Apartments" className={`${style.link} link`}>Apartments</Nav.Link>
                                    <Nav.Link href="/ListYourProperty" className={`${style.link} link`}>List Your Property</Nav.Link>
                                </Nav>

                                <div className={`${style.buttons} `}>
                                    {/* BRFORE SIGN IN */}

                                    {
                                        session && session?.user ? (
                                            <div className='d-none d-lg-block '>
                                            <div className={`${style.profile}`} onClick={() => setToggle(!toggle)}>

                                                <div className={style.image}>
                                                    <FaUserLarge />
                                                </div>
                                                <h6 className={style.name}>{name} <span> <FaAngleDown /> </span> </h6>


                                                {
                                                    toggle ?
                                                        <div className={style.dropdown}>
                                                            <div className={style.top_sec}>
                                                                <div className={style.circle}>
                                                                    {name}
                                                                </div>
                                                                <h6 className={style.title}>{session?.user?.name}</h6>
                                                            </div>

                                                            <ul className={style.navs} >
                                                                <li className={style.items} >
                                                                    <a href='/MyAccount' className={style.text}> <FaUser /> My Account</a>
                                                                </li>
                                                                <li className={style.items}>
                                                                    <a href='/MyBooking' className={style.text}><FaBuilding /> My Booking</a>
                                                                </li>
                                                            
                                                            </ul>

                                                            <button className={`${style.btn7}  btn`} onClick={handleShow}><IoLogOut /> Logout</button>

                                                        </div>
                                                        : ''
                                                }
                                            </div>
                                            </div>
                                            )   
                                             : 
                                             (
                                             
                                             <button type='button' className={`${style.btn2} btn btn1`} onClick={handleShow1}>
                                                Sign Up / Login
                                            </button>
                                            
                                        )
                                    }



                                    <div className={style.number}>
                                    <FaWhatsapp />
                                        <Link href='http://wa.me/919667065066' className={style.mobile} target='_blank'>+91-9667065066</Link>
                                        
                                    </div>
                                </div>







                            </Offcanvas.Body>

                        </Navbar.Offcanvas>
                    </div>


                </div>
            </Navbar>

           {/* </div> */}


            {/* Logout Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
               
                keyboard={false}
                className={`${style.logout_modal} modal1`}
            >

                <Modal.Body className={style.logout_body}>
                    <div className={style.icon1}>
                        <LuLogOut />
                    </div>
                    <p className={style.para}>Are you sure you want to logout?</p>
                </Modal.Body>
                <Modal.Footer className={style.logout_footer}>
                    <div className="col-xl-6">
                    <Button className={`${style.cancel} btn`} onClick={handleClose}>
                        Cancel
                    </Button>
                    </div>
                    <div className="col-xl-6">
                    <Button className={`${style.logout} btn`} onClick={() => signOut()}>Logout</Button>
                    </div>
                
                  
                </Modal.Footer>
            </Modal>

            <Login loginShow={show1} loginChange={setShow1} />
            {/* <TopOffCanvas showtop={showtop} handleClosetop={handleClosetop}/> */}

            
        </>
    )
}
