import React, { useEffect, useState } from "react";
import Select from "react-select";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import FileUpload from "../../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { STATEGet } from "../../../redux/actions/State/State.actions";
import { CountryGet } from "../../../redux/actions/Country/Country.actions";
import { CityAdd, CityGet, SetCityObj, CityUpdate, CityDelete } from "../../../redux/actions/City/City.actions";
import ReactQuill from "react-quill";
function AddCity({ makeChange }) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [status, setStatus] = useState(generalModelStatuses.APPROVED);
    const [stateArr, setStateArr] = useState([]);
    const [stateId, setStateId] = useState("");
    const [stateObj, setStateObj] = useState({});
    const [countryArr, setCountryArr] = useState([]);
    const [countryId, setCountryId] = useState("");
    const [countryObj, setCountryObj] = useState({});
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const cityObj = useSelector((cities) => cities.cities.cityObj);
    const countriesArr = useSelector((countries) => countries.countries.countries);
    const statesArr = useSelector((states) => states.states.states);
    const handleAddCategory = () => {
        let obj = {
            name,
            status,
            stateId,
            countryId,
            description,
            imageUrl,
        };
        console.log(obj, "City obj");

        if (cityObj?._id) {
            dispatch(CityUpdate(cityObj._id, obj));
            dispatch(SetCityObj(null))
        } else {
            dispatch(CityAdd(obj));
        }
    };

    const handleSetImage = (value) => {
        setImageUrl(value)
    }


    useEffect(() => {
        if (cityObj) {
            setName(cityObj?.name);
            setStatus(cityObj?.status);
            setStateId(cityObj.stateId)
            setCountryId(cityObj.countryId)
            setDescription(`${cityObj?.description ? cityObj?.description : ""}`)
            setImageUrl(cityObj?.imageUrl)
            if (countryArr && countryArr.length > 0) {
                console.log(...countryArr.filter(el => el._id == cityObj?.countryId), "stateArr.filter(el => el._id == cityObj.stateId)")
                setCountryObj(...countryArr.filter(el => el._id == cityObj?.countryId).map(el => { return { ...el, label: el.name, value: el._id } }))
            }
            if (stateArr && stateArr.length > 0) {
                console.log(...stateArr.filter(el => el._id == cityObj?.stateId), "stateArr.filter(el => el._id == cityObj.stateId)")
                setStateObj(...stateArr.filter(el => el._id == cityObj?.stateId).map(el => { return { ...el, label: el.name, value: el._id } }))

            }
        }

    }, [cityObj]);




    useEffect(() => {
        dispatch(STATEGet());
        dispatch(CountryGet());
    }, [cityObj])

    useEffect(() => {
        if (statesArr) {
            console.log(statesArr, 'steas  Arrat')
            setStateArr(statesArr)
        }
        if (countriesArr) {
            setCountryArr(countriesArr)
        }
    }, [statesArr, countriesArr]);



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
                        options={countryArr && countryArr.length > 0 && countryArr.map(el => { return { ...el, value: el._id, label: el.name } })}
                        placeholder="Select from options"
                        defaultInputValue={countryId}
                        value={countryObj}
                        onChange={(e) => {
                            console.log(e, "asd")
                            setCountryId(e.value);
                            setCountryObj(e);
                            setStateId("");
                            setStateObj({});
                            dispatch(STATEGet(`countryId=${e.value}`));
                        }}
                    />
                </div>
                <div className="col-12 col-md-12">
                    <label>
                        State <span className="red">*</span>
                    </label>
                    <Select
                        options={stateArr && stateArr.length > 0 && stateArr.map(el => { return { ...el, value: el._id, label: el.name } })}
                        placeholder="Select from options"
                        defaultInputValue={stateId} value={stateObj}
                        onChange={(e) => {
                            console.log(e, "asd")
                            setStateId(e.value);
                            setStateObj(e);
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
