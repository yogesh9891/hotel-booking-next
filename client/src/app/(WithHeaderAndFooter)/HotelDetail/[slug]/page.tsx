"use client";

import React, { useEffect, useRef, useState } from "react";
// import ProgressBar from "@ramonak/react-progress-bar";
import style from "./HotelDetail.module.scss";
import Image from "next/image";
import { Images } from "@/assets/Utility/Images";
import { GrGallery } from "react-icons/gr";
import PropertyDetailContent from "@/components/PropertyDetailContent/PropertyDetailContent";
import { FaLocationDot } from "react-icons/fa6";
import { Rating } from "react-simple-star-rating";
import { IoCloseOutline, IoShareSocialOutline } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// import Link from "next/link";
// import Slider from "react-slick";
// import { MdOutlineLocationOn } from "react-icons/md";
// import { MdLocationOn, MdOutlineDiscount } from "react-icons/md";

import {
  getHotelByIdAndRatesApi,
  getHotelBySlugApi,
} from "@/service/hotel.service";
import { generateImageUrl } from "@/service/url.service";
// import hotels from "@/assets/images/hotels.webp";
// import { getRoomByIdApi } from "@/service/home.service";
// import Offcanvas from "react-bootstrap/Offcanvas";
import { SearchDateInput, useSearch } from "@/context/client-provider";
import moment from "moment";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { DateRangePicker } from "react-date-range";
// import { addDays } from "date-fns";
// import { FiMinus, FiPlus } from "react-icons/fi";
import { toastError, toastSuccess } from "@/utils/toastMessage.ts";
import { useRouter } from "next/navigation";
// import PriceSummery from "./PriceSummery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import { AiFillCloseSquare } from "react-icons/ai";
// import { IoMdClose } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import {
  ApplyCouponApi,
  getOfferApi,
  postContactEnquiry,
} from "@/service/home.service";
import Hotaldetailscontent from "@/components/Hotaldetailscontent/Hotaldetailscontent";
import axios from "axios";
// import TopOffCanvas from "@/components/TopOffCanvas/TopOffCanvas";
import { FiMinus, FiPlus } from "react-icons/fi";
// import { IoMdClose } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import Loading from "../../Hotels/loading";
// import Loading from "../../Hotels/loading";


import hotelmainimage from '@/assets/images/hotelmainimage/hotelmainimage.webp'





