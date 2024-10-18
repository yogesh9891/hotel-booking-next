import React, { useEffect, useState } from "react";
import Select from "react-select";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import FileUpload from "../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { SetSeoObj, SeoAdd, SeoUpdate, SeoGet } from "../../redux/actions/Seo/Seo.actions";
import ReactQuill from "react-quill";
import { toastError } from "../Utility/ToastUtils";
function AddSeo({ makeChange }) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [keywords, setKeywords] = useState("");
    const [status, setStatus] = useState(generalModelStatuses.APPROVED);
    const statesObj = useSelector((seos) => seos.seo.seoObj);
    const handleAddSeo = () => {
        if (name == "") {
            toastError("Name is mandatory !")
            return;
        }
        if (description == "") {
            toastError("Description is mandatory !")
            return;
        }
        if (title == "") {
            toastError("Title is mandatory !")
            return;
        }
        if (keywords == "") {
            toastError("keywords is mandatory !")
            return;
        }
        if (url == "") {
            toastError("Url is mandatory !")
            return;
        }
        // if (imageUrl == "") {
        //     toastError("Image is mandatory !")
        //     return;
        // }

        let obj = {
            name,
            status,
            description,
            url,
            keywords,
            title,
            imageUrl
        };
        console.log(obj, "category obj");

        if (statesObj?._id) {
            dispatch(SeoUpdate(statesObj._id, obj));
            console.log('sdfndsfsdjhsdjkfsdhjkhfjksdhkjhkj')
            dispatch(SetSeoObj(null))
            setName('')
            setDescription("")
            setImageUrl("")
            setUrl("")
            setTitle("")
            setKeywords("")


        } else {
            dispatch(SeoAdd(obj));
            setName('')
            setDescription("")
            setImageUrl("")
            setUrl("")
            setTitle("")
            setKeywords("")

        }

        dispatch(SeoGet());
    };

    useEffect(() => {
        if (statesObj) {
            console.log('sdfndsfsdjhsdjkfsdhjkhfjksdhkjhkj')

            setName(statesObj?.name);
            setStatus(statesObj?.status);
            setDescription(statesObj.description)
            setImageUrl(statesObj?.imageUrl)
            setUrl(statesObj?.url)
            setTitle(statesObj?.title)
            setKeywords(statesObj?.keywords)

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
                        Page Name <span className="red">*</span>
                    </label>
                    <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                </div>
                <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
                    <label className="blue-1 fs-12">
                        Url <span className="red">*</span>
                    </label>
                    <input value={url} onChange={(event) => setUrl(event.target.value)} type="text" className="form-control" />
                </div>
                <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
                    <label className="blue-1 fs-12">
                        Title <span className="red">*</span>
                    </label>
                    <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" className="form-control" />
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
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    {/* <ReactQuill value={description} onChange={(e) => setDescription(e)} /> */}
                </div>
                <div className="col-12">
                    <label>
                        Keywords<span className="red">*</span>
                    </label>
                    <textarea className="form-control" value={keywords} onChange={(e) => setKeywords(e.target.value)}></textarea>
                    {/* <ReactQuill value={description} onChange={(e) => setDescription(e)} /> */}
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
                    <CustomButton btntype="button" ClickEvent={handleAddSeo} iconName="fa-solid fa-check" btnName="Save" isBtn small={makeChange ? true : false} />
                </div>
            </form>
        </div>
    );
}

export default AddSeo;
