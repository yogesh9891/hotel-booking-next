import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { amenityCategoryGet } from "../../redux/actions/AmenityCategory/AmenityCategory.action";
import { HOTELADD, HOTEL_ADD, SetHOTELOBJ } from "../../redux/actions/Hotels/Hotel.action";
import { toastError } from "../../utils/toastUtils";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";


export default function AddHotel() {















    const [name, setName] = useState("");

    ////////over view
    const [description, setDescription] = useState("");
    const [pointDescription, setPointDescription] = useState([{ name: "" }]);

    const [isFoodAndDiningIncluded, setIsFoodAndDiningIncluded] = useState(false);
    const [foodAndDiningArr, setFoodAndDiningArr] = useState([{ name: "" }]);
    const [isLocationAndSurroundingsIncluded, setIsLocationAndSurroundingsIncluded] = useState(false);
    const [locationAndSurroundingsArr, setLocationAndSurroundingsArr] = useState([{ name: "" }]);
    const [isPropertyHighlightsIncluded, setIsPropertyHighlightsIncluded] = useState(false);
    const [propertyHighlightsArr, setPropertyHighlightsArr] = useState([{ name: "" }]);

    const [isRoomAndAmenititesIncluded, setIsRoomAndAmenititesIncluded] = useState(false);
    const [roomAndAmenitiesArr, setRoomAndAmenitiesArr] = useState([{ name: "" }]);
    const [isActivitiesAndNearbyAttractionsIncluded, setIsActivitiesAndNearbyAttractionsIncluded] = useState(false);
    const [ActivitiesAndNearbyAttractionsArr, setActivitiesAndNearbyAttractionsArr] = useState([{ name: "" }]);


    const [propertyReachingInstructions, setPropertyReachingInstructions] = useState("");
    const [hotelObjValue, setHotelObjValue] = useState({});


    //////////rooms
    const [roomsArr, setRoomsArr] = useState([]);

    ///////hotel rules
    const [propertyRules, setPropertyRules] = useState([
        {
            heading: "",
            isCoupleFriendly: false,
            rulesArr: [
                {
                    name: "",
                },
            ]
        }
    ]);





    /////////////point description
    const handlePointsDescriptionAdd = () => {
        setPointDescription([...pointDescription, { name: "" }])
    }
    const handlePointsDescriptionRemove = () => {
        if (pointDescription.length > 1) {
            setPointDescription([...pointDescription.filter((el, index) => index != (pointDescription.length - 1))])
        }
    }
    const handleSetPointDescription = (value, index) => {
        let tempArr = pointDescription;
        tempArr[index].name = value;
        setPointDescription([...tempArr])
    }

    /////////////Food And Dining
    const handleFoodAndDiningAdd = () => {
        setFoodAndDiningArr([...foodAndDiningArr, { name: "" }])
    }
    const handleFoodAndDiningRemove = () => {
        if (foodAndDiningArr.length > 1) {
            setFoodAndDiningArr([...foodAndDiningArr.filter((el, index) => index != (foodAndDiningArr.length - 1))])
        }
    }
    const handleSetfoodAndDining = (value, index) => {
        let tempArr = foodAndDiningArr;
        tempArr[index].name = value;
        setFoodAndDiningArr([...tempArr])
    }

    /////////////location And Surroundings
    const handlelocationAndSurroundingsAdd = () => {
        setLocationAndSurroundingsArr([...locationAndSurroundingsArr, { name: "" }])
    }
    const handlelocationAndSurroundingsRemove = () => {
        if (locationAndSurroundingsArr.length > 1) {
            setLocationAndSurroundingsArr([...locationAndSurroundingsArr.filter((el, index) => index != (locationAndSurroundingsArr.length - 1))])
        }
    }
    const handleSetlocationAndSurroundings = (value, index) => {
        let tempArr = locationAndSurroundingsArr;
        tempArr[index].name = value;
        setLocationAndSurroundingsArr([...tempArr])
    }

    /////////////property Highlights
    const handlepropertyHighlightsAdd = () => {
        setPropertyHighlightsArr([...propertyHighlightsArr, { name: "" }])
    }
    const handlepropertyHighlightsRemove = () => {
        if (propertyHighlightsArr.length > 1) {
            setPropertyHighlightsArr([...propertyHighlightsArr.filter((el, index) => index != (propertyHighlightsArr.length - 1))])
        }
    }
    const handleSetpropertyHighlights = (value, index) => {
        let tempArr = propertyHighlightsArr;
        tempArr[index].name = value;
        setPropertyHighlightsArr([...tempArr])
    }


    /////////////Room And Amenitites
    const handleRoomAndAmenititesAdd = () => {
        setRoomAndAmenitiesArr([...roomAndAmenitiesArr, { name: "" }])
    }
    const handleRoomAndAmenitiesRemove = () => {
        if (roomAndAmenitiesArr.length > 1) {
            setRoomAndAmenitiesArr([...roomAndAmenitiesArr.filter((el, index) => index != (roomAndAmenitiesArr.length - 1))])
        }
    }
    const handleSetRoomAndAmenities = (value, index) => {
        let tempArr = roomAndAmenitiesArr;
        tempArr[index].name = value;
        setRoomAndAmenitiesArr([...tempArr])
    }

    /////////////Activities And Near by Attractions
    const handleActivitiesAndNearbyAttractionsAdd = () => {
        setActivitiesAndNearbyAttractionsArr([...ActivitiesAndNearbyAttractionsArr, { name: "" }])
    }
    const handleActivitiesAndNearbyAttractionsRemove = () => {
        if (ActivitiesAndNearbyAttractionsArr.length > 1) {
            setActivitiesAndNearbyAttractionsArr([...ActivitiesAndNearbyAttractionsArr.filter((el, index) => index != (ActivitiesAndNearbyAttractionsArr.length - 1))])
        }
    }
    const handleSetActivitiesAndNearbyAttractions = (value, index) => {
        let tempArr = ActivitiesAndNearbyAttractionsArr;
        tempArr[index].name = value;
        setActivitiesAndNearbyAttractionsArr([...tempArr])
        console.log(tempArr, "tempArr")
    }

    /////////////Rooms 
    const handleRoomAdd = () => {
        setRoomsArr([...roomsArr, {
            name: "",
            price: 1,
            area: "",
            bed: "",
            view: "",
            imagesArr: [{ imageUrl: "" }],
            amenitiesArr: [...displayAmenityCategoryArr],
        }])
    }

    const handleRoomRemove = () => {
        if (roomsArr.length > 1) {
            setRoomsArr([...roomsArr.filter((el, index) => index != (roomsArr.length - 1))])
        }
    }

    const handleSetRoomName = (value, index) => {
        let tempArr = roomsArr;
        tempArr[index].name = value;
        setRoomsArr([...tempArr])
    }

    const handleSetRoomPrice = (value, index) => {
        let tempArr = roomsArr;
        tempArr[index].price = value;
        setRoomsArr([...tempArr])
    }
    const handleSetRoomArea = (value, index) => {
        let tempArr = roomsArr;
        tempArr[index].area = value;
        setRoomsArr([...tempArr])
    }
    const handleSetRoomBed = (value, index) => {
        let tempArr = roomsArr;
        tempArr[index].bed = value;
        setRoomsArr([...tempArr])
    }
    const handleSetRoomView = (value, index) => {
        let tempArr = roomsArr;
        tempArr[index].view = value;
        setRoomsArr([...tempArr])
    }
    const handleSetRoomImage = (index, indexX, value) => {
        console.log(index, indexX, value)
        let tempArr = roomsArr;
        tempArr[index].imagesArr[indexX].imageUrl = value;
        setRoomsArr([...tempArr])
    }


    ///////////images
    const handleRoomImageAdd = (index, value) => {
        let tempArr = roomsArr.map(((el, i) => {
            if (i == index) {
                let temp = el.imagesArr
                temp.push({ imageUrl: "" })
                el.imagesArr = [...temp]
            }
            return el
        }))
        setRoomsArr([...tempArr])
    }

    const handleRoomImageRemove = (index) => {
        let tempArr = roomsArr
        if (tempArr[index].imagesArr.length > 1) {
            tempArr = tempArr.map((el, i) => {
                if (i == index) {
                    let temp = el.imagesArr.filter((ele, indexX) => indexX != (el.imagesArr.length - 1));
                    el.imagesArr = [...temp]
                }
                return el
            })
            setRoomsArr([...tempArr])
        }
    }




    const handleSetAmenitiesInRoom = (params, index) => {
        let tempArr = roomsArr;
        tempArr[index].amenitiesArr = params;
        setRoomsArr([...tempArr])
    }








    const [editModeActive, setEditModeActive] = useState(false);
    const dispatch = useDispatch()

    const amenityCategoryArr = useSelector(state => state.amenityCategory.amenityCategoryArr)
    const hotelsObj = useSelector(state => state.hotel.hotelObj)

    const [displayAmenityCategoryArr, setDisplayAmenityCategoryArr] = useState([]);

    const handleSubmit = () => {
        if (name == "") {
            toastError("Hotel Name cannot be empty")
            return;
        }
        if (description == "") {
            toastError("Hotel description cannot be empty")
            return;
        }
        if (propertyReachingInstructions == "") {
            toastError("Hotel Reaching Instructions cannot be empty")
            return;
        }
        if (pointDescription.length > 0 && pointDescription && pointDescription.some(el => el.name == "")) {
            toastError("Please fill all the fields in point description section.")
            return;
        }
        if (propertyRules.length > 0 && propertyRules && propertyRules.some(el => el.heading == "")) {
            toastError("Please fill all the fields in Hotel Rules section. (Heading)")
            return;
        }
        if (propertyRules.length > 0 && propertyRules && propertyRules.some(el => el.rulesArr.some(ele => ele.name == ""))) {
            toastError("Please fill all the fields in Hotel Rules section.")
            return;
        }
        if (!roomsArr.length > 0 || !roomsArr) {
            toastError("Please add Rooms.")
            return;
        }
        if (roomsArr.length > 0 && roomsArr && roomsArr.some(el => el.name == "")) {
            toastError("Please fill Room name field for all the Rooms in the Room section.")
            return;
        }
        if (roomsArr.length > 0 && roomsArr && roomsArr.some(el => el.price == "" || el.price == 0 || el.price < 0)) {
            toastError("Room price not found or less than zero values added for some or all the Rooms in the Room section.")
            return;
        }
        if (roomsArr.length > 0 && roomsArr && roomsArr.some(el => el.area == "")) {
            toastError("Please fill Room area field for all the Rooms in the Room section.")
            return;
        }
        if (roomsArr.length > 0 && roomsArr && roomsArr.some(el => el.view == "")) {
            toastError("Please fill Room view field for all the Rooms in the Room section.")
            return;
        }
        if (roomsArr.length > 0 && roomsArr && roomsArr.some(el => el.bed == "")) {
            toastError("Please fill Room bed field for all the Rooms in the Room section.")
            return;
        }
        if (roomsArr.length > 0 && roomsArr && roomsArr.some(el => el.imagesArr.some(ele => ele.imageUrl == ""))) {
            toastError("Please upload images in all Rooms in the Room section.")
            return;
        }
        if (roomsArr.length > 0 && roomsArr && roomsArr.some(el => el.amenitiesArr.every(ele => ele.checked == false))) {
            toastError("Please select atleast one amenity in the Room (Amenity) section.")
            return;
        }
        if (roomsArr.length > 0 && roomsArr && roomsArr.some(el => el.amenitiesArr.some(ele => {
            if (ele.checked == true) {
                if (ele.amenityArr.every(elx => elx.checked == false)) {
                    return true
                } else {
                    return false
                }
            }
        }))) {
            toastError("Please select atleast one amenity in the Room (Amenity) section.(inner)")
            return;
        }

        let obj = {
            name: name,
            description,
            pointDescription,
            propertyReachingInstructions,
            roomsArr: roomsArr.map(el => {
                let obj = {
                    ...el,
                    amenitiesArr: el.amenitiesArr.filter(ele => ele.checked == true).map(ele => {
                        let obj2 = {
                            amenityCategoryId: ele._id,
                            amenityCategoryName: ele.name,
                            amenityArr: ele.amenityArr.filter(elm => elm.checked == true).map(elm => { return { amenityId: elm._id, amenityName: elm.name } })
                        }
                        return obj2
                    })
                }
                return obj
            }),
            propertyRules,
        }

        if (isFoodAndDiningIncluded) {
            if (foodAndDiningArr.length > 0 && foodAndDiningArr && foodAndDiningArr.some(el => el.name == "")) {
                toastError("Please fill all the fields in Food And Dining section.")
                return;
            }
            obj.foodAndDiningArr = foodAndDiningArr
        }
        if (isPropertyHighlightsIncluded) {
            if (propertyHighlightsArr.length > 0 && propertyHighlightsArr && propertyHighlightsArr.some(el => el.name == "")) {
                toastError("Please fill all the fields in Property Highlights section.")
                return;
            }
            obj.propertyHighlightsArr = propertyHighlightsArr
        }
        if (isLocationAndSurroundingsIncluded) {
            if (locationAndSurroundingsArr.length > 0 && locationAndSurroundingsArr && locationAndSurroundingsArr.some(el => el.name == "")) {
                toastError("Please fill all the fields in Location And Surroundings section.")
                return;
            }
            obj.locationAndSurroundingsArr = locationAndSurroundingsArr
        }
        if (isRoomAndAmenititesIncluded) {
            if (roomAndAmenitiesArr.length > 0 && roomAndAmenitiesArr && roomAndAmenitiesArr.some(el => el.name == "")) {
                toastError("Please fill all the fields in Room And Amenities section.")
                return;
            }
            obj.roomAndAmenitiesArr = roomAndAmenitiesArr
        }
        if (isActivitiesAndNearbyAttractionsIncluded) {
            if (ActivitiesAndNearbyAttractionsArr.length > 0 && ActivitiesAndNearbyAttractionsArr && ActivitiesAndNearbyAttractionsArr.some(el => el.name == "")) {
                toastError("Please fill all the fields in Activities And Near by Attractions section.")
                return;
            }
            obj.ActivitiesAndNearbyAttractionsArr = ActivitiesAndNearbyAttractionsArr
        }

        dispatch(HOTELADD(obj))


        // if (editModeActive) {
        //     // dispatch(HOTELADD(obj, amenityCategoryArr._id))
        //     // dispatch(SetHOTELOBJ({}))
        // }
        // else {
        // }
    }


    useEffect(() => {
        dispatch(amenityCategoryGet())
    }, [])


    // useEffect(() => {
    //     if (hotelsObj && hotelsObj.name) {
    //         setName(hotelsObj?.name)
    //         setDescription(hotelsObj?.description)
    //         setPropertyReachingInstructions(hotelsObj?.propertyReachingInstructions)
    //         setPointDescription(hotelsObj.pointDescription)
    //         setPropertyRules([...hotelsObj.propertyRules])
    //         if (hotelsObj.foodAndDiningArr && hotelsObj.foodAndDiningArr.length > 0) {
    //             setIsFoodAndDiningIncluded(true)
    //             setFoodAndDiningArr(hotelsObj.foodAndDiningArr)
    //         }
    //         else {
    //             setIsFoodAndDiningIncluded(false)
    //         }
    //         if (hotelsObj.locationAndSurroundingsArr && hotelsObj.locationAndSurroundingsArr.length > 0) {
    //             setIsLocationAndSurroundingsIncluded(true)
    //             setLocationAndSurroundingsArr(hotelsObj.locationAndSurroundingsArr)
    //         }
    //         else {
    //             setIsLocationAndSurroundingsIncluded(false)
    //         }
    //         if (hotelsObj.propertyHighlightsArr && hotelsObj.propertyHighlightsArr.length > 0) {
    //             setIsPropertyHighlightsIncluded(true)
    //             setPropertyHighlightsArr(hotelsObj.propertyHighlightsArr)
    //         }
    //         else {
    //             setIsPropertyHighlightsIncluded(false)
    //         }
    //         if (hotelsObj.roomAndAmenitiesArr && hotelsObj.roomAndAmenitiesArr.length > 0) {
    //             setIsRoomAndAmenititesIncluded(true)
    //             setRoomAndAmenitiesArr(hotelsObj.roomAndAmenitiesArr)
    //         }
    //         else {
    //             setIsRoomAndAmenititesIncluded(false)
    //         }
    //         if (hotelsObj.ActivitiesAndNearbyAttractionsArr && hotelsObj.ActivitiesAndNearbyAttractionsArr.length > 0) {
    //             setIsActivitiesAndNearbyAttractionsIncluded(true)
    //             setActivitiesAndNearbyAttractionsArr(hotelsObj.ActivitiesAndNearbyAttractionsArr)
    //         }
    //         else {
    //             setIsActivitiesAndNearbyAttractionsIncluded(false)
    //         }
    //         setEditModeActive(true)
    //     }
    // }, [hotelsObj])


    useEffect(() => {
        if (amenityCategoryArr && amenityCategoryArr.length > 0 && hotelsObj) {

            console.log(amenityCategoryArr, "Am category arr")

            let tempRoomsArr = [...hotelsObj.roomsArr];
            console.log(tempRoomsArr, "consoling rooms arr before")
            tempRoomsArr = tempRoomsArr.map(el => ({ ...el, amenitiesArr: amenityCategoryArr.map(elx => ({ ...elx, checked: false })) }))
        }


        // if (amenityCategoryArr && amenityCategoryArr.length > 0) {
        //     setDisplayAmenityCategoryArr(amenityCategoryArr.map(el => {
        //         let obj = {
        //             ...el,
        //             checked: false
        //         }
        //         return obj
        //     }))

        //     if (hotelsObj) {
        //         let tempRoomsArr = hotelsObj.roomsArr;
        //         console.log(tempRoomsArr, "consoling rooms arr before")
        //         // tempRoomsArr = tempRoomsArr.map(elm => {
        //         //     // let tempAmenitiesArr = elm.amenitiesArr
        //         //     elm.amenitiesArr = amenityCategoryArr.map(el => {
        //         //         let obj = {
        //         //             ...el
        //         //         }
        //         //         // let categoryObj = tempAmenitiesArr.find((ele) => el._id == ele.amenityCategoryId)
        //         //         // console.log(categoryObj, "obj")
        //         //         // if (categoryObj && categoryObj.amenityCategoryId) {
        //         //         //     obj.checked = true
        //         //         //     //             // obj.amenityArr = el.amenityArr.map(elx => {
        //         //         //     //             //     let obj2 = {
        //         //         //     //             //         ...elx,
        //         //         //     //             //     }
        //         //         //     //             //     let amenityObj = categoryObj.amenityArr.find(elem => elem.amenityId == elx._id)
        //         //         //     //             //     if (amenityObj) {
        //         //         //     //             //         obj2.checked = true
        //         //         //     //             //     }
        //         //         //     //             //     else {
        //         //         //     //             //         obj2.checked = false
        //         //         //     //             //     }
        //         //         //     //             //     return obj2
        //         //         //     //             // })
        //         //         // } else {
        //         //         //     obj.checked = false
        //         //         // }
        //         //         return obj
        //         //     })
        //         //     return elm
        //         // })
        //         console.log(tempRoomsArr, "Consoling rooms arr after")

        //         // // console.log(hotelObj.roomsArr, "hotelObj.roomsArr")
        //         // console.log(tempRoomsArr, "tempRoomsArr")
        //         // setRoomsArr([...tempRoomsArr])
        //     }
        //     else {
        //         setRoomsArr([{
        //             name: "",
        //             price: 1,
        //             area: "",
        //             bed: "",
        //             view: "",
        //             imagesArr: [{ imageUrl: "" }],
        //             amenitiesArr: [...amenityCategoryArr.map(el => {
        //                 let obj = {
        //                     ...el,
        //                     checked: false
        //                 }
        //                 return obj
        //             })],
        //         }])
        //     }
        // }

    }, [amenityCategoryArr, hotelsObj])


    // useEffect(() => {

    // }, [roomsArr])

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
    //     dispatch(SetHOTELOBJ(null))
    // }
    return null

}









