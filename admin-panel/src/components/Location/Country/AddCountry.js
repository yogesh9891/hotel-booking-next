import React, { useEffect, useState } from "react";
import Select from "react-select";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import FileUpload from "../../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { SetCountryObj, CountryAdd, CountryUpdate } from "../../../redux/actions/Country/Country.actions";
import ReactQuill from "react-quill";
import { toastError } from "../../Utility/ToastUtils";
function AddCountry({ makeChange }) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [status, setStatus] = useState(generalModelStatuses.APPROVED);
    const statesObj = useSelector((countries) => countries.countries.countryObj);
    const handleAddCountry = () => {
        if (name == "") {
            toastError("Name is mandatory !")
            return;
        }
        if (description == "") {
            toastError("Description is mandatory !")
            return;
        }
        if (imageUrl == "") {
            toastError("Image is mandatory !")
            return;
        }

        let obj = {
            name,
            status,
            description,
            imageUrl
        };
        console.log(obj, "category obj");

        if (statesObj?._id) {
            dispatch(CountryUpdate(statesObj._id, obj));
            console.log('sdfndsfsdjhsdjkfsdhjkhfjksdhkjhkj')
            dispatch(SetCountryObj(null))
            setName('')
            setDescription("")
            setImageUrl("")
        } else {
            dispatch(CountryAdd(obj));
            setName('')
            setDescription("")
            setImageUrl("")
        }
    };

    useEffect(() => {
        if (statesObj) {
            setName(statesObj?.name);
            setStatus(statesObj?.status);
            setDescription(`${statesObj?.description ? statesObj?.description : ""}`)
            setImageUrl(statesObj?.imageUrl)
        }

        // return () => {
        //     dispatch(SETSTATEOBJ(null));
        // };
    }, [statesObj]);

    const handleSetImage = (value) => {
        setImageUrl(value)
    }



    return (
        <div className={makeChange ? "makeChange" : ""}>
            <form className="form row">
                <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
                    <label className="blue-1 fs-12">
                        Name <span className="red">*</span>
                    </label>
                    <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                </div>
                <div className="pt-3 col-4 col-md-12 mb-3"  >
                    <label htmlFor="">
                        Image
                    </label>
                    <FileUpload onFileChange={(val) => handleSetImage(val)} />
                </div>
                <div className="col-12">
                    <label>
                        DESCRIPTION<span className="red">*</span>
                    </label>
                    <ReactQuill value={description} onChange={(e) => setDescription(e)} />
                </div>
                <div className={makeChange ? "col-12 col-md-4" : "col-12"}>
                    <label className="blue-1 fs-12">Status</label>
                    <div className="d-flex">
                        <div className="form-check form-check-inline d-flex align-items-center">
                            <input className="form-check-input" checked={status == generalModelStatuses.APPROVED} onClick={() => setStatus(generalModelStatuses.APPROVED)} type="radio" />
                            <label className="form-check-label fs-14" htmlFor="category-Radio1">
                                Active
                            </label>
                        </div>
                        <div className="form-check form-check-inline d-flex align-items-center">
                            <input className="form-check-input" type="radio" checked={status == generalModelStatuses.DECLINED} onClick={() => setStatus(generalModelStatuses.DECLINED)} />
                            <label className="form-check-label fs-14" htmlFor="category-Radio2">
                                Inactive
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <CustomButton btntype="button" ClickEvent={handleAddCountry} iconName="fa-solid fa-check" btnName="Save" isBtn small={makeChange ? true : false} />
                </div>
            </form>
        </div>
    );
}

export default AddCountry;
