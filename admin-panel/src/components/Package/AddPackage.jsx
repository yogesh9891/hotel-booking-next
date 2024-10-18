import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // ES6
import { generalModelStatuses } from "../Utility/constants";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import { useSelector, useDispatch } from "react-redux";
import { getAllNestedCategories } from "../../redux/actions/Category/Category.actions";
import { PackageAdd, PackageUpdate, SetPackageObj } from "../../redux/actions/Package/Package.actions";
import { generateFilePath } from "../Utility/utils";

const AddPackage = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("")
  const [duration, setDuration] = useState("")
  const [timeFrom, setTimeFrom] = useState("")
  const [timeTo, setTimeTo] = useState("")
  const [price, setPrice] = useState("")
  const [isVisa, setIsVisa] = useState(false)
  const [description, setDescription] = useState("");
  const [mainCategoryArr, setMainCategoryArr] = useState([]);
  const [mainImageStr, setMainImageStr] = useState("");
  const [bannerImageStr, setBannerImageStr] = useState("");
  const [status, setStatus] = useState(generalModelStatuses.APPROVED);
  const [selectedCategoryArr, setSelectedCategoryArr] = useState([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaImage, setMetaImage] = useState("");

  const yearArr = [
    "Jan",
    "Feb",
    "Apr",
    "Mar",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];


  ///////////////////////////////////////////////////////////////
  const authUser = useSelector((state) => state.auth.user);
  const categoryArr = useSelector((state) => state.category.categories);
  const packageObj = useSelector((state) => state.packages.packageObj);

  const handleFilterChecked = (arr) => {
    if (arr.length > 0 && arr) {
      return arr.map(el => {
        if (el.subCategoryArr && el.subCategoryArr.length > 0 && el.checked) {
          let tempArr = selectedCategoryArr;
          if (tempArr.some(el => el != el._id)) {
            tempArr.push(el._id)
          }
          setSelectedCategoryArr([...tempArr])
          return { ...el, categoryId: el._id, subCategoryArr: handleFilterChecked(el.subCategoryArr) };
        }
        else {
          if (el.checked) {
            let tempArr = selectedCategoryArr;
            if (tempArr.some(el => el != el._id)) {
              tempArr.push(el._id)
            }
            setSelectedCategoryArr([...tempArr])
            return { ...el, categoryId: el._id }
          }
        }
      })
    }
    else {
      return arr
    }
  }

  const handleSubmit = () => {


    let cat_arr = returnSelectedCategories(mainCategoryArr);
    let tempCategoryArr = handleFilterChecked(mainCategoryArr)
    // let tempCategoryArr = handleFilterChecked(mainCategoryArr)
    console.log(selectedCategoryArr, "selectedCategoryArr")
    // console.log(selectedCategoryArr, "selectedCategoryArr")
    let obj = {
      categoryArr: cat_arr.map(el => { return { categoryId: el._id } }),
      name,
      caption,
      duration,
      description,
      price,
      "time": timeFrom + '-' + timeTo,
      isVisa,
      mainImageStr,
      bannerImageStr,
      status
    };



    console.log(obj, "send Obj")
    if (packageObj?._id) {
      dispatch(PackageUpdate(packageObj._id, obj));
      dispatch(SetPackageObj(null))
    } else {
      dispatch(PackageAdd(obj));

    }
  };
  useEffect(() => {
    dispatch(getAllNestedCategories());
  }, []);

  useEffect(() => {
    if (categoryArr && categoryArr.length > 0) {
      setMainCategoryArr([...categoryArr]);
    }
  }, [categoryArr]);



  const handleCategorySelectOnInit = (selectedCategoryArrFromDB, categoryArr) => {
    let tempArr = categoryArr.map((el) => {
      if (selectedCategoryArrFromDB.some((ele) => ele.categoryId == el._id)) {
        el.checked = true;
      }
      if (el.subCategoryArr) {
        handleCategorySelectOnInit(selectedCategoryArrFromDB, el.subCategoryArr);
      }
      return el;
    });
  };
  useEffect(() => {
    if (packageObj && categoryArr) {
      handleCategorySelectOnInit(packageObj.categoryArr, categoryArr);
    }
  }, [categoryArr, packageObj]);



  useEffect(() => {
    if (packageObj) {
      setName(packageObj?.name);
      setCaption(packageObj?.caption);
      setDescription(packageObj?.description ? packageObj?.description : "");
      setDuration(packageObj?.duration);
      setPrice(packageObj?.price);
      setIsVisa(packageObj?.isVisa);
      setMainImageStr(packageObj?.mainImage);
      setBannerImageStr(packageObj?.bannerImage);
      setStatus(packageObj?.status);

      const time = packageObj?.time;
      let timeArray = time.split("-");
      setTimeFrom(timeArray[0])
      setTimeTo(timeArray[1])
    }

  }, [packageObj]);


  const returnSelectedCategories = (arr) => {
    let new_selected_arr = arr.filter(el => el.checked)
    let subCategories = arr.reduce((acc, el) => [...acc, ...el.subCategoryArr.filter(el => el.checked)], [])
    if (subCategories?.length) {
      return [...new_selected_arr, ...returnSelectedCategories(subCategories)]
    }
    else {
      return [...new_selected_arr]
    }
  }



  const handleRenderNestedCategory = (arr, id, value) => {
    let tempArr = arr.map(el => {
      if (el._id == id) {
        el.checked = value
        return el
      }
      else {
        if (el.subCategoryArr && el.subCategoryArr.length > 0) {
          handleRenderNestedCategory(el.subCategoryArr, id, value)
        }
        else {
          return el
        }
      }
    })
    return tempArr;
  }




  const handleNestedCategoryCheckBoxEvent = (id, value) => {
    let tempCategoryArr = categoryArr.map(el => {
      if (el._id == id) {
        el.checked = value
        return el
      }
      else {
        if (el.subCategoryArr && el.subCategoryArr.length > 0) {
          el.subAttributesArr = handleRenderNestedCategory(el.subCategoryArr, id, value)
          return el
        }
        else {
          return el
        }
      }
    });
    setMainCategoryArr([...tempCategoryArr])
  }


  const handleRenderCheckboxCategory = (obj) => {
    return (
      <div className="col-12 mb-3" style={{ marginLeft: `${obj.level + 5}px` }}>
        <input className="form-check-input pointer" checked={obj.checked} onChange={(event) => handleNestedCategoryCheckBoxEvent(obj._id, event.target.checked)} type="checkbox" />
        <label style={{ paddingLeft: 5 }}>
          {obj.name}
        </label>
        {
          obj.checked && obj.subCategoryArr && obj.subCategoryArr.length > 0 && obj.subCategoryArr.map((el) => {
            return (
              handleRenderCheckboxCategory(el)
            )
          })
        }
      </div>
    )
  }


  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Add Package</h5>
                <div className="d-flex gap-3">

                </div>
              </div>
              <form className="form">
                <div className="row">
                  <div className="col-12 col-md-8">
                    <DashboardBox>
                      <div className="border-bottom pb-3 mb-4 row">
                        <h5 className="blue-1 mb-4">Package Information</h5>

                        <div className="col-12 col-md-6 mb-3">
                          <label>
                            Name <span className="red">*</span>
                          </label>
                          <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                          <label>
                            Caption <span className="red">*</span>
                          </label>
                          <input value={caption} onChange={(event) => setCaption(event.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                          <h5 className="blue-1 mb-4">Package Category</h5>
                          {
                            mainCategoryArr && mainCategoryArr.length > 0 && mainCategoryArr.map(el => {
                              return (
                                handleRenderCheckboxCategory(el)
                              )
                            })
                          }
                        </div>
                        <div className="col-12 col-md-4 mb-3">

                          <label>
                            Duration <span className="red">*</span>
                          </label>
                          <input value={duration} onChange={(event) => setDuration(event.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="col-12 col-md-4 mb-3">
                          <label>
                            Best Time From  <span className="red">*</span>
                          </label>
                          <select className="form-control" onChange={(event) => setTimeFrom(event.target.value)} value={timeFrom}>
                            {yearArr.map((month) => { return (<option value={month}  >{month}</option>) })}


                          </select>

                        </div>

                        <div className="col-12 col-md-4 mb-3">
                          <label>
                            Best Time To  <span className="red">*</span>
                          </label>
                          <select className="form-control" onChange={(event) => setTimeTo(event.target.value)} value={timeTo}>
                            {yearArr.map((month) => { return (<option value={month}>{month}</option>) })}

                          </select>

                        </div>

                        <div className="col-12 col-md-6 mb-3">
                          <label>
                            Price/Person <span className="red">*</span>
                          </label>
                          <input value={price} onChange={(event) => setPrice(event.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                          <label>
                            Visa Processing <span className="red">*</span>
                          </label>
                          <div className="d-flex">
                            <div className="form-check form-check-inline d-flex align-items-center pointer">
                              <input onChange={(e) => setIsVisa(true)} checked={isVisa} className="form-check-input pointer" type="radio" name="product-status" value="option1" id="visa-publish" />
                              <label className="form-check-label fs-14 pointer" htmlFor="visa-publish">
                                Yes
                              </label>
                            </div>
                            <div className="form-check form-check-inline d-flex align-items-center pointer">
                              <input onChange={(e) => setIsVisa(false)} checked={!isVisa} className="form-check-input pointer" type="radio" name="visa-status" value="option2" id="visa-pending" />
                              <label className="form-check-label fs-14 pointer" htmlFor="visa-pending">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-bottom pb-3 mb-4 row">
                        <h5 className="blue-1 mb-4">Description</h5>
                        <div className="col-12 mb-3">
                          <ReactQuill theme="snow" value={description} onChange={(e) => setDescription(e)} />
                        </div>
                      </div>
                      <div className="col-12">
                        <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
                      </div>
                      {/*                 
                            <div className="row">
                                <h5 className="blue-1 mb-4">SEO info</h5>
                                <div className="col-12 mb-3">
                                <label>META TITLE</label>
                                <input onChange={(e) => setMetaTitle(e.target.value)} value={metaTitle} type="text" className="form-control" />
                                </div>
                                <div className="col-12 mb-3">
                                <label>META DESCRIPTION</label>
                                <textarea onChange={(e) => setMetaDescription(e.target.value)} value={metaDescription} name="META DESCRIPTION" className="form-control" rows="3"></textarea>
                                </div>
                                <div className="col-12 mb-3">
                                <label>META IMAGE (300X300)PX</label>
                                <FileUpload onFileChange={(val) => setMetaImage(val)} />
                                </div>
                                <div className="col-12">
                                <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
                                </div>
                            </div> */}
                    </DashboardBox>
                  </div>
                  <div className="col-12 col-md-4">
                    <DashboardBox>
                      <div className="border-bottom pb-3 mb-4 row">
                        <h5 className="blue-1 mb-3"> Image Info</h5>
                        <div className="col-12 mb-3">
                          <label>
                            Package Main Image<span className="red">*</span>
                          </label>

                          <FileUpload onFileChange={(val) => setMainImageStr(val)} />
                          <div className="my-3">
                            {
                              mainImageStr ? <img height="84px" width="56px" src={generateFilePath(mainImageStr)} /> : ''
                            }
                          </div>
                        </div>
                        <div className="col-12 mb-3">
                          <label>
                            Product Banner Image<span className="red">*</span>
                          </label>

                          <FileUpload onFileChange={(val) => setBannerImageStr(val)} />
                          <div className="my-3">
                            {
                              `${bannerImageStr}`.includes('base64') ? <img height="84px" width="56px" src={bannerImageStr} /> : <img height="84px" width="56px" src={generateFilePath(bannerImageStr)} />
                            }
                          </div>

                        </div>
                      </div>
                      {/* <div className="border-bottom pb-3 mb-4 row">
                                <h5 className="blue-1 mb-3">Product Video Link</h5>
                                <div className="col-12 mb-3">
                                <label>Video Link<span className="red">*</span>
                                </label>
                                <input onChange={(e) => setVideoLink(e.target.value)} type="text" className="form-control" />
                                </div>
                            </div> */}

                      <div className="row">
                        <div className="col-12 mb-3">
                          <label>
                            STATUS<span className="red">*</span>
                          </label>
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
                      </div>
                    </DashboardBox>
                  </div>
                </div >
              </form >
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AddPackage
