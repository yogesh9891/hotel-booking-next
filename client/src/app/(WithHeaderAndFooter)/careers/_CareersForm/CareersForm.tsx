
"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import Form from "react-bootstrap/Form";
import { toastError, toastSuccess } from "@/utils/toastMessage.ts";
import { postPropertyEnquiry } from "@/service/home.service";
import { useRouter } from "next/navigation";
import FileUpload from "@/utils/Fileupload";


export default function CareersForm() {



  const [fname, SetFname] = useState("");
  const [city, Setcity] = useState("");
    const [departmentType, SetDepartmentType] = useState("");
    const [currentposition, SetCurrentPosition] = useState("");
    const [appliedposition, SetAppliedPosition] = useState("");
    const [email, SetEmail] = useState("");
    const [phone, SetPhone] = useState("");
    const [resumeImage, setResumeImage] = useState("");
  

  
    let router = useRouter();
  

    const handleformsubmit = async (e: any) => {
      e.preventDefault();
  
      try {

        if (fname == "") {
          toastError("Please Enter Your Name");
          return;
        }
        if (city == "") {
          toastError("Please Enter Your City");
          return;
        }
        if (departmentType == "" || departmentType == undefined) {
          toastError("Please Select any Department");
          return;
        }
       
     
       
        if (currentposition == "") {
          toastError("Please Enter Current Position");
          return;
        }
        if (appliedposition == "") {
          toastError("Please Enter Applied Position");
          return;
        }
      
        if (email == "") {
          toastError("Please Enter Your Email");
          return;
        }
        if (phone == "" || phone.length > 10) {
          toastError("Please Enter Your Phone Number");
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
  
     
        let obj = {
          fname,
          city,
          departmentType,
          currentposition,
          appliedposition,
          email,
          phone,
  
  
     
  
        };
        console.log("formobjkformobj", obj);
        handleSumbit(obj);
         SetFname("");
         Setcity("")
         SetDepartmentType("");
         SetCurrentPosition("")
         SetAppliedPosition("")
         SetEmail("")
         SetPhone("")
      
      
   
        router.push("/careers");
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
          router.push("/careers");
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
                Join The Team
              </h2>
              <p className={style.desc}>Join the WabisabiStays team to shape the future of hotels together.</p>
        <div className="col-xl-9 mx-auto">
        <div className={style.form}>
           

              <div className="row">
              
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className={style.icon}>
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
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
                   
                    <div className={style.icon}>
                      <Form.Control
                        type="text"
                        placeholder="Current City"
                        className={style.form_control}
                        value={city}
                        onChange={(e: any) => Setcity(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className={style.form_select}>
                 
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e: any) => SetDepartmentType(e.target.value)}
                      value={departmentType}
                    >
                    
                      <option defaultValue="Department">
                            Department
                          </option>
                          <option value="SeniorManagement">
                            SeniorManagement
                          </option>
                          <option value="Staff/Employee">Staff/Employee</option>
                          <option value="HumanResource">HumanResource</option>
                          <option value="Admin/Procurement">
                            Admin/Procurement
                          </option>
                    </Form.Select>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlInput1"
                  >
                   
                    <div className={style.icon}>
                      <Form.Control
                        type="text"
                        placeholder="Current Position"
                        className={style.form_control}
                        value={currentposition}
                        onChange={(e: any) => SetCurrentPosition(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlInput1"
                  >
                   
                    <div className={style.icon}>
                      <Form.Control
                        type="text"
                        placeholder="Apply For Which Position"
                        className={style.form_control}
                        value={appliedposition}
                        onChange={(e: any) => SetAppliedPosition(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
             
                    <div className="col-lg-6 col-md-6 col-sm-6">
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
                            onChange={(e: any) =>
                              SetEmail(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Form.Group
                        className={style.mb_4}
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={style.icon}>
                          <Form.Control
                            type="number"
                            placeholder="Phone No. "
                            className={style.form_control}
                            value={phone}
                            onChange={(e: any) =>
                              SetPhone(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-xl-12">
                  <Form.Group controlId="formFile" className={style.mb_4}>
                  <Form.Label className={style.label}>
                  Upload resume, up to 2MB:
                    </Form.Label>
                    <FileUpload
                      onFileChange={(val: any) => setResumeImage(val)}
                    />

                    {resumeImage && `${resumeImage}`.includes("base64") && (
                      <div className="big_image">

                        <img src={resumeImage} width="100%" height="100%" style={{borderRadius:"3px",objectFit:"cover"}}
                                  alt="no Image" />
                      </div>
                    )}
                  </Form.Group>
                </div>
              



            

             
             

               
              </div>
            </div>

            <div className="row">
                  <div className="col-xl-2 col-lg-3 col-md-4 col-12 ">
                    <button
                      className={`${style.btn4} btn`}
                      onClick={handleformsubmit}
                    >
                      Submit Enquiry
                    </button>
                  </div>
                </div>
        </div>
        {/* <div className="col-xl-3">
          <div className={style.sidebar_box}>
<h3>Need Help?</h3>
<div className={style.contact_card}>
<ul className={style.list}>
                <li className={style.item}><Link href='mail:sales@wabisabistays.com'><FiMail  /> <span>sales@wabisabistays.com</span></Link></li>
                <li className={style.item}><Link href='http://wa.me/919667065066'><FaWhatsapp /> <span>+91-9667065066</span></Link></li>
              
              </ul>
</div>

          </div>
        </div> */}
    
          </div>
        </div>
      </section>
   </>
  )
}
