import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import { CountryGet } from "../../../redux/actions/Country/Country.actions";
import { STATEUpdate, STATEAdd, SETSTATEObj } from "../../../redux/actions/State/State.actions";
import FileUpload from "../../Utility/FileUpload";
import ReactQuill from "react-quill";
function AddCity({ makeChange }) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [status, setStatus] = useState(generalModelStatuses.APPROVED);
    const [countryArr, setCountryArr] = useState([]);
    const [countryId, setCountryId] = useState("");
    const [countryObj, setCountryObj] = useState({});
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const stateObj = useSelector((states) => states.states.stateObj);
    const countriesArr = useSelector((countries) => countries.countries.countries);

    useEffect(() => {
        dispatch(CountryGet());
    }, [])

    useEffect(() => {
        if (countriesArr) {
            setCountryArr(countriesArr)
        }
    }, [countriesArr]);

    const handleAddCategory = () => {
        let obj = {
            name,
            countryId: countryId,
            status,
            description,
            imageUrl,
        };

        if (stateObj?._id) {
            dispatch(STATEUpdate(stateObj._id, obj));
            dispatch(SETSTATEObj(null))
        } else {
            dispatch(STATEAdd(obj));
        }
    };

    const handleSetImage = (value) => {
        setImageUrl(value)
    }

    useEffect(() => {
        if (stateObj) {
            setName(stateObj?.name);
            setStatus(stateObj?.status);
            setCountryId(stateObj.stateId);
            setDescription(`${stateObj?.description ? stateObj?.description : ""}`)
            setImageUrl(stateObj?.imageUrl)
            if (countryArr && countryArr.length > 0) {
                console.log(...countryArr.filter(el => el._id == stateObj.countryId), "countryArr.filter(el => el._id == stateObj.countryId)")
                setCountryObj(...countryArr.filter(el => el._id == stateObj.countryId).map(el => { return { ...el, label: el.name, value: el._id } }))
            }
        }
    }, [stateObj, countryArr]);

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
                <div className="col-12 col-md-12">
                    <label>
                        Country <span className="red">*</span>
                    </label>
                    <Select
                        options={countryArr.map(el => { return { ...el, value: el._id, label: el.name } })}
                        placeholder="Select from options"
                        defaultInputValue={countryId} value={countryObj}
                        onChange={(e) => {
                            console.log(e, "asd")
                            setCountryId(e.value);
                            setCountryObj(e);
                        }}
                    />
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
                    <CustomButton btntype="button" ClickEvent={handleAddCategory} iconName="fa-solid fa-check" btnName="Save" isBtn small={makeChange ? true : false} />
                </div>
            </form>
        </div>
    );
}

export default AddCity;
