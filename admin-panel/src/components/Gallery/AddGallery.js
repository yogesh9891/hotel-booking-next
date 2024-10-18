import React, { useEffect, useState } from "react";
import Select from "react-select";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import FileUpload from "../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { SETGALLERYOBJ, GALLERYADD, GALLERYGET, GALLERYUPDATE } from "../../redux/actions/Gallery/Gallery.actions";
import { toastError } from "../Utility/ToastUtils";
import { generateFilePath } from "../Utility/utils";
function AddGallery({makeChange}) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [galleryId, setGalleryId] = useState("")
    const [imageUrl, setImageUrl] = useState("");
    const [place, setplace] = useState("");
    const [galleryType, setgalleryType] = useState("horizontal");
    const [status, setStatus] = useState(generalModelStatuses.APPROVED);
    const galleryObj = useSelector((state) => state.gallery.galleryObj);
    const handleAddCategory = () => {

        if (name == "") {
            toastError("Name is mandatory !")
            return;
        }
        if (description == "") {
            toastError("description is mandatory !")
            return;
        }
        if (imageUrl == "") {
            toastError("Image is mandatory !")
            return;
        }
        let obj = {
            name,
            description,
            imageUrl,
            galleryType,
            status,
        };
        console.log(obj, "category obj",galleryId);

        if (galleryObj?._id) {
            dispatch(GALLERYUPDATE(galleryId, obj));
            dispatch(SETGALLERYOBJ(null))
        } else {
            dispatch(GALLERYADD(obj));
        }
        dispatch(GALLERYGET());
    };

    useEffect(() => {
        if (galleryObj) {
            setName(galleryObj?.name);
            setDescription(galleryObj?.description);
            setImageUrl(galleryObj?.imageUrl);
            setgalleryType(galleryObj?.galleryType);
            setStatus(galleryObj?.status);
            setGalleryId(galleryObj?._id)
        }

        // return () => {
        //     dispatch(SETGALLERYOBJ(null));
        // };
    }, [galleryObj]);

    // useEffect(() => {
    //     dispatch(CATEGORYGet());
    // }, []);



    return (
        <div className={makeChange ? "makeChange" : ""}>
            <form className="form row">
                <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
                    <label className="blue-1 fs-12">
                        Title <span className="red">*</span>
                    </label>
                    <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                </div>

                {
                    imageUrl && `${imageUrl}` !== "" && (
                        <div className="pt-3 col-4 col-md-12 mb-3"  >
                            {
                                `${imageUrl}`.includes('data:image') ? (
                                    <img src={imageUrl} className="image-fluid" width="100px"  />
                                ) : ( <img src={generateFilePath(imageUrl)}   className="image-fluid" width="100px"  />)
                            }
                        </div>
                    )
                }
              
                <div className="pt-3 col-4 col-md-12 mb-3"  >
                    <label htmlFor="">
                        Image
                    </label>
                    <FileUpload onFileChange={(val) => setImageUrl(val)} />
                </div>
                <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
                    <label className="blue-1 fs-12">
                        Descriptions <span className="red">*</span>
                    </label>
                    <textarea className="form-control" value={description} onChange={(event) => setDescription(event.target.value)}> </textarea>
                </div>
                {/* <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
                    <label className="blue-1 fs-12">
                        Place <span className="red">*</span>
                    </label>
                    <input value={place} onChange={(event) => setplace(event.target.value)} type="text" className="form-control" />
                </div> */}
                    <div className={makeChange ? "col-12 col-md-4" : "col-12"}>
                    <label className="blue-1 fs-12">Image Type</label>
                    <div className="d-flex">
                        <div className="form-check form-check-inline d-flex align-items-center">
                            <input className="form-check-input" checked={galleryType == 'horizontal'} onClick={() => setgalleryType('horizontal')} type="radio" />
                            <label className="form-check-label fs-14" htmlFor="category-Radio1">
                                Horizontal
                            </label>
                        </div>
                        <div className="form-check form-check-inline d-flex align-items-center">
                            <input className="form-check-input" type="radio" checked={galleryType == 'vertical'}  onClick={() => setgalleryType('vertical')} />
                            <label className="form-check-label fs-14" htmlFor="category-Radio2">
                                Vertical
                            </label>
                        </div>
                    </div>
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

export default AddGallery;
