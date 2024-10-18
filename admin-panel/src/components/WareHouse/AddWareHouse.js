import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Switch } from "@mui/material";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import FileUpload from "../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORYAdd, CATEGORYGet, CATEGORYUpdate, SetCATEGORYObj } from "../../redux/actions/Category/Category.actions";
import { SETSTATEOBJ, STATEADD, STATEGET, STATEUPDATE } from "../../redux/actions/Country/Country.actions";
import { CITYGET } from "../../redux/actions/State/State.actions";
import { AREAADD, AREAGET, AREAUPDATE, SETAREAOBJ } from "../../redux/actions/City/City.actions";
import { WAREHOUSEADD, WAREHOUSEUPDATE, SETWAREHOUSEOBJ } from "../../redux/actions/WareHouse/WareHouse.actions";
function AddWareHouse({ makeChange }) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isStore, setIsStore] = useState(false);
    const [status, setStatus] = useState(generalModelStatuses.APPROVED);
    const [stateId, setStateId] = useState("");
    const [stateObj, setStateObj] = useState({});
    const [cityArr, setCityArr] = useState([]);
    const [stateArr, setStateArr] = useState([]);
    const [areaArr, setAreaArr] = useState([]);
    const [cityId, setCityId] = useState("");
    const [citiesObj, setCitiesObj] = useState({});

    const [areaId, setAreaId] = useState("");
    const [areasObj, setAreasObj] = useState({});

    const statesObj = useSelector((state) => state.states.statesObj);
    const cityObj = useSelector((state) => state.city.citiesObj);
    const statesArr = useSelector((state) => state.states.states);
    const citiesArr = useSelector((state) => state.city.cities);
    const areasArr = useSelector((state) => state.area.areas);
    const areaObj = useSelector((state) => state.area.areasObj);
    const wareHouseObj = useSelector((state) => state.warehouse.warehousesObj);
    const handleAddCategory = () => {
        const role = isStore ? 'STORE' : 'WAREHOUSE';
        let obj = {
            name,
            status,
            stateId,
            areaId,
            cityId,
            isStore,
            "user": {
                "name": userName,
                email,
                password,
                role
            }
        };
        console.log(obj, "ware hoaw obj");

        if (wareHouseObj?._id) {
            dispatch(WAREHOUSEUPDATE(wareHouseObj._id, obj));
            dispatch(SETWAREHOUSEOBJ(null))
        } else {
            dispatch(WAREHOUSEADD(obj));
        }
    };

    useEffect(() => {
        if (wareHouseObj) {
            setName(wareHouseObj?.name);
            setStatus(wareHouseObj?.status);
            setEmail(wareHouseObj?.userObj?.email);
            setUserName(wareHouseObj?.userObj?.name);
            setPassword(wareHouseObj?.userObj?.password);
            setIsStore(wareHouseObj?.isStore);
            setStateId(wareHouseObj?.stateId);
            setCityId(wareHouseObj?.cityId);
            setAreaId(wareHouseObj?.areaId);
            if (stateArr && stateArr.length > 0) {
                setStateObj(...stateArr.filter(el => el._id == wareHouseObj?.stateId).map(el => { return { ...el, label: el.name, value: el._id } }))
            }
            setCitiesObj(...citiesArr.filter(el => el._id == wareHouseObj?.cityId).map(el => { return { ...el, label: el.name, value: el._id } }))
            setAreasObj(...areasArr.filter(el => el._id == wareHouseObj?.areaId).map(el => { return { ...el, label: el.name, value: el._id } }))

        }
        console.log(wareHouseObj, "wareHouseObj *************************************************************************************************************** wareHouseObj")
        // console.log(areasObj, "Areaa On=bh");
        // console.log(citiesObj, "state On=bh");
        // console.log(stateObj, "city On=bh");
    }, [wareHouseObj, stateArr, cityArr, areaArr, citiesArr, areasArr]);




    useEffect(() => {
        dispatch(STATEGET());
        dispatch(CITYGET());
        dispatch(AREAGET());
    }, [wareHouseObj])


    useEffect(() => {


        if (statesArr) {
            setStateArr(statesArr)
        }
        if (citiesArr) {
            setCityArr(citiesArr)
        }
        if (areasArr) {
            setAreaArr(areasArr)
        }
    }, [statesArr, citiesArr, areasArr]);



    // useEffect(() => {
    //     dispatch(CATEGORYGet());
    // }, []);



    return (
        <div className={makeChange ? "makeChange" : ""}>
            <form className="form row">
                <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
                    <label className="blue-1 fs-12">
                        Name <span className="red">*</span>
                    </label>
                    <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                </div>
                <div className="col-12 col-md-12">
                    <label className="blue-1 fs-12">
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
                            dispatch(CITYGET(`stateId=${e.value}`));
                        }}
                    />
                </div>
                <div className="col-12 col-md-12">
                    <label className="blue-1 fs-12">
                        City <span className="red">*</span>
                    </label>
                    <Select
                        options={cityArr && cityArr.length && cityArr.map(el => { return { ...el, value: el._id, label: el.name } })}
                        placeholder="Select from options"
                        defaultInputValue={cityId} value={citiesObj}
                        onChange={(e) => {
                            console.log(e, "asd")
                            setCityId(e.value);
                            setCitiesObj(e);
                            dispatch(AREAGET(`cityId=${e.value}`));

                        }}
                    />
                </div>
                <div className="col-12 col-md-12">
                    <label className="blue-1 fs-12">
                        Area <span className="red">*</span>
                    </label>
                    <Select
                        options={areaArr && areaArr.length && areaArr.map(el => { return { ...el, value: el._id, label: el.name } })}
                        placeholder="Select from options"
                        defaultInputValue={areaId} value={areasObj}
                        onChange={(e) => {
                            console.log(e, "area")
                            setAreaId(e.value);
                            setAreasObj(e);

                        }}
                    />
                </div>
                <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
                    <label className="blue-1 fs-12">
                        User Name <span className="red">*</span>
                    </label>
                    <input value={userName} onChange={(event) => setUserName(event.target.value)} type="text" className="form-control" />
                </div>
                <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
                    <label className="blue-1 fs-12">
                        User Email <span className="red">*</span>
                    </label>
                    <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" className="form-control" />
                </div>
                <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
                    <label className="blue-1 fs-12">
                        User Password <span className="red">*</span>
                    </label>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" />
                </div>
                <div className="col-12">
                    <label className="blue-1 fs-12 me-5">
                        Is Store  <span className="red">*</span>
                    </label>
                    <Switch onChange={(e) => setIsStore(!isStore)} checked={isStore} />

                </div>
                <div className={makeChange ? "col-12 col-md-4" : "col-12"}>
                    <label className="blue-1 fs-12">Status</label>
                    <div className="d-flex">
                        <div className="form-check form-check-inline d-flex align-items-center">
                            <input className="form-check-input" checked={status == generalModelStatuses.APPROVED} onChange={() => setStatus(generalModelStatuses.APPROVED)} type="radio" />
                            <label className="form-check-label fs-14" htmlFor="category-Radio1">
                                Active
                            </label>
                        </div>
                        <div className="form-check form-check-inline d-flex align-items-center">
                            <input className="form-check-input" type="radio" checked={status == generalModelStatuses.DECLINED} onChange={() => setStatus(generalModelStatuses.DECLINED)} />
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

export default AddWareHouse;
