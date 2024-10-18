"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "./HotelDetailContent.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import Select from "react-select";
// import { LiaBedSolid } from "react-icons/lia";
// import space1 from "@/assets/images/space1.webp";
// import space2 from "@/assets/images/space2.webp";
// import space3 from "@/assets/images/space3.webp";
import google from "@/assets/images/google.png";
import Link from "next/link";
import middle1 from "@/assets/images/middle1.png";
import middle2 from "@/assets/images/middle2.png";
import middle3 from "@/assets/images/middle3.png";

// import { Images } from "@/assets/Utility/Images";
import { generateImageUrl } from "@/service/url.service";
import { getReviewByHotelId, getRoomsApi } from "@/service/hotel.service";
import { generateFilePath } from "@/lib/axios";
import { SearchDateInput, useSearch } from "@/context/client-provider";
// import guest from "@/assets/images/guest.webp";
import { toastError } from "@/utils/toastMessage.ts";
import { el } from "date-fns/locale";
import { IoCloseOutline, IoShareSocialOutline } from "react-icons/io5";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import { MdCrop, MdOutlineBathroom } from "react-icons/md";
// import { FiUsers } from "react-icons/fi";

interface Rate {
  rateId: number;
  name: string;
  personBase: number;
  dayBreakdown: DayBreakdown[];
  selectedRoom?: number;
  category?: { label: string; value: number };
  options?: { label: string; value: number; price: number }[];
}

interface DayBreakdown {
  availableAreas: number;
  closedOnArrival: boolean;
  closedOnDeparture: boolean;
  dailyRate: number;
  theDate: string; // Can be improved to a Date type if needed
  minStay: number;
  minStayOnArrival: number;
  maxStay: number;
  stopSell: boolean;
}

interface RootObject {
  rates: Rate[];
  name: string;
  categoryId: number;
  isAvailable: boolean;
}

interface Image {
  imageUrl: string;
  _id: string;
}

interface PointDescription {
  name: string;
  _id: string;
}

interface Room {
  _id: string;
  name: string;
  slug: string;
  hotelId: string;
  mainImage: string;
  rmsPropertyId: string;
  rmsCategoryId: string;
  price: number;
  calendarUrl: string;
  noOfRoom: number;
  bathroom: string;
  meal: string;
  maxGuest: number;
  adultPrice: number;
  childPrice: number;
  amenitiesArr: any[]; // Assuming you don't have a specific type for amenities yet
  imagesArr: Image[];
  pointDescription: PointDescription[];
  isActive: boolean;
  isPointDescription: boolean;
  opionsArr: any[]; // Assuming you don't have a specific type for options yet
  updatedAt: string;
  areaId: string;
  guest: number;
  selectedRoom?: number;
  category?: { label: string; value: number };
  options?: { label: string; value: number; price: number }[];
}

