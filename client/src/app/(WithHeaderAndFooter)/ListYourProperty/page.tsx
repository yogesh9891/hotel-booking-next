"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import Form from "react-bootstrap/Form";
import { toastError, toastSuccess } from "@/utils/toastMessage.ts";
import FileUpload from "@/utils/Fileupload";
import MultiFileUpload from "@/utils/MultiFileUpload";
import { generateImageUrl } from "@/service/url.service";
import { postPropertyEnquiry } from "@/service/home.service";
import { useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import { statesArr } from "@/utils/statesarr/StatesArr";
export default function page() {
  const [firstname, Setfirstname] = useState("");
  const [lastname, Setlastname] = useState("");
  const [propertyname, Setpropertyname] = useState("");
  const [propertyType, SetpropertyType] = useState("");
  const [description, Setdescription] = useState("");
  const [fulladdress, Setfulladdress] = useState("");
  const [state, Setstate] = useState("");
  const [fname, SetFname] = useState("");
  const [phone, SetPhone] = useState("");
  const [email, SetEmail] = useState("");
  const [city, Setcity] = useState("");
  const [mainImage, setmainImage] = useState("");
  const [imagesArr, setImagesArr] = useState<any>([]);



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
      if (email == "") {
        toastError("Please Enter Your Email");
        return;
      }
      if (phone == "" || phone.length > 10) {
        toastError("Please Enter Your Phone Number");
        return;
      }
     
      if (description == "") {
        toastError("Please Enter Property Description");
        return;
      }
      if (fulladdress == "") {
        toastError("Please Enter Your Full Address");
        return;
      }

      if (state == "" || state == undefined) {
        toastError("Please Select any State");
        return;
      }

      if (city == "") {
        toastError("Please Enter Your City");
        return;
      }

      if (fname == "") {
        toastError("Please Enter Your Full Name");
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

      if (email == "") {
        toastError("Please Enter Your Email");
        return;
      }
      let obj = {
        fname,
        phone,
        email,
        name:propertyname,
        hotelType: propertyType,
        description,
        address: fulladdress,
        propertyState: state,
        city,
        mainImage,
        imagesArr,
      };
      console.log("formobjkformobj", obj);
      handleSumbit(obj);
      // Setname("");
      SetpropertyType("");
      Setdescription("");
      Setfulladdress("");
      Setstate("");
      Setcity("")
      setImagesArr([])
      setmainImage("")
      router.push("/ListYourProperty");
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
        router.push("/ListYourProperty");
      }
    } catch (error) {
      toastError(error);
    }
  };

  const handleSetMultipleImages = (value: any, index: number) => {
    console.log(value, "valuevaluevaluevalue");

    if (value && value.length > 0) {
      let tempArr = imagesArr;
      let tempImageArr = value.map((img: any) => ({ imageUrl: img.base64 }));
      const children = tempArr.concat(tempImageArr);
      setImagesArr([...children]);
    } else {
      let tempArr = imagesArr;
      tempArr[index].imageUrl = value;
      setImagesArr([...tempArr]);
    }
  };

  const handleMultipleImagesRemove = (index: number) => {
    setImagesArr([
      ...imagesArr.filter((el: any, indexxxx: number) => indexxxx != index),
    ]);
  };

  return (
    <>
      <section className={style.list_property_sec}>
        <div className="container">
          <div className="row">
            <h2 className={style.main_heading}>
              Why You List Your Property With Wabi Sabi
            </h2>
          </div>
        </div>
      </section>

      <section className={style.steps}>
        <div className="container">
          <div className="row">
            <div className={style.form}>
              <h2 className={style.main_headd}>
                List Your Property With Us
              </h2>

              <div className="row">
                <h5 className={`${style.form_heading} mt-2`}>Basics</h5>
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

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className={style.label}>
                      Property Description*
                    </Form.Label>
                    <div className={style.icon}>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Property Description"
                        rows={4}
                        className={style.form_control}
                        value={description}
                        onChange={(e: any) => Setdescription(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>

                <h5 className={style.form_heading}>Location</h5>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Form.Group
                    className={style.mb_4}
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className={style.label}>
                      Full Address*
                    </Form.Label>
                    <div className={style.icon}>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Full Address"
                        rows={4}
                        className={style.form_control}
                        value={fulladdress}
                        onChange={(e: any) => Setfulladdress(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className={style.form_select}>
                    <Form.Label className={style.label}>
                      State/Province*
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={state}
                      onChange={(e: any) => Setstate(e.target.value)}
                    >
                      <option defaultValue="Please Select State">
                        Please Select State
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

                <h5 className={`${style.bottom_heading} ${style.mt_1}`}>
                  Show them what they're missing.
                </h5>
                <p className={style.desc}>
                  Images are important to travelers. Share as many
                  high-resolution photos as you can. You can always add more in
                  the future. Looking for advice on how to upload pictures that
                  attract more bookings?
                </p>
                <div className="col-xl-12">
                  <Form.Group controlId="formFile" className={style.mb_4}>
                    <Form.Label className={style.label}>
                      Property Main Photo*
                    </Form.Label>
                    <FileUpload
                      onFileChange={(val: any) => setmainImage(val)}
                    />

                    {mainImage && `${mainImage}`.includes("base64") && (
                      <div className="big_image">

                        <img src={mainImage} width="100%" height="100%" style={{borderRadius:"3px",objectFit:"cover"}}
                                  alt="no Image" />
                      </div>
                    )}
                  </Form.Group>
                </div>
                <div className="col-xl-12">
                  <Form.Group
                    controlId="formFileMultiple"
                    className={style.mb_4}
                  >
                    <Form.Label className={style.label}>
                      Property Photos*
                    </Form.Label>
                    <MultiFileUpload
                      onFileChange={(val: any) =>
                        handleSetMultipleImages(val, 0)
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col-xl-12">
                  <div className="row ">
                    {imagesArr &&
                      imagesArr.length > 0 &&
                      imagesArr.map((el: any, index: number) => {
                        return (
                          <>
                            <div className="col-xl-2 col-6">
                              {el.imageUrl != "" &&
                              `${el.imageUrl}`.includes("base64") ? (
                               <div className="file_image">
                                 <img
                                  src={el.imageUrl}
                                  width="100%"
                                  height="100%"
                                  style={{borderRadius:"3px",objectFit:"cover"}}
                                  alt="no Image"
                                />
                                   <button
                                type="button"
                                className="close_buttnn "
                                onClick={() =>
                                  handleMultipleImagesRemove(index)
                                }
                              >
                                <RxCross1 size={14} />
                              </button>
                               </div>
                              ) : (
                                <div className="file_image">
                                <img
                                  src={generateImageUrl(el.imageUrl)}
                                  width="100%"
                                  height="100%"
                                  alt="no Image"
                                  style={{borderRadius:"3px",objectFit:"cover"}}
                                />
                                   <button
                                type="button"
                                className="close_buttnn "
                                onClick={() =>
                                  handleMultipleImagesRemove(index)
                                }
                              >
                                <RxCross1 size={14} />
                              </button>
                                </div>
                              )}
                           
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>

                <h5 className={`${style.form_heading} ${style.mt_1}`}>
                  Contact Information.
                </h5>
                <div className="row">
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
                      <Form.Label className={style.label}>Phone*</Form.Label>
                      <div className={style.icon}>
                        <Form.Control
                          type="text"
                          placeholder="Enter Your Phone"
                          className={style.form_control}
                          value={phone}
                          onChange={(e: any) => SetPhone(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <Form.Group
                      className={style.mb_4}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={style.label}>Email*</Form.Label>
                      <div className={style.icon}>
                        <Form.Control
                          type="text"
                          placeholder="Enter Your Email"
                          className={style.form_control}
                          value={email}
                          onChange={(e: any) => SetEmail(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-xl-3 col-lg-3 col-md-4 col-12 d-flex flex-row justify-content-center">
                    <button
                      className={`${style.btn4} btn`}
                      onClick={handleformsubmit}
                    >
                      Submit Enquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
