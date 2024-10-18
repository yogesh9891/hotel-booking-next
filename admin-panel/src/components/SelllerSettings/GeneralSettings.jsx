import React, { useState } from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import { useSelector } from "react-redux";
import { toastSuccess } from "../Utility/ToastUtils";
import { getreviewSetingByUserId, reviewSetingsAddUpdate } from "../../services/ReviewSettings.service";
import { useEffect } from "react";
import { getById, updateNotificationSetting, updateUser } from "../../services/users.service";

function GeneralSettings() {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isNewsletterEnabled, setIsNewsLetterEnabled] = useState(false);
  const userObj = useSelector((state) => state.auth.user);

  const handleSubmit = async () => {
    try {
      let obj = {
        isNewsletterEnabled,
        isNotificationEnabled,

        // userId: userObj._id,
      };
      console.log(obj);
      let { data: res } = await updateNotificationSetting(obj);
      if (res.message) {
        console.log(res.message);
        toastSuccess(res.message);
      }
    } catch (err) {
      if (err.response.data.message) {
        console.error(err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error(err.message);
        alert(err.message);
      }
    }
  };

  const handleGet = async () => {
    try {
      let { data: res } = await getById(userObj._id);
      if (res) {
        console.log(res.data);
        toastSuccess(res.message);
        setIsNewsLetterEnabled(res.data.isNewsletterEnabled ? true : false);
        setIsNotificationEnabled(res.data.isNotificationEnabled ? true : false);
      }
    } catch (err) {
      if (err.response.data.message) {
        console.error(err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error(err.message);
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    handleGet();

    return () => {
      setIsNotificationEnabled(false);
      setIsNewsLetterEnabled(false);
    };
  }, []);

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <DashboardBox className="col-lg-6">
                <h5 className="blue-1 mb-4">General Settings</h5>
                <form className="form row">
                  <div className="col-12 mb-4">
                    <label className="blue-1 fs-12">NewsLetter Enabled ?</label>
                    <div className="d-flex">
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="1category-status"
                          // value={true}
                          id="active-product-review"
                          onChange={() => setIsNewsLetterEnabled(true)}
                          checked={isNewsletterEnabled == true}
                        />
                        <label className="form-check-label fs-14" htmlFor="active-product-review">
                          Active
                        </label>
                      </div>
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input className="form-check-input" type="radio" name="1category-status" onChange={() => setIsNewsLetterEnabled(false)} checked={isNewsletterEnabled == false} id="inActive-product-review" />
                        <label className="form-check-label fs-14" htmlFor="inActive-product-review">
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <label className="blue-1 fs-12">Notifications Enabled ?</label>
                    <div className="d-flex">
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input className="form-check-input" type="radio" name="category-status" onChange={() => setIsNotificationEnabled(true)} checked={isNotificationEnabled == true} id="active-company-review" />
                        <label className="form-check-label fs-14" htmlFor="active-company-review">
                          Active
                        </label>
                      </div>
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input className="form-check-input" type="radio" name="category-status" onChange={() => setIsNotificationEnabled(false)} checked={isNotificationEnabled == false} id="inActive-company-review" />
                        <label className="form-check-label fs-14" htmlFor="inActive-company-review">
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <CustomButton isBtn ClickEvent={handleSubmit} iconName="fa-solid fa-check" btnName="Update" roundedPill />
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

export default GeneralSettings;
