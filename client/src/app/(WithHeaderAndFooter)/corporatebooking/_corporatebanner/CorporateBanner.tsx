
import React from "react";
import style from "../style.module.scss";
// import Form from "react-bootstrap/Form";
// import { toastError, toastSuccess } from "@/utils/toastMessage.ts";
// import { postPropertyEnquiry } from "@/service/home.service";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { statesArr } from "@/utils/statesarr/StatesArr";
export default function CorporateBanner() {

    // const [propertyname, Setpropertyname] = useState("");
    // const [propertyType, SetpropertyType] = useState("");
    // const [description, Setdescription] = useState("");
  
    // const [state, Setstate] = useState("");
    // const [fullname, SetFullName] = useState("");
    // const [companyname, SetCompanyName] = useState("");
    // const [companyphone, SetCompanyPhone] = useState("");
    // const [companyemail, SetCompanyEmail] = useState("");
    // const [departmentType, SetDepartmentType] = useState("");
    // const [people, SetPeople] = useState("");
  
   
  
    // let router = useRouter();
  
    // const handlebannerform = async (e: any) => {
    //   e.preventDefault();
  
    //   try {
    //     if (fullname == "") {
    //       toastError("Please Enter Your Full Name");
    //       return;
    //     }
    //     if (companyname == "") {
    //       toastError("Please Enter Company Name");
    //       return;
    //     }
  
    //     if (companyphone == "") {
    //       toastError("Please Enter Your Phone");
    //       return;
    //     }
  
    //     if (companyphone.length != 10) {
    //       toastError("Invalid Phone");
    //       return;
    //     }
  
    //     if (companyphone == "" || companyphone.length > 10) {
    //       toastError("Please Enter Your Phone Number");
    //       return;
    //     }
  
    //     if (companyemail == "") {
    //       toastError("Please Enter Your Email");
    //       return;
    //     }
  
    //     if (departmentType == "" || departmentType == undefined) {
    //       toastError("Please Select any Department");
    //       return;
    //     }
    //     if (people == "") {
    //       toastError("Please Enter No. of People");
    //       return;
    //     }
  
    //     let obj = {
    //       fullname,
    //       companyname,
    //       companyphone,
    //       companyemail,
    //       departmentType,
    //       people,
    //     };
    //     console.log("formobjkformobj", obj);
    //     handleSumbit(obj);
    //     SetFullName("");
    //     SetCompanyName("");
    //     SetCompanyPhone("");
    //     SetCompanyEmail("");
    //     SetDepartmentType("");
    //     SetPeople("");
  
    //     router.push("/partnerwithus");
    //   } catch (err) {
    //     console.log(err);
    //     toastError(err);
    //   }
    // };
  
    // const handleSumbit = async (formData: any) => {
    //   try {
    //     let { data: res } = await postPropertyEnquiry(formData);
    //     if (res.message) {
    //       toastSuccess(res.message);
    //       router.push("/ListYourProperty");
    //     }
    //   } catch (error) {
    //     toastError(error);
    //   }
    // };

  return (
   <>
         <section className={style.partner_withus_sec}>
        <div className="container">
          <div className={`row ${style.j_c_sb}`}>
            <div className="col-xl-5">
              <div className={style.heading_box}>
                <h2 className={style.main_heading}>
                Register your Interest with us as a Travel Partner or Corporates 
                </h2>
              </div>
            </div>
            {/* <div className="col-xl-5">
              <div className={style.banner_form}>
                <div className={style.form}>
                  <div className="row">
                    <h5 className={`${style.form_heading}`}>Get in Touch</h5>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Form.Group
                        className={style.mb_4}
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={style.icon}>
                          <Form.Control
                            type="text"
                            placeholder=" Name"
                            className={style.form_control}
                            value={fullname}
                            onChange={(e: any) => SetFullName(e.target.value)}
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
                            placeholder="Company Name"
                            className={style.form_control}
                            value={companyname}
                            onChange={(e: any) =>
                              SetCompanyName(e.target.value)
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
                            type="text"
                            placeholder=" Phone "
                            className={style.form_control}
                            value={companyphone}
                            onChange={(e: any) =>
                              SetCompanyPhone(e.target.value)
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
                            type="text"
                            placeholder="Company Email"
                            className={style.form_control}
                            value={companyemail}
                            onChange={(e: any) =>
                              SetCompanyEmail(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className={style.form_select}>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e: any) =>
                            SetDepartmentType(e.target.value)
                          }
                          value={departmentType}
                        >
                          <option defaultValue="Select Department">
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
                            type="number"
                            placeholder="No. of People "
                            className={style.form_control}
                            value={people}
                            onChange={(e: any) => SetPeople(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Form.Group
                        className={style.mb_4}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={style.label}>
                          Your Plan *
                        </Form.Label>
                        <div className={style.radio_icn}>
                          <Form.Check
                            type="radio"
                            id="OvernightStay"
                            placeholder="Overnight Stay "
                            className={style.form_check}
                            //  value={OvernightStay}
                            onChange={(e: any) => SetPeople(e.target.value)}
                          />
                          <Form.Label
                            className={style.label}
                            htmlFor="OvernightStay"
                          >
                            Overnight Stay
                          </Form.Label>
                        </div>
                        <div className={style.radio_icn}>
                          <Form.Check
                            type="radio"
                            id="dayevent"
                            placeholder="dayevent "
                            className={style.form_check}
                            //  value={OvernightStay}
                            onChange={(e: any) => SetPeople(e.target.value)}
                          />
                          <Form.Label
                            className={style.label}
                            htmlFor="dayevent"
                          >
                            Day Event
                          </Form.Label>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className={style.form_select}>
                        <Form.Select
                          aria-label="Default select example"
                          value={state}
                          onChange={(e: any) => Setstate(e.target.value)}
                        >
                          <option defaultValue="Please Select State">
                            Location
                          </option>
                          {statesArr.map(
                            (
                              state: { label: string; value: string },
                              index: number
                            ) => (
                              <option key={index} value={state.label}>
                                {state.label}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Form.Group
                        className={style.mb_4}
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={style.icon}>
                          <input
                            type="date"
                            placeholder="No. of People "
                            className={style.input}
                            value={people}
                            onChange={(e: any) => SetPeople(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className={style.form_select}>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e: any) =>
                            SetDepartmentType(e.target.value)
                          }
                          value={departmentType}
                        >
                          <option defaultValue="Select Department">
                            Preference
                          </option>
                          <option value="3000to4000">
                            ₹3000 to ₹4000 per Person
                          </option>
                          <option value="4000to5000">
                            ₹4000 to ₹5000 per Person
                          </option>
                          <option value="5000&more">More than ₹5000</option>
                        </Form.Select>
                      </div>
                    </div>
                  </div>

                  <p className={style.desc}>
                    By clicking on submit you agree to our{" "}
                    <Link href="/PrivacyPolicy">Privacy Policy</Link>
                  </p>

                  <div className="row justify-content-center">
                    <div className="col-12 d-flex flex-row justify-content-center">
                      <button
                        className={`${style.btn4} btn`}
                        onClick={handlebannerform}
                      >
                        Request a Callback
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
   
   </>
  )
}
