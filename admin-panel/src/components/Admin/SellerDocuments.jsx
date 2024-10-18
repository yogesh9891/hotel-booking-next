import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { deleteDocument, updateDocuments } from "../../services/users.service";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { useSelector, useDispatch } from "react-redux";
import FileUpload from "../Utility/FileUpload";
import { generateFilePath } from "../Utility/utils";
import { getUserById } from "../../redux/actions/Users/users.actions";
import { toastError } from "../Utility/ToastUtils";
import { toastSuccess } from "../../utils/toastUtils";
export default function SellerDocuments() {
    // ============================================================================================
    const [customAddressSet, setCustomAddressSet] = useState("");

    const [documentsArr, setDocumentsArr] = useState([]);
    const [currentDocumentsArr, setCurrentDocumentsArr] = useState([{ documentUrl: "" }]);
    const user = useSelector((state) => state.auth.user);
    const userObj = useSelector((state) => state.users.userObj);

    const dispatch = useDispatch()








    const handleDelete = async (e, id) => {
        e.preventDefault()

        try {
            let { data: res } = await deleteDocument(user._id, { documentUrlId: id });
            if (res) {
                toastSuccess(res.message)
                console.log(res.message)
                handleGetUsers()
            }
        }
        catch (err) {

        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let { data: res } = await updateDocuments(user._id, { documentArr: currentDocumentsArr.filter(el => el.documentUrl != "") });
            if (res) {
                toastSuccess(res.message)
                console.log(res.message)
                handleGetUsers()
            }
        }
        catch (err) {

        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setCurrentDocumentsArr(previousState => {
            return [...previousState, { documentUrl: "" }]
        })
    }


    const handleRemove = (e) => {
        e.preventDefault()
        if (currentDocumentsArr.length > 1) {
            let tempArr = currentDocumentsArr.filter((el, index, arr) => index != (arr.length - 1))
            setCurrentDocumentsArr([...tempArr])
        }
    }


    const handleFileSet = (value, index) => {
        console.log(index, "index", value, "base64")
        let tempArr = currentDocumentsArr
        tempArr[index].documentUrl = value
        setCurrentDocumentsArr([...tempArr])
    }


    const handleGetUsers = () => {
        try {
            dispatch(getUserById(user._id))
        }
        catch (err) {
            toastError(err)
        }
    }


    useEffect(() => {
        if (userObj.documentArr) {
            setDocumentsArr([...userObj.documentArr])
        }

    }, [userObj])

    useEffect(() => {
        handleGetUsers()
    }, [])
    // ============================================================================================

    return (
        <DashboardTable>
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="blue-1">Documents</h5>
            </div>
            <form className="form">
                <div className="col-2 mb-4 d-flex justify-content-between mt-2 text-center">
                    <CustomButton
                        ClickEvent={(e) => handleAdd(e)}
                        isBtn
                        noIcon
                        iconName="fa-solid fa-check"
                        btnName="+"
                    />
                    <CustomButton
                        ClickEvent={(e) => handleRemove(e)}
                        isBtn
                        noIcon
                        iconName="fa-solid fa-check"
                        btnName="-"
                    />
                </div>
                {
                    currentDocumentsArr && currentDocumentsArr.length > 0 && currentDocumentsArr.map((el, index) => {
                        return (
                            <div key={index} className="col-12 col-md-6">
                                <label>
                                    Document {index + 1} <span className="red">*</span>
                                </label>
                                <FileUpload acceptImage={true} onFileChange={(value) => handleFileSet(value, index)} />
                            </div>
                        )
                    })
                }
                <div className="col-2 mt-5 text-center">
                    <CustomButton
                        ClickEvent={(e) => handleSubmit(e)}
                        isBtn
                        iconName="fa-solid fa-check"
                        btnName="Add Documents"
                    />
                </div>
            </form>
            <p className="blue-1 mt-5">
                Documents will be displayed here if it is uploaded !
            </p>
            <div className="row">

                {
                    documentsArr && documentsArr.length > 0 && documentsArr.map((el, index) => {
                        return (
                            <div key={index} className="col-4 col-md-4">
                                <label style={{ fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>
                                    Existing Document {index + 1} <span className="red">*</span>
                                </label>
                                <br />
                                <div style={{ height: 150, width: 150, position: "relative" }}>
                                    <img style={{ height: 150, width: 150 }} src={generateFilePath(el.documentUrl)} alt="" />
                                    <div onClick={(e) => handleDelete(e, el._id)} style={{ display: "grid", placeItems: "center", border: "solid grey 1px", borderRadius: 25, width: 30, position: "absolute", top: -5, right: -10 }}>
                                        X
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </DashboardTable>
    )
}
