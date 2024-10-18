
"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import Form from "react-bootstrap/Form";
import { toastError, toastSuccess } from "@/utils/toastMessage.ts";
import { postPropertyEnquiry } from "@/service/home.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import {  FaWhatsapp } from "react-icons/fa6";


export default function ListPropertyForm() {


    const [propertyname, Setpropertyname] = useState("");
    const [propertyType, SetpropertyType] = useState("");
    const [rooms, SetRooms] = useState("");
    const [city, Setcity] = useState("");
    const [currentwebsite,SetCurrentWebsite] = useState("")
    const [googlemaps,SetGoogleMaps] = useState("")
    const [fname, SetFName] = useState("");
    const [email, SetEmail] = useState("");
    const [phone, SetPhone] = useState("");
  

  
    let router = useRouter();
  

    const handleformsubmit = async (e: any) => {
      e.preventDefault();
  
      try {
        if (propertyname == "") {
          toastError("Please Enter Your Property Name");
          return;
        }
        if (propertyType == "" || propertyType == undefined) {
          toastError("Please Select Property Type");
          return;
        }
        if (city == "") {
          toastError("Please Enter Your City");
          return;
        }

        if (rooms == "") {
          toastError("Please Enter No. of Rooms");
          return;
        }
        if (currentwebsite == "") {
          toastError("Please Enter Your Current Website");
          return;
        }
       
        if (fname == "") {
          toastError("Please Enter Your Name");
          return;
        }
        if (email == "") {
          toastError("Please Enter Your Email");
          return;
        }
        
        if (phone == "") {
          toastError("Please Enter Your Phone No.");
          return;
        }
  
        if (phone.length != 10) {
          toastError("Invalid Phone");
          return;
        }
        if (phone == "" || phone.length > 10) {
          toastError("Please Enter Your Phone No.");
          return;
        }
       
  
      
        let obj = {
        
          propertyname,
          propertyType,
          city,
          rooms,
          currentwebsite,
          googlemaps,
          fname,
          email,
          phone,
        };
        console.log("formobjkformobj", obj);
        handleSumbit(obj);
        Setpropertyname("");
        SetpropertyType("");
        Setcity("");
        SetRooms("");
        SetCurrentWebsite("");
        SetGoogleMaps("");
        SetFName("");
        SetEmail("");
        SetPhone("");
    
        router.push("/partnerwithus");
      } catch (err) {
        console.log(err);
        toastError(err);
      }
    };
  
    const handleSumbit = async (formData: any) => {
      try {
        let { data: res } = await postPropertyEnquiry(formData);
        if (res.message) {
          toastSuccess(res.message);
          router.push("/partnerwithus");
        }
      } catch (error) {
        toastError(error);
      }
    };
  

  return (
   <>
   
   <section className={style.steps}>
        <div className="container">
          <div className={`row ${style.wrapper_box}`}>
          <h2 className={style.main_headd}>
          Ready to Partner? 
              </h2>
              <p className={style.desc1}>Submit the Info Below and we’ll reach out to you </p>
        <div className="col-xl-9">
        <div className={style.form}>
           

              <div className="row">
              
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={style.label}>
                      Property Name*
                    </Form.Label>
                    <div className={style.icon}>
                      <Form.Control
                        type="text"
                        placeholder="Enter Property Name"
                        className={style.form_control}
                        value={propertyname}
                        onChange={(e: any) => Setpropertyname(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className={style.form_select}>
                    <Form.Label className={style.label}>
                      Property Type*
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e: any) => SetpropertyType(e.target.value)}
                      value={propertyType}
                    >
                      <option defaultValue="Select Property Type">
                        Select Property Type
                      </option>
                      <option value="Hotels">Hotels</option>
                      <option value="Apartments">Apartments</option>
                    </Form.Select>
                  </div>
                </div>

           



                <div className="col-lg-6 col-md-6 col-sm-6">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={style.label}>City*</Form.Label>
                    <div className={style.icon}>
                      <Form.Control
                        type="text"
                        placeholder="Enter your City"
                        className={style.form_control}
                        value={city}
                        onChange={(e: any) => Setcity(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                      <Form.Group
                        className={style.mb_4}
                        controlId="exampleForm.ControlInput1"
                      >
                            <Form.Label className={style.label}>Rooms*</Form.Label>
                        <div className={style.icon}>
                          <Form.Control
                            type="number"
                            placeholder="No. of Rooms "
                            className={style.form_control}
                            value={rooms}
                            onChange={(e: any) => SetRooms(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

             

<div className="col-lg-6 col-md-6 col-sm-6">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={style.label}>Current Website*</Form.Label>
                    <div className={style.icon}>
                      <Form.Control
                        type="text"
                        placeholder="Enter your Current Website"
                        className={style.form_control}
                        value={currentwebsite}
                        onChange={(e: any) => SetCurrentWebsite(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
<div className="col-lg-6 col-md-6 col-sm-6">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={style.label}>Google Maps Link*</Form.Label>
                    <div className={style.icon}>
                      <Form.Control
                        type="text"
                        placeholder="Enter your Google Maps Link"
                        className={style.form_control}
                        value={googlemaps}
                        onChange={(e: any) => SetGoogleMaps(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                 <Form.Group
                   className={style.mb_4}
                   controlId="exampleForm.ControlInput1"
                 >
                     <Form.Label className={style.label}>Name*</Form.Label>
                   <div className={style.icon}>
                     <Form.Control
                       type="text"
                       placeholder="Name"
                       className={style.form_control}
                       value={fname}
                       onChange={(e: any) => SetFName(e.target.value)}
                     />
                   </div>
                 </Form.Group>
               </div>
          
               <div className="col-lg-12 col-md-12 col-sm-12">
                 <Form.Group
                   className={style.mb_4}
                   controlId="exampleForm.ControlInput1"
                 >
                  <Form.Label className={style.label}>E-mail*</Form.Label>
                   <div className={style.icon}>
                     <Form.Control
                       type="text"
                       placeholder="E-mail"
                       className={style.form_control}
                       value={email}
                       onChange={(e: any) => SetEmail(e.target.value)}
                     />
                   </div>
                 </Form.Group>
               </div>
               <div className="col-lg-12 col-md-12 col-sm-12">
                 <Form.Group
                   className={style.mb_4}
                   controlId="exampleForm.ControlInput1"
                 >
                   <Form.Label className={style.label}>Phone Number*</Form.Label>
                   <div className={style.icon}>
                     <Form.Control
                       type="text"
                       placeholder="Phone No."
                       className={style.form_control}
                       value={phone}
                       onChange={(e: any) => SetPhone(e.target.value)}
                     />
                   </div>
                 </Form.Group>
               </div>

               
              </div>
            </div>
        </div>
        <div className="col-xl-3">
          <div className={style.sidebar_box}>
<h3>Need Help?</h3>
<div className={style.contact_card}>
<ul className={style.list}>
                <li className={style.item}><Link href='mailto:sales@wabisabistays.com'><FiMail  /> <span>sales@wabisabistays.com</span></Link></li>
                <li className={style.item}><Link href='http://wa.me/919667065066'><FaWhatsapp /> <span>+91-9667065066</span></Link></li>
              
              </ul>
</div>
<div className={style.cancel}>
                <h6 className={style.title}>Cancellation Policy</h6>

                <p className={style.item1}>
                  <span className={style.head}>Free cancellation</span>&nbsp;
                  upto 14 days prior to your check-in date, 100% of the booking
                  amount will be refunded as travel credits. (Not applicable on
                  peak dates. Read more details of cancellation policyhere)
                  <Link className="ps-1" href="/Cancellation">
                    Read More
                  </Link>
                </p>
              </div>
<div className={style.cancel}>
                <h6 className={style.title}>Terms and Conditions</h6>

                <p className={style.item1}> These terms and conditions outline the rules and regulations for the use of Wabi Sabi Stays's Website, located at www.wabisabistays.com .By accessing this website we assume you accept these terms and conditions.
                  <Link className="ps-1" href="/TermAndCondition">
                    Read More
                  </Link>
                </p>
              </div>
          </div>
        </div>
        <div className="row">
                  <div className="col-xl-2 col-lg-3 col-md-4 col-12 ">
                    <button
                      className={`${style.btn4} btn`}
                      onClick={handleformsubmit}
                    >
                      Submit 
                    </button>
                  </div>
                </div>
          </div>
        </div>
      </section>
   </>
  )
}