export default function page({
  params,
  searchParams,
}: {
  
  params: { slug: string };
  searchParams?: SearchDateInput;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [locationSearch, setLocationSearch] = useSearch();
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handlebackbutton = () => {
    setShow1(true);
    setShow2(false);
  };

  const handleClose2Modal = () => {
    setShow2(true);
    setShow1(false);
  };

  const [hotelObj, sethotelObj] = useState<any>();
  const [roomObj, setroomObj] = useState("");
  const [roomsArr, setroomsArr] = useState([]);
  const [hotelId, sethotelId] = useState("");
  const [Checkin, setCheckIn] = useState(false);
  const [review, setreview] = useState(0);
  const [totalReview, setTotalReview] = useState(0);
  const [ratesArr, setratesArr] = useState([]);

  let handelReview = (total: number, treview: number) => {
    setTotalReview(total);
    setreview(treview);
  };

  const [bedroom, setBedroom] = useState("");
  const [bathroom, setbathroom] = useState("");
  const [people, setpeople] = useState("");
  const [meal, setmeal] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [rateArr, setRateArr] = useState([]);
  const [galleryArr, setGalleryArr] = useState([]);
  const [actveGalleryArr, setActiveGalleryArr] = useState<
    { imageUrl: string }[]
  >([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [stotalPrice, setstotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [searchObj, setsearchObj] = useState<SearchDateInput>();
  const [isAvailable, setisAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [mobileshowprice, setmobileshowprice] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setphone] = useState("");
  const [cmessage, setcmessage] = useState("");
  const [coupons, setCoupons] = useState([]);
  let cancelToken: any;
  const [discount, setDiscount] = useState<any>();

  const handleToggle = () => {
    setCheckIn(!Checkin);
  };

  useEffect(() => {
    if (params && params.slug) {
      handleGetHotelBySlug(params.slug);
    }

    // let searchParams = params?.searchParams;
    if (searchParams && searchParams?.locationId) {
      setLocationSearch(searchParams);
    }
    handlegetOffers();
  }, [params]);

  const handleGetHotelBySlug = async (slug: string) => {
    try {
      let { data: res } = await getHotelBySlugApi(slug);

      if (res.data) {
        sethotelObj(res.data);
        setbathroom(res.data.bathroom);
        setBedroom(res.data.bedroom);
        setpeople(res.data.guest);
        setmeal(res.data.meal);
        setPrice(res.data.price);
        sethotelId(res.data._id);
        let imgsArr: { imageUrl: string }[] = [];
        if (res.data?.galleryArr && res.data?.galleryArr?.length > 0) {
          setGalleryArr(res.data?.galleryArr);
          res.data?.galleryArr?.map((elx: any) => {
            if (elx.imagesArr && elx.imagesArr?.length > 0) {
              elx.imagesArr?.map((galery: any) => {
                imgsArr.push({ imageUrl: galery.imageUrl });
              });
            }
          });

          setActiveGalleryArr(imgsArr);
        }
        // handleRemoveCoupon()
      }
    } catch (error) {}
  };
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  // };

  useEffect(() => {
    if (
      hotelId &&
      hotelId != "" &&
      locationSearch &&
      (!locationSearch?.roomsArr || locationSearch?.roomsArr?.length == 0)
    ) {
      getAvailabiltyDetails();
    }
  }, [hotelId, locationSearch]);

  const handleSelect = (ranges: any) => {
    setLocationSearch({
      ...locationSearch,
      startDate: new Date(
        moment(new Date(ranges?.selection?.startDate)).format("YYYY-MM-DD")
      ),
      endDate:
        moment(new Date(ranges?.selection?.startDate)).format("YYYY-MM-DD") !=
        moment(new Date(ranges?.selection?.endDate)).format("YYYY-MM-DD")
          ? new Date(
              moment(new Date(ranges?.selection?.endDate)).format("YYYY-MM-DD")
            )
          : new Date(
              moment(new Date(ranges?.selection?.startDate))
                .add(1, "days")
                .format("YYYY-MM-DD")
            ),
      roomsArr: [],
    });
  };


  const wrapperRef: any = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setCheckIn(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, wrapperRef.current]);

  const [guest, setGuest] = useState<any>(false);

  const refs: any = useRef(null);

  useEffect(() => {
    function handleOutside(event: any) {
      if (refs.current && !refs.current.contains(event.target)) {
        setGuest(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [refs, refs.current]);

  useEffect(() => {
    if (hotelId != "") {
      // if (hotelObj && hotelObj?.hotelType != "Hotels") {
      getAvailabiltyDetails();
      // }
    }
  }, [locationSearch]);

  const getAvailabiltyDetails = () => {
    // setbookingTotal(0);
    if (
      new Date(locationSearch.endDate).getTime() <=
      new Date(locationSearch?.startDate).getTime()
    ) {
      toastError("Please Select Valid date");
      return;
    }

    // if (
    //   hotelObj &&
    //   hotelObj?.hotelType == "Hotels" &&
    //   locationSearch?.roomsArr?.length == 0
    // ) {
    //   toastError("Please Select Room");
    //   return;
    // }

    if (locationSearch?.roomsArr?.length > 0) {
      let roomsArr = locationSearch?.roomsArr;
      let totalGuest = locationSearch.adult;
      let roomGuest = 0;
      let remGuest = totalGuest;
      let totalRooms = 0;
      for (const room of roomsArr) {
        roomGuest += room.guest * room.rooms;

        totalRooms += room.rooms;
        remGuest = remGuest - room.guest * room.rooms;
      }

      let x = roomGuest - totalGuest;
      if (x < 0) {
        let etc = Math.abs(x);
        toastError("Please add more no. of rooms. Because you have selected  " + etc + " more guest");
        settotalPrice(0);
        setstotalPrice(0);
        setisAvailable(false);
        return 0;
      } else {
        if (totalRooms > totalGuest) {
          let etc = Math.abs(totalRooms - totalGuest);
          toastError(
            "Please remove no. of room. You have extra " + etc + " room for " + locationSearch.adult + " guest" 
          );
          settotalPrice(0);
          setstotalPrice(0);
          setisAvailable(false);
          return 0;
        }

        //  let y = Math.abs(x) - totalRooms;
      }
    }

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Cacencel ....");
    }
    cancelToken = axios.CancelToken.source();

    handlegetHotel(locationSearch, cancelToken);
  };

  const handelGallery = (type: string) => {
    SetGalleryList(type);

    if (type == "All") {
      let imgsArr: { imageUrl: string }[] = [];
      if (galleryArr && galleryArr?.length > 0) {
        galleryArr?.map((elx: any) => {
          if (elx.imagesArr && elx.imagesArr?.length > 0) {
            elx.imagesArr?.map((galery: any) => {
              imgsArr.push({ imageUrl: galery.imageUrl });
            });
          }
        });

        setActiveGalleryArr(imgsArr);
      }
    } else {
      let imgsArr: any = [];
      if (galleryArr && galleryArr?.length > 0) {
        let catArr: any = galleryArr.find((elx: any) => elx.title == type);
        imgsArr = catArr ? catArr?.imagesArr : [];
        setActiveGalleryArr(imgsArr);
      }
    }
  };

  const handleApplyCoupon = async (code: string) => {
    try {
    

      if (`${code}` == "") {
        toastError("Please Fill Code ");
        return;
      }

      if (totalPrice <= 0) {
        toastError("Please Select Room");
        return;
      }

      let obj = {
        discountCode: code,
        amount: stotalPrice,
      };

      let { data: res } = await ApplyCouponApi(obj);
      // console.log(res, "cart")
      if (res.data) {
        // console.log(res.data, "cart")
        if (res.data) {
          setDiscount({
            code: res.data?.discountCode,
            amount: res.data?.amount,
            discoutAmount: res.data?.discoutAmount,
          });
          settotalPrice(res.data?.discoutAmount);
          localStorage.setItem(
            "cart-discount",
            JSON.stringify({
              code: res.data?.discountCode,
              amount: res.data?.amount,
              discoutAmount: res.data?.discoutAmount,
            })
          );
        } else {
          setDiscount(null);
          localStorage.setItem("cart-discount", "");
        }
        if (res.message) {
          toastSuccess(res.message);
        }

        return;
      }
    } catch (err) {
      toastError(err);
    }
  };
  const handleRemoveCoupon = async () => {
    try {
      setDiscount(null);
      localStorage.setItem("cart-discount", "");
      getAvailabiltyDetails();
    } catch (err) {
      toastError(err);
    }
  };
  const handlegetOffers = async () => {
    try {
      let { data: res } = await getOfferApi("active=true");
      if (res.data) {
        setCoupons(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleapayment = () => {
    if (
      new Date(locationSearch.endDate).getTime() <=
      new Date(locationSearch?.startDate).getTime()
    ) {
      toastError("Please Select Valid date");
      return;
    }

    let quwry = `/Payment?propertyId=${hotelId}&location=${
      locationSearch?.location
    }&locationId=${locationSearch?.roomId}&roomId=${
      locationSearch?.roomId
    }&startDate=${moment(new Date(locationSearch?.startDate)).format(
      "YYYY-MM-DD"
    )}&endDate=${moment(new Date(locationSearch?.endDate)).format(
      "YYYY-MM-DD"
    )}&adult=${locationSearch?.adult}&child=${locationSearch?.child}`;

    if (locationSearch?.roomsArr && locationSearch.roomsArr?.length > 0) {
      let filterByroomsArr = locationSearch?.roomsArr;
      if (filterByroomsArr && filterByroomsArr?.length > 0) {
        quwry += `&roomsArr=${encodeURIComponent(
          JSON.stringify(filterByroomsArr)
        )}`;
      }
    }

    router.push(quwry);
  };

  const handlegetHotel = async (
    aobj: SearchDateInput,
    cancelTokenValue: any
  ) => {
    setisAvailable(false);
    setIsLoading(true);

    try {
      let obj: any = { ...aobj, propertyId: hotelId };
      delete obj["roomsArr"];
      let { data: res } = await getHotelByIdAndRatesApi(obj, cancelTokenValue);
      if (res.data) {
        sethotelObj(res.data);
        setratesArr(res.rateArr);
        console.log(res.rateArr, "roomsArrroomsArrroomsArr");
        //   if (res.rateArr && res.rateArr?.length > 0) {
        //     let toPrice = 0;
        //     //  setRateArr(res.rateArr[0].dayBreakdown);

        //   let isAv = res.rateArr.some((el:any) => el.isAvailable == true);
        //     settotalPrice(toPrice);
        //     setisAvailable(isAv);
        //   }
        let toPrice = 0;
        if (res.rateArr && res.rateArr?.length > 0) {
          let tepmratesArr = res.rateArr;
          let isAv = res.rateArr.some((el: any) => el.isAvailable == true);
          setisAvailable(isAv);
          if (res.data && res.data?.hotelType == "Hotels") {
            let tempratesArr = [];
            if (
              locationSearch?.roomsArr &&
              locationSearch?.roomsArr?.length > 0
            ) {
              for (const rooms of locationSearch?.roomsArr) {
                let roomObj = tepmratesArr.find(
                  (el: any) => `${el.categoryId}` == rooms.rmsPropertyId
                );
                roomObj.room = rooms.rooms;

                let priceRateArr = roomObj.rates.filter(
                  (el: any) => el.rateId == rooms?.rateId
                );
                roomObj.rates = priceRateArr;

                tempratesArr.push(roomObj);
              }
              tepmratesArr = JSON.parse(JSON.stringify(tempratesArr));

              //  setRateArr(res.rateArr[0].dayBreakdown);

              if (tempratesArr && tempratesArr?.length > 0) {
                for (const tempRateArr of tempratesArr) {
                  toPrice =
                    toPrice +
                    tempRateArr.rates[0].dayBreakdown.reduce(
                      (acc: any, curr: any) =>
                        acc + curr.dailyRate * tempRateArr.room,
                      0
                    );
                }
              }
            }
          } else {
            //  setRateArr(res.rateArr[0].dayBreakdown);
            let tempRateArr = res.rateArr[0];
            toPrice =
              toPrice +
              tempRateArr.rates[0].dayBreakdown.reduce(
                (acc: any, curr: any) => acc + curr.dailyRate,
                0
              );
            let isAv = res.rateArr.some((el: any) => el.isAvailable == true);
            settotalPrice(toPrice);
            setstotalPrice(toPrice);
            setisAvailable(isAv);
          }
        } else {
          setMessage("Not Availble");
        }

        settotalPrice(toPrice);
        setstotalPrice(toPrice);
      }
      setIsLoading(false);
    } catch (error) {
      // toastError(error);
      console.error(error);
      setIsLoading(false);
    }
  };

  // gallery modal category list

  const [galleryList, SetGalleryList] = useState("All");

  const handlegallerylist = () => {
    SetGalleryList("");
  };

  // swiper space
  const mobilresponsive = {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  };

  const handleSubmit = async () => {
    try {
      if (name == "") {
        toastError("Name is mandatory");
        return;
      } else if (email == "") {
        toastError("Email is mandatory");
        return;
      } else if (phone == "") {
        toastError("Phone is mandatory");
        return;
      } else if (phone.length != 10) {
        toastError("Invalid Phone number");
        return;
      } else if (cmessage == "") {
        toastError("Message is mandatory");
        return;
      }

      let obj = {
        name,
        phone,
        email,
        message: cmessage,
        title: hotelObj?.name + " Query ",
      };

      let { data: res } = await postContactEnquiry(obj);
      if (res.message) {
        toastSuccess(res.message);
        setName("");
        setEmail("");
        setphone("");
        setTitle("");
        setcmessage("");
        handleClose();
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  const shareButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const shareButton = shareButtonRef.current;

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            text: "Check out this amazing page!",
            url: window.location.href,
          });
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        alert("Web Share API not supported in this browser.");
        // Fallback code to share link via other means (e.g., copy to clipboard)
        const fallbackUrl = window.location.href;
        const fallbackText = "Copy this link to share: " + fallbackUrl;
        const fallbackContainer = document.createElement("div");
        fallbackContainer.innerText = fallbackText;
        document.body.appendChild(fallbackContainer);
      }
    };

    if (shareButton) {
      shareButton.addEventListener("click", handleShare);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (shareButton) {
        shareButton.removeEventListener("click", handleShare);
      }
    };
  }, []);

  return (
    <>
     
      <div className={style.detail_sec}>
        <div className={style.main_section}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className={`${style.images} row removep0_inmobile`}>
                  <div className="col-lg-8 col-md-8 gap0">
                    <div className= {`skeleton ${style.image1}`}>
                      {
                        hotelObj?.mainImage?
                        <Image
                        src={generateImageUrl(hotelObj?.mainImage)}
                        alt="hotelimage"
                        fill
                      
                      />
                      :
                      <Image
                      src={hotelmainimage}
              alt="hotelimage"
                      fill
                      
                    />

                      }
                  
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 p-0 ">
                    <div className={`row ${style.gap2}`}>

                      
                      {hotelObj && hotelObj.imagesArr?.length > 0 && (
                        <div className="col-lg-12 col-md-12 col-sm-6 d-none d-lg-block d-md-block d-sm-block">
                          <div className={`skeleton ${style.image}`}>
                          {
                        hotelObj.imagesArr[0].imageUrl?
                        <Image
                        src={generateImageUrl(
                          hotelObj.imagesArr[0].imageUrl
                        )}
                        alt="hotelimage"
                        fill
                        
                      />
                      :
                      <Image
                      src={hotelmainimage}
              alt="hotelimage"
                      fill
                      
                    />

                      }
                           
                          </div>
                        </div>
                      )}
                      {hotelObj && hotelObj.imagesArr?.length > 1 && (
                        <div className="col-lg-12 col-md-12 col-sm-6 d-none d-lg-block d-md-block d-sm-block">
                          <div className={`skeleton ${style.image}`}>
                          {
                        hotelObj.imagesArr[1].imageUrl?
                        <Image
                        src={generateImageUrl(
                          hotelObj.imagesArr[1].imageUrl
                        )}
                        alt="hotelimage"
                        fill
                      
                      />
                      :
                      <Image
                      src={hotelmainimage}
              alt="hotelimage"
                      fill
                     
                    />

                      }
                          </div>
                        </div>
                      )}



                    </div>
                  </div>

                  <button className={`${style.btn2} btn`} onClick={handleShow1}>
                    <GrGallery />
                    View Gallery
                  </button>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 p-0 mt-4  mobilepadingremove">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="sticky-top top_250 ">
                      <div className={` ${style.main_contentsec}`}>
                        <div className={style.top_content}>
                          <div className="row">
                            <div className="col-xl-9 col-lg-8">
                              <div className={style.detail}>
                                <h1 className={style.heading}>
                                  {hotelObj?.name}{" "}
                                  <button
                                    className={`${style.btn3} btn`}
                                    title="Share hotel"
                                    ref={shareButtonRef}
                                  >
                                    <IoShareSocialOutline />
                                  </button>
                                </h1>

                                <div className={style.location}>
                                  <FaLocationDot />
                                  <p className={style.name}>
                                    {" "}
                                    {hotelObj?.locationObj?.name}
                                  </p>
                                </div>

                                <div className={style.rate}>
                                  {totalReview > 0 && (
                                    <Rating
                                      initialValue={5}
                                      size={20}
                                      fillColor="rgba(255, 147, 0, 1)"
                                      emptyStyle={{
                                        color:
                                          "rgba(206, 204, 209, 1) !important",
                                        stroke:
                                          "rgba(206, 204, 209, 1) !important",
                                      }}
                                      readonly={true}
                                      className={style.star}
                                    />
                                  )}

                                  {review > 0 && (
                                    <span className={style.review}>
                                      {review} reviews
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-4">
                              <div
                                className={`${style.price_box} ${style.bg_gradient1}`}
                              >
                                <div className={`${style.headerclose}`}>
                                  <div className={style.price_text}>
                                    <p className={style.price}>
                                      <span className={style.text}>
                                        Starting From
                                      </span>
                                      ₹   {hotelObj?.price}{" "}
                                      <span className={style.day}>
                                        / Night
                                      </span>{" "}
                                    </p>
                                    {/* <p className={style.rooms}>( For 4 Rooms )</p> */}
                                  </div>
                                </div>

                                {/* coupon */}

                                {/* {props?.discount && (
          <div className={style.coupon_box}>
            <span className={style.coupon_txt}>
              {" "}
              <RiDiscountPercentFill className={style.icn} /> Coupon
              {props?.discount && (
                <IoMdClose
                  className={style.c_remove}
                  onClick={() => props.handleRemoveCoupon()}
                />
              )}{" "}
            </span>
            <span
              className={`${props?.discount ? style.c_green : style.c_apply}`}
            >
              {" "}
              {props?.discount ? "- ₹  " + props?.discount?.amount : "Apply"}
            </span>
          </div>
        )} */}

                                {/* <button
                              type="button"
                              onClick={() =>
                                !locationSearch?.roomsArr ||
                                locationSearch?.roomsArr?.length == 0
                                  ? toastError("Please Select Room")
                                  : props.totalPrice > 0
                                  ? props.handleapayment()
                                  : props.getAvailabiltyDetails()
                              }
                              className={`${style.btn8} mt-1 btn mb-3`}
                            >
                              {props.totalPrice > 0
                                ? " Book Now "
                                : "Check Availability"}
                            </button> */}
                              </div>
                            </div>
                          </div>

                          {/* <div className="user_inof date_area mt-3">
                            <div className="row gy-3">
                              <div className=" col-xl-12">
                                <div className={`${style.group} form-group`}>
                                  <div className="row">
                                    <div className="col-xl-4">
                                      <div onClick={() => setCheckIn(!Checkin)}>
                                        <label className={style.label}>
                                          Check-In
                                        </label>
                                        <div
                                          className={`${style.input_group} input-group position-relative`}
                                        >
                                          <input
                                            type="text"
                                            className={`${style.control} form-control`}
                                            value={`${moment(
                                              new Date(locationSearch.startDate)
                                            ).format("ddd, MMM DD")}`}
                                            placeholder="Select Check-In date"
                                            readOnly
                                            style={{ cursor: "pointer" }}
                                          />
                                          <span
                                            className={`${style.text} input-group-text`}
                                          >
                                            <FaRegCalendarAlt />
                                          </span>
                                        </div>
                                      </div>
                                      {Checkin ? (
                                        <div
                                          className="datepicker1"
                                          ref={wrapperRef}
                                        >
                                          <div className="confirm_buttn">
                                            <button
                                              onClick={handleToggle}
                                              className="buttn"
                                            >
                                             Apply
                                            </button>
                                          </div>

                                          <DateRangePicker
                                            onChange={handleSelect}
                                            moveRangeOnFirstSelection={false}
                                            months={2}
                                            ranges={[
                                              {
                                                startDate: locationSearch
                                                  ? locationSearch.startDate
                                                  : new Date(),
                                                endDate: locationSearch
                                                  ? locationSearch.endDate
                                                  : addDays(new Date(), 7),
                                                key: "selection",
                                              },
                                            ]}
                                            direction="horizontal"
                                            preventSnapRefocus={true}
                                            calendarFocus="forwards"
                                          />
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="col-xl-4">
                                      <div onClick={() => setCheckIn(!Checkin)}>
                                        <label className={style.label}>
                                          Check-Out
                                        </label>
                                        <div
                                          className={`${style.input_group} input-group position-relative`}
                                        >
                                          <input
                                            type="text"
                                            className={`${style.control} form-control`}
                                            value={`${moment(
                                              new Date(locationSearch.endDate)
                                            ).format("ddd, MMM DD")}`}
                                            placeholder="Select Check-Out date"
                                            readOnly
                                            style={{ cursor: "pointer" }}
                                          />
                                          <span
                                            className={`${style.text} input-group-text`}
                                          >
                                            <FaRegCalendarAlt />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-xl-4">
                                      <div
                                        className={`${style.group} form-group`}
                                      >
                                        <div
                                          onClick={() => setGuest(!guest)}
                                          className={style.input_group}
                                        >
                                          <label className={style.label}>
                                            Guests & Rooms{" "}
                                          </label>
                                          <input
                                            type="text"
                                            className={`${style.control} form-control`}
                                            value={`${locationSearch.adult} Adult and ${locationSearch.child} Child`}
                                            readOnly
                                            style={{ cursor: "pointer" }}
                                          />
                                        </div>
                                        {guest ? (
                                          <ul
                                            className={`${style.list} ${style.childressele} select_rooms`}
                                            ref={refs}
                                          >
                                            <li
                                              className={`${style.data} ${style.flexrowbetween}`}
                                            >
                                              <div className={style.info}>
                                                <h6
                                                  className={`${style.text} ${style.inputchilder}`}
                                                >
                                                  Adult
                                                </h6>
                                                <p className={style.text1}>
                                                  Age 13 years and above
                                                </p>
                                              </div>

                                              <div
                                                className={style.buttonsplue}
                                              >
                                                <button
                                                  className={`${style.btn6} btn`}
                                                  onClick={() =>
                                                    setLocationSearch({
                                                      ...locationSearch,
                                                      adult:
                                                        locationSearch.adult > 1
                                                          ? Number(
                                                              locationSearch.adult -
                                                                1
                                                            )
                                                          : 1,
                                                      roomsArr: [],
                                                    })
                                                  }
                                                >
                                                  <FiMinus />
                                                </button>
                                                <span
                                                  className={`${style.number} ${style.btn6}`}
                                                >
                                                  {locationSearch.adult}
                                                </span>
                                                <button
                                                  className={`${style.btn6} btn`}
                                                  onClick={() =>
                                                    setLocationSearch({
                                                      ...locationSearch,
                                                      adult:
                                                        locationSearch.adult >
                                                        26
                                                          ? Number(
                                                              locationSearch.adult
                                                            )
                                                          : Number(
                                                              Number(
                                                                locationSearch.adult
                                                              ) + 1
                                                            ),
                                                      roomsArr: [],
                                                    })
                                                  }
                                                >
                                                  <FiPlus />
                                                </button>
                                              </div>
                                            </li>

                                            <li
                                              className={`${style.data} ${style.flexrowbetween}`}
                                            >
                                              <div className={style.info}>
                                                <h6
                                                  className={`${style.text} ${style.inputchilder}`}
                                                >
                                                  Children
                                                </h6>
                                                <p className={style.text1}>
                                                  Age 12 years and below
                                                </p>
                                              </div>

                                              <div
                                                className={style.buttonsplue}
                                              >
                                                <button
                                                  className={`${style.btn6} btn`}
                                                  onClick={() =>
                                                    setLocationSearch({
                                                      ...locationSearch,
                                                      child:
                                                        locationSearch.child > 1
                                                          ? Number(
                                                              locationSearch.child -
                                                                1
                                                            )
                                                          : 0,
                                                    })
                                                  }
                                                >
                                                  <FiMinus />
                                                </button>
                                                <span
                                                  className={`${style.number} ${style.btn6}`}
                                                >
                                                  {locationSearch.child}
                                                </span>
                                                <button
                                                  className={`${style.btn6} btn`}
                                                  onClick={() =>
                                                    setLocationSearch({
                                                      ...locationSearch,
                                                      child: Number(
                                                        locationSearch.child + 1
                                                      ),
                                                    })
                                                  }
                                                >
                                                  <FiPlus />
                                                </button>
                                              </div>
                                            </li>
                                            <div className="confirm_buttn">
              <button onClick={() => setGuest(!guest)} className="buttn">Apply & Search</button>
              </div>
                                          </ul>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>

                        {hotelObj?.hotelType == "Hotels" ? (
                          <div className={style.middle_content}>
                            <div className={style.images}>
                              <div className={style.info}>
                                <div className={style.image}>
                                  <Image
                                    src={Images.middle1}
                                    alt=""
                                    fill
                                    priority
                                  />
                                </div>
                                <span className={style.text}>26 Rooms</span>
                              </div>
                              <div className={style.info}>
                                <div className={style.image}>
                                  <Image
                                    src={Images.middle2}
                                    alt=""
                                    fill
                                    priority
                                  />
                                </div>
                                <span className={style.text}>
                                  Limited Parking
                                </span>
                              </div>
                              <div className={style.info}>
                                <div className={style.image}>
                                  <Image
                                    src={Images.middle3}
                                    alt=""
                                    fill
                                    priority
                                  />
                                </div>
                                <span className={style.text}>Oishii Cafe</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={style.middle_content}>
                            <div className={style.images}>
                              <div className={style.info}>
                                <div className={style.image}>
                                  <Image
                                    src={Images.middle1}
                                    alt=""
                                    fill
                                    priority
                                  />
                                </div>
                                <span className={style.text}>
                                  {bedroom} Bedroom{" "}
                                </span>
                              </div>
                              <div className={style.info}>
                                <div className={style.image}>
                                  <Image
                                    src={Images.middle2}
                                    alt=""
                                    fill
                                    priority
                                  />
                                </div>
                                <span className={style.text}>
                                  {bathroom} Bathrooms{" "}
                                </span>
                              </div>
                              <div className={style.info}>
                                <div className={style.image}>
                                  <Image
                                    src={Images.middle3}
                                    alt=""
                                    fill
                                    priority
                                  />
                                </div>
                                <span className={style.text}>
                                  {people} Guests{" "}
                                </span>
                              </div>
                              <div className={style.info}>
                                <div className={style.image}>
                                  <Image
                                    src={Images.middle3}
                                    alt=""
                                    fill
                                    priority
                                  />
                                </div>
                                <span className={style.text}>{meal} Meal </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {hotelObj && hotelObj?.hotelType == "Hotels" ? (
                          <Hotaldetailscontent
                            hotel={hotelObj}
                            handelReview={handelReview}
                            ratesArr={ratesArr}
                            handleShow1={handleShow1}
                          />
                        ) : (
                          <PropertyDetailContent
                            hotel={hotelObj}
                            handelReview={handelReview}
                          />
                        )}

                        <div className={style.form}>
                          <div className={style.contents}>
                            <h6 className={style.heading}>Question?</h6>
                            <p className={style.para}>
                              Our Team is Here to Help you. Drop Us a Message!
                            </p>
                          </div>
                          <div className={style.button}>
                            <button
                              className={`${style.btn5} btn`}
                              onClick={handleShow}
                            >
                              Contact Us
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-lg-4 col-md-12 col-sm-12 mt-3">
                    <div className="sticky-top top_250 ">
                      <div
                        className={`${
                          mobileshowprice ? "mobileshow" : "desktopshow"
                        }`}
                      >
                        <PriceSummery
                          price={price}
                          setmobileshowprice={setmobileshowprice}
                          mobileshowprice={mobileshowprice}
                          setCheckIn={setCheckIn}
                          setGuest={setGuest}
                          hotelType={hotelObj?.hotelType}
                          Checkin={Checkin}
                          handleSelect={handleSelect}
                          locationSearch={locationSearch}
                          setLocationSearch={setLocationSearch}
                          wrapperRef={wrapperRef}
                          guest={guest}
                          refs={refs}
                          totalPrice={totalPrice}
                          getAvailabiltyDetails={getAvailabiltyDetails}
                          isLoading={isLoading}
                          message={message}
                          isAvailable={isAvailable}
                          handleapayment={handleapayment}
                          coupons={coupons}
                          handleApplyCoupon={handleApplyCoupon}
                          handleRemoveCoupon={handleRemoveCoupon}
                          discount={discount}
                          handleToggle={handleToggle}
                        

                        />
                      </div>

                      <div className={style.location_box}>
                        <h6 className={style.heading}>Location</h6>

                        <div className={style.location1}>
                          <MdLocationOn />
                          {hotelObj?.locationObj?.name}
                        </div>
                        <p className={style.info_text}>{hotelObj?.tagline}</p>
                        {hotelObj && hotelObj?.googleMap && (
                          <div
                            style={{ width: "100%!important" }}
                            dangerouslySetInnerHTML={{
                              __html: hotelObj.googleMap,
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile section button */}

      {/* {!mobileshowprice && (
        <div className="fixed_bottombtn d-lg-none">
          <div className="primcemobilebotm">
            <h3>Total Payble</h3>
            <h6> ₹ {price}</h6>
          </div>

       

          <button
            className="btn btn_check"
            onClick={() => setmobileshowprice(!mobileshowprice)}
          >
            Check Availability
          </button>
        </div>
      )} */}

      {/* conatct modal */}

      <Modal show={show} onHide={handleClose} className={style.modal}  centered>
        <Modal.Header className={style.header}>
          <Modal.Title className={style.title}>Contact Us</Modal.Title>
        </Modal.Header>

        <Modal.Body className={style.body}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={style.label}> Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              className={style.form_control}
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={style.label}>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mobile Number"
              className={style.form_control}
              value={phone}
              onChange={(e: any) => setphone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={style.label}>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter E-mail Address"
              className={style.form_control}
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className={style.label}>Message*</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Your Query"
              rows={3}
              className={style.form_control}
              onChange={(e: any) => setcmessage(e.target.value)}
              value={cmessage}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className={style.footer}>
        <div className="col-xl-6">
         <Button
            variant="secondary"
            onClick={handleClose}
            className={style.btn6}
          >
            Close
          </Button>
         </div>
       <div className="col-xl-6">
       <Button
            variant="primary"
            className={style.btn7}
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
       </div>
        </Modal.Footer>
      </Modal>

      {show2 ? (
        // black modal single slide
        <Modal
          show={show2}
          onHide={handleClose2}
          placement={`bottom`}
          className={`${style.offcanvas_bottom}`}
          fullscreen
          centered
        >
          {/* <Modal.Header closeButton>

    </Modal.Header> */}
          <button className={style.back_buttn1} onClick={handlebackbutton}>
            <GoArrowLeft /> Back{" "}
          </button>

          <button className={style.close_buttn1} onClick={handleClose2}>
            <IoCloseOutline /> Close{" "}
          </button>
          <Modal.Body className={style.modal_body1}>
            <div className="container">
              <div className="col-xl-10 mx-auto">
                <Swiper
                  slidesPerView={1}
                  slidesPerGroup={1}
                  loop
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  modules={[Navigation, Pagination]}
                  className={`${style.swiper_space1}  swiper_space1`}
                >
                  {actveGalleryArr &&
                    actveGalleryArr?.length > 0 &&
                    actveGalleryArr?.map((el: any, index: any) => (
                      <SwiperSlide key={index} className={style.swiper_slidee}>
                        <div className={style.gallery_image1}>
                          <Image
                            src={generateImageUrl(el.imageUrl)}
                            fill
                            alt=""
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <>
          {/*  for gallery modal */}
         

          <Modal
            show={show1}
            onHide={handleClose1}
            placement={`bottom`}
            className={`${style.offcanvas_bottom}`}
            // size="xl"
            fullscreen
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
             <div className="container">


   
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Our Gallery
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={style.modal_body}>
              {/* for desktop view */}

              <div className=" gallerymodall">
                <ul className={`category_list ${style.category_list}`}>
                  <li>
                    <button
                      className={`${style.category_buttn} ${
                        galleryList == "All" ? style.active : ""
                      }`}
                      onClick={() => handelGallery("All")}
                    >
                      All
                    </button>
                  </li>
                  {galleryArr.map((el: any, index: any) => (
                    <li key={index}>
                      <button
                        className={`${style.category_buttn} ${
                          galleryList == el.title ? style.active : ""
                        }`}
                        onClick={() => handelGallery(el.title)}
                      >
                        {el.title}
                      </button>
                    </li>
                  ))}
                </ul>
                {actveGalleryArr &&
                  actveGalleryArr?.length > 0 &&
                  actveGalleryArr?.map((el: any, index: any) => (
                    <div
                      className={`col-xl-12 col-lg-12`}
                      key={index}
                      onClick={handleClose2Modal}
                    >
                      <div className={style.gallery_image}>
                        <Image
                          src={generateImageUrl(el.imageUrl)}
                          fill
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
              </div>

              {/* <div className="gallery_mob_view">
                <ul className={`category_list ${style.category_list}`}>
                  <li>
                    <button
                      className={`${style.category_buttn} ${
                        galleryList == "All" ? style.active : ""
                      }`}
                      onClick={() => handelGallery("All")}
                    >
                      All
                    </button>
                  </li>
                  {galleryArr.map((el: any, index: any) => (
                    <li key={index}>
                      <button
                        className={`${style.category_buttn} ${
                          galleryList == el.title ? style.active : ""
                        }`}
                        onClick={() => handelGallery(el.title)}
                      >
                        {el.title}
                      </button>
                    </li>
                  ))}
                </ul>

                <Swiper
                  slidesPerView={1}
                  slidesPerGroup={1}
                  spaceBetween={20}
                  loop
                  navigation={true}
                  breakpoints={mobilresponsive}
                  modules={[Navigation, Pagination]}
                  className={`${style.swiper_space1}  swiper_spaceg`}
                >
                  {actveGalleryArr &&
                    actveGalleryArr?.length > 0 &&
                    actveGalleryArr?.map((el: any, index: any) => (
                      <SwiperSlide
                        key={index}
                        className={style.swiper}
                        onClick={handleClose2Modal}
                      >
                        <div className={style.gallery_image}>
                          <Image
                            src={generateImageUrl(el.imageUrl)}
                            fill
                            alt=""
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div> */}
            </Modal.Body>
            </div>
          </Modal>
        
        </>
      )}

      {/* bottom booking view */}
     
        <div className={style.bottom_booking}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-7 col-md-6">
                <div className={style.price_boxx}>
                    <h5 className={style.main_price}>
                      {" "}
                      ₹ {totalPrice > 0 ? totalPrice : hotelObj?.price}{" "} <span className={style.room_no}>/ Night</span>
                      {totalPrice > 0 && (
                        
                          locationSearch?.roomsArr.length > 0 &&  (
                            <span className={style.room_no}>
                            (For  {
                              locationSearch?.roomsArr
                              .reduce((acc, curr) => {
                                  return acc += curr.rooms;
                                }, 0)
                            }
                            {   locationSearch?.roomsArr
                              .reduce((acc, curr) => {
                                  return acc += curr.rooms;
                                }, 0) > 1 ? " Rooms" : " Room"}
                            )
                           
                          </span>
                          )
                       
                       
                      )}
                      

                    </h5>

                  <p className={style.room_type}>(Exclusive of all taxes)</p>
                </div>
              </div>
              <div className={`col-xl-4 col-lg-5 col-md-6 ${style.d_f_jce}`}>
                <span>Lowest Price Guarantee</span>
                <button
                type="button"
                  className={style.book_buttn}
                  onClick={() =>
                    !locationSearch?.roomsArr ||
                    locationSearch?.roomsArr?.length == 0
                      ? toastError("Please Select Room")
                      : totalPrice > 0
                      ? handleapayment()
                      : getAvailabiltyDetails()
                  }
                >
                  {" "}
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
}