//////////////////////////amenities component
// const AmenitiesComponent = ({ amenitiesArr, upliftAmenity }) => {
//     const [amenityLocalArr, setAmenityLocalArr] = useState(amenitiesArr);

//     const handleAmenityCategoryCheck = (index, value) => {
//         let tempArr = amenityLocalArr.map((el, i) => {
//             if (index == i) {
//                 el.checked = value
//             }
//             return el
//         });
//         setAmenityLocalArr([...tempArr])
//         upliftAmenity(tempArr)
//     }

//     const handleAmenityCheck = (parentId, childId, value) => {
//         let tempArr = amenityLocalArr.map((el, i) => {
//             if (el._id == parentId) {
//                 let tempInnerArr = el.amenityArr.map((elm) => {
//                     if (elm._id == childId) {
//                         elm.checked = value
//                     }
//                     return { ...elm }
//                 })
//                 el.amenityArr = [...tempInnerArr]
//             }
//             return { ...el }
//         });
//         setAmenityLocalArr([...tempArr])
//         upliftAmenity(tempArr)
//     }

//     useEffect(() => {
//         setAmenityLocalArr(amenitiesArr)
//     }, [amenitiesArr])

//     return (
//         <div>
//             {
//                 amenityLocalArr && amenityLocalArr.length > 0 && amenityLocalArr.map((elx, indexXX) => {
//                     return (
//                         <div key={indexXX} className="col-12 col-md-12 mb-3">
//                             <div>
//                                 <input
//                                     name="first_name"
//                                     type="checkbox"
//                                     required=""
//                                     id={`${indexXX}AmenityCategory${elx._id}`}
//                                     checked={elx.checked}
//                                     onChange={(e) => handleAmenityCategoryCheck(indexXX, !elx.checked)}
//                                 />
//                                 <label htmlFor={`${indexXX}AmenityCategory${elx._id}`} style={{ paddingLeft: 15 }}>
//                                     {elx.name}
//                                 </label>
//                             </div>
//                             {
//                                 elx.checked && elx.amenityArr && elx.amenityArr.length > 0 && elx.amenityArr.map((elm, indexXXX) => {
//                                     return (
//                                         <div key={indexXXX} className="col-12 ps-5 col-md-12 mb-3">
//                                             <div>
//                                                 <input
//                                                     name="first_name"
//                                                     type="checkbox"
//                                                     required=""
//                                                     id={`${indexXXX}Amenity${elm._id}`}
//                                                     checked={elm.checked ? elm.checked : false}
//                                                     onChange={(e) => handleAmenityCheck(elx._id, elm._id, !elm.checked)}
//                                                 />
//                                                 <label htmlFor={`${indexXXX}Amenity${elm._id}`} style={{ paddingLeft: 15 }}>
//                                                     {elm.name}
//                                                 </label>
//                                             </div>
//                                         </div>
//                                     )
//                                 })

