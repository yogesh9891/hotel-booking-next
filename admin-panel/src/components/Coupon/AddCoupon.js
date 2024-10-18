import React, { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../utils/toastUtils";
import CustomButton from "../Utility/Button";
import moment from "moment";
import { addDiscount, updateDiscount } from "../../services/Coupon.service";
import { discountStatus } from "../../utils/roles";
import { YardSharp } from "@mui/icons-material";
import FileUpload from "../Utility/FileUpload";
import { generateFilePath } from "../Utility/utils";
export default function AddCoupon({ selectedDiscountObj, setSelectedDiscountObj, setReloadCount }) {

    const [type, setType] = useState(discountStatus.FLATOFF);
    const [description, setDescription] = useState("");
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [value, setValue] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [validFor, setValidFor] = useState(0);
    const [image, setImage] = useState("");
    const [minimumCartValue, setMinimumCartValue] = useState(0);
    const handleAddDiscount = async () => {
        try {
            if (value < 0) {
                toastError("Discount value cannot be less than 0")
                return
            }
            // else if (!validFor) {
            //     toastError("Valid for is mandatory")
            //     return
            // }
            // else if (validFor < 0) {
            //     toastError("Valid for how many users cannot be less than 0")
            //     return
            // }
            else if (minimumCartValue <= 0) {
                toastError("Minimum cart value cannot be less than 1")
                return
            }
            else if (!expiryDate) {
                toastError("Expiry Date cannot be less than 0")
                return
            }
            let obj = {
                discountCode,
                type,
                description,
                expiryDate,
                value,
                isActive,
                validFor,
                image,
                minimumCartValue
            };

            if (selectedDiscountObj?.discountCode) {
                let { data: res } = await updateDiscount(obj, selectedDiscountObj?._id);
                if (res.message) {
                    toastSuccess(res.message);
                    setSelectedDiscountObj({})
                    setReloadCount(prev => prev + 1)
                    handleClearAll()
                }
            }
            else {
                let { data: res } = await addDiscount(obj);
                if (res.message) {
                    toastSuccess(res.message);
                    setSelectedDiscountObj({})
                    setReloadCount(prev => prev + 1)
                    handleClearAll()
                }
            }
        }
        catch (err) {
            toastError(err)
        }
    };



    const handleClearAll = () => {
        setType(discountStatus.FLATOFF)
        setDescription("")
        setExpiryDate(new Date())
        setValue("")
        setIsActive(false)
        setDiscountCode("")
        setValidFor(0)
        setImage("")
        setMinimumCartValue(0)

    }

    useEffect(() => {
        if (selectedDiscountObj?.type) {
            setType(selectedDiscountObj?.type)
            setDescription(selectedDiscountObj?.description)
            setExpiryDate(selectedDiscountObj?.expiryDate)
            setValue(selectedDiscountObj?.value)
            setIsActive(selectedDiscountObj?.isActive)
            setDiscountCode(selectedDiscountObj?.discountCode)
            setValidFor(selectedDiscountObj?.validFor)
            setImage(selectedDiscountObj?.image)
            setMinimumCartValue(selectedDiscountObj?.minimumCartValue)
        }
    }, [selectedDiscountObj]);



    const handleAddValue = (amount) => {
        if (amount <= 100 && type && type.toLowerCase() == "percentage") {
            setValue(amount)
        }
        else if (amount > 100 && type && type.toLowerCase() == "percentage") {
            toastError("Amount cannot be more than 100")
        }
        else {
            setValue(amount)
        }
    }



    const handleFileSet = (e) => {
        setImage(e)
    }


    return (

        <div className={"makeChange"}>
            <form className="form row">
                <div className={"col-12"}>
                    <label className="blue-1 fs-12">
                        Discount Code <span className="red">*</span>
                    </label>
                    <input value={discountCode} onChange={(event) => setDiscountCode(event.target.value)} type="text" className="form-control" />
                </div>
                <div className={""}>
                    <label className="blue-1 fs-12">
                        Description
                    </label>
                    <input value={description} onChange={(event) => setDescription(event.target.value)} type="text" className="form-control" />
                </div>
                <div className={""}>
                    <label className="blue-1 fs-12">
                        Type <span className="red">*</span>
                    </label>

                    <div className="row">
                        <div className="col-6">
                            <input id="10000" checked={type == discountStatus.FLATOFF} onClick={(event) => { setType(discountStatus.FLATOFF); setValue(0); }} type="radio" className="me-2" />
                            <label htmlFor="10000" className="blue-1 fs-12">
                                Flat Off
                            </label>
                        </div>
                        <div className="col-6">
                            <input id="20000" checked={type == discountStatus.PERCENTAGE} onClick={(event) => { setType(discountStatus.PERCENTAGE); setValue(0) }} type="radio" className="me-2" />
                            <label htmlFor="20000" className="blue-1 fs-12">
                                Percentage Off
                            </label>
                        </div>
                    </div>
                </div>
                <div className={""}>
                    <label className="blue-1 fs-12">
                        Discount Value <span className="red">*</span>
                    </label>
                    <input value={value} onChange={(event) => handleAddValue(event.target.value)} type="number" className="form-control" />
                </div>
                <div className={""}>
                    <label className="blue-1 fs-12">
                        Expiry Date <span className="red">*</span>
                    </label>
                    <input value={moment(expiryDate).format("YYYY-MM-DD")} min={moment(new Date()).format("YYYY-MM-DD")} onChange={(event) => setExpiryDate(event.target.value)} type="date" className="form-control" />
                </div>
                {/* <div className={""}>
                    <label className="blue-1 fs-12">
                        Valid for how many users <span className="red">*</span>
                    </label>
                    <input value={validFor} onChange={(event) => setValidFor(event.target.value)} type="number" className="form-control" />
                </div> */}
                <div className={""}>
                    <label className="blue-1 fs-12">
                        Minimum cart value<span className="red">*</span>
                    </label>
                    <input value={minimumCartValue} onChange={(event) => setMinimumCartValue(event.target.value)} type="number" className="form-control" />
                </div>


                <div className={""}>
                    <label className="blue-1 fs-12">
                        Is Active  <span className="red">*</span>
                    </label>
                    <div className="row">
                        <div className="col-6">
                            <input id="12000" checked={isActive == true} onClick={(event) => setIsActive(true)} type="radio" className="me-2" />
                            <label htmlFor="12000" className="blue-1 fs-12">
                                Yes
                            </label>
                        </div>
                        <div className="col-6">
                            <input id="22000" checked={isActive == false} onClick={(event) => setIsActive(false)} type="radio" className="me-2" />
                            <label htmlFor="22000" className="blue-1 fs-12">
                                No
                            </label>
                        </div>

                    </div>
                </div>
                <div className="col-12">
                    <label className="blue-1 fs-12">UPLOAD PHOTO</label>
                    <img style={{ height: 80, width: 80, display: "block", margin: "10px 0px" }} src={image ? image.includes("base64") ? image : generateFilePath(image) : ""} alt="" />
                    <FileUpload onFileChange={handleFileSet} />
                    {/* <div className="form-text fs-12">(Ratio: (225 X 225)PX)</div> */}
                </div>

                <div className="col-12">
                    <CustomButton btntype="button" ClickEvent={handleAddDiscount} iconName="fa-solid fa-check" btnName="Save" isBtn small={true} />
                </div>
            </form>
        </div>
    );
}
