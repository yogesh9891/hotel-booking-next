import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { BANNERAdd, BANNERUpdate, SetBANNERObj } from "../../../redux/actions/Banner/Banner.actions";
import { addContactInfo, getContactInfo } from "../../../services/contactInfo.service";
import { toastError, toastSuccess } from "../../Utility/ToastUtils";

function AddContactInfo() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setinstagramLink] = useState();

  const handleSubmit = async (e) => {
    try {
      if (phone == "") {
        toastError("Phone is mandatory")
      }
      else if (phone.length != 10) {
        toastError("Invalid Phone")
      }
      else if (alternatePhone == "") {
        toastError("Alternate Phone is mandatory")
      }
      else if (alternatePhone.length != 10) {
        toastError("Invalid Alternate Phone")
      }
      else if (email == "") {
        toastError("Email is mandatory")
      }
      e.preventDefault()
      let obj = {
        email,
        phone,
        alternatePhone,
        facebookLink,
        twitterLink,
        instagramLink,
      };
      let { data: res } = await addContactInfo(obj)
      if (res.message) {
        toastSuccess(res.message)
      }
      // if (isUpdateBanner) {
      // dispatch(BANNERUpdate(obj, selectedBannerId));
      // } else {
      // dispatch(BANNERAdd(obj));
      // }
    }
    catch (err) {
      toastError(err)
    }
  };



  const handleGet = async (e) => {
    try {
      let { data: res } = await getContactInfo()
      if (res.data) {
        setEmail(res.data[0].email)
        setPhone(res.data[0].phone)
        setAlternatePhone(res.data[0].alternatePhone)
        setFacebookLink(res.data[0].facebookLink)
        setTwitterLink(res.data[0].twitterLink)
        setinstagramLink(res.data[0].instagramLink)
        // toastSuccess(res.message)
      }
      // if (isUpdateBanner) {
      // dispatch(BANNERUpdate(obj, selectedBannerId));
      // } else {
      // dispatch(BANNERAdd(obj));
      // }
    }
    catch (err) {
      toastError(err)
    }
  };

  useEffect(() => {
    handleGet()
  }, []);
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4"> Add Contact info</h5>
          <form action="#" className="form">
            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Contact Information</h5>
                    <div className="col-12">
                      <label>
                        Phone <span className="red">*</span>
                      </label>
                      <input value={phone} maxLength={10} onChange={(event) => setPhone(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label>
                        Alternate Phone <span className="red">*</span>
                      </label>
                      <input value={alternatePhone} maxLength={10} onChange={(event) => setAlternatePhone(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label>
                        Email <span className="red">*</span>
                      </label>
                      <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label>
                        Facebook Link <span className="red">*</span>
                      </label>
                      <input value={facebookLink} onChange={(event) => setFacebookLink(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label>
                        Twitter Link <span className="red">*</span>
                      </label>
                      <input value={twitterLink} onChange={(event) => setTwitterLink(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label>
                        Instagram Link <span className="red">*</span>
                      </label>
                      <input value={instagramLink} onChange={(event) => setinstagramLink(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-12 mt-2">
                      <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
                    </div>
                  </div>

                </DashboardBox>
              </div>

            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddContactInfo;
