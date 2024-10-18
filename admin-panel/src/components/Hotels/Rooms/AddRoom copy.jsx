import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import moment from "moment";
import Modal from "react-modal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { amenityCategoryGet } from "../../../redux/actions/AmenityCategory/AmenityCategory.action";
import { CollectionGet } from "../../../redux/actions/Collection/Collection.actions";
import {
  ROOMADD,
  ROOMUPDATE,
  ROOM_ADD,
  SetROOMOBJ,
} from "../../../redux/actions/Room/Room.action";

import { LocationGet } from "../../../redux/actions/Location/Location.actions";
import { toastError } from "../../../utils/toastUtils";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import MultiFileUpload from "../../Utility/MultipleFileUpload";
import { generateFilePath } from "../../Utility/utils";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getRoomsAvailablesApi, updateRoomDatesApi } from "../../../services/Room.service";
import { async } from "@firebase/util";

export default function AddRoom() {
  const [hotelObjValue, setHotelObjValue] = useState({});

  const params = useParams();
  const now = new Date();
  const localizer = momentLocalizer(moment);
  const [claendarStatus, setclaendarStatus] = useState(true);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [name, setName] = useState("");
  const [location, setlocation] = useState();
  const [mainImage, setmainImage] = useState();

  const [tagline, settagline] = useState();
  const [locationArr, setlocationArr] = useState([]);
  const [collectionArr, setcollectionArr] = useState([]);
  const [type, settype] = useState("");
  const [collection, setcollection] = useState("");
  const [hotelId, sethotelId] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [maxGuest, setmaxGuest] = useState(1);
  const [noOfRoom, setnoOfRoom] = useState(1);
  const [price, setprice] = useState(0);
  const [adultPrice, setadultPrice] = useState(0);
  const [childPrice, setchildPrice] = useState(0);
  ////////over view
  const [description, setDescription] = useState("");
  const [pointDescription, setPointDescription] = useState([{ name: "" }]);
  const [amenitiesArr, setamenitiesArr] = useState([]);
  const [isFoodAndDiningIncluded, setIsFoodAndDiningIncluded] = useState(false);
  const [foodAndDiningArr, setFoodAndDiningArr] = useState([{ name: "" }]);
  const [imagesArr, setImagesArr] = useState();
  const [spotlightArr, setSpotlightArr] = useState([{ imageUrl: "" }]);
  const [faqArr, setFaqArr] = useState([{ question: "", answer: "" }]);

  const [roomPriceArr, setroomPriceArr] = useState([]);

  const [roomAvalableData, setroomAvalableData] = useState([]);

  Modal.setAppElement("#root");
  const [
    isLocationAndSurroundingsIncluded,
    setIsLocationAndSurroundingsIncluded,
  ] = useState(false);
  const [locationAndSurroundingsArr, setLocationAndSurroundingsArr] = useState([
    { name: "" },
  ]);
  const [isPropertyHighlightsIncluded, setIsPropertyHighlightsIncluded] =
    useState(false);
  const [propertyHighlightsArr, setPropertyHighlightsArr] = useState([
    { name: "" },
  ]);

  const [isRoomAndAmenititesIncluded, setIsRoomAndAmenititesIncluded] =
    useState(false);
  const [roomAndAmenitiesArr, setRoomAndAmenitiesArr] = useState([
    { name: "" },
  ]);
  const [roomAndAmenitiesServiceArr, setRoomAndAmenitiesServiceArr] = useState([
    { no: "", name: "bathroom" },
    { no: "", name: "people" },
    { no: "", name: "bedroom" },
    { no: "Included", name: "meals" },
    { no: "Not Included", name: "villa" },
  ]);
  const [
    isActivitiesAndNearbyAttractionsIncluded,
    setIsActivitiesAndNearbyAttractionsIncluded,
  ] = useState(false);

  const [isNightLifeIncluded, setIsNightLifeIncluded] = useState(false);

  const [isFAQIncluded, setIsFAQIncluded] = useState(false);

  const [
    ActivitiesAndNearbyAttractionsArr,
    setActivitiesAndNearbyAttractionsArr,
  ] = useState([{ name: "" }]);

  const [NightLifeArr, setNightLifeArr] = useState([{ name: "" }]);

  const [propertyReachingInstructions, setPropertyReachingInstructions] =
    useState("");

  //////////rooms
  const [roomsArr, setRoomsArr] = useState([]);
  const [opionsArr, setOtionsArr] = useState([
    {
      price: 0,
      maxGuest: 0,
      adultPrice: 0,
      noOfRoom: 1,
      childPrice: 0,
    },
  ]);

  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  ///////hotel rules
  const [propertyRules, setPropertyRules] = useState([
    {
      heading: "",
      isCoupleFriendly: false,
      rulesArr: [
        {
          name: "",
        },
      ],
    },
  ]);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleSelect = ({ start, end }) => {
    if (roomAvalableData && roomAvalableData?.length > 0) {
      //&&   new Date(end).getTime()  <=new Date (el.availableDate).getTime()
      //&&   new Date(end).getTime()  <new Date (el.availableDate).getTime()
      let roWData = roomAvalableData.filter(
        (el) =>
          new Date(start).getTime() <= new Date(el.availableDate).getTime() &&
          new Date(end).getTime() > new Date(el.availableDate).getTime()
      );
      setOtionsArr(roWData);
    }
    setstartDate(start);
    setendDate(end);
    setIsOpen(true);
    // const title = window.prompt("New Event name");
    // if (title)
    //   setEventsData([
    //     ...eventsData,
    //     {
    //       start,
    //       end,
    //       title
    //     }
    //   ]);
  };


  const handleUpateRoom = async (data) => {

    try {
      
      let {data:res} = await updateRoomDatesApi(data);
      handleRoomAvaiblity();
    } catch (error) {
      toastError(error)
    }
  }

  
  const handleRoomPricedate = () => {
    console.log(opionsArr, startDate, endDate, "sdfdsf");
    console.log(opionsArr, startDate.getTime(), endDate.getTime(), "time");
    let preicArr = [];
    let evenArr = [];

    let loop = new Date(startDate);
    if (opionsArr && opionsArr?.length > 0) {
      let data = {
        update:true,
        roomAvailbleArr:opionsArr
      }
      if(hotelObj && hotelObj._id){
      handleUpateRoom(data);

      } else {
        let evner = eventsData;
        for (const option of opionsArr) {
  
           let date = new Date(option.availableDate)
          let ev = [
            {
              id: 1,
              title: "Price : " + option.price,
              start: date,
              end: date,
            },
            {
              id: 2,
              title: "Max Guest : " + option.maxGuest,
              start: date,
              end: date,
            },
            {
              id: 3,
              title: "Adult Price : " + option.adultPrice,
              start: date,
              end: date,
            },
            {
              id: 4,
              title: "Child Price : " + option.childPrice,
              start: date,
              end: date,
            },
            {
              id: 5,
              title: "No of Rooms : " + option.noOfRoom,
              start: date,
              end: date,
            },
            {
              id: 6,
              title: "Avaiable : " + option.isAvailable,
              start: date,
              end: date,
            },
          ];
  
          evner = [...evner, ...ev];
        }
  
        setEventsData(evner)
  
      }
    
    } else {
      while (loop.getTime() < endDate.getTime()) {
        console.log(loop.toDateString(), "toDateString");

        let ev = [
          {
            id: 1,
            title: "Price : " + price,
            start: loop,
            end: loop,
          },
          {
            id: 2,
            title: "Max Guest : " + maxGuest,
            start: loop,
            end: loop,
          },
          {
            id: 3,
            title: "Adult Price : " + adultPrice,
            start: loop,
            end: loop,
          },
          {
            id: 4,
            title: "Child Price : " + childPrice,
            start: loop,
            end: loop,
          },
          {
            id: 5,
            title: "No of Rooms : " + noOfRoom,
            start: loop,
            end: loop,
          },
          {
            id: 6,
            title: "Avaiable : " + isActive,
            start: loop,
            end: loop,
          },
        ];

        if (evenArr.length == 0) {
          evenArr = ev;
        } else {
          console.log(evenArr, "sdfsd");
          evenArr = [...evenArr, ...ev];
        }
        let onj = {
          name: name,
          hotelId,
          price: price,
          maxGuest: maxGuest,
          adultPrice: adultPrice,
          noOfRoom: noOfRoom,
          childPrice: childPrice,
          availableDate: loop,
        };
        preicArr.push(onj);

        loop = new Date(loop);
        loop.setDate(loop.getDate() + 1);
      }
      setEventsData(evenArr);
      setroomPriceArr(preicArr);


      if(hotelObj && hotelObj._id){
        let data = {
          update:false,
          roomAvailbleArr:preicArr.map(el => ({...el,roomId:hotelObj._id}))
        }
        handleUpateRoom(data);
      }
    }

    setIsOpen(false);
  };

  useEffect(() => {
    console.log(eventsData, "eventsDataeventsData  ");
  }, [eventsData]);

  useEffect(() => {
    if (params?.id) {
      sethotelId(params?.id);
    }
  }, [params]);

  const handleMultipleImagesRemove = (index) => {
    if (imagesArr.length > 1) {
      setImagesArr([...imagesArr.filter((el, indexxxx) => indexxxx != index)]);
    }
  };
  const handleSetMultipleImages = (value, index) => {
    console.log(value, "valuevaluevaluevalue");

    if (value && value?.length > 0) {
      let tempArr = imagesArr;
      let tempImageArr = value.map((img) => ({ imageUrl: img.base64 }));
      if (tempArr && tempArr?.length > 0) {
        const children = tempArr.concat(tempImageArr);
        setImagesArr([...children]);
      } else {
        setImagesArr([...tempImageArr]);
      }
    } else {
      let tempArr = imagesArr;
      tempArr[index].imageUrl = value;
      setImagesArr([...tempArr]);
    }
  };

  /////////////Rooms
  const handleRoomAdd = () => {
    setOtionsArr([
      ...opionsArr,
      {
        name: "",
        price: 1,
        maxGuest: 1,
        adultPrice: 1,
        childPrice: 1,
      },
    ]);
  };

  const handleRoomRemove = (inde) => {
    if (opionsArr.length > 1) {
      setOtionsArr([...opionsArr.filter((el, index) => index != inde)]);
    }
  };

  const handleSetRoomName = (value, index) => {
    let tempArr = opionsArr;
    tempArr[index].name = value;
    setOtionsArr([...tempArr]);
  };
  const handleSetRoomNo = (value, index) => {
    let tempArr = opionsArr;
    tempArr[index].noOfRoom = value;
    setOtionsArr([...tempArr]);
  };
  const handleSetRoomPrice = (value, index) => {
    let tempArr = opionsArr;
    tempArr[index].price = value;
    setOtionsArr([...tempArr]);
  };
  const handleSetRoomGuest = (value, index) => {
    let tempArr = opionsArr;
    tempArr[index].maxGuest = value;
    setOtionsArr([...tempArr]);
  };
  const handleSetRoomAdultPrice = (value, index) => {
    let tempArr = opionsArr;
    tempArr[index].adultPrice = value;
    setOtionsArr([...tempArr]);
  };
  const handleSetRoomChildPrice = (value, index) => {
    let tempArr = opionsArr;
    tempArr[index].childPrice = value;
    setOtionsArr([...tempArr]);
  };

  const handleSetAvaiblle = (value, index) => {
    let tempArr = opionsArr;
    tempArr[index].isAvailable = value;
    setOtionsArr([...tempArr]);
  };

  const [editModeActive, setEditModeActive] = useState(false);
  const dispatch = useDispatch();

  const amenityCategoryArr = useSelector(
    (state) => state.amenityCategory.amenityCategoryArr
  );
  const hotelObj = useSelector((state) => state.room.roomObj);

  const [displayAmenityCategoryArr, setDisplayAmenityCategoryArr] = useState(
    []
  );

  const handleSubmit = () => {
    if (name == "") {
      toastError("Room Name cannot be empty");
      return;
    }

    if (mainImage == "") {
      toastError("Room Main Image cannot be empty");
      return;
    }
    if (!opionsArr.length > 0 || !opionsArr) {
      toastError("Please add Options.");
      return;
    }

    if (
      opionsArr.length > 0 &&
      opionsArr &&
      opionsArr.some((el) => el.name == "")
    ) {
      toastError(
        "Please fill Option name field for all the Options in the Room section."
      );
      return;
    }
    if (
      opionsArr.length > 0 &&
      opionsArr &&
      opionsArr.some((el) => el.price == "" || el.price == 0 || el.price < 0)
    ) {
      toastError(
        "Option price not found or less than zero values added for some or all the Options in the Option section."
      );
      return;
    }
    if (
      opionsArr.length > 0 &&
      opionsArr &&
      opionsArr.some((el) => el.maxGuest == "")
    ) {
      toastError(
        "Please fill Option Max Guest field for all the Options in the Option section."
      );
      return;
    }
    if (
      opionsArr.length > 0 &&
      opionsArr &&
      opionsArr.some((el) => el.adultPrice == "")
    ) {
      toastError(
        "Please fill Option adultPrice field for all the Options in the Option section."
      );
      return;
    }
    if (
      opionsArr.length > 0 &&
      roomsArr &&
      roomsArr.some((el) => el.childPrice == "")
    ) {
      toastError(
        "Please fill Option childPrice field for all the Options in the Option section."
      );
      return;
    }

    let obj = {
      name: name,
      mainImage,
      imagesArr,
      hotelId,
      roomPriceArr,
      amenitiesArr: amenitiesArr
        .filter((ele) => ele.checked == true)
        .map((ele) => {
          let obj2 = {
            amenityCategoryId: ele._id,
            amenityCategoryName: ele.name,
            amenityArr: ele.amenityArr
              .filter((elm) => elm.checked == true)
              .map((elm) => {
                return {
                  amenityId: elm._id,
                  amenityName: elm.name,
                  amenityImage: elm.image,
                };
              }),
          };
          return obj2;
        }),
      opionsArr,
    };

    console.log(obj, "objobjobj");
    if (hotelObjValue && hotelObjValue._id) {
      dispatch(ROOMUPDATE(obj, hotelObjValue._id));
      dispatch(SetROOMOBJ(null));
    } else {
      obj.roomPriceArr = roomPriceArr
      dispatch(ROOMADD(obj));
    }
  };

  useEffect(() => {
    dispatch(amenityCategoryGet());
  }, []);

  useEffect(() => {
    if (hotelObj && hotelObj.name) {
      setName(hotelObj?.name);
      setmainImage(hotelObj?.mainImage);

      setEditModeActive(true);
      if (hotelObj.opionsArr && hotelObj.opionsArr.length > 0) {
        setOtionsArr(hotelObj.opionsArr);
      }

      if (hotelObj.imagesArr && hotelObj.imagesArr.length > 0) {
        setImagesArr(hotelObj.imagesArr);
      }

      setHotelObjValue(hotelObj);

      handleRoomAvaiblity();
    }
  }, [hotelObj]);

  const handleRoomAvaiblity = async () => {
    try {
      if (hotelObj && hotelObj._id) {
        let query = `hoteId=${hotelObj.hotelId}&roomId=${hotelObj._id}`;
        let { data: res } = await getRoomsAvailablesApi(query);
        if (res.data && res.data?.length > 0) {
          setroomAvalableData(res.data);
          let evenArr = [];
          for (const rommPrecie of res.data) {
            let loop = new Date(rommPrecie.availableDate);
            console.log(rommPrecie,"rommPrecie")
            let ev = [
              {
                id: 1,
                title: "Price : " + rommPrecie.price,
                start: loop,
                end: loop,
              },
              {
                id: 2,
                title: "Max Guest : " + rommPrecie.maxGuest,
                start: loop,
                end: loop,
              },
              {
                id: 3,
                title: "Adult Price : " + rommPrecie.adultPrice,
                start: loop,
                end: loop,
              },
              {
                id: 4,
                title: "Child Price : " + rommPrecie.childPrice,
                start: loop,
                end: loop,
              },
              {
                id: 5,
                title: "No of Rooms : " + rommPrecie.noOfRoom,
                start: loop,
                end: loop,
              },
              {
                id: 6,
                title: "Avaiable : " + rommPrecie.isAvailable ,
                start: loop,
                end: loop,
              },
            ];

            if (evenArr.length == 0) {
              evenArr = ev;
            } else {
              console.log(evenArr, "sdfsd");
              evenArr = [...evenArr, ...ev];
            }
            setEventsData(evenArr);
          }
        }
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    if (amenityCategoryArr && amenityCategoryArr.length > 0) {
      setDisplayAmenityCategoryArr(
        amenityCategoryArr.map((el) => {
          let obj = {
            ...el,
            checked: false,
          };
          return obj;
        })
      );
      let finalRoomArr = [];
      if (hotelObjValue && hotelObj?._id) {
        if (hotelObjValue?.roomsArr) {
          finalRoomArr = hotelObjValue?.roomsArr.map((el) => {
            let obj = {
              ...el,
            };
            obj.amenitiesArr = amenityCategoryArr.map((ele) => {
              let amenityObj = {
                ...ele,
              };
              let internalAmenitiesObj = el.amenitiesArr.find(
                (elx) => elx.amenityCategoryId == ele._id
              );

              if (
                el.amenitiesArr.some((elx) => elx.amenityCategoryId == ele._id)
              ) {
                amenityObj.checked = true;

                amenityObj.amenityArr = ele.amenityArr.map((elx) => {
                  let amenityInternalObj = { ...elx };

                  if (
                    internalAmenitiesObj.amenityArr.some(
                      (elm) => elm.amenityId == elx._id
                    )
                  ) {
                    amenityInternalObj.checked = true;
                  } else {
                    amenityInternalObj.checked = false;
                  }

                  return amenityInternalObj;
                });
              } else {
                amenityObj.checked = false;
              }
              return amenityObj;
            });
            return obj;
          });
        }

        let finalAmentiesArr = [];

        if (hotelObjValue?.amenitiesArr) {
          finalAmentiesArr = amenityCategoryArr.map((el) => {
            let amenityObj = {
              ...el,
            };

            if (
              hotelObj.amenitiesArr.some(
                (elm) => elm.amenityCategoryId == el._id
              )
            ) {
              amenityObj.checked = true;

              let curretnAmenity = hotelObj.amenitiesArr.find(
                (elm) => elm.amenityCategoryId == el._id
              );
              amenityObj.amenityArr = el.amenityArr.map((elx) => {
                let amenityInternalObj = { ...elx };
                if (
                  curretnAmenity.amenityArr.some(
                    (elm) => elm.amenityId == elx._id
                  )
                ) {
                  amenityInternalObj.checked = true;
                } else {
                  amenityInternalObj.checked = false;
                }

                return amenityInternalObj;
              });
            } else {
              amenityObj.checked = false;
            }
            return amenityObj;
          });
        }
        setamenitiesArr([...finalAmentiesArr]);
      } else {
        setOtionsArr([
          {
            name: "",
            price: 1,
            maxGuest: 1,
            adultPrice: 1,
            childPrice: 1,
          },
        ]);

        setamenitiesArr([
          ...amenityCategoryArr.map((el) => {
            let obj = {
              ...el,
              checked: false,
            };
            return obj;
          }),
        ]);
      }
    }
  }, [amenityCategoryArr, hotelObjValue]);

  useEffect(() => {
    console.log(amenitiesArr, "amenitiesArr");
  }, [amenitiesArr]);

  // useEffect(() => {
  //     return () => {
  //         handleClearAllStates()
  //     }
  // }, [])

  // const handleClearAllStates = () => {
  //     setRoomsArr([]);
  //     setActivitiesAndNearbyAttractionsArr([]);
  //     setDisplayAmenityCategoryArr([]);
  //     setFoodAndDiningArr([]);
  //     setLocationAndSurroundingsArr([]);
  //     setName("");
  //     setPointDescription([]);
  //     setPropertyHighlightsArr([]);
  //     setPropertyReachingInstructions("");
  //     setPropertyRules([]);
  //     setRoomAndAmenitiesArr([]);
  //     dispatch(SetROOMOBJ(null))
  // }

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">
            {`${editModeActive ? "Edit" : "Add New"}`} Room
          </h5>
          <DashboardBox>
            <form className="form row">
              <h5 className="blue-1 mb-4">Properties Info</h5>
              <div className="col-12 col-md-6 mb-3">
                <label>
                  Name <span className="red">*</span>
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
              {/* <div className="col-12 col-md-6 mb-3">
                <label>
                  Tagline <span className="red">*</span>
                </label>
                <input
                  name="first_name"
                  className="form-control"
                  type="text"
                  required=""
                  value={tagline}
                  onChange={(e) => settagline(e.target.value)}
                />
                </div> */}
              {/* <div className="col-12 col-md-6 mb-3">
                                <label>
                                    How to reach the property <span className="red">*</span>
                                </label>
                                <input
                                    name="first_name"
                                    className="form-control"
                                    type="text"
                                    required=""
                                    value={propertyReachingInstructions}
                                    onChange={(e) => setPropertyReachingInstructions(e.target.value)}
                                />
                            </div> */}

              <div className="row">
                <div className="col-12 col-md-12 mb-3">
                  <div className="row">
                    <div className="col-9">
                      <label>
                        Amenities <span className="red">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="row dffd">
                    <AmenitiesComponent
                      upliftAmenity={(value) => setamenitiesArr(value)}
                      amenitiesArr={[...amenitiesArr]}
                    />
                  </div>
                </div>
              </div>
              <hr className="py-2" />
              <h6 className="blue-1 mb-4">Images Section</h6>

              <div className="col-12 col-md-4 mb-3">
                <label htmlFor="">Main Image</label>

                <FileUpload onFileChange={(val) => setmainImage(val)} />
              </div>
              <div className="col-12 col-md-2 mb-3">
                {mainImage && `${mainImage}`.includes("base64") ? (
                  <img src={mainImage} width="100px" height="100px" />
                ) : (
                  <img
                    src={generateFilePath(mainImage)}
                    width="100px"
                    height="100px"
                  />
                )}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <span style={{ paddingRight: 15 }}>Add Another Images</span>
                <MultiFileUpload
                  onFileChange={(val) => handleSetMultipleImages(val, 0)}
                />
                {/* <button className="btn btn-1 bg-black text-white" type="button" onClick={()=>handleMultipleImagesAdd()}><i className="fa fa-plus"></i></button>
                      <button className="btn btn-1 bg-black text-white ms-3"  type="button"  onClick={()=>handleMultipleImagesRemove()}><i className="fa fa-minus"></i></button>
            */}
              </div>

              {/* <div className="col-12 col-md-12 mb-3">
                  <div className="row d-flex justify-content-end">
                    <div className="col-3 d-flex justify-content-between">
                    
                      <CustomButton
                        isBtn
                        noIcon={true}
                        btntype="button"
                        iconName="fa-solid fa-check"
                        btnName="Add"
                        ClickEvent={() => handleMultipleImagesAdd()}
                      />
                      <CustomButton
                        isBtn
                        noIcon={true}
                        btntype="button"
                        iconName="fa-solid fa-check"
                        btnName="Remove"
                        ClickEvent={() => handleMultipleImagesRemove()}
                      />
                    </div>
                  </div>
                </div> */}
              <div className="row ">
                {imagesArr &&
                  imagesArr.length > 0 &&
                  imagesArr.map((el, index) => {
                    return (
                      <>
                        <div className="col-md-1 position-relative">
                          {el.imageUrl != "" &&
                          `${el.imageUrl}`.includes("base64") ? (
                            <img
                              src={el.imageUrl}
                              width="100px"
                              height="100px"
                            />
                          ) : (
                            <img
                              src={generateFilePath(el.imageUrl)}
                              width="100px"
                              height="100px"
                            />
                          )}
                          <button
                            type="button"
                            className="btn btn-sm btn-danger btn-absolute "
                            onClick={() => handleMultipleImagesRemove(index)}
                          >
                            <i className="fa fa-close"></i>
                          </button>
                        </div>
                        {/* {
                            `${el.imageUrl}` == ""   && (
                              <div key={index} className="col-12 col-md-3 mb-3">
                              <label htmlFor="">Image {index + 1}</label>
  
                              <FileUpload
                                onFileChange={(val) =>
                                  handleSetMultipleImages(val, index)
                                }
                              />
                            </div>
                            )
                          }
                     */}
                      </>
                    );
                  })}

                {/* <div  className="col-12 col-md-3 mb-3">
                              <label htmlFor="">Image </label>
  
                              <FileUpload
                                // onFileChange={(val) =>
                                //   handleSetMultipleImages(val, index)
                                // }
                              />
                            </div> */}
              </div>

              <hr className="py-2" />
              <div className="d-flex my-3">
                <h6 className="blue-1">Room Availablity</h6>
                {/* <button type="button"       onClick={() => handleRoomAdd()}  className="btn btn-1 bg-black text-white ms-4"> <i className="fa fa-plus"></i> Add </button>  */}
              </div>

              {/* ///////rooms */}
              {/* <div className="pb-3">
         
                {opionsArr &&
                  opionsArr.length > 0 &&
                  opionsArr.map((el, index) => {
                    return (
                      <div key={index} className="row border border-dark py-3 my-2">
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Name</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={`Option Name ${index + 1}`}
                            value={el.name}
                            onChange={(e) =>
                              handleSetRoomName(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Max Guest</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={`Room name ${index + 1}`}
                            value={el.maxGuest}
                            onChange={(e) =>
                              handleSetRoomGuest(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Price</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={`Room name ${index + 1}`}
                            value={el.price}
                            onChange={(e) =>
                              handleSetRoomPrice(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Adult Per Price</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={` ${index + 1}`}
                            value={el.adultPrice}
                            onChange={(e) =>
                              handleSetRoomAdultPrice(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Children Per Price</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={` ${index + 1}`}
                            value={el.childPrice}
                            onChange={(e) =>
                              handleSetRoomChildPrice(e.target.value, index)
                            }
                          />
                        </div>
                            {
                              index > 0 && (   <div className="col-12 col-md-3 mb-3">
                              <label htmlFor="">Action</label>
                              <br/>
                                <button type="button" className="btn btn-sm btn-danger"  onClick={()=>handleRoomRemove(index)}><i className="fa fa-trash"></i></button>
                            </div> )
                            }
                      
                       </div>
                    );
                  })}
              </div>  */}
              {/* <div className="border-bottom py-3">
                <div className="col-12 col-md-6 mb-3">
                  <span style={{ paddingRight: 15 }}>Spotlight Images</span>
                  <MultiFileUpload
                                onFileChange={(val) =>
                                  handleSetMultipleSpotlight(val,0)
                                }
                              />
                </div>
                <div className="row ">
                  {spotlightArr &&
                    spotlightArr.length > 0 &&
                    spotlightArr.map((el, index) => {
                      return (
                        <>
                    

                          <div className="col-md-1 position-relative">
                            {el.imageUrl !="" &&
                            `${el.imageUrl}`.includes("base64") ? (
                              <img
                                src={el.imageUrl}
                                width="100px"
                                height="100px"
                              />
                            ) : (
                              <img
                                src={generateFilePath(el.imageUrl)}
                                width="100px"
                                height="100px"
                              />
                            )}
                           <button type="button" className="btn btn-sm btn-danger btn-absolute "   onClick={() => handleMultipleSpotlightRemove(index)} >
                                <i className="fa fa-close"></i>
                            </button> 
                          </div>
                     
                        </>
                      );
                    })}

                  
                </div>
            
              </div> */}
              {/* <div className="border-bottom py-3">
                <HotelRulesParentComponent
                  propertyRules={propertyRules}
                  handleSetPropertyRules={(value) => setPropertyRules(value)}
                />
              </div> */}
              {/* <div className="border-bottom py-3">
                <div className="col-12 col-md-12 mb-3">
                  <span style={{ paddingRight: 15 }}>Is Properties Faq</span>
                  <input
                    name="first_name"
                    type="checkbox"
                    required=""
                    checked={isFAQIncluded}
                    onChange={() => setIsFAQIncluded(!isFAQIncluded)}
                  />
                </div>

                {isFAQIncluded && (
                  <>
                    <div className="col-12 col-md-12 mb-3">
                      <div className="row d-flex justify-content-end">
                        <div className="col-3 d-flex justify-content-between">
                          <CustomButton
                            isBtn
                            noIcon={true}
                            btntype="button"
                            iconName="fa-solid fa-check"
                            btnName="Add"
                            ClickEvent={() => handleMultipleFaqAdd()}
                          />
                          <CustomButton
                            isBtn
                            noIcon={true}
                            btntype="button"
                            iconName="fa-solid fa-check"
                            btnName="Remove"
                            ClickEvent={() => handleMultipleFaqRemove()}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {faqArr &&
                        faqArr.length > 0 &&
                        faqArr.map((el, index) => {
                          return (
                            <div key={index} className="col-12">
                              <label htmlFor="">Question {index + 1}</label>
                              <input
                                name="first_name"
                                className="form-control"
                                type="text"
                                placeholder={`Enter Your Question ${index + 1}`}
                                value={el.question}
                                onChange={(e) =>
                                  handleSetMultipleFaqQuestion(
                                    e.target.value,
                                    index
                                  )
                                }
                              />
                              <br />
                              <label htmlFor="">Answer {index + 1}</label>
                              <textarea
                                name="first_name"
                                className="form-control"
                                type="text"
                                placeholder={`Enter Your Answer ${index + 1}`}
                                value={el.answer}
                                onChange={(e) =>
                                  handleSetMultipleFaqAnswer(
                                    e.target.value,
                                    index
                                  )
                                }
                              />
                            </div>
                          );
                        })}
                    </div>
                  </>
                )}
              </div> */}
              {
                claendarStatus && (
                  <Calendar
                  views={["day", "month"]}
                  selectable
                  localizer={localizer}
                  defaultDate={new Date()}
                  defaultView="month"
                  events={eventsData}
                  style={{ height: "100vh" }}
                  onSelectEvent={(event) => alert(event.title)}
                  onSelectSlot={handleSelect}
                />
                )
              }
         

              <div className="calunder_modale">
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setIsOpen(false)}
                  className="custom-modal"
                  bodyOpenClassName="custom-modal-body"
                  overlayClassName="custom-modal-overlay"
                  htmlOpenClassName="custom-modal-html"
                  portalClassName="custom-modal-parent home-popup-parent"
                  contentLabel="Example Modal"
                  closeTimeoutMS={1500}
                >
                  <div className="d-flex justify-content-between">
                    <h2>Room Price</h2>
                    <button
                      className="btn btn-1 bg-black text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fa fa-close"></i>
                    </button>
                  </div>

                  <div className="pb-3">
                    {opionsArr && opionsArr.length > 0 ? (
                      opionsArr.map((el, index) => {
                        return (
                          <div key={index} className="row border border-dark py-3 my-2">
                                <label><b>{new Date(el.availableDate).toDateString()}</b></label>
                   
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Max Guest</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={`Room name ${index + 1}`}
                            value={el.maxGuest}
                            onChange={(e) =>
                              handleSetRoomGuest(e.target.value, index)
                            }
                          />
                        </div>
                                 <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">No of Room</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={`No of Room ${index + 1}`}
                            value={el.noOfRoom}
                            onChange={(e) =>
                              handleSetRoomNo(e.target.value, index)
                            }
                          />
                        </div>

                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Price</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={`Room name ${index + 1}`}
                            value={el.price}
                            onChange={(e) =>
                              handleSetRoomPrice(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Adult Per Price</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={` ${index + 1}`}
                            value={el.adultPrice}
                            onChange={(e) =>
                              handleSetRoomAdultPrice(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Children Per Price</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={` ${index + 1}`}
                            value={el.childPrice}
                            onChange={(e) =>
                              handleSetRoomChildPrice(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label className="blue-1 fs-12">
                            Is Active <span className="red">*</span>
                          </label>
                          <div className="row">
                            <div className="col-6">
                              <input
                                id="12000"
                                checked={el.isAvailable == true}
                                onClick={(event) => handleSetAvaiblle(true,index)}
                                type="radio"
                                className="me-2"
                              />
                              <label htmlFor="12000" className="blue-1 fs-12">
                                Yes
                              </label>
                            </div>
                            <div className="col-6">
                              <input
                                id="22000"
                                checked={el.isAvailable == false}
                                onClick={(event) => handleSetAvaiblle(false,index)}
                                type="radio"
                                className="me-2"
                              />
                              <label htmlFor="22000" className="blue-1 fs-12">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                            </div>
                        )
                      })
                    ) : (
                      <div className="row ">
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Max Guest</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={`Room name `}
                            value={maxGuest}
                            onChange={(e) => setmaxGuest(e.target.value)}
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">No of Room</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={`No Of Room `}
                            value={noOfRoom}
                            onChange={(e) => setnoOfRoom(e.target.value)}
                          />
                        </div>

                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Price</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={`Room name `}
                            value={price}
                            onChange={(e) => setprice(e.target.value)}
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Adult Per Price</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={`Adult Price`}
                            value={adultPrice}
                            onChange={(e) => setadultPrice(e.target.value)}
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Children Per Price</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={` child Price`}
                            value={childPrice}
                            onChange={(e) => setchildPrice(e.target.value)}
                          />
                        </div>

                        <div className="col-12 col-md-3 mb-3">
                          <label className="blue-1 fs-12">
                            Is Active <span className="red">*</span>
                          </label>
                          <div className="row">
                            <div className="col-6">
                              <input
                                id="12000"
                                checked={isActive == true}
                                onClick={(event) => setIsActive(true)}
                                type="radio"
                                className="me-2"
                              />
                              <label htmlFor="12000" className="blue-1 fs-12">
                                Yes
                              </label>
                            </div>
                            <div className="col-6">
                              <input
                                id="22000"
                                checked={isActive == false}
                                onClick={(event) => setIsActive(false)}
                                type="radio"
                                className="me-2"
                              />
                              <label htmlFor="22000" className="blue-1 fs-12">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* {
                      index > 0 && (   <div className="col-12 col-md-3 mb-3">
                      <label htmlFor="">Action</label>
                      <br/>
                        <button type="button" className="btn btn-sm btn-danger"  onClick={()=>handleRoomRemove(index)}><i className="fa fa-trash"></i></button>
                    </div> )
                    } */}
                     
                      </div>
                    )}
                     <div className="col-12 mt-2 text-center">
                          <CustomButton
                            isBtn
                            btntype="button"
                            iconName="fa-solid fa-check"
                            btnName="submit"
                            ClickEvent={() => handleRoomPricedate()}
                          />
                        </div>
                  </div>
                </Modal>
              </div>

              <div className="col-12 mt-2 text-center">
                <CustomButton
                  isBtn
                  btntype="button"
                  iconName="fa-solid fa-check"
                  btnName={editModeActive ? "Update" : "Create"}
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

//////////////////////////amenities component
const AmenitiesComponent = ({ amenitiesArr, upliftAmenity }) => {
  const [amenityLocalArr, setAmenityLocalArr] = useState(amenitiesArr);
  const handleAmenityCategoryCheck = (index, value) => {
    let tempArr = amenityLocalArr.map((el, i) => {
      if (index == i) {
        el.checked = value;
      }
      return el;
    });
    setAmenityLocalArr([...tempArr]);
    upliftAmenity(tempArr);
  };

  const handleAmenityCheck = (parentId, childId, value) => {
    let tempArr = amenityLocalArr.map((el, i) => {
      if (el._id == parentId) {
        let tempInnerArr = el.amenityArr.map((elm) => {
          if (elm._id == childId) {
            elm.checked = value;
          }
          return { ...elm };
        });
        el.amenityArr = [...tempInnerArr];
      }
      return { ...el };
    });
    setAmenityLocalArr([...tempArr]);
    upliftAmenity(tempArr);
  };

  useEffect(() => {
    setAmenityLocalArr(amenitiesArr);
  }, [amenitiesArr]);

  return (
    <>
      {amenityLocalArr &&
        amenityLocalArr.length > 0 &&
        amenityLocalArr.map((elx, indexXX) => {
          return (
            <div key={indexXX} className="col-md-3 mb-3">
              <div>
                <input
                  name="first_name"
                  type="checkbox"
                  required=""
                  id={`${indexXX}AmenityCategory${elx._id}`}
                  checked={elx.checked}
                  onChange={(e) =>
                    handleAmenityCategoryCheck(indexXX, !elx.checked)
                  }
                />
                <strong
                  htmlFor={`${indexXX}AmenityCategory${elx._id}`}
                  style={{ paddingLeft: 15 }}
                >
                  {elx.name}
                </strong>
              </div>
              {elx.checked &&
                elx.amenityArr &&
                elx.amenityArr.length > 0 &&
                elx.amenityArr.map((elm, indexXXX) => {
                  return (
                    <div key={indexXXX} className="col-12 ps-2 col-md-12 mb-3">
                      <div>
                        <input
                          name="first_name"
                          type="checkbox"
                          required=""
                          id={`${indexXXX}Amenity${elm._id}`}
                          checked={elm.checked ? elm.checked : false}
                          onChange={(e) =>
                            handleAmenityCheck(elx._id, elm._id, !elm.checked)
                          }
                        />
                        <label
                          htmlFor={`${indexXXX}Amenity${elm._id}`}
                          style={{ paddingLeft: 15 }}
                        >
                          {elm.name}
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </>
  );
};

//////////hotel rules component
const HotelRulesParentComponent = ({
  propertyRules,
  handleSetPropertyRules,
}) => {
  const [localRulesArr, setLocalRulesArr] = useState(propertyRules);

  const handleRulesAdd = () => {
    setLocalRulesArr([
      ...localRulesArr,
      {
        heading: "",
        isCoupleFriendly: false,
        rulesArr: [
          {
            name: "",
          },
        ],
      },
    ]);
  };

  const handleRulesRemove = () => {
    if (localRulesArr.length > 1) {
      setLocalRulesArr([
        ...localRulesArr.filter(
          (el, index) => index != localRulesArr.length - 1
        ),
      ]);
    }
  };

  const handleRulesHeadingAdd = (index, value) => {
    let tempArr = localRulesArr;
    tempArr[index].heading = value;

    setLocalRulesArr([...tempArr]);
    handleSetPropertyRules([...tempArr]);
  };

  const handleSetRulesArr = (value, index) => {
    let tempArr = localRulesArr;
    tempArr[index].rulesArr = value;
    setLocalRulesArr([...tempArr]);
    handleSetPropertyRules([...tempArr]);
  };

  useEffect(() => {
    setLocalRulesArr(propertyRules);
  }, [propertyRules]);

  return (
    <div className="my-4">
      <div className="row">
        <div className="col-7">
          <label>
            Properties Rule Heading <span className="red">*</span>
          </label>
        </div>
        <div className="col-5 d-flex justify-content-between">
          <CustomButton
            isBtn
            noIcon={true}
            btntype="button"
            iconName="fa-solid fa-check"
            btnName="Add Properties Rules Heading"
            ClickEvent={() => handleRulesAdd()}
          />
          <CustomButton
            isBtn
            noIcon={true}
            btntype="button"
            iconName="fa-solid fa-check"
            btnName="Remove Properties Rules Heading"
            ClickEvent={() => handleRulesRemove()}
          />
        </div>
      </div>
      {localRulesArr &&
        localRulesArr.length > 0 &&
        localRulesArr.map((elx, indexXX) => {
          return (
            <div key={indexXX} className="col-12 col-md-12 my-3">
              <div>
                <label
                  htmlFor={`${indexXX}heading${elx._id}`}
                  style={{ paddingLeft: 15 }}
                >
                  {`Rules Heading ${indexXX + 1}`}
                </label>
                <input
                  name="first_name"
                  type="text"
                  required=""
                  placeholder={``}
                  className="form-control"
                  id={`${indexXX}heading${elx._id}`}
                  value={elx.heading}
                  onChange={(e) =>
                    handleRulesHeadingAdd(indexXX, e.target.value)
                  }
                />
              </div>
              <div
                style={{
                  border: "solid 1px rgba(0,0,0,0.2)",
                  borderRadius: 10,
                  marginTop: 40,
                }}
                className="py-3 px-5 col-12 col-md-10 offset-1 mb-3"
              >
                <HotelRulesComponent
                  getrulesArr={(value) => handleSetRulesArr(value, indexXX)}
                  key={indexXX}
                  ruleArr={elx.rulesArr}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

///////hotel rule
const HotelRulesComponent = ({ ruleArr, getrulesArr }) => {
  const [localRulesArr, setLocalRulesArr] = useState(ruleArr);

  const handleRulesAdd = () => {
    setLocalRulesArr([
      ...localRulesArr,
      {
        name: "",
      },
    ]);
  };

  const handleRulesRemove = () => {
    if (localRulesArr.length > 1) {
      setLocalRulesArr([
        ...localRulesArr.filter(
          (el, index) => index != localRulesArr.length - 1
        ),
      ]);
    }
  };

  const handleRulesHeadingAdd = (index, value) => {
    let tempArr = localRulesArr;
    tempArr[index].name = value;
    setLocalRulesArr([...tempArr]);
    getrulesArr([...tempArr]);
  };

  useEffect(() => {
    setLocalRulesArr(ruleArr);
  }, [ruleArr]);

  return (
    <div className="my-4">
      <div className="row">
        <div className="col-7">
          <label>
            Properties Rules <span className="red">*</span>
          </label>
        </div>
        <div className="col-5 d-flex justify-content-between">
          <CustomButton
            isBtn
            noIcon={true}
            btntype="button"
            iconName="fa-solid fa-check"
            btnName="Add Properties Rules"
            ClickEvent={() => handleRulesAdd()}
          />
          <CustomButton
            isBtn
            noIcon={true}
            btntype="button"
            iconName="fa-solid fa-check"
            btnName="Remove Properties Rules"
            ClickEvent={() => handleRulesRemove()}
          />
        </div>
      </div>
      {localRulesArr &&
        localRulesArr.length > 0 &&
        localRulesArr.map((elx, indexXX) => {
          return (
            <div key={indexXX} className="col-12 col-md-12 my-3">
              <div>
                <label htmlFor={`${indexXX}heading${elx._id}`}>
                  {`Rule ${indexXX + 1}`}
                </label>
                <input
                  name="first_name"
                  type="text"
                  required=""
                  className="form-control"
                  id={`${indexXX}heading${elx._id}`}
                  value={elx.name}
                  onChange={(e) =>
                    handleRulesHeadingAdd(indexXX, e.target.value)
                  }
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
