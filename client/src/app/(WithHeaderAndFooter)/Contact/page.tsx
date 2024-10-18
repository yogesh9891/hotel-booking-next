'use client'

import React, { useState } from 'react'
import style from '@/app/(WithHeaderAndFooter)/Contact/Contact.module.scss'
import { MdOutlineLocalPhone } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdSupportAgent } from "react-icons/md";
import Link from 'next/link';
import Image from 'next/image';
import { Images } from '@/assets/Utility/Images';
import Form from 'react-bootstrap/Form';
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { toastError, toastSuccess } from '@/utils/toastMessage.ts';
import { postContactEnquiry } from '@/service/home.service';


export default function page() {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [title, setTitle] = useState("");
 const [phone, setphone] = useState("");
 const [message, setmessage] = useState("");





    const handleSubmit = async () => {
        try {
          if (name == "") {
            toastError("Name is mandatory");
            return;
          } else if (email == "") {
            toastError("Email is mandatory");
            return;
          } else if (phone == "") {
            toastError("Phone is mandatory");
            return;
          } else if (phone.length != 10) {
            toastError("Invalid Phone number");
            return;
          } else if (title == "") {
            toastError("Subject is mandatory");
            return;
          } else if (message == "") {
            toastError("Message is mandatory");
            return;
          }

          let obj = {
            name,
            phone,
            email,
            message,
            title,
          };

          let { data: res } = await postContactEnquiry(obj);
          if (res.message) {
            toastSuccess(res.message)
            setName("");
            setEmail("");
            setphone("");
            setTitle("");
            setmessage("");


          }
        } catch (error) {
          console.error(error);
          toastError(error);
        }
      };

    return (
      <>
        <div className={style.contact}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                <h1 className={style.heading}>Contact Us</h1>
              </div>
            </div>
          </div>
        </div>

        <div className={style.loaction}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-12 col-sm-12 text-center">
                <div className={style.head_content}>
                  <span className={style.title}>Our Location</span>
                  <h6 className={style.head}>Our Office Address</h6>
                </div>
                <p className={style.desc}>
                  Wabi Sabi Stays, Landour, Kulri, near Picture Palace,
                  Mussoorie, Uttarakhand 248179
                </p>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-12 col-sm-12">
                <div className="row">
                  <div className={`${style.border} col-lg-4 col-md-4 col-sm-4`}>
                    <div className={style.contact_box}>
                      <MdOutlineLocalPhone />
                      <h6 className={style.name}>Make a Call</h6>
                      <p className={style.para}>
                        Make a call for your general enquiries
                      </p>
                      <Link href="#" className={style.link}>
                        +91 96670 65066
                      </Link>
                    </div>
                  </div>
                  <div className={`${style.border} col-lg-4 col-md-4 col-sm-4`}>
                    <div className={style.contact_box}>
                      <HiOutlineMailOpen />
                      <h6 className={style.name}>Send a Mail</h6>
                      <p className={style.para}>
                        Send your mail for general enquiries
                      </p>
                      <Link href="#" className={style.link}>
                         hello@wabisabistays.com
                      </Link>
                    </div>
                  </div>
                  <div className={`${style.border} col-lg-4 col-md-4 col-sm-4`}>
                    <div className={style.contact_box}>
                      <MdSupportAgent />
                      <h6 className={style.name}>Toll Free</h6>
                      <p className={style.para}>
                        Toll free number for staying guest
                      </p>
                      <Link href="#" className={style.link}>
                        1800-6002-1234
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.form_sec}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-12 col-sm-12">
                <div className={style.form}>
                  <div className={style.top_content}>
                    <div className={style.left_side}>
                      <h6 className={style.title}>Send Your Message</h6>
                      <p className={style.para}>
                        Please Fill Free to get in touch using the form below.
                      </p>
                      <p className={style.para}>We’d love to hear for you.</p>
                    </div>
                    <div className={style.image}>
                      <Image src={Images.contact} alt="" fill />
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Form.Group
                        className={style.mb_4}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={style.label}>
                          First Name*
                        </Form.Label>
                        <div className={style.icon}>
                          <Form.Control
                            type="text"
                            placeholder="Enter  Name"
                            className={style.form_control}
                            value={name}
                            onChange={(e: any) => setName(e.target.value)}
                          />
                          <AiOutlineUser />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Form.Group
                        className={style.mb_4}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={style.label}>
                          Mobile Number*
                        </Form.Label>
                        <div className={style.icon}>
                          <Form.Control
                            type="number"
                            placeholder="Enter Mobile Number"
                            className={style.form_control}
                            value={phone}
                            onChange={(e: any) => setphone(e.target.value)}
                          />
                          <MdOutlinePhone />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Form.Group
                        className={style.mb_4}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={style.label}>E-mail*</Form.Label>
                        <div className={style.icon}>
                          <Form.Control
                            type="text"
                            placeholder="Enter E-mail Address"
                            className={style.form_control}
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                          />
                          <MdOutlineEmail />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Form.Group
                        className={style.mb_4}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={style.label}>Title</Form.Label>
                        <div className={style.icon}>
                          <Form.Control
                            type="text"
                            placeholder="Enter Your Subject"
                            className={style.form_control}
                            value={title}
                            onChange={(e: any) => setTitle(e.target.value)}
                          />
                          <AiOutlineUser />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <Form.Group
                        className={style.mb_4}
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label className={style.label}>Message</Form.Label>
                        <div className={style.icon}>
                          <Form.Control
                            as="textarea"
                            onChange={(e: any) => setmessage(e.target.value)}
                            value={message}
                            placeholder="Enter your Message"
                            rows={3}
                            className={style.form_control}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="row justify-content-center">
                      <div className="col-xl-4 col-lg-4 col-md-4 d-flex flex-row justify-content-center">
                        <button
                          className={`${style.btn4} btn`}
                          onClick={() => handleSubmit()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
