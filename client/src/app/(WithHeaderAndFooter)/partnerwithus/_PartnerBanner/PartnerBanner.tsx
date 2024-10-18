
"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import Form from "react-bootstrap/Form";
import { toastError, toastSuccess } from "@/utils/toastMessage.ts";
import { postContactEnquiry, postPropertyEnquiry } from "@/service/home.service";
import { useRouter } from "next/navigation";

export default function PartnerBanner() {

  const [fullname, SetFullName] = useState("");
  const [email, SetEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [website, SetWebsite] = useState("");
    const [message, SetMessage] = useState("");
    // const [companyname, SetCompanyName] = useState("");
  
  
  
    let router = useRouter();
  
    const handlebannerform = async (e: any) => {
      e.preventDefault();
  
      try {
  
        if (fullname == "") {
          toastError("Please Enter Your Full Name");
          return;
        }
  
       
  
        if (email == "") {
          toastError("Please Enter Your Email");
          return;
        }
        if (phone == "") {
          toastError("Please Enter Your Phone");
          return;
        }
  
        if (phone.length != 10) {
          toastError("Invalid Phone");
          return;
        }
  
        if (phone == "" || phone.length > 10) {
          toastError("Please Enter Your Phone Number");
          return;
        }

        if (website == "") {
          toastError("Please Enter Your Website Name");
          return;
        }
       
        if (message == "") {
          toastError("Please Enter Your Message");
          return;
        }
       
  
     
      
        let obj = {
          fullname,
          email,
          phone,
          website,
          message,
        };
        console.log("formobjkformobj", obj);
        handleSumbit(obj);
         SetFullName("");
         SetEmail("");
         SetPhone("");
         SetWebsite("");
        //  SetCompanyName("");
        SetMessage("");
        router.push("/partnerwithus");
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
          router.push("/partnerwithus");
        }
      } catch (error) {
        toastError(error);
      }
    };
  return (
    <>
       <section className={style.partner_withus_sec}>
        <div className="container">
          <div className={`row ${style.j_c_sb}`}>
            <div className="col-xl-5 col-lg-5 col-md-5">
            <div className={style.heading_box}>
            <h2 className={style.main_heading}>
            Enhance the Success of Your Holiday Home with WabiSabi Stays : A Trusted Partnership
            </h2>
            </div>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-7">
          <div className={style.banner_form}>
          <div className={style.form}>

          <div className="row">

          <h5 className={`${style.form_heading} `}>Partner with us!</h5>
          <p className={style.desc}>We are open to new Opportunities. Drop your details if you would like to Partner as Service Provider, Vendor, or just want to chit-chat. 
          </p>
               <div className="col-lg-12 col-md-12 col-sm-12">
                 <Form.Group
                   className={style.mb_4}
                   controlId="exampleForm.ControlInput1"
                 >
                   
                   <div className={style.icon}>
                     <Form.Control
                       type="text"
                       placeholder="Name"
                       className={style.form_control}
                       value={fullname}
                       onChange={(e: any) => SetFullName(e.target.value)}
                     />
                   </div>
                 </Form.Group>
               </div>
          
               <div className="col-lg-12 col-md-12 col-sm-12">
                 <Form.Group
                   className={style.mb_4}
                   controlId="exampleForm.ControlInput1"
                 >
                
                   <div className={style.icon}>
                     <Form.Control
                       type="text"
                       placeholder="Email"
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
                 
                   <div className={style.icon}>
                     <Form.Control
                       type="number"
                       placeholder="Phone No."
                       className={style.form_control}
                       value={phone}
                       onChange={(e: any) => SetPhone(e.target.value)}
                     />
                   </div>
                 </Form.Group>
               </div>

               <div className="col-lg-12 col-md-12 col-sm-12">
                 <Form.Group
                   className={style.mb_4}
                   controlId="exampleForm.ControlInput1"
                 >
                
                   <div className={style.icon}>
                     <Form.Control
                       type="text"
                       placeholder="Website"
                       className={style.form_control}
                       value={website}
                       onChange={(e: any) => SetWebsite(e.target.value)}
                     />
                   </div>
                 </Form.Group>
               </div>
           
             </div>
           

           <div className="row">

             <div className="col-lg-12 col-md-12 col-sm-12">
               <Form.Group
                 className={style.mb_4}
                 controlId="exampleForm.ControlTextarea1"
               >
                
                 <div className={style.icon}>
                   <Form.Control
                     as="textarea"
                     placeholder="What do you have in Mind"
                     rows={4}
                     className={style.form_control}
                     value={message}
                     onChange={(e: any) => SetMessage(e.target.value)}
                   />
                 </div>
               </Form.Group>
             </div>
          
       
           </div>

           <div className="row justify-content-center">
                  <div className="col-12 d-flex flex-row justify-content-center">
                    <button
                      className={`${style.btn4} btn`}
                      onClick={handlebannerform}
                    >
                      Send a request
                    </button>
                  </div>
                </div>
         </div>
          </div>
            </div>
        
          </div>
        </div>
      </section>
    </>
  )
}
