import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { BANNERAdd, BANNERUpdate, SetBANNERObj } from "../../../redux/actions/Banner/Banner.actions";
import { toastError, toastSuccess } from "../../Utility/ToastUtils";
import { addPolicy } from "../../../services/policy.service";

function AddPrivacy() {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (description == "") {
        toastError("Description is mandatory")
        return
      }
      let obj = {
        policies: description
      };
      let { data: res } = await addPolicy(obj)
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
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4"> Add Privacy</h5>
          <form action="#" className="form">
            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Privacy Information</h5>
                    <div className="col-12">
                      <label>Write Privacy here</label>
                      <ReactQuill value={description} onChange={(event) => setDescription(event)} theme="snow" />
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

export default AddPrivacy;
