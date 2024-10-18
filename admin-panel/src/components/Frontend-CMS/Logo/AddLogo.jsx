import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { BANNERAdd, BANNERUpdate, SetBANNERObj } from "../../../redux/actions/Banner/Banner.actions";
import { toastError, toastSuccess } from "../../Utility/ToastUtils";
import { addLogo } from "../../../services/logo.service";

function AddLogo() {
  const dispatch = useDispatch();

  const [imageStr, setImageStr] = useState("");

  const handleFileSet = (value) => {
    // console.log(value);
    setImageStr(value);
  };

  // useEffect(() => {
  //   if (bannerObj) {
  //     setselectedBannerId(bannerObj._id);
  //     setName(bannerObj.name);
  //     setDescription(bannerObj.description);
  //     setUrl(bannerObj.url);
  //     setselectedBannerId(bannerObj._id);
  //     setPrevImage(bannerObj.image);
  //     // setSelectedStatus({ value: brandObj.statusInfo, label: brandObj.statusInfo });
  //     setIsUpdateBanner(true);
  //   }
  //   return () => {
  //     dispatch(SetBANNERObj(null));
  //   };
  // }, [bannerObj]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (imageStr == "") {
        toastError("Please select an image")
      }
      let obj = {
        image: imageStr,
      };
      let { data: res } = await addLogo(obj)
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
          <h5 className="blue-1 mb-4">Add New Logo</h5>
          <form className="form">
            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Logo Information</h5>
                    <div className="col-12">
                      <label>Logo (150x150)PX</label>
                      <FileUpload onFileChange={handleFileSet} />
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

export default AddLogo;