//                             }
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }







// //////////hotel rules component
// const HotelRulesParentComponent = ({ propertyRules, handleSetPropertyRules }) => {
//     const [localRulesArr, setLocalRulesArr] = useState(propertyRules);

//     const handleRulesAdd = () => {
//         setLocalRulesArr([...localRulesArr, {
//             heading: "",
//             isCoupleFriendly: false,
//             rulesArr: [
//                 {
//                     name: "",
//                 },
//             ]
//         }])
//     }

//     const handleRulesRemove = () => {
//         if (localRulesArr.length > 1) {
//             setLocalRulesArr([...localRulesArr.filter((el, index) => index != (localRulesArr.length - 1))])
//         }
//     }


//     const handleRulesHeadingAdd = (index, value) => {
//         let tempArr = localRulesArr;
//         tempArr[index].heading = value

//         setLocalRulesArr([...tempArr])
//         handleSetPropertyRules([...tempArr])
//     }

//     const handleSetRulesArr = (value, index) => {
//         let tempArr = localRulesArr;
//         tempArr[index].rulesArr = value
//         setLocalRulesArr([...tempArr])
//         handleSetPropertyRules([...tempArr])

//     }


//     useEffect(() => {



//     }, [propertyRules])


//     return (
//         <div className="my-4">

