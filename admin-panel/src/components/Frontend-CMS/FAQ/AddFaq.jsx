import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { BANNERAdd, BANNERUpdate, SetBANNERObj } from "../../../redux/actions/Banner/Banner.actions";
import { toastError, toastSuccess } from "../../Utility/ToastUtils";
import { addFaq, updateFaqById } from "../../../services/Faq.service";
import { useParams } from "react-router-dom";

function AddFaq() {
  const dispatch = useDispatch();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const bannerObj = useSelector((state) => state.banner.bannerObj);
  const [isUpdateBanner, setisUpdateBanner] = useState(false);
  const [faqObj, setfaqObj] = useState("");
  const {type} = useParams();


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (heading == "") {
        toastError("Heading is mandatory")
        return
      }
      else if (description == "") {
        toastError("Description is mandatory")
        return
      }
      let obj = {
        type,
        heading,
        description
      };
    
      if (isUpdateBanner) {
        let { data: res } = await updateFaqById(obj,faqObj._id)
        if (res.message) {
          toastSuccess(res.message)
          dispatch(SetBANNERObj(null));
        }
      } else {
        let { data: res } = await addFaq(obj)
        if (res.message) {
          toastSuccess(res.message)
        }
      }
    }
    catch (err) {
      toastError(err)
    }
  };


  useEffect(() => {
    if (bannerObj) {
      setisUpdateBanner(true)
      setfaqObj(bannerObj);
      setHeading(bannerObj?.question)
      setDescription(bannerObj?.answer)
    }
 
  }, [bannerObj]);


  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4"> Add New Faq</h5>
          <form action="#" className="form">
            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Faq Information</h5>
                    <div className="col-12">
                      <label>
                        Heading <span className="red">*</span>
                      </label>
                      <input value={heading} onChange={(event) => setHeading(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label>Description</label>
                      <textarea value={description} onChange={(event) => setDescription(event.target.value)} type="text" className="form-control" />
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

export default AddFaq;
