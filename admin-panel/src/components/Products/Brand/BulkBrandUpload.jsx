import React, { useState } from "react";
import { excelUploadBrand } from "../../../services/brand.service";
import { url } from "../../../services/url.service";
import { toastError } from "../../../utils/toastUtils";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { toastSuccess } from "../../Utility/ToastUtils";

function BulkBrandUpload() {
  const [file, setFile] = useState("");

  const handleSetFile = async (data) => {
    console.log(data);
    setFile(data);
  }
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("file", file)

      let { data: res } = await excelUploadBrand(formData);
      console.log(res.message)
      if (res.message) {
        toastSuccess(res.message)
      }
    }
    catch (err) {
      toastError(err)
    }
  }

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <DashboardBox>
            <h5 className="blue-1 mb-4">Bulk Brand Upload</h5>
            <form action="" className="form row">
              <div className="col-12 mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <label>CSV FILE</label>
                  <CustomButton downloadAble changeClass='btn p-0 m-0 fs-12 text-primary border-0' isDownloadableLink downloadAbleLink={`${url}/brand/demoXLSX`} btnName='SAMPLE FILE DOWNLOAD' />
                </div>
                <FileUpload returnOriginal={true} onFileChange={handleSetFile} />
                <div className="form-text fs-12 blue-1">
                  PLEASE DOWNLOAD THE SAMPLE FILE INPUT YOUR DESIRE INFORMATION
                  THEN UPLOAD. DON'T TRY TO UPLOAD DIFFERENT FILE FORMAT AND
                  INFORMATION
                </div>
              </div>
              <div className="col-12 text-center">
                <CustomButton type="button" ClickEvent={(e) => { e.preventDefault(); handleSubmit() }} isBtn iconName='fa-solid fa-check' btnName='Upload CSV' />
              </div>
            </form>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default BulkBrandUpload;
