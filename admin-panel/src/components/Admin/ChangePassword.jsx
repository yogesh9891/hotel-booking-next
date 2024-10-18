import React, { useState } from "react";
import { changePassword } from "../../services/users.service";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { toastError } from "../Utility/ToastUtils";
import { useSelector } from "react-redux";
import { toastSuccess } from "../../utils/toastUtils";

function ChangePassword() {

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.auth.user);





  const handleSubmit = async (e) => {
    e.preventDefault()
    if (oldPassword == "") {
      toastError("Please enter old password")
      return
    }
    else if (password == "") {
      toastError("Please enter new password")
      return
    }
    else if (confirmPassword == "") {
      toastError("Please enter confirm password")
      return
    }
    else if (confirmPassword != password) {
      toastError("Confirm password does not match new password")
      return
    }
    try {
      let { data: res } = await changePassword(user._id, { oldPassword, password });
      if (res) {
        toastSuccess(res.message)
      }
    }
    catch (err) {
      toastError(err)
    }
  }


  return (
    <DashboardTable>
      <h5 className="blue-1 mb-4">Change Password</h5>
      <form action="#" className="form row">
        <div className="col-12 mb-3">
          <label>
            CURRENT PASSWORD <span className="red">*</span>
          </label>
          <input
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            name="CURRENT PASSWORD"
            className="form-control"
            placeholder="CURRENT PASSWORD"
            type="text"
            required=""
          />
        </div>
        <div className="col-12 mb-3">
          <label>
            NEW PASSWORD<span className="red">*</span>
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="NEW PASSWORD"
            className="form-control"
            placeholder="NEW PASSWORD"
            type="text"
            required=""
          />
        </div>
        <div className="col-12 mb-3">
          <label>
            RE ENTER NEW PASSWORD
            <span className="red">*</span>
          </label>
          <input
            name="RE ENTER NEW PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            placeholder="RE ENTER NEW PASSWORD"
            type="text"
          />
        </div>
        <div className="col-12 mt-2">
          <CustomButton ClickEvent={(e) => handleSubmit(e)} isBtn iconName="fa-solid fa-check" btnName="Update" />
        </div>
      </form>
    </DashboardTable>
  );
}

export default ChangePassword;