//             <div className="row">
//                 <div className="col-7">
//                     <label>
//                         Hotel Rule Heading <span className="red">*</span>
//                     </label>
//                 </div>
//                 <div className="col-5 d-flex justify-content-between">
//                     <CustomButton
//                         isBtn
//                         noIcon={true}
//                         btntype="button"
//                         iconName="fa-solid fa-check"
//                         btnName="Add Hotel Rules Heading"
//                         ClickEvent={() => handleRulesAdd()}
//                     />
//                     <CustomButton
//                         isBtn
//                         noIcon={true}
//                         btntype="button"
//                         iconName="fa-solid fa-check"
//                         btnName="Remove Hotel Rules Heading"
//                         ClickEvent={() => handleRulesRemove()}
//                     />
//                 </div>
//             </div>
//             {
//                 localRulesArr && localRulesArr.length > 0 && localRulesArr.map((elx, indexXX) => {
//                     return (
//                         <div key={indexXX} className="col-12 col-md-12 my-3">
//                             <div>
//                                 <label htmlFor={`${indexXX}heading${elx._id}`} style={{ paddingLeft: 15 }}>
//                                     {`Rules Heading ${indexXX + 1}`}
//                                 </label>
//                                 <input
//                                     name="first_name"
//                                     type="text"
//                                     required=""
//                                     placeholder={``}
//                                     className="form-control"
//                                     id={`${indexXX}heading${elx._id}`}
//                                     value={elx.heading}
//                                     onChange={(e) => handleRulesHeadingAdd(indexXX, e.target.value)}
//                                 />
//                             </div>
//                             <div style={{ border: "solid 1px rgba(0,0,0,0.2)", borderRadius: 10, marginTop: 40 }} className="py-3 px-5 col-12 col-md-10 offset-1 mb-3">
//                                 <HotelRulesComponent getrulesArr={(value) => handleSetRulesArr(value, indexXX)} key={indexXX} ruleArr={elx.rulesArr} />
//                             </div>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }

