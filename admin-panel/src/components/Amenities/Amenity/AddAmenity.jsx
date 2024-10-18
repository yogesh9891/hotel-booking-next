import React, { useEffect, useState } from "react";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../../utils/toastUtils";
import {
  AMENITY_Add,
  SetAmenityObj,
  amenityUpdate,
} from "../../../redux/actions/Amenity/Amenity.action";
import Select from "react-select";
import { amenityCategoryGet } from "../../../redux/actions/AmenityCategory/AmenityCategory.action";
import FileUpload from "../../Utility/FileUpload";
import { generateFilePath } from "../../Utility/utils";

export default function AddAmenity() {
  const [name, setName] = useState("");
  const [editModeActive, setEditModeActive] = useState(false);
  const dispatch = useDispatch();

  const amenityObj = useSelector((state) => state.amenity.amenityObj);
  const amenityCategoryArr = useSelector(
    (state) => state.amenityCategory.amenityCategoryArr
  );
  const [image, setimage] = useState("");
  const [displayAmenityCategoryArr, setDisplayAmenityCategoryArr] = useState(
    []
  );
  const [selectedAmenityCategory, setSelectedAmenityCategory] = useState("");
  const [selectedAmenityCategoryObj, setSelectedAmenityCategoryObj] = useState(
    []
  );

  const handleSubmit = () => {
    if (name == "") {
      toastError("Amenity Name cannot be empty");
      return;
    }
    if (selectedAmenityCategory == "") {
      toastError("Amenity Category must be selected to proceed");
      return;
    }

    let obj = {
      name: name,
      amenityCategoryId: selectedAmenityCategory,
      image,
    };
    if (editModeActive) {
      dispatch(amenityUpdate(obj, amenityObj._id));
      dispatch(SetAmenityObj({}));
    } else {
      dispatch(AMENITY_Add(obj));
    }
  };

  useEffect(() => {
    dispatch(amenityCategoryGet());
  }, []);

  useEffect(() => {
    if (amenityObj && amenityObj.name) {
      setName(amenityObj.name);
      setimage(amenityObj.image);
      setSelectedAmenityCategory(amenityObj.amenityCategoryId);
      setSelectedAmenityCategoryObj({
        label: amenityObj.amenityCategoryObj.name,
        value: amenityObj.amenityCategoryObj._id,
        ...amenityObj.amenityCategoryObj,
      });
      setEditModeActive(true);
    }
  }, [amenityObj]);

  useEffect(() => {
    if (amenityCategoryArr && amenityCategoryArr.length > 0) {
      setDisplayAmenityCategoryArr(amenityCategoryArr);
    }
  }, [amenityCategoryArr]);

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">
            {`${editModeActive ? "Edit" : "Add New"}`} Amenity
          </h5>
          <DashboardBox>
            <form className="form row">
              <h5 className="blue-1 mb-4">Amenity Name</h5>
              <div className="col-12 col-md-6">
                <label>
                  Amenity Category <span className="red">*</span>
                </label>
                <Select
                  options={
                    displayAmenityCategoryArr &&
                    displayAmenityCategoryArr.map((el) => {
                      return { ...el, value: el._id, label: el.name };
                    })
                  }
                  placeholder="Select from options"
                  defaultInputValue={selectedAmenityCategory}
                  value={selectedAmenityCategoryObj}
                  onChange={(e) => {
                    console.log(e, "asd");
                    setSelectedAmenityCategory(e.value);
                    setSelectedAmenityCategoryObj(e);
                  }}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label>
                  Amenity <span className="red">*</span>
                </label>
                <input
                  name="first_name"
                  className="form-control"
                  type="text"
                  required=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-3">
                {image && image.includes("base64") ? (
                  <img src={image} width="50px" />
                ) : (
                  <img src={generateFilePath(image)} width="50px" />
                )}
              </div>
              <div className="col-12 col-md-6  mb-3">
                <label htmlFor="">Icon Image</label>
                <FileUpload onFileChange={(val) => setimage(val)} />
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
