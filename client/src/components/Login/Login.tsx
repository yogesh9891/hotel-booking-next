"use client"
import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import OtpInput from 'react-otp-input';
import {  Modal } from 'react-bootstrap'
import style from '@/layout/layout.module.scss'
import Image from 'next/image'
import logo from '@/assets/images/logo.webp'
import facebook from '@/assets/images/facebook.webp'
import google from '@/assets/images/google.webp'

import Link from 'next/link';
import { toastError, toastSuccess } from '@/utils/toastMessage.ts';
import { signIn, useSession } from 'next-auth/react';
import { registerApi, sendOtpApi, verifyOtpApi } from '@/service/user.service';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"
type Inputs = {
    email: string
    name: string
  }
type Inputs2 = {
    email: string
    name: string
    phone: string
  }

export default function Login({loginShow,loginChange}:{loginShow:boolean,loginChange:any}) {
    
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const [otp, setOtp] = useState<any>();
    const [phone, setPhone] = useState("");
    const [otpError, setotpError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsSendOtpStep, setIsSendOtpStrop] = useState(1);
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState<any>("");
  const [lastName, setLastName] = useState<any>("");
  const router = useRouter();

  const handleSenOtp = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
        phone: { value: string };
      };
      
      let phoneNum = target.phone.value;
      if (!/^[0-9]+$/.test(phoneNum) || phoneNum?.length != 10) {
         setPhoneError(true)
        return;
      }
      setPhoneError(false)
      setPhone(phoneNum)
    try {
      let { data: res } = await sendOtpApi({
        phone: phoneNum
      });


      if(res.status == true){
      toastSuccess(res.message)

        loginChange(false)
        handleShow2()
        setIsSendOtpStrop(2)

      }
    } catch (error) {
      toastError(error)
    }

  }


  const handleVerfifyOtp = async () => {
console.log('verify otp')
    try {
      if (!/^[0-9]+$/.test(otp)) {
        toastError("OTP  is Invalid");
        return;
      }


      let { data: res } = await verifyOtpApi({
        phone: phone,
        otp
      });

      console.log(res, "verfy responve backend")

      if(res.status == true){

        if(res?.isActive){
          const result = await signIn("credentials", {
              phone,otp,
               callbackUrl: `${window.location.origin}`,
           redirect: false,
         });
        console.log(result, "check otp result")


         if (result?.error) {
           console.log(
             result?.error,
             "result?.errorresult?.errorresult?.errorresult?.error"
           );
           toastError(result?.error);
           return 0;
         }
         
         let userSession:any = session
   
         // await handleLocalCartintoUserCart();
         if (result?.url) {
          //  router.push(result.url);
           handleClose2()
         }
        } else {
         
            handleClose2()
            handleShow3()
        }
     
      } else {
      toastError("OTP is Invalid")
      }

    } catch (error) {
      toastError(error)
    }

  }


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => onRegister(data)
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm<Inputs2>()
  const onSubmit2:SubmitHandler<Inputs2> = (data) => onRegister2(data)


  const onRegister = async (data:Inputs) => {
    try {
      // signOut();
      const result = await signIn("credentials", {
         ...data,
           phone,
        isEmail:false,
        callbackUrl: `${window.location.origin}`,
        redirect: false,
      });

      if (result?.error) {
        console.log(
          result?.error,
          "result?.errorresult?.errorresult?.errorresult?.error"
        );
        toastError(result?.error);
        return 0;
      }
      handleClose3()
      router.push("/");
     

      if (result?.url) {
        router.push("/");
      }
    } catch (error) {
      toastError(error);
    }
  };

  const onRegister2 = async (data:Inputs2) => {
    try{
    console.log(data,"datadatadata");

    let { data: res } = await registerApi(data);

    if (res) {
      if (res.data) {
      toastSuccess("User Register Successfully");
      loginChange(false)
      return
      
      }
    }
  } catch (error: any) {
    toastError(error);
    console.log(error);
  }
  };
  return (
    <>
      {/* Login/Register Modal */}

      <Modal
        show={loginShow}
        onHide={() => loginChange(false)}
        className={`${style.modal1} modal2`}
      >
        <Modal.Header className={style.modal_header} closeButton></Modal.Header>
        <Modal.Body className={style.modal_body}>
          <div className={style.image}>
            <Image src={logo} alt="" fill />
          </div>

          <Tabs
            defaultActiveKey="login"
            id="uncontrolled-tab-example"
            className="tab_list"
          >
            <Tab eventKey="login" title="Log in">
              <div className={style.login}>
                <h6 className={`${style.title}  d-none d-lg-block`}>
                  Welcome to Wabi Sabi!
                </h6>
                <p className={`${style.para}`}>Let’s Log in you</p>
                <form onSubmit={handleSenOtp}>
                  <input
                    type="number"
                    maxLength={10}
                    required
                    name="phone"
                    className={`${style.control} form-control`}
                    placeholder="Enter Your Mobile Number"
                  />
                  {phoneError && (
                    <p className="text-danger">Mobile is Invalid</p>
                  )}
                  <button className={`${style.btn6} btn`} type="submit">
                    Send OTP
                  </button>
                </form>
                <div className={style.border}>OR</div>

                <div className={style.buttons}>
                  <button
                    className={`${style.btn8} btn`}
                    onClick={() => signIn("google")}
                  >
                    <div className={style.image1}>
                      <Image src={google} alt="" fill />
                    </div>
                    Google
                  </button>
                  <button className={`${style.btn9} btn`}>
                    <div className={style.image2}>
                      <Image src={facebook} alt="" fill />
                    </div>
                    Facebook
                  </button>
                </div>

                <p className={style.modal_text}>
                  By signing in or creating an account, you agree with our{" "}
                  <Link href="/TermAndCondition">Terms & conditions</Link> and{" "}
                  <Link href="/PrivacyPolicy">Privacy statement</Link>
                </p>
              </div>
            </Tab>
            {/* <Tab eventKey="register" title="Register">
              <div className={style.register}>
                <h6 className={style.name}>Register Now !</h6>
                <form onSubmit={handleSubmit2(onSubmit2)}>
                  <div className={style.group}>
                    <div className={style.label}>Full Name</div>
                    <input
                      type="text"
                      {...register2("name", {
                        required: "This is required",
                        maxLength: 20,
                        pattern: {
                          value: /^[a-zA-Z ]+$/,
                          message: "Name is Invalid",
                        },
                      })}
                      className={`${style.control} form-control`}
                      placeholder="Enter Full Name"
                    />
                    {errors2.name && (
                      <p className="text-danger">{errors2.name?.message}</p>
                    )}
                  </div>
                  <div className={style.group}>
                    <div className={style.label}>Email</div>
                    <input
                      type="email"
                      {...register2("email", {
                        required: "This is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Email is Invalid",
                        },
                      })}
                      className={`${style.control} form-control`}
                      placeholder="Enter Your Email"
                    />
                    {errors2.email && (
                      <p className="text-danger">{errors2.email?.message}</p>
                    )}
                  </div>
                  <div className={style.group}>
                    <div className={style.label}>Mobile Number</div>
                    <input
                      type="text"
                      {...register2("phone", {
                        required: "This is required",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Phone  is Invalid",
                        },
                      })}
                      className={`${style.control} form-control`}
                      placeholder="Enter Your Mobile Number"
                    />
                    {errors2.phone && (
                      <p className="text-danger">{errors2.phone?.message}</p>
                    )}
                  </div>
                  <button className={`${style.btn6} btn`} type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </Tab> */}
          </Tabs>
        </Modal.Body>
      </Modal>

      {/* Otp Modal */}
      <Modal
        show={show2}
        onHide={handleClose2}
        className={`${style.modal2} modal3`}
      >
        <Modal.Body className={style.modal_body}>
          <div className={style.image}>
            <Image src={logo} alt="" fill />
          </div>
          <h6 className={style.otp_head}>Enter OTP</h6>
          <p className={style.num_change}>
            Please enter the code w’ve sent via SMS to +91
            {phone}{" "}
            <button
              className={`${style.btn3} btn`}
              onClick={() => {
                handleClose2();
                loginChange(true);
              }}
            >
              Change
            </button>{" "}
          </p>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={style.box}
            shouldAutoFocus={true}
            inputStyle={style.inputs}
            inputType='number'
            renderInput={(props) => <input  {...props} />}
          />

          <div className={style.bottom}>
            <p className={style.resend}>Haven’t recived a code? Resend Now</p>
            <button className={`${style.btn4} btn`}>Resend Now</button>
          </div>

          <button
            className={`${style.btn6} btn`}
            onClick={() => handleVerfifyOtp()}
          >
            Verify OTP
          </button>
          {/* <button className={`${style.btn6} btn`} onClick={()=>console.log('submit verify otp')} >Verify OTP</button> */}
        </Modal.Body>
      </Modal>
      <Modal
        show={show3}
        onHide={handleClose3}
        className={`${style.modal2} modal3`}
      >
        <Modal.Body className={style.modal_body}>
          <div className={style.image}>
            <Image src={logo} alt="" fill />
          </div>
          <div className={style.register}>
            <h6 className={style.name}> Enter Your Details</h6>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style.group}>
                <div className={style.label}>Full Name</div>
                <input
                  type="text"
                  {...register("name", {
                    required: "This is required",
                    maxLength: 20,
                    pattern: {
                      value: /^[a-zA-Z ]+$/,
                      message: "Name is Invalid",
                    },
                  })}
                  className={`${style.control} form-control`}
                  placeholder="Enter Full Name"
                />
                {errors.name && (
                  <p className="text-danger">{errors.name?.message}</p>
                )}
              </div>

              <div className={style.group}>
                <div className={style.label}>Email</div>
                <input
                  type="email"
                  {...register("email", {
                    required: "This is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email is Invalid",
                    },
                  })}
                  className={`${style.control} form-control`}
                  placeholder="Enter Your Email"
                />
                {errors.email && (
                  <p className="text-danger">{errors.email?.message}</p>
                )}
              </div>
              <button className={`${style.btn6} btn`} type="submit">
                Submit
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