// ///////hotel rule
// const HotelRulesComponent = ({ ruleArr, getrulesArr }) => {
//     const [localRulesArr, setLocalRulesArr] = useState(ruleArr);

//     const handleRulesAdd = () => {
//         setLocalRulesArr([...localRulesArr, {
//             name: "",
//         },
//         ])
//     }

//     const handleRulesRemove = () => {
//         if (localRulesArr.length > 1) {
//             setLocalRulesArr([...localRulesArr.filter((el, index) => index != (localRulesArr.length - 1))])
//         }
//     }


//     const handleRulesHeadingAdd = (index, value) => {
//         let tempArr = localRulesArr;
//         tempArr[index].name = value
//         setLocalRulesArr([...tempArr])
//         getrulesArr([...tempArr])
//     }

//     return (
//         <div className="my-4">
//             <div className="row">
//                 <div className="col-7">
//                     <label>
//                         Hotel Rules <span className="red">*</span>
//                     </label>
//                 </div>
//                 <div className="col-5 d-flex justify-content-between">
//                     <CustomButton
//                         isBtn
//                         noIcon={true}
//                         btntype="button"
//                         iconName="fa-solid fa-check"
//                         btnName="Add Hotel Rules"
//                         ClickEvent={() => handleRulesAdd()}
//                     />
//                     <CustomButton
//                         isBtn
//                         noIcon={true}
//                         btntype="button"
//                         iconName="fa-solid fa-check"
//                         btnName="Remove Hotel Rules"
//                         ClickEvent={() => handleRulesRemove()}
//                     />
//                 </div>
//             </div>
//             {
//                 localRulesArr && localRulesArr.length > 0 && localRulesArr.map((elx, indexXX) => {
//                     return (
//                         <div key={indexXX} className="col-12 col-md-12 my-3">
//                             <div>
//                                 <label htmlFor={`${indexXX}heading${elx._id}`}>
//                                     {`Rule ${indexXX + 1}`}
//                                 </label>
//                                 <input
//                                     name="first_name"
//                                     type="text"
//                                     required=""
//                                     className="form-control"
//                                     id={`${indexXX}heading${elx._id}`}
//                                     value={elx.name}
//                                     onChange={(e) => handleRulesHeadingAdd(indexXX, e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )

// }