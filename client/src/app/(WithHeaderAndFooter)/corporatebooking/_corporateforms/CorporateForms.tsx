
"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import Form from "react-bootstrap/Form";
import { toastError, toastSuccess } from "@/utils/toastMessage.ts";
import { postContactEnquiry, postPropertyEnquiry } from "@/service/home.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import {  FaWhatsapp } from "react-icons/fa6";



export default function CorporateForms() {

const [selectedTab,SetSelectedTab] = useState("TravelPartner");

const handleSelectedTab = () =>
{
  SetSelectedTab("")
}



 
  const [fname, SetFname] = useState("");
  const [mobile, SetMobile] = useState("");
  const [email, SetEmail] = useState("");
  const [company, SetCompany] = useState("");
  const [Location, SetLocation] = useState("");
  const [message, Setmessage] = useState("");



  let router = useRouter();

  const handleformsubmit = async (e: any) => {
    e.preventDefault();

    try {

      if (fname == "") {
        toastError("Please Enter Your  Name");
        return;
      }
      if (mobile == "") {
        toastError("Please Enter Your Mobile No.");
        return;
      }

      if (mobile == "" || mobile.length > 10) {
        toastError("Please Enter Valid Mobile Number");
        return;
      }

   

      if (mobile.length !== 10) {
        toastError("Invalid Mobile No.");
        return;
      }

     
      if (email == "") {
        toastError(`Please Enter Your ${selectedTab == "TravelPartner" ? "Enter Your Email":"Enter Your Company Email"}`);
        return;
      }
      if (company == "") {
        toastError("Please Enter Your Company Name");
        return;
      }

      if (Location == "") {
        toastError(`Please Enter Your ${selectedTab == "TravelPartner" ? "Enter Your Location":"Enter Your Designation"}`);
        return;
      }
    
      if (message == "") {
        toastError(`Please Enter Your ${selectedTab == "TravelPartner" ? "Enter Your Notes":"Enter Specific Requirement"}`);
        return;
      }


    





     
      let obj = {
        fname,
       mobile,
        email,
        company,
        message,
       location:Location,
       type:selectedTab
      };
      console.log("formobjkformobj", obj);
      handleSumbit(obj);
      SetFname("");
      SetMobile("");
      SetEmail("");
      SetCompany("");
      SetLocation("");
      Setmessage("");

    
      router.push("/corporatebooking");
    } catch (err) {
      console.log(err);
      toastError(err);
    }
  };

  const handleSumbit = async (formData: any) => {
    try {
      let { data: res } = await postContactEnquiry(formData);
      if (res.message) {
        toastSuccess(res.message);
        router.push("/corporatebooking");
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
   
        <div className="col-xl-9 col-lg-8">
        <div className={style.form}>
           
     
              

               
                <div className="row">

                <ul className={` ${style.category_list}`}>
                  <li>
                    <button
                      className={`${style.category_buttn} ${selectedTab == "TravelPartner" && style.active}`}
                     onClick={()=>SetSelectedTab("TravelPartner")}
                    >
                      Travel Partner
                    </button>
                  </li>
                  <li>
                    <button
                className={`${style.category_buttn} ${selectedTab == "CorporateTieUp" && style.active}`}
                      onClick={()=>SetSelectedTab("CorporateTieUp")}
                      
                    >
                    Corporate Tie Up
                    </button>
                  </li>
                
                </ul>

              
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <Form.Group
                      className={style.mb_4}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={style.label}>Name*</Form.Label>
                      <div className={style.icon}>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          className={style.form_control}
                          value={fname}
                          onChange={(e: any) => SetFname(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <Form.Group
                      className={style.mb_4}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={style.label}>Mobile*</Form.Label>
                      <div className={style.icon}>
                        <Form.Control
                          type="number"
                         
                          placeholder="Enter Your Mobile No."
                          className={style.form_control}
                          value={mobile}
                          onChange={(e: any) => SetMobile(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <Form.Group
                      className={style.mb_4}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={style.label}>{selectedTab == "TravelPartner" ? "Email*" : "Company Email*"}</Form.Label>
                      <div className={style.icon}>
                        <Form.Control
                          type="text"
                          placeholder={`${selectedTab == "TravelPartner" ? "Enter Your Email":"Enter Company Email"}`}
                          className={style.form_control}
                          value={email}
                          onChange={(e: any) => SetEmail(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <Form.Group
                      className={style.mb_4}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={style.label}>Company Name*</Form.Label>
                      <div className={style.icon}>
                        <Form.Control
                          type="text"
                          placeholder="Enter Your Company Name"
                          className={style.form_control}
                          value={company}
                          onChange={(e: any) => SetCompany(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>

                  
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={style.label}>{selectedTab == "TravelPartner" ?  "Location*":"Designation*"}</Form.Label>
                    <div className={style.icon}>
                      <Form.Control
                        type="text"
                        placeholder={`${selectedTab == "TravelPartner" ? "Enter Your Location":"Enter Your Designation"}`}
                        className={style.form_control}
                        value={Location}
                        onChange={(e: any) => SetLocation(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className={style.label}>
                    {selectedTab == "TravelPartner" ? "Notes*":"Specific Requirement*"}
                    </Form.Label>
                    <div className={style.icon}>
                      <Form.Control
                        as="textarea"
                        placeholder={`${selectedTab == "TravelPartner" ? "Enter Your Message":"Enter Specific Requirement"}`}
                        rows={4}
                        className={style.form_control}
                        value={message}
                        onChange={(e: any) => Setmessage(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>

                </div>
              

            
              

         

                
        <p>
        <button
                      className={`${style.btn4} btn`}
                      onClick={handleformsubmit}
                    >
                      Submit
                    </button>
        </p>
            
            </div>
        </div>
        <div className="col-xl-3 col-lg-4">
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
    
          </div>
        </div>
      </section>
   </>
  )
}
