import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";

import { amenityCategoryGet } from "../../redux/actions/AmenityCategory/AmenityCategory.action";
import { CollectionGet } from "../../redux/actions/Collection/Collection.actions";
import {
  HOTELADD,
  HOTELUPDATE,
  HOTEL_ADD,
  SetHOTELOBJ,
} from "../../redux/actions/Hotels/Hotel.action";
import { LocationGet } from "../../redux/actions/Location/Location.actions";
import { getHotelByIdApi } from "../../services/Hotels.service";
import { toastError } from "../../utils/toastUtils";
import CustomButton from "../Utility/Button";
import { generalHoteType } from "../Utility/constants";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import MultiFileUpload from "../Utility/MultipleFileUpload";
import { generateFilePath } from "../Utility/utils";

export default function AddHotel() {
  const [hotelObjValue, setHotelObjValue] = useState("");
  const locationReducxArr = useSelector(
    (location) => location.location.locations
  );
  const collectionReduxArr = useSelector(
    (collection) => collection.collection.collections
  );

  const [name, setName] = useState("");
  const [location, setlocation] = useState("");
  const [mainImage, setmainImage] = useState();
  const [price, setprice] = useState();
  const [tagline, settagline] = useState();
  const [googleMap, setgoogleMap] = useState();
  const [locationArr, setlocationArr] = useState([]);
  const [collectionArr, setcollectionArr] = useState([]);
  const [type, settype] = useState("");
  const [collection, setcollection] = useState("");
  ////////over view
  const [description, setDescription] = useState("");
  const [pointDescription, setPointDescription] = useState([]);
  const [amenitiesArr, setamenitiesArr] = useState([]);
  const [isFoodAndDiningIncluded, setIsFoodAndDiningIncluded] = useState(false);
  const [foodAndDiningArr, setFoodAndDiningArr] = useState([]);
  const [imagesArr, setImagesArr] = useState([{ imageUrl: "" }]);
  const [spotlightArr, setSpotlightArr] = useState([]);
  const [faqArr, setFaqArr] = useState([]);
  const [calendarUrl, setcalendarUrl] = useState("");
  const [rmsPropertyId, setrmsPropertyId] = useState("");
  const [rmsCategoryId, setrmsCategoryId] = useState("");
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
    { no: "", name: "bedroom" },
    { no: "", name: "bathroom" },
    { no: "", name: "people" },
    { no: "Included", name: "meals" },
  ]);

  const [guest, setGuest] = useState(0);
  const [meal, setMeal] = useState("");
  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [maxChild, setMaxChild] = useState(0);
  const [maxAdult, setMaxAdult] = useState(0);
  const [galleryArr, setGalleryArr] = useState([]);

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

  ///////hotel rules
  const [propertyRules, setPropertyRules] = useState([]);

  const handleBrandSelection = (obj) => {
    console.log(obj);

    setlocation(obj);
  };

  const handleCollectionSelection = (obj) => {
    setcollection(obj);
  };
  /////////////point description
  const handlePointsDescriptionAdd = () => {
    setPointDescription([...pointDescription, { name: "" }]);
  };
  const handlePointsDescriptionRemove = () => {
    if (pointDescription.length > 1) {
      setPointDescription([
        ...pointDescription.filter(
          (el, index) => index != pointDescription.length - 1
        ),
      ]);
    }
  };
  const handleSetPointDescription = (value, index) => {
    let tempArr = pointDescription;
    tempArr[index].name = value;
    setPointDescription([...tempArr]);
  };

  //////// Multiple Images

  const handleMultipleImagesAdd = () => {
    setImagesArr([...imagesArr, { imageUrl: "" }]);
  };
  const handleMultipleImagesRemove = (index) => {
    setImagesArr([...imagesArr.filter((el, indexxxx) => indexxxx != index)]);
  };
  const handleSetMultipleImages = (value, index) => {
    console.log(value, "valuevaluevaluevalue");

    if (value && value.length > 0) {
      let tempArr = imagesArr;
      let tempImageArr = value.map((img) => ({ imageUrl: img.base64 }));
      const children = tempArr.concat(tempImageArr);
      setImagesArr([...children]);
    } else {
      let tempArr = imagesArr;
      tempArr[index].imageUrl = value;
      setImagesArr([...tempArr]);
    }
  };

  //////// Multiple Spotlight  Images

  const handleMultipleSpotlightAdd = () => {
    setSpotlightArr([...spotlightArr, { imageUrl: "" }]);
  };
  const handleMultipleSpotlightRemove = (inde) => {
    setSpotlightArr([...spotlightArr.filter((el, index) => index != inde)]);
  };
  const handleSetMultipleSpotlight = (value, index) => {
    console.log(value, "valuevaluevalue");
    if (value && value.length > 0) {
      let tempArr = spotlightArr;
      console.log(tempArr, "");
      let tempImageArr = value.map((img) => ({ imageUrl: img.base64 }));
      const children = [...tempArr, ...tempImageArr];
      setSpotlightArr([...children]);
    } else {
      let tempArr = spotlightArr;
      tempArr[index].imageUrl = value;
      setSpotlightArr([...tempArr]);
    }
  };

  //////// Multiple Faq Properties

  const handleMultipleFaqAdd = () => {
    setFaqArr([...faqArr, { imageUrl: "" }]);
  };
  const handleMultipleFaqRemove = (ind) => {
    setFaqArr([...faqArr.filter((el, index) => index != ind)]);
  };
  const handleSetMultipleFaqQuestion = (value, index) => {
    let tempArr = faqArr;
    tempArr[index].question = value;
    setFaqArr([...tempArr]);
  };
  const handleSetMultipleFaqAnswer = (value, index) => {
    let tempArr = faqArr;
    tempArr[index].answer = value;
    setFaqArr([...tempArr]);
  };

  /////////////Food And Dining
  const handleFoodAndDiningAdd = () => {
    setFoodAndDiningArr([...foodAndDiningArr, { name: "" }]);
  };
  const handleFoodAndDiningRemove = () => {
    if (foodAndDiningArr.length > 1) {
      setFoodAndDiningArr([
        ...foodAndDiningArr.filter(
          (el, index) => index != foodAndDiningArr.length - 1
        ),
      ]);
    }
  };

  const handleSetfoodAndDining = (value, index) => {
    let tempArr = foodAndDiningArr;
    tempArr[index].name = value;
    setFoodAndDiningArr([...tempArr]);
  };

  /////////////location And Surroundings
  const handlelocationAndSurroundingsAdd = () => {
    setLocationAndSurroundingsArr([
      ...locationAndSurroundingsArr,
      { name: "" },
    ]);
  };
  const handlelocationAndSurroundingsRemove = () => {
    if (locationAndSurroundingsArr.length > 1) {
      setLocationAndSurroundingsArr([
        ...locationAndSurroundingsArr.filter(
          (el, index) => index != locationAndSurroundingsArr.length - 1
        ),
      ]);
    }
  };
  const handleSetlocationAndSurroundings = (value, index) => {
    let tempArr = locationAndSurroundingsArr;
    tempArr[index].name = value;
    setLocationAndSurroundingsArr([...tempArr]);
  };

  /////////////property Highlights
  const handlepropertyHighlightsAdd = () => {
    setPropertyHighlightsArr([...propertyHighlightsArr, { name: "" }]);
  };
  const handlepropertyHighlightsRemove = () => {
    if (propertyHighlightsArr.length > 1) {
      setPropertyHighlightsArr([
        ...propertyHighlightsArr.filter(
          (el, index) => index != propertyHighlightsArr.length - 1
        ),
      ]);
    }
  };
  const handleSetpropertyHighlights = (value, index) => {
    let tempArr = propertyHighlightsArr;
    tempArr[index].name = value;
    setPropertyHighlightsArr([...tempArr]);
  };

  /////////////Room And Amenitites
  const handleRoomAndAmenititesAdd = () => {
    setRoomAndAmenitiesArr([...roomAndAmenitiesArr, { name: "" }]);
  };
  const handleRoomAndAmenitiesRemove = () => {
    if (roomAndAmenitiesArr.length > 1) {
      setRoomAndAmenitiesArr([
        ...roomAndAmenitiesArr.filter(
          (el, index) => index != roomAndAmenitiesArr.length - 1
        ),
      ]);
    }
  };
  const handleSetRoomAndAmenities = (value, index) => {
    let tempArr = roomAndAmenitiesArr;
    tempArr[index].name = value;
    setRoomAndAmenitiesArr([...tempArr]);
  };

  const handleSetRoomAndAmenitiesService = (value, index) => {
    let tempArr = roomAndAmenitiesServiceArr;
    tempArr[index].no = value;
    setRoomAndAmenitiesServiceArr([...tempArr]);
  };

  useEffect(() => {
    if (locationReducxArr) {
      setlocationArr(locationReducxArr);
      // if (hotelObj && hotelObj.location) {
      //   let tempCollObj =
      //     locationReducxArr &&
      //     locationReducxArr.find(
      //       (el) => `${el._id}` === `${hotelObj.location}`
      //     );
      //   if (tempCollObj != undefined) {
      //     console.log(tempCollObj, "tempCollObj-------------------------");
      //      setlocation({value:tempCollObj?._id,label:tempCollObj.name})
      //   }
      // }
    }
  }, [locationReducxArr]);

  useEffect(() => {
    if (collectionReduxArr) {
      setcollectionArr(collectionReduxArr);
    }
  }, [collectionReduxArr]);
  /////////////Activities And Near by Attractions
  const handleActivitiesAndNearbyAttractionsAdd = () => {
    setActivitiesAndNearbyAttractionsArr([
      ...ActivitiesAndNearbyAttractionsArr,
      { name: "" },
    ]);
  };
  const handleActivitiesAndNearbyAttractionsRemove = () => {
    if (ActivitiesAndNearbyAttractionsArr.length > 1) {
      setActivitiesAndNearbyAttractionsArr([
        ...ActivitiesAndNearbyAttractionsArr.filter(
          (el, index) => index != ActivitiesAndNearbyAttractionsArr.length - 1
        ),
      ]);
    }
  };
  const handleSetActivitiesAndNearbyAttractions = (value, index) => {
    let tempArr = ActivitiesAndNearbyAttractionsArr;
    tempArr[index].name = value;
    setActivitiesAndNearbyAttractionsArr([...tempArr]);
    console.log(tempArr, "tempArr");
  };

  /////////////Activities And Near by Night Life
  const handleNightLifeAdd = () => {
    setNightLifeArr([...NightLifeArr, { name: "" }]);
  };
  const handleNightLifeRemove = () => {
    if (NightLifeArr.length > 1) {
      setNightLifeArr([
        ...NightLifeArr.filter((el, index) => index != NightLifeArr.length - 1),
      ]);
    }
  };
  const handleSetNightLife = (value, index) => {
    let tempArr = NightLifeArr;
    tempArr[index].name = value;
    setNightLifeArr([...tempArr]);
    console.log(tempArr, "tempArr");
  };

  /////////////Rooms
  const handleRoomAdd = () => {
    setRoomsArr([
      ...roomsArr,
      {
        name: "",
        // price: 1,
        area: "",
        bed: "",
        view: "",
        // description: "",
        // imagesArr: [{ imageUrl: "" }],
        image: "",
        amenitiesArr: [...displayAmenityCategoryArr],
      },
    ]);
  };

  const handleRoomRemove = (inr) => {
    setRoomsArr([...roomsArr.filter((el, index) => index != inr)]);
  };

  const handleSetRoomName = (value, index) => {
    let tempArr = roomsArr;
    tempArr[index].name = value;
    setRoomsArr([...tempArr]);
  };

  const handleSetRoomPrice = (value, index) => {
    let tempArr = roomsArr;
    tempArr[index].price = value;
    setRoomsArr([...tempArr]);
  };
  const handleSetRoomArea = (value, index) => {
    let tempArr = roomsArr;
    tempArr[index].area = value;
    setRoomsArr([...tempArr]);
  };
  const handleSetRoomBed = (value, index) => {
    let tempArr = roomsArr;
    tempArr[index].bed = value;
    setRoomsArr([...tempArr]);
  };

  const handleSetRoomSingleImage = (index, value) => {
    let tempArr = roomsArr;
    tempArr[index].image = value;

    //  if(tempArr[index]?.image ){
    //  } else {
    //   let obj = tempArr[index];

    //   obj.image  = value;
    //   tempArr[index] = obj
    //  }
    console.log(tempArr, "tempArrtempArrtempArr");
    setRoomsArr([...tempArr]);
  };
  const handleSetRoomView = (value, index) => {
    let tempArr = roomsArr;
    tempArr[index].view = value;
    setRoomsArr([...tempArr]);
  };

  const handleGalleryAdd = () => {
    setGalleryArr([
      ...galleryArr,
      {
        title: "",
        imagesArr: [],
      },
    ]);
  };

  const handleGalleyRemove = (inr) => {
    setGalleryArr([...galleryArr.filter((el, index) => index != inr)]);
  };

  const handleGalleryValue = (key, value, index) => {
    let tempArr = galleryArr;
    tempArr[index][key] = value;
    setGalleryArr([...tempArr]);
  };

  const handleSetGalleyImage = (index, value) => {
    let tempgalleryArr = [...galleryArr];

    if (value && value.length > 0) {
      let tempImageArr = value.map((img) => ({ imageUrl: img.base64 }));
      let tempimaArr = [...tempgalleryArr[index].imagesArr];

      const children = [...tempimaArr, ...tempImageArr];
      tempgalleryArr[index].imagesArr = children;
      setGalleryArr([...tempgalleryArr]);
    } else {
      let tempArr = [...galleryArr[index].imagesArr];
      tempArr.push({
        imageUrl: value,
      });
      tempgalleryArr[index].imagesArr = tempArr;

      setGalleryArr([...tempgalleryArr]);
    }
  };
  const handleGallerymagesRemove = (index, indexX) => {
    console.log(index, indexX);
    let tempArr = [...galleryArr];
    let tempimaArr = [...tempArr[index].imagesArr];
    tempimaArr = tempimaArr.filter((el, ind) => indexX != ind);
    tempArr[index].imagesArr = tempimaArr;

    setGalleryArr([...tempArr]);
  };
  //   const handleSetRoomDescritpion = (value, index) => {
  //     let tempArr = roomsArr;
  //     tempArr[index].description = value;
  //     setRoomsArr([...tempArr]);
  //   };
  const handleSetRoomImage = (index, indexX, value) => {
    console.log(index, indexX, value);
    let tempArr = roomsArr;
    tempArr[index].imagesArr[indexX].imageUrl = value;
    setRoomsArr([...tempArr]);
  };

  ///////////images
  const handleRoomImageAdd = (index, value) => {
    let tempArr = roomsArr.map((el, i) => {
      if (i == index) {
        let temp = el.imagesArr;
        temp.push({ imageUrl: "" });
        el.imagesArr = [...temp];
      }
      return el;
    });
    setRoomsArr([...tempArr]);
  };

  const handleRoomImageRemove = (index) => {
    let tempArr = roomsArr;
    if (tempArr[index].imagesArr.length > 1) {
      tempArr = tempArr.map((el, i) => {
        if (i == index) {
          let temp = el.imagesArr.filter(
            (ele, indexX) => indexX != el.imagesArr.length - 1
          );
          el.imagesArr = [...temp];
        }
        return el;
      });
      setRoomsArr([...tempArr]);
    }
  };

  const handleSetAmenitiesInRoom = (params, index) => {
    let tempArr = roomsArr;
    tempArr[index].amenitiesArr = params;
    setRoomsArr([...tempArr]);
  };

  const [editModeActive, setEditModeActive] = useState(false);
  const dispatch = useDispatch();

  const amenityCategoryArr = useSelector(
    (state) => state.amenityCategory.amenityCategoryArr
  );
  // const hotelObj = useSelector((state) => state.hotel.hotelObj);

  const [hotelObj, setHotelObj] = useState("");

  const [displayAmenityCategoryArr, setDisplayAmenityCategoryArr] = useState(
    []
  );

  const handleGetById = async (id) => {
    try {
      let { data: res } = await getHotelByIdApi(id);
      if (res.data) {
        setHotelObj(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };

  let { id } = useParams();
  useEffect(() => {
    if (id) {
      handleGetById(id);
    }
  }, [id]);

  const handleSubmit = () => {
    if (name == "") {
      toastError("Properties Name cannot be empty");
      return;
    }
    if (description == "") {
      toastError("Properties description cannot be empty");
      return;
    }

    // console.log(location,"https://meet.google.com/ejn-njgd-hkrhttps://meet.google.com/ejn-njgd-hkrhttps://meet.google.com/ejn-njgd-hkr")
    // if (tagline == "") {
    //   toastError("Properties Tagline cannot be empty");
    //   return;
    // }
    if (!location || location === "") {
      toastError("Properties Location cannot be empty");
      return;
    }
    if (collection == "" || collection?.length == 0) {
      toastError("Properties Collection cannot be empty");
      return;
    }
    if (price == "") {
      toastError("Properties Price cannot be empty");
      return;
    }
    if (googleMap == "") {
      toastError("Properties Map cannot be empty");
      return;
    }
    if (mainImage == "") {
      toastError("Properties Main Image cannot be empty");
      return;
    }
    if (type == "") {
      toastError("Type cannot be empty");
      return;
    }
    if (guest == 0) {
      toastError("Guest cannot be zero");
      return;
    }
    // if (propertyReachingInstructions == "") {
    //   toastError("Properties Reaching Instructions cannot be empty");
    //   return;
    // }
    // if (
    //   pointDescription.length > 0 &&
    //   pointDescription &&
    //   pointDescription.some((el) => el.name == "")
    // ) {
    //   toastError("Please fill all the fields in point description section.");
    //   return;
    // }
    // if (
    //   propertyRules.length > 0 &&
    //   propertyRules &&
    //   propertyRules.some((el) => el.heading == "")
    // ) {
    //   toastError(
    //     "Please fill all the fields in Properties Rules section. (Heading)"
    //   );
    //   return;
    // }
    if (
      propertyRules.length > 0 &&
      propertyRules &&
      propertyRules.some((el) => el.rulesArr.some((ele) => ele.name == ""))
    ) {
      toastError("Please fill all the fields in Properties Rules section.");
      return;
    }
    // if (!roomsArr.length > 0 || !roomsArr) {
    //   toastError("Please add Rooms.");
    //   return;
    // }
    // if (
    //   roomsArr.length > 0 &&
    //   roomsArr &&
    //   roomsArr.some((el) => el.name == "")
    // ) {
    //   toastError(
    //     "Please fill Room name field for all the Rooms in the Room section."
    //   );
    //   return;
    // }
    // if (
    //   roomsArr.length > 0 &&
    //   roomsArr &&
    //   roomsArr.some((el) => el.price == "" || el.price == 0 || el.price < 0)
    // ) {
    //   toastError(
    //     "Room price not found or less than zero values added for some or all the Rooms in the Room section."
    //   );
    //   return;
    // }
    // if (
    //   roomsArr.length > 0 &&
    //   roomsArr &&
    //   roomsArr.some((el) => el.area == "")
    // ) {
    //   toastError(
    //     "Please fill Room area field for all the Rooms in the Room section."
    //   );
    //   return;
    // }
    // if (
    //   roomsArr.length > 0 &&
    //   roomsArr &&
    //   roomsArr.some((el) => el.view == "")
    // ) {
    //   toastError(
    //     "Please fill Room view field for all the Rooms in the Room section."
    //   );
    //   return;
    // }
    // if (
    //   roomsArr.length > 0 &&
    //   roomsArr &&
    //   roomsArr.some((el) => el.bed == "")
    // ) {
    //   toastError(
    //     "Please fill Room bed field for all the Rooms in the Room section."
    //   );
    //   return;
    // }
    // if (
    //   roomsArr.length > 0 &&
    //   roomsArr &&
    //   roomsArr.some((el) => el.imagesArr.some((ele) => ele.imageUrl == ""))
    // ) {
    //   toastError("Please upload images in all Rooms in the Room section.");
    //   return;
    // }
    // if (
    //   roomsArr.length > 0 &&
    //   roomsArr &&
    //   roomsArr.some((el) =>
    //     el.amenitiesArr.every((ele) => ele.checked == false)
    //   )
    // ) {
    //   toastError(
    //     "Please select atleast one amenity in the Room (Amenity) section."
    //   );
    //   return;
    // }
    // if (
    //   roomsArr.length > 0 &&
    //   roomsArr &&
    //   roomsArr.some((el) =>
    //     el.amenitiesArr.some((ele) => {
    //       if (ele.checked == true) {
    //         if (ele.amenityArr.every((elx) => elx.checked == false)) {
    //           return true;
    //         } else {
    //           return false;
    //         }
    //       }
    //     })
    //   )
    // ) {
    //   toastError(
    //     "Please select atleast one amenity in the Room (Amenity) section.(inner)"
    //   );
    //   return;
    // }

    let obj = {
      name: name,
      description,
      location: location._id,
      tagline,
      mainImage,
      price,
      hotelType: type,
      imagesArr,
      spotlightArr,
      googleMap,
      pointDescription,
      propertyReachingInstructions,
      roomAndAmenitiesServiceArr,
      isFoodAndDiningIncluded,
      isNightLifeIncluded,
      isRoomAndAmenititesIncluded,
      isLocationAndSurroundingsIncluded,
      isActivitiesAndNearbyAttractionsIncluded,
      isPropertyHighlightsIncluded,
      isFAQIncluded,
      calendarUrl,
      guest,
      bedroom,
      bathroom,
      meal,
      maxAdult,
      maxChild,
      rmsCategoryId,
      rmsPropertyId,
      galleryArr,
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
      roomsArr,
      // roomsArr: roomsArr.map((el) => {
      //   let obj = {
      //     ...el,
      //     amenitiesArr: el.amenitiesArr
      //       .filter((ele) => ele.checked == true)
      //       .map((ele) => {
      //         let obj2 = {
      //           amenityCategoryId: ele._id,
      //           amenityCategoryName: ele.name,
      //           amenityArr: ele.amenityArr
      //             .filter((elm) => elm.checked == true)
      //             .map((elm) => {
      //               return {
      //                 amenityId: elm._id,
      //                 amenityName: elm.name,
      //                 amenityImage: elm.image,
      //               };
      //             }),
      //         };
      //         return obj2;
      //       }),
      //   };
      //   return obj;
      // }),
      propertyRules,
    };

    if (isFoodAndDiningIncluded) {
      if (
        foodAndDiningArr.length > 0 &&
        foodAndDiningArr &&
        foodAndDiningArr.some((el) => el.name == "")
      ) {
        toastError("Please fill all the fields in Features section.");
        return;
      }
      obj.foodAndDiningArr = foodAndDiningArr;
    }

    if (isNightLifeIncluded) {
      if (
        NightLifeArr.length > 0 &&
        NightLifeArr &&
        NightLifeArr.some((el) => el.name == "")
      ) {
        toastError("Please fill all the fields in Features section.");
        return;
      }
      obj.nightLifeArr = NightLifeArr;
    }

    if (isPropertyHighlightsIncluded) {
      if (
        propertyHighlightsArr.length > 0 &&
        propertyHighlightsArr &&
        propertyHighlightsArr.some((el) => el.name == "")
      ) {
        toastError(
          "Please fill all the fields in Property Attractions section."
        );
        return;
      }
      obj.propertyHighlightsArr = propertyHighlightsArr;
    }
    if (isLocationAndSurroundingsIncluded) {
      if (
        locationAndSurroundingsArr.length > 0 &&
        locationAndSurroundingsArr &&
        locationAndSurroundingsArr.some((el) => el.name == "")
      ) {
        toastError("Please fill all the fields in Restaurants section.");
        return;
      }
      obj.locationAndSurroundingsArr = locationAndSurroundingsArr;
    }
    if (isFAQIncluded) {
      if (
        faqArr.length > 0 &&
        faqArr &&
        faqArr.some((el) => el.question == "")
      ) {
        toastError("Please fill all the fields in Faq section.");
        return;
      }

      if (faqArr.length > 0 && faqArr && faqArr.some((el) => el.answer == "")) {
        toastError("Please fill all the fields in Faq section.");
        return;
      }
    }

    if (collection && collection.length > 0) {
      let collectar = collection.map((el) => ({
        ...el,
        label: el.name,
        id: el._id,
      }));

      obj.hotelCollection = collectar;
    }
    if (isRoomAndAmenititesIncluded) {
      // if (
      //   roomAndAmenitiesArr.length > 0 &&
      //   roomAndAmenitiesArr &&
      //   roomAndAmenitiesArr.some((el) => el.name == "")
      // ) {
      //   toastError("Please fill all the fields in Room And Amenities section.");
      //   return;
      // }
      obj.roomAndAmenitiesArr = roomAndAmenitiesArr;
    }
    if (isActivitiesAndNearbyAttractionsIncluded) {
      if (
        ActivitiesAndNearbyAttractionsArr.length > 0 &&
        ActivitiesAndNearbyAttractionsArr &&
        ActivitiesAndNearbyAttractionsArr.some((el) => el.name == "")
      ) {
        toastError("Please fill all the fields in Near by Activities section.");
        return;
      }
      obj.ActivitiesAndNearbyAttractionsArr = ActivitiesAndNearbyAttractionsArr;
    }

    obj.faqArr = faqArr;
    if (hotelObjValue && hotelObjValue._id) {
      dispatch(HOTELUPDATE(obj, hotelObjValue._id));
      // dispatch(SetHOTELOBJ(null));
    } else {
      // dispatch(HOTELADD(obj));
    }
  };

  useEffect(() => {
    dispatch(amenityCategoryGet());
    dispatch(LocationGet());
    dispatch(CollectionGet());
  }, []);

  useEffect(() => {
    if (hotelObj && hotelObj.name) {
      setName(hotelObj?.name);
      settagline(hotelObj?.tagline);
      setgoogleMap(hotelObj?.googleMap);
      setprice(hotelObj?.price);
      setmainImage(hotelObj?.mainImage);
      setcalendarUrl(hotelObj?.calendarUrl);
      setDescription(hotelObj?.description);
      setPropertyReachingInstructions(hotelObj?.propertyReachingInstructions);
      setPointDescription(hotelObj.pointDescription);
      setPropertyRules(hotelObj.propertyRules);
      setIsFoodAndDiningIncluded(hotelObj.isFoodAndDiningIncluded);
      setBedroom(hotelObj?.bedroom);
      setGuest(hotelObj?.guest);
      setMeal(hotelObj?.meal);
      setBathroom(hotelObj?.bathroom);
      setrmsCategoryId(hotelObj?.rmsCategoryId);
      setrmsPropertyId(hotelObj?.rmsPropertyId);
      setMaxAdult(hotelObj?.maxAdult);
      setMaxChild(hotelObj?.maxChild);
      if (hotelObj.foodAndDiningArr && hotelObj.foodAndDiningArr.length > 0) {
        setFoodAndDiningArr(hotelObj.foodAndDiningArr);
      }
      if (hotelObj.galleryArr && hotelObj.galleryArr.length > 0) {
        setGalleryArr(hotelObj?.galleryArr);
      }

      if (hotelObj.nightLifeArr && hotelObj.nightLifeArr.length > 0) {
        setNightLifeArr(hotelObj.nightLifeArr);
      }
      setIsNightLifeIncluded(hotelObj.isNightLifeIncluded);

      if (hotelObj.faqArr && hotelObj.faqArr.length > 0) {
        setFaqArr(hotelObj.faqArr);
      }
      setIsFAQIncluded(hotelObj?.isFAQIncluded);
      if (
        hotelObj.locationAndSurroundingsArr &&
        hotelObj.locationAndSurroundingsArr.length > 0
      ) {
        setLocationAndSurroundingsArr(hotelObj.locationAndSurroundingsArr);
      }

      setIsLocationAndSurroundingsIncluded(
        hotelObj?.isLocationAndSurroundingsIncluded
      );
      if (
        hotelObj.roomAndAmenitiesServiceArr &&
        hotelObj.roomAndAmenitiesServiceArr.length > 0
      ) {
        setRoomAndAmenitiesServiceArr(hotelObj.roomAndAmenitiesServiceArr);
      }
      if (
        hotelObj.propertyHighlightsArr &&
        hotelObj.propertyHighlightsArr.length > 0
      ) {
        setPropertyHighlightsArr(hotelObj.propertyHighlightsArr);
      }
      setIsPropertyHighlightsIncluded(
        hotelObj?.setIsPropertyHighlightsIncluded
      );

      if (
        hotelObj.roomAndAmenitiesArr &&
        hotelObj.roomAndAmenitiesArr.length > 0
      ) {
        setRoomAndAmenitiesArr(hotelObj.roomAndAmenitiesArr);
      }
      setIsRoomAndAmenititesIncluded(hotelObj?.isRoomAndAmenititesIncluded);

      if (
        hotelObj.ActivitiesAndNearbyAttractionsArr &&
        hotelObj.ActivitiesAndNearbyAttractionsArr.length > 0
      ) {
        setActivitiesAndNearbyAttractionsArr(
          hotelObj.ActivitiesAndNearbyAttractionsArr
        );
      }

      setIsActivitiesAndNearbyAttractionsIncluded(
        hotelObj?.isActivitiesAndNearbyAttractionsIncluded
      );

      setEditModeActive(true);
      if (hotelObj.roomsArr && hotelObj.roomsArr.length > 0) {
        setRoomsArr(hotelObj.roomsArr);
      } else {
        setRoomsArr([]);
      }

      if (hotelObj.imagesArr && hotelObj.imagesArr.length > 0) {
        setImagesArr(hotelObj.imagesArr);
      }
      settype(hotelObj.hotelType);
      if (hotelObj.spotlightArr && hotelObj.spotlightArr.length > 0) {
        setSpotlightArr(hotelObj.spotlightArr);
      }
      if (hotelObj.hotelCollection && hotelObj.hotelCollection.length > 0) {
        setcollection(
          hotelObj.hotelCollection.map((el) => ({
            ...el,
            label: el.name,
            value: el.id,
          }))
        );
      }

      if (hotelObj && hotelObj?.locationObj) {
        setlocation({
          value: hotelObj?.locationObj?._id,
          label: hotelObj?.locationObj.name,
        });
      }
      setHotelObjValue(hotelObj);
    }
  }, [hotelObj]);

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
      if (hotelObjValue) {
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
        // setRoomsArr([
        //   {
        //     name: "",
        //     price: 1,
        //     area: "",
        //     bed: "",
        //     view: "",
        //     image: "",
        //     imagesArr: [{ imageUrl: "" }],
        //     amenitiesArr: [
        //       ...amenityCategoryArr.map((el) => {
        //         let obj = {
        //           ...el,
        //           checked: false,
        //         };
        //         return obj;
        //       }),
        //     ],
        //   },
        // ]);

        console.log("dfgdfgdgffgdfgdfdfgdfgdf");
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

  useEffect(() => {}, [roomsArr]);

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

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Edit Hotel</h5>
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
              <div className="col-12 col-md-6 mb-3">
                <label>
                  Full Address <span className="red">*</span>
                </label>
                <input
                  name="first_name"
                  className="form-control"
                  type="text"
                  required=""
                  value={tagline}
                  onChange={(e) => settagline(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-12 mb-3">
                <label>
                  Google map Iframe <span className="red">*</span>
                </label>
                <input
                  name="first_name"
                  className="form-control"
                  type="text"
                  required=""
                  value={googleMap}
                  onChange={(e) => setgoogleMap(e.target.value)}
                />
              </div>
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
              <div className="col-12 col-md-6 mb-3">
                <label>
                  Location <span className="red">*</span>
                </label>
                {locationArr && locationArr.length > 0 && (
                  <Select
                    onChange={handleBrandSelection}
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
              <div className="col-12 col-md-6 mb-3">
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
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label>
                  Price Per Night <span className="red">*</span>
                </label>
                <input
                  name="first_name"
                  className="form-control"
                  type="text"
                  required=""
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              {/* <div className="col-12 col-md-6 mb-3">
                <label>
                  Calendar Url <span className="red">*</span>
                </label>
                <input
                  name="first_name"
                  className="form-control"
                  type="text"
                  required=""
                  value={calendarUrl}
                  onChange={(e) => setcalendarUrl(e.target.value)}
                />
              </div> */}
              <div className="col-12 col-md-6 mb-3">
                <label>
                  Type <span className="red">*</span>
                </label>
                <select
                  className="form-control"
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                >
                  <option value="">Please Select Property Type</option>

                  <option value={generalHoteType.Hotel}>Hotels</option>
                  <option value={generalHoteType.HomeStay}>Apartment</option>
                </select>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label>
                  RMS Category Id <span className="red">*</span>
                </label>
                <input
                  name="first_name"
                  className="form-control"
                  type="text"
                  required=""
                  value={rmsCategoryId}
                  onChange={(e) => setrmsCategoryId(e.target.value)}
                />
              </div>{" "}
              <div className="col-12 col-md-6 mb-3">
                <label>
                  RMS Property Id <span className="red">*</span>
                </label>
                <input
                  name="first_name"
                  className="form-control"
                  type="text"
                  required=""
                  value={rmsPropertyId}
                  onChange={(e) => setrmsPropertyId(e.target.value)}
                />
              </div>
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
              </div>
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
                      </>
                    );
                  })}
              </div>
              <hr className="py-2" />
              <h6 className="blue-1 mb-4">Description Section </h6>
              <div className="col-12 col-md-12 mb-3">
                <label>
                  Description <span className="red">*</span>
                </label>
                <ReactQuill
                  theme="snow"
                  type="text"
                  required=""
                  value={description}
                  onChange={(e) => setDescription(e)}
                />
              </div>
              <>
                {" "}
                <hr className="py-2" />
                <h6 className="blue-1 mb-4">Gallery Section </h6>
                <div className="col-12 col-md-12 my-3">
                  <div className="row">
                    <div className="col-9">
                      <label className="me-3">
                        Gallery <span className="red">*</span>
                      </label>
                      <CustomButton
                        isBtn
                        noIcon={true}
                        btntype="button"
                        iconName="fa-solid fa-check"
                        btnName="Add Gallery"
                        ClickEvent={() => handleGalleryAdd()}
                      />
                    </div>
                  </div>
                </div>
                {galleryArr &&
                  galleryArr.length > 0 &&
                  galleryArr.map((el, index) => {
                    return (
                      <>
                        <div key={index} className="row border-bottom pt-3">
                          <div className="col-12 col-md-5 mb-3">
                            <label htmlFor="">Gallery Category</label>
                            <input
                              name="first_name"
                              className="form-control"
                              type="text"
                              required=""
                              placeholder={` ${index + 1}`}
                              value={el.title}
                              onChange={(e) =>
                                handleGalleryValue(
                                  "title",
                                  e.target.value,
                                  index
                                )
                              }
                            />
                          </div>

                          <div className="col-12 col-md-5 mb-3">
                            <label htmlFor="">Gallery Images</label>

                            <MultiFileUpload
                              onFileChange={(val) =>
                                handleSetGalleyImage(index, val)
                              }
                            />
                          </div>
                          <div className="col-md-2 mb-3">
                            <button
                              type="button"
                              onClick={() => handleGalleyRemove(index)}
                              className="btn mt-3 btn-danger btn-sm"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        <div className="row ">
                          {el.imagesArr &&
                            el.imagesArr.length > 0 &&
                            el.imagesArr.map((el, gindex) => {
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
                                      onClick={() =>
                                        handleGallerymagesRemove(index, gindex)
                                      }
                                    >
                                      <i className="fa fa-close"></i>
                                    </button>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      </>
                    );
                  })}
              </>
              <div className="border-bottom py-3">
                <div className="col-12 col-md-12 mb-3">
                  <span style={{ paddingRight: 15 }}>
                    Is Cottage Service Included
                  </span>
                  <input
                    name="first_name"
                    type="checkbox"
                    required=""
                    checked={isRoomAndAmenititesIncluded}
                    onChange={() =>
                      setIsRoomAndAmenititesIncluded(
                        !isRoomAndAmenititesIncluded
                      )
                    }
                  />
                </div>
                {isRoomAndAmenititesIncluded && (
                  <>
                    {/* <div className="col-12 col-md-12 mb-3">
                                <div className="row d-flex justify-content-end">
                                  <div className="col-3 d-flex justify-content-between">
                                    <CustomButton
                                      isBtn
                                      noIcon={true}
                                      btntype="button"
                                      iconName="fa-solid fa-check"
                                      btnName="Add"
                                      ClickEvent={() => handleRoomAndAmenititesAdd()}
                                    />
                                    <CustomButton
                                      isBtn
                                      noIcon={true}
                                      btntype="button"
                                      iconName="fa-solid fa-check"
                                      btnName="Remove"
                                      ClickEvent={() => handleRoomAndAmenitiesRemove()}
                                    />
                                  </div>
                                </div>
                              </div> */}
                    <div className="row">
                      <div className="col-12 col-md-3 mb-3">
                        <label>Bedroom</label>
                        <input
                          name="first_name"
                          className="form-control"
                          type="text"
                          placeholder={`No of bedroom`}
                          value={bedroom}
                          onChange={(e) => setBedroom(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md-3 mb-3">
                        <label>Bathroom</label>
                        <input
                          name="first_name"
                          className="form-control"
                          type="text"
                          placeholder={`No of bathroom`}
                          value={bathroom}
                          onChange={(e) => setBathroom(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md-3 mb-3">
                        <label>People</label>
                        <input
                          name="first_name"
                          className="form-control"
                          type="text"
                          placeholder={`No of People`}
                          value={guest}
                          onChange={(e) => setGuest(e.target.value)}
                        />
                      </div>

                      <div className="col-12 col-md-3 mb-3">
                        <label>Meal</label>
                        <input
                          name="first_name"
                          className="form-control"
                          type="text"
                          placeholder={`Enter meal`}
                          value={meal}
                          onChange={(e) => setMeal(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md-3 mb-3">
                        <label>Extra Adult</label>
                        <input
                          name="first_name"
                          className="form-control"
                          type="text"
                          placeholder={`No of extra adult`}
                          value={maxAdult}
                          onChange={(e) => setMaxAdult(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md-3 mb-3">
                        <label>Extra Child</label>
                        <input
                          name="first_name"
                          className="form-control"
                          type="text"
                          placeholder={`No of extra child`}
                          value={maxChild}
                          onChange={(e) => setMaxChild(e.target.value)}
                        />
                      </div>

                      {/* {roomAndAmenitiesServiceArr &&
                                  roomAndAmenitiesServiceArr.length > 0 &&
                                  roomAndAmenitiesServiceArr.map((el, index) => {
                                    return (
                                      <div key={index} className="col-12 col-md-3 mb-3">
                                        <label>{el.name ?? ""}</label>
                                        <input
                                          name="first_name"
                                          className="form-control"
                                          type="text"
                                          placeholder={`No of ${el.name}`}
                                          value={el.no}
                                          onChange={(e) =>
                                            handleSetRoomAndAmenitiesService(
                                              e.target.value,
                                              index
                                            )
                                          }
                                        />
                                      </div>
                                    );
                                  })} */}
                    </div>
                  </>
                )}
              </div>
          
                  {" "}
                  <hr className="py-2" />
                  <h6 className="blue-1 mb-4">Space Section </h6>
                  <div className="col-12 col-md-12 my-3">
                    <div className="row">
                      <div className="col-9">
                        <label className="me-3">
                          Rooms <span className="red">*</span>
                        </label>
                        <CustomButton
                          isBtn
                          noIcon={true}
                          btntype="button"
                          iconName="fa-solid fa-check"
                          btnName="Add Room"
                          ClickEvent={() => handleRoomAdd()}
                        />
                      </div>
                    </div>
                  </div>
                  {roomsArr &&
                    roomsArr.length > 0 &&
                    roomsArr.map((el, index) => {
                      return (
                        <div key={index} className="row border-bottom pt-3">
                          <div className="col-12 col-md-3 mb-3">
                            <label htmlFor="">Room name</label>
                            <input
                              name="first_name"
                              className="form-control"
                              type="text"
                              required=""
                              placeholder={` ${index + 1}`}
                              value={el.name}
                              onChange={(e) =>
                                handleSetRoomName(e.target.value, index)
                              }
                            />
                            <button
                              type="button"
                              onClick={() => handleRoomRemove(index)}
                              className="btn mt-3 btn-danger btn-sm"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                          <div className="col-12 col-md-2 mb-3">
                            {el.image && el.image?.includes("base64") ? (
                              <img
                                src={el.image}
                                width="100px"
                                height="100px"
                              />
                            ) : (
                              <img
                                src={generateFilePath(el.image)}
                                width="100px"
                                height="100px"
                              />
                            )}
                          </div>
                          <div className="col-12 col-md-3 mb-3">
                            <label htmlFor="">Room Image</label>
                            <FileUpload
                              onFileChange={(val) =>
                                handleSetRoomSingleImage(index, val)
                              }
                            />
                          </div>
                          <div className="col-12 col-md-4 mb-3">
                            <label htmlFor="">Room Description</label>
                            <textarea
                              name="first_name"
                              className="form-control"
                              type="text"
                              required=""
                              placeholder={` ${index + 1}`}
                              value={el.view}
                              onChange={(e) =>
                                handleSetRoomView(e.target.value, index)
                              }
                            />
                          </div>
                          {/* <div className="col-12">
                              <label>
                                Room Images <span className="red">*</span>
                              </label>
                           
                            <MultiFileUpload
                                onFileChange={(val) =>
                                  handleSetMultipleSpotlight(val,0)
                                }
                              />
                       
                          <div className="row">
                          {el &&
                    el.length > 0 &&
                    el.map((el, index) => {
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
                        </div>
                      );
                    })}
           
              <div className="border-bottom py-3">
                <div className="col-12 col-md-12 mb-3">
                  <span style={{ paddingRight: 15 }}>Property Features</span>
                  <input
                    name="first_name"
                    type="checkbox"
                    required=""
                    checked={isFoodAndDiningIncluded}
                    onChange={() =>
                      setIsFoodAndDiningIncluded(!isFoodAndDiningIncluded)
                    }
                  />
                </div>

                {isFoodAndDiningIncluded && (
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
                            ClickEvent={() => handleFoodAndDiningAdd()}
                          />
                          <CustomButton
                            isBtn
                            noIcon={true}
                            btntype="button"
                            iconName="fa-solid fa-check"
                            btnName="Remove"
                            ClickEvent={() => handleFoodAndDiningRemove()}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {foodAndDiningArr &&
                        foodAndDiningArr.length > 0 &&
                        foodAndDiningArr.map((el, index) => {
                          return (
                            <div key={index} className="col-12 col-md-3 mb-3">
                              <input
                                name="first_name"
                                className="form-control"
                                type="text"
                                placeholder={`Features ${index + 1}`}
                                value={el.name}
                                onChange={(e) =>
                                  handleSetfoodAndDining(e.target.value, index)
                                }
                              />
                            </div>
                          );
                        })}
                    </div>
                  </>
                )}
              </div>
              <div className="border-bottom py-3">
                <div className="col-12 col-md-12 mb-3">
                  <span style={{ paddingRight: 15 }}>Must Know</span>
                  <input
                    name="first_name"
                    type="checkbox"
                    required=""
                    checked={isPropertyHighlightsIncluded}
                    onChange={() =>
                      setIsPropertyHighlightsIncluded(
                        !isPropertyHighlightsIncluded
                      )
                    }
                  />
                </div>
                {isPropertyHighlightsIncluded && (
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
                            ClickEvent={() => handlepropertyHighlightsAdd()}
                          />
                          <CustomButton
                            isBtn
                            noIcon={true}
                            btntype="button"
                            iconName="fa-solid fa-check"
                            btnName="Remove"
                            ClickEvent={() => handlepropertyHighlightsRemove()}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {propertyHighlightsArr &&
                        propertyHighlightsArr.length > 0 &&
                        propertyHighlightsArr.map((el, index) => {
                          return (
                            <div key={index} className="col-12 col-md-3 mb-3">
                              <input
                                name="first_name"
                                className="form-control"
                                type="text"
                                placeholder={`Nearby Attractions ${index + 1}`}
                                value={el.name}
                                onChange={(e) =>
                                  handleSetpropertyHighlights(
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
              </div>
              <div className="border-bottom py-3">
                <div className="col-12 col-md-12 mb-3">
                  <span style={{ paddingRight: 15 }}>
                    We Want You to Feel at Home So, We Provide
                  </span>
                  <input
                    name="first_name"
                    type="checkbox"
                    required=""
                    checked={isLocationAndSurroundingsIncluded}
                    onChange={() =>
                      setIsLocationAndSurroundingsIncluded(
                        !isLocationAndSurroundingsIncluded
                      )
                    }
                  />
                </div>
                {isLocationAndSurroundingsIncluded && (
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
                            ClickEvent={() =>
                              handlelocationAndSurroundingsAdd()
                            }
                          />
                          <CustomButton
                            isBtn
                            noIcon={true}
                            btntype="button"
                            iconName="fa-solid fa-check"
                            btnName="Remove"
                            ClickEvent={() =>
                              handlelocationAndSurroundingsRemove()
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {locationAndSurroundingsArr &&
                        locationAndSurroundingsArr.length > 0 &&
                        locationAndSurroundingsArr.map((el, index) => {
                          return (
                            <div key={index} className="col-12 col-md-3 mb-3">
                              <input
                                name="first_name"
                                className="form-control"
                                type="text"
                                placeholder={`Nearby Restaurants Items ${
                                  index + 1
                                }`}
                                value={el.name}
                                onChange={(e) =>
                                  handleSetlocationAndSurroundings(
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
              </div>
              {/* ///////// */}
              {/* <div className="border-bottom py-3">
                <div className="col-12 col-md-12 mb-3">
                  <span style={{ paddingRight: 15 }}>
                    Is Property Nearby Activities
                  </span>
                  <input
                    name="first_name"
                    type="checkbox"
                    required=""
                    checked={isActivitiesAndNearbyAttractionsIncluded}
                    onChange={() =>
                      setIsActivitiesAndNearbyAttractionsIncluded(
                        !isActivitiesAndNearbyAttractionsIncluded
                      )
                    }
                  />
                </div>
                {isActivitiesAndNearbyAttractionsIncluded && (
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
                            ClickEvent={() =>
                              handleActivitiesAndNearbyAttractionsAdd()
                            }
                          />
                          <CustomButton
                            isBtn
                            noIcon={true}
                            btntype="button"
                            iconName="fa-solid fa-check"
                            btnName="Remove"
                            ClickEvent={() =>
                              handleActivitiesAndNearbyAttractionsRemove()
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {ActivitiesAndNearbyAttractionsArr &&
                        ActivitiesAndNearbyAttractionsArr.length > 0 &&
                        ActivitiesAndNearbyAttractionsArr.map((el, index) => {
                          return (
                            <div key={index} className="col-12 col-md-3 mb-3">
                              <input
                                name="first_name"
                                className="form-control"
                                type="text"
                                placeholder={`Nearby Activities ${index + 1}`}
                                value={el.name}
                                onChange={(e) =>
                                  handleSetActivitiesAndNearbyAttractions(
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
              </div>
              <div className="border-bottom py-3">
                <div className="col-12 col-md-12 mb-3">
                  <span style={{ paddingRight: 15 }}>
                    Is Property Nearby Night Life
                  </span>
                  <input
                    name="first_name"
                    type="checkbox"
                    required=""
                    checked={isNightLifeIncluded}
                    onChange={() =>
                      setIsNightLifeIncluded(!isNightLifeIncluded)
                    }
                  />
                </div>
                {isNightLifeIncluded && (
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
                            ClickEvent={() => handleNightLifeAdd()}
                          />
                          <CustomButton
                            isBtn
                            noIcon={true}
                            btntype="button"
                            iconName="fa-solid fa-check"
                            btnName="Remove"
                            ClickEvent={() => handleNightLifeRemove()}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {NightLifeArr &&
                        NightLifeArr.length > 0 &&
                        NightLifeArr.map((el, index) => {
                          return (
                            <div key={index} className="col-12 col-md-3 mb-3">
                              <input
                                name="first_name"
                                className="form-control"
                                type="text"
                                placeholder={`Night Life Items ${index + 1}`}
                                value={el.name}
                                onChange={(e) =>
                                  handleSetNightLife(e.target.value, index)
                                }
                              />
                            </div>
                          );
                        })}
                    </div>
                  </>
                )}
              </div> */}
              {/* ///////rooms */}
              {/* <div className="py-3">
                <div className="col-12 col-md-12 mb-3">
                  <div className="row">
                    <div className="col-9">
                      <label>
                        Rooms <span className="red">*</span>
                      </label>
                    </div>
                    <div className="col-3 d-flex justify-content-between">
                      <CustomButton
                        isBtn
                        noIcon={true}
                        btntype="button"
                        iconName="fa-solid fa-check"
                        btnName="Add Room"
                        ClickEvent={() => handleRoomAdd()}
                      />
                      <CustomButton
                        isBtn
                        noIcon={true}
                        btntype="button"
                        iconName="fa-solid fa-check"
                        btnName="Remove Room"
                        ClickEvent={() => handleRoomRemove()}
                      />
                    </div>
                  </div>
                </div>
                {roomsArr &&
                  roomsArr.length > 0 &&
                  roomsArr.map((el, index) => {
                    return (
                      <div key={index} className="row border-bottom pt-3">
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Room name</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={` ${index + 1}`}
                            value={el.name}
                            onChange={(e) =>
                              handleSetRoomName(e.target.value, index)
                            }
                          />
                        </div>
                       <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Room Price</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="number"
                            required=""
                            placeholder={`Room name ${index + 1}`}
                            value={el.price}
                            onChange={(e) =>
                              handleSetRoomPrice(e.target.value, index)
                            }
                          />
                        </div>  <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Room Area</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={` ${index + 1}`}
                            value={el.area}
                            onChange={(e) =>
                              handleSetRoomArea(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Room Bed</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={` ${index + 1}`}
                            value={el.bed}
                            onChange={(e) =>
                              handleSetRoomBed(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Room View</label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={` ${index + 1}`}
                            value={el.view}
                            onChange={(e) =>
                              handleSetRoomView(e.target.value, index)
                            }
                          />
                        </div> 
                         <div className="col-12 col-md-3 mb-3">
                          <label htmlFor="">Room Description</label>
                          <textarea
                            name="first_name"
                            className="form-control"
                            type="text"
                            required=""
                            placeholder={` ${index + 1}`}
                            value={el.description}
                            onChange={(e) =>
                              handleSetRoomDescritpion(e.target.value, index)
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
                          <div className="row">
                            <div className="col-7">
                              <label>
                                Room Images <span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-5 d-flex justify-content-between">
                              <CustomButton
                                isBtn
                                noIcon={true}
                                btntype="button"
                                iconName="fa-solid fa-check"
                                btnName="Add Room Image"
                                ClickEvent={() => handleRoomImageAdd(index)}
                              />
                              <CustomButton
                                isBtn
                                noIcon={true}
                                btntype="button"
                                iconName="fa-solid fa-check"
                                btnName="Remove Room Image"
                                ClickEvent={() => handleRoomImageRemove(index)}
                              />
                            </div>
                          </div>
                          <div className="row">
                            {el.imagesArr &&
                              el.imagesArr.length > 0 &&
                              el.imagesArr.map((ele, indexX) => {
                                return (
                                  <div
                                    className="pt-3 col-4 col-md-3 mb-3"
                                    key={indexX}
                                  >
                                    <label htmlFor="">Image {indexX + 1}</label>
                                    {ele.imageUrl && (
                                      <img
                                        src={generateFilePath(ele.imageUrl)}
                                        width="100px"
                                        height="100px"
                                      />
                                    )}
                                    <FileUpload
                                      onFileChange={(val) =>
                                        handleSetRoomImage(index, indexX, val)
                                      }
                                    />

                                  <input
                                                                        name="first_name"
                                                                        className="form-control"
                                                                        type="file"
                                                                        required=""
                                                                        placeholder={` ${index + 1}`}
                                                                        value={el.name} onChange={(e) => handleSetRoomName(e.target.value, index)} />  
                                  </div>
                                );
                              })}
                          </div>

                    <div className="row">

                                                            <div className="col-12 col-md-12 mb-3">
                                                                <div className="row">
                                                                    <div className="col-9">
                                                                        <label>
                                                                            Amenities <span className="red">*</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <AmenitiesComponent key={index} upliftAmenity={(value) => handleSetAmenitiesInRoom(value, index)} amenitiesArr={el.amenitiesArr} />

                                                        </div> 
                        </div>
                      </div>
                    );
                  })}
              </div> */}
              <div className="border-bottom py-3">
                <div className="col-12 col-md-6 mb-3">
                  <span style={{ paddingRight: 15 }}>Spotlight Images</span>
                  <MultiFileUpload
                    onFileChange={(val) => handleSetMultipleSpotlight(val, 0)}
                  />
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
                        ClickEvent={() => handleMultipleSpotlightAdd()}
                      />
                      <CustomButton
                        isBtn
                        noIcon={true}
                        btntype="button"
                        iconName="fa-solid fa-check"
                        btnName="Remove"
                        ClickEvent={() => handleMultipleSpotlightRemove()}
                      />
                    </div>
                  </div>
                </div> */}
                <div className="row ">
                  {spotlightArr &&
                    spotlightArr.length > 0 &&
                    spotlightArr.map((el, index) => {
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
                              onClick={() =>
                                handleMultipleSpotlightRemove(index)
                              }
                            >
                              <i className="fa fa-close"></i>
                            </button>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
              <div className="border-bottom py-3">
                <HotelRulesParentComponent
                  propertyRules={propertyRules}
                  handleSetPropertyRules={(value) => setPropertyRules(value)}
                />
              </div>
              <div className="border-bottom py-3">
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
                      <CustomButton
                        isBtn
                        noIcon={true}
                        btntype="button"
                        iconName="fa-solid fa-check"
                        btnName="Add"
                        ClickEvent={() => handleMultipleFaqAdd()}
                      />
                      {/* <div className="row d-flex justify-content-end">
                        <div className="col-3 d-flex justify-content-between">
                       
                          <CustomButton
                            isBtn
                            noIcon={true}
                            btntype="button"
                            iconName="fa-solid fa-check"
                            btnName="Remove"
                            ClickEvent={() => handleMultipleFaqRemove()}
                          />
                        </div>
                      </div> */}
                    </div>
                    <div className="row">
                      {faqArr &&
                        faqArr.length > 0 &&
                        faqArr.map((el, index) => {
                          return (
                            <div key={index} className="col-12">
                              <div className="d-flex justify-content-between">
                                <label className="mt-2" htmlFor="">
                                  Question {index + 1}
                                </label>{" "}
                                <span
                                  type="button"
                                  onClick={() => handleMultipleFaqRemove(index)}
                                  className="btn my-2  btn-danger btn-sm"
                                >
                                  <i className="fa fa-times"></i>
                                </span>
                              </div>
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
              </div>
              <div className="col-12 mt-2 text-center">
                <CustomButton
                  isBtn
                  btntype="button"
                  iconName="fa-solid fa-check"
                  btnName={"Update"}
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

  const handleRulesRemove = (inde) => {
    setLocalRulesArr([...localRulesArr.filter((el, index) => index != inde)]);
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
          <label className="me-3">
            Properties Rule Heading <span className="red">*</span>
          </label>
          <CustomButton
            isBtn
            noIcon={true}
            btntype="button"
            iconName="fa-solid fa-check"
            btnName="Add Properties Rules Heading"
            ClickEvent={() => handleRulesAdd()}
          />
        </div>
        {/* <div className="col-5 d-flex justify-content-between">
       
          <CustomButton
            isBtn
            noIcon={true}
            btntype="button"
            iconName="fa-solid fa-check"
            btnName="Remove Properties Rules Heading"
            ClickEvent={() => handleRulesRemove()}
          />
        </div> */}
      </div>
      {localRulesArr &&
        localRulesArr.length > 0 &&
        localRulesArr.map((elx, indexXX) => {
          return (
            <div key={indexXX} className="row">
              <div className="col-6 col-md-8">
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
              <div className="col-md-2">
                <button
                  type="button"
                  onClick={() => handleRulesRemove(indexXX)}
                  className="btn mt-4 btn-danger btn-sm"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
              <div
                style={{
                  border: "solid 1px rgba(0,0,0,0.2)",
                  borderRadius: 10,
                  marginTop: 40,
                }}
                className="py-3 px-5 col-12 mb-3"
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

  const handleRulesRemove = (inde) => {
    setLocalRulesArr([...localRulesArr.filter((el, index) => index != inde)]);
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
          <label className="me-3">
            Properties Rules <span className="red">*</span>
          </label>
          <CustomButton
            isBtn
            noIcon={true}
            btntype="button"
            iconName="fa-solid fa-check"
            btnName="Add Properties Rules"
            ClickEvent={() => handleRulesAdd()}
          />
        </div>
      </div>
      {localRulesArr &&
        localRulesArr.length > 0 &&
        localRulesArr.map((elx, indexXX) => {
          return (
            <div key={indexXX} className="row my-3">
              <div className="col-10 col-md-10">
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
              <div className="col-md-2">
                <button
                  type="button"
                  onClick={() => handleRulesRemove(indexXX)}
                  className="btn mt-4 btn-danger btn-sm"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
