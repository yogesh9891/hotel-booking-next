import { Switch } from "@mui/material";
import React from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";

function RefundConfig() {
  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <h5 className="blue-1 mb-4">Configuration</h5>
              <DashboardBox className="col-lg-6">
                <form action="#" className="form row">
                  <div className="col-12 mb-3">
                    <label>REFUND STATUS</label>
                    <div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <label>
                      REFUND TIMES IN DAYS
                      <span className="red">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value="1"
                      className="form-control"
                    />
                  </div>
                  <div className="col-12 mb-2 text-center">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Save"
                      extraClass="rounded-pill"
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

export default RefundConfig;
