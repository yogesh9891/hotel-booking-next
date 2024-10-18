import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  BANNERAdd,
  BANNERUpdate,
  SetBANNERObj,
} from "../../../redux/actions/Banner/Banner.actions";
import { toastError, toastSuccess } from "../../Utility/ToastUtils";
import { addLogo } from "../../../services/logo.service";
import { HOTELGET } from "../../../redux/actions/Hotels/Hotel.action";
import { CollectionGet } from "../../../redux/actions/Collection/Collection.actions";
import { LocationGet } from "../../../redux/actions/Location/Location.actions";
import Select from "react-select";
import { async } from "@firebase/util";
import {
  addHomePage,
  getHomePage,
  updategetHomePage,
} from "../../../services/HomePage.service";
function HomePage() {
  const dispatch = useDispatch();
  const [locationArr, setlocationArr] = useState([]);
  const [collectionArr, setcollectionArr] = useState([]);
  const [hotelsArr, sethotelArr] = useState([]);
  const [location, setlocation] = useState([]);
  const [collection, setcollection] = useState([]);
  const [hotel, sethotel] = useState();
  const [viewhotel, setviewhotel] = useState([]);
  const [premiumhotel, setpremiumhotel] = useState([]);
  const [budgetFriendly, setbudgetFriendly] = useState([]);

  const locationReducxArr = useSelector(
    (location) => location.location.locations
  );
  const collectionReduxArr = useSelector(
    (collection) => collection.collection.collections
  );

  const [homePageObj, sethomePageObj] = useState("");
  const hotelsReduxArr = useSelector((state) => state.hotel.hotelsArr);

  const handleGetHotel = async () => {
    try {
      let { data: res } = await getHomePage();
      if (res.data && res.data?.length > 0) {
        sethomePageObj(res.data[0]);
      }
    } catch (error) {
      toastError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (homePageObj && homePageObj._id) {
      setlocation(
        homePageObj.location.map((el) => ({
          ...el,
          label: el.name,
          value: el._id,
        }))
      );
      if (homePageObj.mostViewProperties) {
        setviewhotel(
          homePageObj.mostViewProperties.map((el) => ({
            ...el,
            label: el.name,
            value: el._id,
          }))
        );
      }
      if (homePageObj.preminumCollection) {
        setpremiumhotel(
          homePageObj.preminumCollection.map((el) => ({
            ...el,
            label: el.name,
            value: el._id,
          }))
        );
      }

      if (homePageObj.budgetFriendly) {
        setbudgetFriendly(
          homePageObj.budgetFriendly.map((el) => ({
            ...el,
            label: el.name,
            value: el._id,
          }))
        );
      }
    }
  }, [homePageObj]);

  const updateHOtelObj = async (obj) => {
    try {
      let { data: res } = await addHomePage(obj);
      toastSuccess(res.message);
    } catch (error) {
      toastError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (locationReducxArr) {
      setlocationArr(locationReducxArr);
    }
  }, [locationReducxArr]);

  useEffect(() => {
    if (collectionReduxArr) {
      setcollectionArr(collectionReduxArr);
    }
  }, [collectionReduxArr]);

  useEffect(() => {
    if (hotelsReduxArr) {
      sethotelArr(hotelsReduxArr);
    }
  }, [hotelsReduxArr]);
  const [imageStr, setImageStr] = useState("");

  const handleFileSet = (value) => {
    // console.log(value);
    setImageStr(value);
  };

  const handleBrandSelection = (obj) => {
    console.log(obj);

    setlocation(obj);
  };

  const handleCollectionSelection = (obj) => {
    setcollection(obj?._id);
  };

  const handleHotelSelection = (obj) => {
    setcollection(obj?._id);
  };
  useEffect(() => {
    handleGetHotel();
    dispatch(LocationGet());
    dispatch(CollectionGet());
    dispatch(HOTELGET());
  }, []);
  // useEffect(() => {
  //   if (bannerObj) {
  //     setselectedBannerId(bannerObj._id);
  //     setName(bannerObj.name);
  //     setDescription(bannerObj.description);
  //     setUrl(bannerObj.url);
  //     setselectedBannerId(bannerObj._id);
  //     setPrevImage(bannerObj.image);
  //     // setSelectedStatus({ value: brandObj.statusInfo, label: brandObj.statusInfo });
  //     setIsUpdateBanner(true);
  //   }
  //   return () => {
  //     dispatch(SetBANNERObj(null));
  //   };
  // }, [bannerObj]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (location == "") {
        toastError("Please select an location");
        return 0;
      }
      console.log(viewhotel.length, premiumhotel.length, budgetFriendly.length);
      // if (viewhotel == "" || viewhotel.length != 6) {
      //   toastError("Please select  Most Viewed Properties  6 properties");
      //   return 0;
      // }

      // if (
      //   premiumhotel == "" ||
      //   premiumhotel.length > 3 ||
      //   premiumhotel.length < 0
      // ) {
      //   toastError("Our Premium Collection max limit is 3");
      //   return 0;
      // }

      // if (
      //   budgetFriendly == "" ||
      //   budgetFriendly.length > 3 ||
      //   budgetFriendly.length < 0
      // ) {
      //   toastError("Budget Friendly Homes max limit is 3");
      //   return 0;
      // }
      let obj = {
        location,
        mostViewProperties: viewhotel,
        preminumCollection: premiumhotel,
        budgetFriendly,
      };
      let { data: res } = await addHomePage(obj);
      if (res.message) {
        toastSuccess(res.message);
      }
      // if (isUpdateBanner) {
      // dispatch(BANNERUpdate(obj, selectedBannerId));
      // } else {
      // dispatch(BANNERAdd(obj));
      // }
    } catch (err) {
      toastError(err);
    }
  };
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">HomePage</h5>
          <form className="form">
            <div className="row">
              <div className="col-12 col-md-12 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">HomePage</h5>
                    <div className="col-12">
                      <label>Browse By Locations</label>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          Location <span className="red">*</span>
                        </label>
                        {locationArr && locationArr.length > 0 && (
                          <Select
                            isMulti
                            onChange={(val) => setlocation(val)}
                            value={location}
                            options={
                              locationArr && locationArr.length > 0
                                ? locationArr.map((el) => ({
                                    ...el,
                                    label: el.name,
                                    value: el._id,
                                  }))
                                : []
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <label>Trending This Season</label>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          Properties <span className="red">*</span>
                        </label>
                        {hotelsArr && hotelsArr.length > 0 && (
                          <Select
                            isMulti
                            onChange={(val) => setviewhotel(val)}
                            value={viewhotel}
                            options={
                              hotelsArr && hotelsArr.length > 0
                                ? hotelsArr.map((el) => ({
                                    ...el,
                                    label: el.name,
                                    value: el._id,
                                  }))
                                : []
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <label>Featured Properties</label>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          Properties <span className="red">*</span>
                        </label>
                        {hotelsArr && hotelsArr.length > 0 && (
                          <Select
                            styles={{
                              overflow: "scroll",
                            }}
                            isMulti
                            onChange={(val) => setpremiumhotel(val)}
                            value={premiumhotel}
                            options={
                              hotelsArr && hotelsArr.length > 0
                                ? hotelsArr.map((el) => ({
                                    ...el,
                                    label: el.name,
                                    value: el._id,
                                  }))
                                : []
                            }
                          />
                        )}
                      </div>
                    </div>
                    {/* <div className="col-12">
                      <label>Budget Friendly Homes</label>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          Properties <span className="red">*</span>
                        </label>
                        {hotelsArr && hotelsArr.length > 0 && (
                          <Select
                            isMulti
                            onChange={(val) => setbudgetFriendly(val)}
                            value={budgetFriendly}
                            options={
                              hotelsArr && hotelsArr.length > 0
                                ? hotelsArr.map((el) => ({
                                    ...el,
                                    label: el.name,
                                    value: el._id,
                                  }))
                                : []
                            }
                          />
                        )}
                      </div>
                    </div> */}

                    {/* <div className="col-12 col-md-6 mb-3">
                      <label>
                        Collection <span className="red">*</span>
                      </label>
                      {collectionArr && collectionArr.length > 0 && (
                        <Select
                          isMulti
                          onChange={handleCollectionSelection}
                          value={collection}
                          options={
                            collectionArr && collectionArr.length > 0
                              ? collectionArr.map((el) => ({
                                  ...el,
                                  label: el.name,
                                  value: el._id,
                                }))
                              : []
                          }
                        />
                      )}
                    </div> */}
                    <div className="col-12 mt-2">
                      <CustomButton
                        btntype="button"
                        ClickEvent={handleSubmit}
                        isBtn
                        iconName="fa-solid fa-check"
                        btnName="Save"
                      />
                    </div>
                  </div>
                </DashboardBox>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
