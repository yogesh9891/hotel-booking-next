import React from "react";
import Select from "react-select";
import ReactQuill from "react-quill"; // ES6
import { DashboardBox } from "../Utility/DashboardBox";
import CustomButton from "../Utility/Button";

function AddNewsLetter() {
  const options = [
    { value: "All User", label: "All User" },
    { value: "Role Wise", label: "Role Wise" },
    { value: "Multiple Role Select User", label: "Multiple Role Select User" },
    { value: "All Subscription", label: "All Subscription" },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-lg-9">
              <h5 className="blue-1 mb-4">Create News Letter</h5>
              <DashboardBox>
                <form action="#" className="form">
                  <div className="col-12 mb-3">
                    <label>
                      TITLE <span className="red">*</span>
                    </label>
                    <input type="text" className="form-control" />
                    <div className="form-text fs-12">
                      SHORT CODE (USE THESE TO GET YOUR NECCESSARY INFO)
                    </div>
                    <div className="form-text fs-12 mt-0">
                      GIFT_CARD_NAME, SECRET_CODE, USER_FIRST_NAME, USER_EMAIL,
                      EMAIL_SIGNATURE, EMAIL_FOOTER, ORDER_TRACKING_NUMBER,
                      WEBSITE_NAME
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <label>
                      MESSAGE <span className="red">*</span>
                    </label>
                    <ReactQuill theme="snow" />
                  </div>
                  <div className="col-12 mb-3">
                    <label>
                      PUBLISH ON <span className="red">*</span>
                    </label>
                    <input type="date" className="form-control" />
                  </div>

                  <div className="col-12 mb-3">
                    <label>
                      SEND TO <span className="red">*</span>
                    </label>
                    <Select options={options} />
                  </div>
                  <div className="col-12">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Save"
                    />
                  </div>
                </form>
              </DashboardBox>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AddNewsLetter;
