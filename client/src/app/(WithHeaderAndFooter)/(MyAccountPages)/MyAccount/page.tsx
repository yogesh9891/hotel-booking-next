"use client";

import React, { useEffect, useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/(MyAccountPages)/MyAccount/MyAccount.module.scss";
// import Col from "react-bootstrap/Col";
// import Nav from "react-bootstrap/Nav";
// import Row from "react-bootstrap/Row";
// import Tab from "react-bootstrap/Tab";
// import { FaUser } from "react-icons/fa";
// import { FaBuilding } from "react-icons/fa";
// import { MdInfo } from "react-icons/md";
// import { IoLogOut } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import Form from "react-bootstrap/Form";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { useUserApiHook } from "@/service/user.service";
import { useSession } from "next-auth/react";
import { toastError, toastSuccess } from "@/utils/toastMessage.ts";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  email: string;
  name: string;
  gender: string;
};

export default function page() {
  const [isToggle, setIsToggle] = useState(false);
  const { data: session, update } = useSession();
  const { getUserbyIdApi, updateSelfProfileApi } = useUserApiHook();
  const [userObj, setuserObj] = useState<any>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => onRegister(data);
  const handleGetUserById = async (userId: string) => {
    try {
      let { data: res } = await getUserbyIdApi(userId);
      if (res.data) {
        setuserObj(res.data);
        if (res.data.name) {
          setName(res.data.name);
          setValue("name", res.data.name);
        }
        if (res.data.email) {
          setEmail(res.data.email);
          setValue("email", res.data.email);
        }
        if (res.data.gender) {
          setGender(res.data.gender);
          setValue("gender", res.data.gender);
        }
        if (res.data.phone) {
          setPhone(res.data.phone);
        }
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    if (session && session?.user) {
      let userSession: any = session.user;
      let userId = userSession._id;

      if (userId) {
        handleGetUserById(userId);
        setUserId(userId);
      }
    }
  }, [session]);

  const onRegister = async (data: Inputs) => {
    try {
      // console.log(data, "datadatadata");

      let { data: res } = await updateSelfProfileApi(data);

      if (res) {
        if (res.data) {
          const newSession = {
            ...session,
            user: {
              ...session?.user,
              name: res.data.name,
            },
          };

          // console.log(newSession, "newSessionnewSession");
          await update(newSession);
          await handleGetUserById(userId);
          handleToggle();
        }
        toastSuccess("User Updated Successfully");
      }
    } catch (error: any) {
      toastError(error);
      console.log(error);
    }
  };

  return (
    <div className={style.myaccount}>
      {isToggle ? (
        <h6 className={style.heading}>Edit Account</h6>
      ) : (
        <h6 className={style.heading}>My Account</h6>
      )}

      <div className={style.tab_content}>
        <div className={style.top_sec}>
          <h6 className={style.title}>Personal Information</h6>
          <button className={`${style.btn1} btn`} onClick={handleToggle}>
            Edit <TbEdit />
          </button>
        </div>
        {!isToggle ? (
          // <div className="row">
          //   <div className="col-lg-6 col-md-6 col-sm-6">

          //   </div>
          // </div>
          <div className="personal_info">
            <div className={`row ${style.mb_4}`}>
              <div className="col-xl-6 col-5">
                <p className={style.label}>Full Name : </p>
              </div>
              <div className="col-xl-6 col-7">
                <p className={style.label}>
                  {" "}
                  <span> {name} </span>
                </p>
              </div>
            </div>
            <div className={`row ${style.mb_4}`}>
              <div className="col-xl-6 col-5">
                <p className={style.label}>Email :</p>
              </div>
              <div className="col-xl-6 col-7">
                <p className={style.label}>
                  {" "}
                  <span> {email}  </span>
                </p>
              </div>
            </div>
            <div className={`row ${style.mb_4}`}>
              <div className="col-xl-6 col-5">
                <p className={style.label}>Gender : </p>
              </div>
              <div className="col-xl-6 col-7">
                <p className={style.label}>
                  {" "}
                  <span> {gender ? gender : "No Gender"} </span>
                </p>
              </div>
            </div>
            <div className={`row ${style.mb_4}`}>
              <div className="col-xl-6 col-5">
                <p className={style.label}>Mobile Number : </p>
              </div>
              <div className="col-xl-6 col-7">
                <p className={style.label}>
                  {" "}
                  <span> {phone} </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <Form.Group
                className={style.mb_4}
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className={style.label}>Full Name</Form.Label>
                <div className={style.icon}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    className={style.form_control}
                    {...register("name", {
                      required: "This is required",
                      maxLength: 20,
                      pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message: "Name is Invalid",
                      },
                    })}
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
                <Form.Label className={style.label}>E-mail</Form.Label>
                <div className={style.icon}>
                  <Form.Control
                    type="text"
                    placeholder="Enter E-mail Address"
                    className={style.form_control}
                    {...register("email", {
                      required: "This is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email is Invalid",
                      },
                    })}
                  />
                  <MdOutlineEmail />
                </div>
              </Form.Group>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 ">
              <div className={style.bottom_bar}>
                <div className={style.gender_box}>
                  <span className={style.gender}>Gender</span>

                  <div className={style.inputs}>
                    <Form.Check type="radio" className={style.check}>
                      <Form.Check.Input
                        type="radio"
                        {...register("gender")}
                        name="gender"
                        value="Male"
                        className={style.radio}
                      />
                      <Form.Check.Label className={style.input_label}>
                        Male
                      </Form.Check.Label>
                    </Form.Check>

                    <Form.Check type="radio" className={style.check}>
                      <Form.Check.Input
                        type="radio"
                        className={style.radio}
                        {...register("gender")}
                        name="gender"
                        value="Female"
                      />
                      <Form.Check.Label className={style.input_label}>
                        Female
                      </Form.Check.Label>
                    </Form.Check>

                    <Form.Check type="radio" className={style.check}>
                      <Form.Check.Input
                        type="radio"
                        className={style.radio}
                        {...register("gender")}
                        name="gender"
                        value="Other"
                      />
                      <Form.Check.Label className={style.input_label}>
                        Other
                      </Form.Check.Label>
                    </Form.Check>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 mt-3 ">
              <div className={style.bottom_bar}>
                <div className={style.buttons}>
                  <button
                    className={`${style.btn3} btn`}
                    type="button"
                    onClick={handleToggle}
                  >
                    Cancel
                  </button>
                  <button className={`${style.btn4} btn`} type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