export default function Hotaldetailscontent({
  hotel,
  handelReview,
  ratesArr,
  handleShow1,
}: {
  hotel: any;
  handelReview: (total: number, reviewTotal: number) => void;
  ratesArr: any;
  handleShow1: any;
}) {
  // tab scroll effect and array
  let [locationSearch, setLocationSearch] = useSearch();

  const overview = useRef<any>(null);
  const amenities = useRef<any>(null);
  const the_space = useRef<any>(null);
  const must_know = useRef<any>(null);
  const feel_home = useRef<any>(null);
  const house_rule = useRef<any>(null);
  const reviews = useRef<any>(null);
  const faq = useRef<any>(null);
  const room = useRef<any>(null);
  // const food = useRef<any>(null);
  const [spaceArr, setSpaceArr] = useState([]);

  const [showcontent, setshowcontent] = useState(false);
  const [listArr, setListArr] = useState([
    {
      item: "Overview",
      active: true,
      tab: 1,
      refTo: overview,
    },
    {
      item: "Room Types",
      active: false,
      tab: 2,
      refTo: room,
    },
    {
      item: "Amenities",
      active: false,
      tab: 3,
      refTo: amenities,
    },

    {
      item: "The Space",
      active: false,
      tab: 4,
      refTo: the_space,
    },

    // {
    //     item: 'Food & Dining',
    //     active: false,
    //     tab: 1,
    //     refTo: food,
    // },
  ]);
  const [reviewArr, setReviewArr] = useState([]);
  const [roomsArr, setRoomsArrr] = useState<Room[]>([]);
  const [modelObj, setModelObj] = useState<any>();

  console.log(roomsArr, "roomsArr");

  const options = [
    { value: "2", label: "Room Only" },
    { value: "4", label: "Breakfast" },
    {
      value: "5",
      label: "Breakfast and Lunch/Dinner",
    },
    {
      value: "6",
      label: "Breakfast, Lunch and Dinner",
    },
  ];

  type MealOptions = {
    [key: number]: string;
  };
  let mealOptions: MealOptions = {
    2: "Room Only",
    4: "Breakfast",
    5: "Breakfast and Lunch/Dinner",
    6: "Breakfast, Lunch and Dinner",
  };
  useEffect(() => {
    if (hotel && hotel?.hotelType) {
      //   let templistAr = listArr;
      //   if (
      //     hotel?.hotelType == "Home Stays" &&
      //     !templistAr.some((el) => el.item == "The Space")
      //   ) {
      //     templistAr.splice(2, 0, {
      //       item: "The Space",
      //       active: false,
      //       tab: 4,
      //       refTo: the_space,
      //     });
      //   } else if (
      //     hotel?.hotelType == "Hotels" &&
      //     !templistAr.some((el) => el.item == "Room Types")
      //   ) {

      //     templistAr.splice(3, 0, {
      //       item: "Room Types",
      //       active: false,
      //       tab: 2,
      //       refTo: room,
      //     });
      //     templistAr.splice(2, 0, {
      //       item: "The Space",
      //       active: false,
      //       tab: 4,
      //       refTo: the_space,
      //     });
      //   }
      //   if (
      //     hotel?.propertyHighlightsArr &&
      //     hotel?.propertyHighlightsArr?.length > 0 &&
      //     !templistAr?.some((el) => el.item == "Must Know")
      //   ) {
      //     templistAr.splice(3, 0, {
      //       item: "Must Know",
      //       active: false,
      //       tab: 3,
      //       refTo: must_know,
      //     });
      //   }

      //   if (
      //     hotel?.locationAndSurroundingsArr &&
      //     hotel?.locationAndSurroundingsArr?.length > 0 &&
      //     !templistAr?.some((el) => el.item == "Feel at Home")
      //   ) {
      //     templistAr.splice(4, 0, {
      //       item: "Feel at Home",
      //       active: false,
      //       tab: 4,
      //       refTo: feel_home,
      //     });
      //   }

      //   if (
      //     hotel?.faqArr &&
      //     hotel?.faqArr?.length > 0 &&
      //     !templistAr?.some((el) => el.item == "FAQ’S")
      //   ) {
      //     templistAr.splice(5, 0, {
      //       item: "FAQ’S",
      //       active: false,
      //       tab: 5,
      //       refTo: faq,
      //     });
      //   }

      //   setListArr(templistAr);
      // }

      if (hotel && hotel?._id) {
        handelGetReviews(hotel?._id);
        handelGetRooms(hotel?._id);
      }

      if (hotel && hotel?.roomsArr) {
        setSpaceArr(
          hotel?.roomsArr.map((el: any) => ({ ...el, checked: true }))
        );
      }
    }
  }, [hotel]);

  // useEffect(() => {
  //   if (ratesArr && ratesArr?.length > 0 && roomsArr?.length > 0) {
  //     let temorommArr: Room[] = roomsArr.map((el: Room) => {
  //       el.selectedRoom = 0;

  //         if (locationSearch && locationSearch.roomsArr?.length > 0) {
  //           let locationObj = locationSearch.roomsArr.find(
  //             (elx) => elx.rmsPropertyId == el.rmsPropertyId
  //           );
  //           if (locationObj && locationObj.rooms) {
  //             el.selectedRoom = locationObj.rooms;
  //           }
  //         }
  //       let rateobj = ratesArr.find(
  //         (elx: RootObject) => elx.categoryId == Number(el.rmsPropertyId)
  //       );
  //       if (rateobj) {

  //         el.options = rateobj.rates.map((rl: Rate) => ({
  //           label:
  //             mealOptions[rl.rateId] + " - " + rl.dayBreakdown[0].dailyRate,
  //           value: rl.rateId,
  //           price: rl.dayBreakdown[0].dailyRate,
  //         }));
  //         el.category = el.options && el.options[0];

  //       } else {
  //         el.options = [];
  //       el.category = { value: 2, label: "Room Only" };

  //       }
  //       return el;
  //     });

  //     // if(!locationSearch?.roomsArr || locationSearch?.roomsArr?.length == 0 ){
  //       setRoomsArrr([...temorommArr]);
  //     // }
  //   }
  // }, [ratesArr]);

  const handelGetReviews = async (hotelId: string) => {
    try {
      let { data: res } = await getRoomsApi(`hotelId=${hotelId}&price=asc`);
      if (res?.data?.length > 0) {
        if (res?.data && res?.data) {
          let temorommArr = res?.data.map((el: any) => {
            el.selectedRoom = 0;
            if (locationSearch && locationSearch?.roomsArr?.length > 0) {
              let locationObj = locationSearch.roomsArr.find(
                (elx) => elx.rmsPropertyId == el.rmsPropertyId
              );
              if (locationObj && locationObj.rooms) {
                el.selectedRoom = locationObj.rooms;
              }
            }
            if (ratesArr && ratesArr?.length > 0) {
              let rateobj = ratesArr.find(
                (elx: RootObject) => elx.categoryId == Number(el.rmsPropertyId)
              );
              console.log(rateobj, "rateobjrateobjrateobj", ratesArr);
              if (rateobj) {
                el.options = rateobj.rates
                  .sort(
                    (a: Rate, b: Rate) =>
                      a.dayBreakdown[0].dailyRate - b.dayBreakdown[0].dailyRate
                  )
                  .map((rl: Rate) => ({
                    label:
                      mealOptions[rl.rateId] +
                      " - ₹" +
                      rl.dayBreakdown[0].dailyRate,
                    value: rl.rateId,
                    price: rl.dayBreakdown[0].dailyRate,
                    availableAreas: rl.dayBreakdown[0].availableAreas,
                  }));
                el.category = el.options && el.options[0];

                console.log(
                  el.options,
                  el.category,
                  "dddddddddddddddddddddddddddddddddddddddddddd"
                );
              } else {
                el.options = [];
                el.category = { value: 2, label: "Room Only" };
              }
            }

            // el.category = { value: "2", label: "Room Only" };
            return el;
          });
          setRoomsArrr(temorommArr);
        }
      } else {
        let templistAr = listArr;

        if (!templistAr?.some((el) => el.item == "Reviews")) {
          templistAr.splice(6, 0, {
            item: "Reviews",
            active: false,
            tab: 7,
            refTo: reviews,
          });
        }

        setListArr(templistAr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeRoomArr = (index: number, key: string, value: any) => {
    let tempArr: any = [...roomsArr];
    let remaingGuest = locationSearch.adult;

    // if (value <= 0) return;

    // tempArr.map((roomx: any) => {
    //   if (remaingGuest > 0) {
    //     remaingGuest =
    //       remaingGuest -
    //       Number(key == "minus" ? roomx.selectedRoom - 1 : roomx.selectedRoom) *
    //         Number(roomx.guest);
    //   }
    // });

    // if (remaingGuest <= 0) {
    //   return toastError("You cannot add room . Guest is full");
    // }

    tempArr[index].selectedRoom = Number(value <= 0 ? 0 : value);

    console.log(tempArr);

    if (Number(tempArr[index].selectedRoom) > Number(tempArr[index].noOfRoom)) {
      toastError("No of room exceed");
      return 0;
    }

    let totalRoomGuest = tempArr.reduce(
      (acc: any, curr: any) => acc + Number(curr.guest),
      0
    );

    if (remaingGuest >= totalRoomGuest) {
      return toastError("Guest is full");
    }

    // console.log(totalRoomGuest, "totalgGuesttotalgGuest", locationSearch.adult);
    // if (Number(locationSearch.adult) > totalRoomGuest) {
    //   // return toastError("You cannot add room . Guest is full");
    // } else {
    //   if (Number(locationSearch.adult) > totalRoom) {
    //     return toastError("You cannot add room . Guest is full");
    //   }
    // }

    let contextRoomArr = tempArr
      .filter((elx: any) => elx.selectedRoom > 0)
      .map((el: any) => ({
        roomId: el._id,
        price: el.price,
        rooms: el.selectedRoom,
        guest: el.guest,
        rateId: el.category?.value,
        rmsPropertyId: el.rmsPropertyId,
        rmsCategoryId: el.rmsCategoryId,
      }));
    if (contextRoomArr?.length > 0) {
      setLocationSearch({
        ...locationSearch,
        roomsArr: contextRoomArr,
      });
    } else {
      setLocationSearch({
        ...locationSearch,
        roomsArr: [],
      });
    }

    setRoomsArrr(tempArr);
  };

  const handleChangeRoomCategoryArr = (index: number, value: any) => {
    let tempArr: any = [...roomsArr];
    tempArr[index].category = value;
    setRoomsArrr(tempArr);
  };

  const handelGetRooms = async (hotelId: string) => {
    try {
      let { data: res } = await getReviewByHotelId(hotelId);
      if (res?.data && res?.data) {
        setReviewArr(res?.data);
        handelReview(1, res?.data?.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [windowWidth,setWindowWidth] = useState<any>()

// useeffect for the window width
useLayoutEffect(() => {
  window.addEventListener("resize", function updateSize() {
    setWindowWidth(window.innerWidth);
  });
  setWindowWidth(window.innerWidth);
  return () =>
    window.removeEventListener("resize", function updateSize() {
      setWindowWidth(window.innerWidth);
    });
}, [windowWidth]);




  const handleClick = (i: any) => {
    const temp = listArr.map((ele, index) => {
      if (i === index) {
        ele.active = true;
        ele.refTo.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        if (windowWidth < 767)
        {
          window.scroll(0, ele.refTo.current.offsetTop + 300);
        }
        else if (windowWidth > 767 && windowWidth < 992)
          {
            window.scroll(0, ele.refTo.current.offsetTop + 630);
          }
        else if (windowWidth > 992)
          {
            window.scroll(0, ele.refTo.current.offsetTop + 750);
          }
        // else
        // {
        //   window.scroll(0, ele.refTo.current.offsetTop + 300);
        // }
        //  window.scroll(0, ele.refTo.current.offsetTop + 750);
      
      } else {
        ele.active = false;
      }
      return ele;
    });
    setListArr([...temp]);
  };

 

  const mobilresponsive = {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
  
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 20,
  
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
     
    },
    // 1600: {
    //   slidesPerView: 4,
    //   spaceBetween: 20,
    // },
  };

  // reviews

  // const handleClicked = (indd: number) => {
  //   let tempArr = reviewArr.map((el, i) => {
  //     i === indd ? (el.active = true) : (el.active = false);
  //     return el;
  //   });
  //   setReviewArr([...tempArr]);
  // };

  // faq

  // room type for hotel

  const customStyles = {
    control: (base: any) => ({
      ...base,
      boxShadow: "0 !important",
      paddingLeft: "0px",
      paddingRight: "0px",
      fontFamily: "var(--lato)",
      paddingTop: "2px",
      paddingBottom: "2px",
      zindex: "999999",
      borderRadius: "5px",
      backgroundColor: "#fff",
      minWidth: "70%",
      cursor: "pointer",
      borderColor: "#ccc",
      fontSize: "14px",
      fontWeight: "500",
    }),
    option: (base: any) => ({
      ...base,
      cursor: "pointer",
      fontFamily: "var(--lato)",
      background: "white", // this was the mistake (I needed to remove this)
      color: "#000",
      zindex: "999999",
      fontSize: "13px",
      borderColor: "#ccc",
      ":hover": {
        backgroundColor: "#516b6a",
        color: "#fff",
        fontSize: "13px",
        borderColor: "#ccc",
        fontFamily: "var(--lato)",
        zindex: "999999",
        fontWeight: "500",
      },
    }),
  };

  // const [spaceslider, setSpaceslider] = useState([
  //   {
  //     spaceslider: space1,
  //     hotelheading: "2 room",
  //     roomdesc:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat ipsum ad, asperiores quis architecto quo autem iure? Labore, repellendus nihil? Doloribus beatae fugit atque laborum quisquam quis! Dicta, sunt itaque.",
  //   },
  //   {
  //     spaceslider: space2,
  //     hotelheading: "2 room",
  //     roomdesc:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat ipsum ad, asperiores quis architecto quo autem iure? Labore, repellendus nihil? Doloribus beatae fugit atque laborum quisquam quis! Dicta, sunt itaque.",
  //   },
  //   {
  //     spaceslider: space3,
  //     hotelheading: "3 room",
  //     roomdesc:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat ipsum ad, asperiores quis architecto quo autem iure? Labore, repellendus nihil? Doloribus beatae fugit atque laborum quisquam quis! Dicta, sunt itaque.",
  //   },
  // ]);

  // for view more button
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (tempRoomObj: any) => {
    setModelObj(tempRoomObj);
    setShow(true);
  };

  const [showmore, SetShowmore] = useState(-1);

  const handleshowmore = (idnn: any) => {
    if (idnn == showmore) {
      SetShowmore(-1);
    } else {
      SetShowmore(idnn);
    }
  };

  const handleChangeRoom = (checked: boolean, index: number) => {
    let tempArr: any = [...spaceArr];
    tempArr[index].checked = checked;
    setSpaceArr(tempArr);
  };

  return (
    <>
      <div className={style.content}>
        <ul
          className={`${style.topheading} ${style.list} sticky-top stickyzindex top_80 category_list1`}
        >
          {listArr &&
            listArr?.length &&
            listArr?.map((el, i) => (
              <li
                className={`${el.active ? `${style.active}` : `${style.item}`}`}
                key={i}
                onClick={() => handleClick(i)}
              >
                {el?.item}
              </li>
            ))}
        </ul>

        <div className={style.body} ref={overview}>
          {/* <h6 className={style.title}>About</h6> */}

          <div className={style.list_content}>
            <div
              dangerouslySetInnerHTML={{
                __html: hotel?.description,
              }}
            ></div>
          </div>
        </div>

      


        {/* new design for room types */}

        <div className={style.body} ref={room}>
          <div className={style.room_table}>
            <h6 className={style.main_heading}>Room Types </h6>
            <div className="row">
              {roomsArr &&
                roomsArr?.length &&
                roomsArr?.map((room: any, innd) => (
                  <div className="col-xl-6 col-lg-6 col-md-6" key={innd}>
                    <div className={style.main_content1}>
                      <div className="row">
                        <div className="col-xl-6 col-md-12 col-lg-12 col-sm-6">
                          <Swiper
                            slidesPerView={1}
                            loop={true}
                            navigation={true}
                            pagination={true}
                            modules={[Navigation, Pagination]}
                            className={`${style.swiper} roomtypeSwiper`}
                          >
                            {room?.imagesArr &&
                              room?.imagesArr.length > 0 &&
                              room?.imagesArr.map(
                                (image: any, indx: number) => (
                                  <SwiperSlide key={indx}>
                                    <div
                                      className={style.image}
                                      onClick={handleShow1}
                                    >
                                      <Link href="#">
                                        {" "}
                                        <Image
                                          src={generateImageUrl(
                                            image.imageUrl
                                              ? image.imageUrl
                                              : room.mainImage
                                          )}
                                          alt=""
                                          fill
                                        />
                                      </Link>
                                    </div>
                                  </SwiperSlide>
                                )
                              )}

                            {room?.imagesArr &&
                              room?.imagesArr.map(
                                (img: any, imndex: number) => (
                                  <SwiperSlide key={imndex}>
                                    <div
                                      className={style.image}
                                      onClick={handleShow1}
                                    >
                                      <Link href="#">
                                        {" "}
                                        <Image
                                          src={generateImageUrl(room.mainImage)}
                                          alt=""
                                          fill
                                        />
                                      </Link>
                                    </div>
                                  </SwiperSlide>
                                )
                              )}
                          </Swiper>
                          {/* <div className={style.images}>
                              <div className={style.info}>
                                <div className={style.small_image}>
                                  <Image src={middle1} alt="" fill />
                                </div>
                                <span className={style.text}>
                                  {room?.noOfRoom} Bedrooms{" "}
                                </span>
                              </div>
                              <div className={style.info}>
                                <div className={style.small_image}>
                                  <Image src={middle2} alt="" fill />
                                </div>
                                <span className={style.text}>
                                  {room?.bathroom} Bathrooms{" "}
                                </span>
                              </div>
                              <div className={style.info}>
                                <div className={style.small_image}>
                                  <Image src={middle3} alt="" fill />
                                </div>
                                <span className={style.text}>
                                  {room?.guest} Guests
                                </span>
                              </div>
                            </div> */}
                        </div>
                        <div className="col-xl-6 col-md-12 col-lg-12 col-sm-6 padding_zero">
                          <div className={style.info_content}>
                            <h6 className={style.heading}> {room.name}</h6>

                            <div className={style.images}>
                              <div className={style.info}>
                                <div className={style.small_image}>
                                  <Image src={middle1} alt="" fill />
                                </div>
                                <span className={style.text}>
                                  {room?.noOfRoom} Bedrooms{" "}
                                </span>
                              </div>
                              <div className={style.info}>
                                <div className={style.small_image}>
                                  <Image src={middle2} alt="" fill />
                                </div>
                                <span className={style.text}>
                                  {room?.bathroom} Bathrooms{" "}
                                </span>
                              </div>
                              <div className={style.info}>
                                <div className={style.small_image}>
                                  <Image src={middle3} alt="" fill />
                                </div>
                                <span className={style.text}>
                                  {room?.guest} Guests
                                </span>
                              </div>
                            </div>

                            <h6 className={style.price}>
                              ₹ {room?.category?.price}
                              <span className={style.day}>
                                <span className={style.plus}>(</span>Exclusive
                                of all taxes
                                <span className={style.plus}>)</span>
                              </span>{" "}
                            </h6>

                            {ratesArr?.length > 0 &&
                              (ratesArr.some(
                                (el: any) =>
                                  el.categoryId == room.rmsPropertyId &&
                                  el.isAvailable == true
                              ) ? (
                                <div className={style.bottom_sec}>
                                  <span className={style.span3}>Room Plan</span>
                                  <div className="row gap_10">
                                    <div className="col-xl-12">
                                      <div className={`${style.amount} p_relative`}>
                                        <Select
                                        
                                          options={
                                            room.options ? room.options : []
                                          }
                                        
                                          styles={customStyles}
                                          value={room.category}
                                          placeholder="Select Price..."
                                          onChange={(val: any) =>
                                            handleChangeRoomCategoryArr(
                                              innd,
                                              val
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-xl-12">
                                      {Number(room?.guest * room?.noOfRoom) >
                                        locationSearch.adult && (
                                        <>
                                          {room.selectedRoom > 0 ? (
                                            <div
                                              className={`${style.number} ${style.colleft}`}
                                            >
                                              <span
                                                className={style.minus}
                                                onClick={(e) =>
                                                  handleChangeRoomArr(
                                                    innd,
                                                    "minus",
                                                    Number(
                                                      room.selectedRoom - 1
                                                    )
                                                  )
                                                }
                                              >
                                                -
                                              </span>
                                              <input
                                                type="text"
                                                value={room.selectedRoom}
                                              />
                                              <span
                                                className={style.plus}
                                                onClick={(e) =>
                                                  handleChangeRoomArr(
                                                    innd,
                                                    "plus",
                                                    Number(
                                                      room.selectedRoom + 1
                                                    )
                                                  )
                                                }
                                              >
                                                +
                                              </span>
                                            </div>
                                          ) : (
                                            <div className={`${style.button}`}>
                                              <button
                                                type="button"
                                                onClick={(e) =>
                                                  handleChangeRoomArr(
                                                    innd,
                                                    "selectedRoom",
                                                    Number(
                                                      room.selectedRoom + 1
                                                    )
                                                  )
                                                }
                                                className={`${style.btn1} btn`}
                                              >
                                                Select Room
                                              </button>
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className={style.bottom_sec}>
                                  <div className={style.amount}>
                                    <span className={style.span3}>
                                      Not Available
                                    </span>
                                  </div>
                                </div>
                              ))}

                            {/* <div className={style.policies_box}>
                              {room.pointDescription &&
                                room.pointDescription?.length > 0 && (
                                  <div className={style.feature}>
                                    {room.pointDescription &&
                                      room.pointDescription?.length &&
                                      room.pointDescription?.map(
                                        (
                                          pointDescription: any,
                                          idnn: number
                                        ) => (
                                          <div
                                            className={style.first}
                                            key={idnn}
                                          >
                                            <p
                                              className={`${
                                                showmore == innd
                                                  ? style.descc1
                                                  : style.descc
                                              }`}
                                            >
                                              {pointDescription.name}
                                            </p>
                                          </div>
                                        )
                                      )}
                                  </div>
                                )}

                              <button
                                className={style.vm_buttn}
                                onClick={()=>handleshowmore(innd)}
                              >
                                {" "}
                                {showmore == innd ? "Show Less" : "Show More"}
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className={style.body} ref={amenities}>
          <h6 className={style.title}>Amenities</h6>

          <div className="row">
            {hotel &&
              hotel.amenitiesArr &&
              hotel?.amenitiesArr.map(
                (amenityCategory: any) =>
                  amenityCategory?.amenityArr &&
                  amenityCategory?.amenityArr.map(
                    (amenity: any, rrtt: number) => (
                      <div
                        className="col-lg-3 col-md-3 col-sm-3 col-6"
                        key={rrtt}
                      >
                        <div className={style.icons}>
                          {amenity.amenityImage && (
                            <div className={style.image}>
                              <Image
                                src={generateImageUrl(amenity.amenityImage)}
                                alt=""
                                fill
                              />
                            </div>
                          )}
                          <h6 className={style.head}>{amenity.amenityName}</h6>
                        </div>
                      </div>
                    )
                  )
              )}
          </div>
        </div>


        {/* new spaces design */}

        {hotel && hotel?.roomsArr && hotel?.roomsArr?.length > 0 && (
          <div
            className={`${style.body} ${style.swiper_space}`}
            ref={the_space}
          >
            <h6 className={style.title_space}>The Space</h6>

            <Swiper
              breakpoints={mobilresponsive}
              navigation={true}
              pagination={true}
              speed={700} 
              loop={true}
              autoplay={{
                delay: 4500, 
                disableOnInteraction: false,
              }}
              modules={[Navigation,Autoplay,Pagination]}
             
              className={`${style.swiper}  swiper_space`}
            >
              {hotel?.roomsArr?.length > 0 &&
                spaceArr?.map((ro: any, inde: number) => (
                  <SwiperSlide key={inde} className={style.slide}>
                    <div className={style.image1} onClick={handleShow1}>
                      {ro.image ? (
                        <Image src={generateImageUrl(ro.image)} alt="" fill />
                      ) : (
                        ro.imagesArr?.length > 0 && (
                          <Image
                            src={generateImageUrl(ro.imagesArr[0].imageUrl)}
                            alt=""
                            fill
                          />
                        )
                      )}
                    </div>
                    <div className={style.para_content}>
                      <h6 className={style.text}>{ro.name} </h6>
                      <p className={style.para}>{ro.view}</p>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        )}

        {hotel &&
          hotel?.propertyHighlightsArr &&
          hotel?.propertyHighlightsArr?.length > 0 && (
            <div className={style.body} ref={must_know}>
              <h6 className={style.title}>Must Know</h6>

              <ul className={style.list1}>
                {hotel?.propertyHighlightsArr?.map((el: any, indi: number) => (
                  <li className={style.item} key={indi}>
                    {el?.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        {hotel &&
          hotel?.locationAndSurroundingsArr &&
          hotel?.locationAndSurroundingsArr?.length > 0 && (
            <div className={style.body} ref={feel_home}>
              <h6 className={style.title}>
                We Want You to Feel at Home So, We Provide
              </h6>

              <ul className={style.list1}>
                {hotel?.locationAndSurroundingsArr?.map(
                  (el: any, indi: number) => (
                    <li className={style.item} key={indi}>
                      {el?.name}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        {hotel && hotel?.propertyRules && hotel?.propertyRules?.length > 0 && (
          <div className={style.body} ref={house_rule}>
            <h6 className={style.title}>House Rules</h6>
            {/* <p className={style.text1}>Friendly Reminders for a Smooth Stay at Wind 2BHK!
                            We want you to feel perfectly at home at Wind 2BHK, so here are a few friendly reminders to ensure a smooth and enjoyable stay:</p>
                        <p className={style.text2}>Who Can Stay</p> */}

            <ul className={`${style.list1}  row`}>
              {hotel?.propertyRules &&
                hotel?.propertyRules.map((rule: any) => (
                  <div className="col-lg-12 col-sm-12">
                    <div className="link_tink policies_cont">
                      <h5> {rule.heading}</h5>
                      {rule?.rulesArr && rule?.rulesArr?.length > 0 && (
                        <ul className={`${style.list2} ${style.removelist}`}>
                          {rule?.rulesArr.map((ru: any) => (
                            <li className={style.item1}>{ru.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
            </ul>

            {/* <button className={`${style.btn4} btn`}> Read More</button> */}
            {/* 
                <p className={style.text2}>Additional Rules</p>

                <ul className={style.list1}>
                    {
                        ruleArr && ruleArr?.length && ruleArr?.map((elyy, idd) => (

                            elyy?.additional && elyy?.additional?.length && elyy?.additional?.map((eell, iidn) => (
                                <li className={style.item} key={iidn}>{eell?.para}</li>
                            ))
                        ))
                    }
                </ul>

                <button className={`${style.btn4} btn`}> Read More</button> */}
          </div>
        )}
        {reviewArr && reviewArr?.length > 0 && (
          <div className={style.body} ref={reviews}>
            <h6 className={style.title}>Reviews</h6>
            <p className={style.span}>Overall Rating</p>
            <div className={style.reviews_text}>
              <span className={style.number}>5</span>
              <Rating
                initialValue={5}
                size={20}
                fillColor="rgba(255, 147, 0, 1)"
                emptyStyle={{
                  color: "rgba(206, 204, 209, 1) !important",
                  stroke: "rgba(206, 204, 209, 1) !important",
                }}
                readonly={true}
                className={style.star}
              />
              <p className={style.review}>{reviewArr?.length} reviews</p>
            </div>

            {/* <ul className={style.tabs_list}>
          {reviewArr &&
            reviewArr?.length &&
            reviewArr?.map((eey, indd) => (
              <li
                className={`${style.tab} ${
                  eey?.active ? `${style.active}` : ""
                }`}
                key={indd}
                onClick={() => handleClicked(indd)}
              >
                <h6 className={style.head}>{eey?.tab}</h6>
                <span className={style.number}>{eey?.number}</span>
              </li>
            ))}
        </ul> */}

            <div className={style.tab_content}>
              <Swiper
                // slidesPerView={3}
                loop={true}
                breakpoints={mobilresponsive}
                spaceBetween={30}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {reviewArr &&
                  reviewArr?.length &&
                  reviewArr?.map((eey: any, indd) => {
                    return (
                      <>
                        <SwiperSlide className={style.tab_slide} key={indd}>
                          <div className={style.first_sec}>
                            <div className={style.image}>
                              <Image
                                src={generateFilePath(eey?.image)}
                                alt=""
                                fill
                              />
                            </div>
                            <div className={style.content}>
                              <h6 className={style.name}>{eey?.title}</h6>
                              {/* <span className={style.days}>{eey?.days} ago</span> */}
                            </div>
                          </div>
                          <Rating
                            initialValue={eey?.rating}
                            size={20}
                            fillColor="rgba(255, 147, 0, 1)"
                            emptyStyle={{
                              color: "rgba(206, 204, 209, 1) !important",
                              stroke: "rgba(206, 204, 209, 1) !important",
                            }}
                            readonly={true}
                            className={style.star}
                          />
                          <p className={style.para}>{eey?.message}</p>

                          <Link
                            href={eey.link}
                            target="_blank"
                            className={`${style.btn1} btn`}
                          >
                            Read More
                          </Link>

                          <div className={style.post}>
                            <div className={style.image}>
                              <Image src={google} alt="" fill />
                            </div>
                            <div className={style.post_on}>
                              <span className={style.text}>Posted on</span>
                              <span className={style.company}>Google</span>
                            </div>
                          </div>
                        </SwiperSlide>
                      </>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        )}

        {hotel && hotel?.faqArr && hotel?.faqArr?.length > 0 && (
          <div className={style.body} ref={faq}>
            <h6 className={style.title}>FAQ'S</h6>

            <div className={`${style.faq} accordion`} id="accordionExample">
              {hotel?.faqArr &&
                hotel?.faqArr.map((faq: any, indexx: number) => (
                  <div
                    className={`${style.accd_item} accordion-item`}
                    key={indexx}
                  >
                    <h2
                      className={`${style.accd_header} accordion-header`}
                      id={`headingOne${indexx}`}
                    >
                      <button
                        className={`${style.accd_button} accordion-button ${
                          indexx == 0 ? "" : "collapsed"
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseOne${indexx}`}
                        aria-expanded="true"
                        aria-controls={`collapseOne${indexx}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapseOne${indexx}`}
                      className={`${
                        style.collapse
                      } accordion-collapse collapse ${
                        indexx == 0 ? "show" : "collapse"
                      }`}
                      aria-labelledby={`headingOne${indexx}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className={`${style.accd_body} accordion-body`}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/*  view more details button */}

      {/* conatct modal */}

      <Modal show={show} onHide={handleClose} className={style.modal} centered>
        <Modal.Header className={style.header}>
          <Modal.Title className={style.title}>{modelObj?.name}</Modal.Title>
          <button onClick={handleClose}>
            <IoCloseOutline />
          </button>
        </Modal.Header>

        <Modal.Body className={style.modal_body}>
          <div className={style.policies_box}>
            <p className={`${showmore ? style.descc1 : style.descc}`}>
              {modelObj?.pointDescription &&
                modelObj?.pointDescription?.length &&
                modelObj?.pointDescription?.map(
                  (pointDescription: any, idnn: number) => (
                    <p className={style.span2}>{pointDescription.name}</p>
                  )
                )}
            </p>

            <button className={style.vm_buttn} onClick={handleshowmore}>
              {" "}
              {showmore ? "Show Less" : "Show More"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
