import React from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";

function AddKYC() {
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <h5 className="blue-1 mb-4">Add Customer KYC</h5>
              <form action="#" className="form">
                <DashboardBox>
                  <div className="border-bottom pb-4 mb-4 row">
                    <h5 className="blue-1 mb-4">Bank Details</h5>
                    <div class="col-12 col-md-6">
                      <label>Account Holder's Name</label>
                      <input
                        type="text"
                        class="form-control "
                        name="account_holder_name"
                        value=""
                        required=""
                        autocomplete="name"
                      />
                    </div>
                    <div class="col-12 col-md-6">
                      <label>Bank Name</label>
                      <input
                        type="text"
                        class="form-control "
                        name="bank_name"
                        value=""
                      />
                    </div>
                    <div class="col-12 col-md-6">
                      <label>Account Number</label>
                      <input
                        type="text"
                        class="form-control "
                        name="account_name"
                        value=""
                      />
                    </div>
                    <div class="col-12 col-md-6">
                      <label>IFSC Code</label>
                      <input
                        type="text"
                        class="form-control "
                        name="ifsc_code"
                        value=""
                      />
                    </div>
                  </div>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Upload Documents</h5>
                    <div className="col-12 col-md-6 mb-3">
                      <label>Photo Id Proof</label>
                      <FileUpload />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>Address Proof</label>
                      <FileUpload />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>Signature</label>
                      <FileUpload />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>Cheque Image</label>
                      <FileUpload />
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Save"
                    />
                  </div>
                </DashboardBox>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AddKYC;
