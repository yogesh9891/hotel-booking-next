import React, { useEffect, useState } from "react";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";
import { useDispatch, useSelector } from "react-redux";
import { AMENITY_Add } from "../../../redux/actions/Amenity/Amenity.action";
import { toastError } from "../../../utils/toastUtils";
import { amenityCategoryUpdate, AMENITY_CATEGORY_Add, SetAmenityCategoryObj } from "../../../redux/actions/AmenityCategory/AmenityCategory.action";


export default function AddAmenityCategory() {

    const [amenityTitle, setAmenityTitle] = useState("");
    const [editModeActive, setEditModeActive] = useState(false);
    const dispatch = useDispatch()

    const amenityCategoryObj = useSelector(state => state.amenityCategory.amenityCategoryObj)
    const handleSubmit = () => {
        if (amenityTitle == "") {
            toastError("Amenity Name cannot be empty")
            return;
        }

        let obj = {
            name: amenityTitle,
        }
        if (editModeActive) {
            dispatch(amenityCategoryUpdate(obj, amenityCategoryObj._id))
            dispatch(SetAmenityCategoryObj({}))
        }
        else {
            dispatch(AMENITY_CATEGORY_Add(obj))
        }
    }



    useEffect(() => {
        if (amenityCategoryObj && amenityCategoryObj.name) {
            setAmenityTitle(amenityCategoryObj.name)
            setEditModeActive(true)
        }
    }, [amenityCategoryObj])



    return (
        <main>
            <section className="product-category">
                <div className="container-fluid p-0">
                    <h5 className="blue-1 mb-4">{`${editModeActive ? "Edit" : "Add New"}`} Amenity Category</h5>
                    <DashboardBox>
                        <form className="form row">
                            <h5 className="blue-1 mb-4">Amenity Category Name</h5>
                            <div className="col-12 col-md-4 mb-3">
                                <label>
                                    Amenity Category <span className="red">*</span>
                                </label>
                                <input
                                    name="first_name"
                                    className="form-control"
                                    type="text"
                                    required=""
                                    value={amenityTitle}
                                    onChange={(e) => setAmenityTitle(e.target.value)}
                                />
                            </div>
                            <div className="col-12 mt-2 text-center">
                                <CustomButton
                                    isBtn
                                    btntype="button"
                                    iconName="fa-solid fa-check"
                                    btnName="Create"
                                    ClickEvent={() => handleSubmit()}
                                />
                            </div>
                        </form>
                    </DashboardBox>
                </div>
            </section>
        </main>
    );
}