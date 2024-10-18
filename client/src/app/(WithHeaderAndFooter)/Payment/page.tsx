"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/Payment/Payment.module.scss";
import Image from "next/image";
import { MdOutlineDiscount, MdOutlineLocationOn } from "react-icons/md";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { SearchDateInput, useSearch } from "@/context/client-provider";
import { getHotelByIdAndRatesApi } from "@/service/hotel.service";
import { generateImageUrl } from "@/service/url.service";
import moment from "moment";
import { toastError, toastSuccess } from "@/utils/toastMessage.ts";
import { createGuestOrder, orderCallbackApi } from "@/service/order.service";
import { useUserApiHook } from "@/service/user.service";
import { useSession } from "next-auth/react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { calculateGstOnAmount } from "@/utils/helper";
// import { getRateNameFromRateId } from "@/utils/constants";
import { Modal } from "react-bootstrap";
import { IoChevronBack, IoCloseOutline } from "react-icons/io5";
import { ApplyCouponApi, getOfferApi } from "@/service/home.service";
import { FaArrowRight } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";
import couponmodal from '@/assets/images/couponmodal/couponmodal.gif'
// import { GoDotFill } from "react-icons/go";
import Login from "@/components/Login/Login";
 type SearchInput = {
   location: string;
   locationId: string;
   roomId: string;
   propertyId: string;
   startDate: Date;
   endDate: Date;
   adult: number;
   child: number;
   rooms: number;
   roomsArr: string
 };
export default function page(props: any) {
  const [show1, setShow1] = useState(false);

  let [hotelObj, sethotelObj] = useState<any>({});
  let [rateArr, setRateArr] = useState<any>([]);
  let [total, setTotal] = useState<number>(0);
  let [subtotalPrice, setsubtotalPrice] = useState<number>(0);
  let [seacrhObj, setSeacrhObj] = useState<SearchDateInput>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [adultArr, setadultArr] = useState();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(false);
  const { getUserbyIdApi } = useUserApiHook();
  const { data: session } = useSession();
  const [nights, setNights] = useState(0);
  let [locationSearch, setLocationSearch] = useSearch();
  const [discount, setDiscount] = useState<any>();
  const [totalGst, setTotalGst] = useState<any>();
  const [isLogined, setIsLogined] = useState(false);
  // const [totalGst, setTotalGst] = useState<any>();

  const [privacycheck,SetPrivacyCheck] = useState(false)


  const [gst, setGst] = useState({
    tax: 0,
    amount: 0,
  });

  const [showCoupons, setShowCoupons] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [coupons, setCoupons] = useState([]);

  const handleCloseCoupons = () => setShowCoupons(false);
  const handleShowCoupons = () => {
    setShowCoupons(true);
  };


    const handleApplyCoupon = async (code: string) => {
      try {
        if (`${code}` == "") {
          toastError("Please Fill Code ");
          return;
        }

        if (subtotalPrice <= 0) {
    
          return;
        }

        let obj = {
          discountCode: code,
          amount: subtotalPrice,
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
     
            localStorage.setItem(
              "cart-discount",
              JSON.stringify({
                code: res.data?.discountCode,
                amount: res.data?.amount,
                discoutAmount: res.data?.discoutAmount,
              })
            );
              if (seacrhObj) {
                handlegetHotel(seacrhObj);
              }
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

  const handleApplyCouponFromText = () => {
    try {
    
      if (!couponCode) {
        toastError("Please Enter Coupon Code");
        return 0
      }
     handleApplyCoupon(couponCode);
  } catch (error) {
    console.log(error)
  }
}
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
  const router = useRouter();

  useEffect(() => {
    console.log(props, "propspropspropspropsprops");
    if (props && props?.searchParams) {
      let searcparams: SearchInput = props?.searchParams;
      let roomsArr:any = [];
      if (searcparams.roomsArr) {
        roomsArr = JSON.parse(searcparams.roomsArr);
      }
      setLocationSearch({ ...searcparams, roomsArr });
      setSeacrhObj({
        ...searcparams,
        roomsArr,
      });
    }
    handlegetOffers();
  }, [props]);
  useEffect(() => {
    if (seacrhObj && seacrhObj?.propertyId) {
      handlegetHotel(seacrhObj);
    }
  }, [seacrhObj]);

  useEffect(() => {
    if (session && session?.user) {
      let userSession: any = session.user;
      let userId = userSession._id;

      if (userId) {
        handleGetUserById(userId);
        setUserId(userId);
        // setIsLogined(true)
      } 
    } else {
      // setShow1(true)
    }
  }, [session]);
  const handleGetUserById = async (userId: string) => {
    try {
      let { data: res } = await getUserbyIdApi(userId);
      if (res.data) {
        if (res.data.name) {
          setFirstName(res.data.name);
        }
        if (res.data.email) {
          setEmail(res.data.email);
        }
        if (res.data.phone) {
          setMobile(res.data.phone);
        }
      }
    } catch (error) {
      toastError(error);
    }
  };

    const handleRemoveCoupon = async () => {
    try {
    

          setDiscount(null);
      localStorage.setItem("cart-discount", "");
      if (seacrhObj) {
         handlegetHotel(seacrhObj);
      }

    } catch (err) {
      toastError(err);
    }
  };

  const handlegetHotel = async (obj: SearchDateInput) => {
    try {
      let { data: res } = await getHotelByIdAndRatesApi(obj);
      if (res.data) {
        sethotelObj(res.data);
        console.log("hotelobjhotelobj",res.data)
        if (res.rateArr && res.rateArr?.length > 0) {
          let ratesArr = res.rateArr;
        

          if (seacrhObj?.roomsArr && seacrhObj?.roomsArr?.length > 0) {
           let tempratesArr = [];
            for (const rooms of seacrhObj?.roomsArr) {
              console.log(rooms, "roomObjroomObjroomObj", ratesArr);

              let roomObj = ratesArr.find(
                (el: any) => `${el.categoryId}` == rooms.rmsPropertyId
              );
              roomObj.room = rooms?.rooms ? rooms?.rooms :1
              console.log(roomObj, "roomObjroomObjroomObj");
              let priceRateArr = roomObj.rates.filter(
                (el: any) => el.rateId == rooms?.rateId
              );
             roomObj.rates = priceRateArr;

              tempratesArr.push(roomObj);
            }
            ratesArr = tempratesArr;
          

          

          let toPrice = 0;
          let toGst = 0;
          //  setRateArr(res.rateArr[0].dayBreakdown);

          for (const tempRateArr of ratesArr) {

            toPrice =
              toPrice +
              tempRateArr.rates[0].dayBreakdown.reduce(
                (acc: any, curr: any) => acc + (curr.dailyRate*tempRateArr.room),
                0
              );
            // toGst =
            //   toGst +
            //   tempRateArr.rates[0].dayBreakdown.reduce(
            //     (acc: any, curr: any) =>
            //       acc + calculateGstOnAmount(curr.dailyRate, tempRateArr.room).amount,
            //     0
            //   );
            }
            // setTotalGst(toGst);
          setRateArr(ratesArr);
              
            let discountLocal = localStorage.getItem('cart-discount');

            if (discountLocal) {

              let dicountObj = JSON.parse(discountLocal);
              if (dicountObj && dicountObj?.amount) {
                  setDiscount(dicountObj);
                toPrice = toPrice - dicountObj?.amount;
              }
            }
          setsubtotalPrice(toPrice);
        } else {
     
          let toPrice = 0;
          let toGst = 0;
          //  setRateArr(res.rateArr[0].dayBreakdown);
            let tempRateArr = res.rateArr[0];
            setNights(tempRateArr.rates[0].dayBreakdown?.length);
            
          console.log(
            tempRateArr.rates[0].dayBreakdown?.length,
            "ddddddddddddddddddddddddddddddddddddddddddddddddd"
          );

          toPrice =
            toPrice +
            tempRateArr.rates[0].dayBreakdown.reduce(
              (acc: any, curr: any) => acc + (curr.dailyRate),
              0
              );
            //   toGst =
            //     toGst +
            //     tempRateArr.rates[0].dayBreakdown.reduce(
            //       (acc: any, curr: any) =>
            //         acc +
            //         calculateGstOnAmount(curr.dailyRate,1).amount,
            //       0
            //     );
            // setTotalGst(toGst);
            
        let isAv = res.rateArr.some((el:any) => el.isAvailable == true);
        setRateArr(ratesArr);
              let discountLocal = localStorage.getItem("cart-discount");

              if (discountLocal) {
                let dicountObj = JSON.parse(discountLocal);
                if (dicountObj && dicountObj?.amount) {
                  setDiscount(dicountObj);
                  toPrice = toPrice - dicountObj?.amount;
                }
              }
            setsubtotalPrice(toPrice);
        }
        }
      }
    } catch (error) {
      // console.error(error);
    }
  };

  const handlecreateGuestOrder = async (obj: any) => {
    try {
      // console.log(obj,"obj124123")
      const res = await createGuestOrder(obj);
      return res;
    } catch (error) {
      // console.error(error);
      toastError(error);
    }
  };
  const handleCheckout = async (obj: any) => {
    try {
      setLoading(true);
      let res: any = await handlecreateGuestOrder(obj);

      if (res?.data?.success) {
        if (paymentMethod == "phonepe") {
          console.log(res?.data?.data, "asasdfafsasdfs");
          if (res?.data?.data && res?.data?.data.instrumentResponse) {
            let instrumentResponse = res?.data?.data?.instrumentResponse;
            if (instrumentResponse?.redirectInfo) {
              window.location.href = instrumentResponse?.redirectInfo.url;
              return 0;
            }
          }
          toastError(
            "`Phonepe is not working.Please Try Some another Payment Method"
          );
          return 0;
        } else {
          displayRazorpay(res.data.data, res.data.orderId);
        }
        setLoading(false);
      } else {
        toastError(res);
        setLoading(false);
      }
    } catch (error) {
      // console.error(error);
      setLoading(false);
      toastError(error);
    }
  };

  useEffect(() => {
    if (subtotalPrice > 0 && rateArr?.length > 0) {
      let gstObj = calculateGstOnAmount(subtotalPrice, hotelObj?.price);
      if (gstObj) {
        setGst(gstObj);
        setTotal(Number(gstObj?.amount) + Number(subtotalPrice));
      }
    }
  }, [subtotalPrice && rateArr]);

  



  const refTo = useRef<any>(null)

  const [paymentOptions,SetPaymentOptions] = useState(false)

  const handlePaymentOptions = () => {
    if (refTo.current) {
      refTo.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  
      if (windowWidth < 767) {
        window.scrollTo({ top: refTo.current.offsetTop, behavior: "smooth" });
      } else if (windowWidth >= 767 && windowWidth < 992) {
        window.scrollTo({ top: refTo.current.offsetTop, behavior: "smooth" });
      } else if (windowWidth >= 992) {
        window.scrollTo({ top: refTo.current.offsetTop, behavior: "smooth" });
      }
    } else {
      console.error("Reference to the target div is not available");
    }
    SetPaymentOptions(true);
  };

  const handleOrder = async (event:any) => {

    if (privacycheck == false) {
      toastError("Please check the box to confirm that you have read and agree to the terms and conditions. ");
      return 0;
    }


    const form = event.currentTarget;
    if (form.checkValidity() === false) {
    }

    setValidated(true);
  
    
    let nameRegex = /^[a-zA-Z]{2,40}$/;
    if (!firstName) {
      toastError("Please fill First Name");
      return 0;
    }
    if (!lastName) {
      toastError("Please fill Last Name");
      return 0;
    }
    const emailregex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || !emailregex.test(email)) {
      toastError("Email is Invaild");
      return 0;
    }
    if (!mobile || mobile.length != 10) {
      toastError("Mobile is Invaild");
      return 0;
    }
   

   

 

    let obj: any = {
      userId,
      email,
      mobile,
      gst,
      nights,
      discount,
      name: firstName + " " + lastName,
      //   guestArr: adultArr,
      hotelId: seacrhObj?.propertyId,
      subtotalPrice,
      grandTotal: total,
      startDate: seacrhObj?.startDate,
      endDate: seacrhObj?.endDate,
      adult: seacrhObj?.adult,
      child: seacrhObj?.child,
      paymentMethod,
    };

    if (seacrhObj && seacrhObj?.roomsArr && seacrhObj?.roomsArr?.length > 0) {
      obj.roomsArr = seacrhObj?.roomsArr;
    }
   console.log("handleorderworking",obj)
    handleCheckout(obj);

    
  };

  async function displayRazorpay(obj: any, orderId: string) {
    const options = {
      key: "rzp_live_uM1leUuA63HPRr", // Enter the Key ID generated from the Dashboard
      // key: "rzp_test_jOl57g4TNamtFW", // Enter the Key ID generated from the Dashboard
      amount: obj.amount,
      currency: obj.currency,
      name: "Wabi Sabi",
      description: "Booking",
      // image: { logo },
      order_id: obj.id,
      handler: async function (response: any) {
        const data = {
          orderCreationId: obj.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const serialize = function (obj: any) {
          var str = [];
          for (var p in obj)
            if (obj.hasOwnProperty(p)) {
              str.push(
                encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
              );
            }
          return str.join("&");
        };
        setLoading(true);
        let { data: res } = await orderCallbackApi(serialize(obj), orderId);
        if (res && res.orderId) {
          toastSuccess(res.message);
          setLoading(false);
                 setDiscount(null);
                 localStorage.setItem("cart-discount", "");
          router.push(`/order-complete/${res.orderId}`);
        }
      },

      theme: {
        color: "#ddbe70",
      },
    };
    // console.log(options,"opt2ions----")
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      alert(response.error.description);
    });
    paymentObject.open();
  }


 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set your mobile breakpoint here
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [windowWidth,setWindowWidth] = useState<any>()

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

  const [validated, setValidated] = useState(false);



  const handlerouterback = () =>
  {
    router.back()
    console.log("routerbacckkkk working")
  }



 



 
  
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="mob_head">
        <h2 className={style.main_headding}>Booking Details</h2>
      </div>

      <div className={style.payment_sec}>
        <div className="container">
          <div className="desk_head">
            <h2 className={style.main_headding}>Booking Details</h2>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className={style.payment_desc}>
                <div className={style.card_box}>
                  <div className="row">
                    <div className="col-xl-5">
                      <Link href={`/PropertyDetail/${hotelObj.slug}`}>
                        <div className={`${style.image} skeleton `}>
                          {hotelObj.mainImage && (
                            <Image
                              src={generateImageUrl(hotelObj?.mainImage)}
                              alt={`${hotelObj.name}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          )}
                        </div>
                      </Link>
                    </div>
                    <div className="col-xl-7">
                      <div className={style.main_content}>
                        <div className={style.top_sec}>
                          <div className={style.info}>
                            <Link href={`/PropertyDetail/${hotelObj.slug}`}>
                              <h6 className={style.heading}>
                                {hotelObj.name}{" "}
                                {hotelObj?.roomObj?._id
                                  ? " - " + hotelObj?.roomObj?.name
                                  : ""}
                              </h6>
                            </Link>
                            <div className={style.location}>
                              <MdOutlineLocationOn />
                              <p className={style.name}>{hotelObj.tagline}</p>
                            </div>
                          </div>
                        </div>

                        <div className={style.middle_sec}>
                          <div className={style.check}>
                            <span className={style.day}>
                              {moment(seacrhObj?.startDate).format("D MMM,")}{" "}
                              {isMobile ? (
                                <span>
                                  {moment(seacrhObj?.startDate).format(" ddd")}
                                </span>
                              ) : (
                                <span>
                                  {moment(seacrhObj?.startDate).format(" dddd")}
                                </span>
                              )}
                            </span>
                            <span className={style.title}>Check - In</span>
                          </div>
                          <FaArrowRight className={style.right_arrow} />
                          <div className={style.check}>
                            <span className={style.day}>
                              {moment(seacrhObj?.endDate).format("D MMM,")}{" "}
                              {isMobile ? (
                                <span>
                                  {moment(seacrhObj?.endDate).format(" ddd")}
                                </span>
                              ) : (
                                <span>
                                  {moment(seacrhObj?.endDate).format(" dddd")}
                                </span>
                              )}
                            </span>
                            <span className={style.title}>Check - Out </span>
                          </div>
                          <p className={style.total_day}>
                            {rateArr?.length}{" "}
                            {rateArr?.length == 1 ? "Night" : "Nights"}{" "}
                          </p>
                        </div>
                        {hotelObj && hotelObj?.hotelType == "Hotels" && 



                        <div className={`${style.room_booked} ${hotelObj?.hotelType == "Hotels" && style.noborder}`}>
                      <ul className={style.list}>
                        {rateArr &&
                          rateArr?.length > 0 &&
                          rateArr.map((el: any, indexx: any) => (
                            <div key={indexx}>
                           
                                      <li className={style.item}>
                                        <span className={style.heading}>
                                          {hotelObj &&
                                            hotelObj?.hotelType == "Hotels" && (
                                              <>
                                                <span
                                                  className={`${style.total_day}`}
                                                >
                                                  {el?.rates[0].dayBreakdown?.length} X  {' '}
                                                </span>
                                                {el.name ? el.name : ""}
                                              </>
                                            )}
                                        </span>
                                      </li>
                               
                            </div>
                          ))}
                       
                      </ul>

                    
                    </div>
}

                     
                      </div>
                    </div>

                    <div className={style.room_booked}>
                 
                      <button
                        type="button"
                        className={style.edit_rooms}
                        onClick={handlerouterback}
                      >
                        {" "}
                        <IoChevronBack /> Add or Edit Rooms
                      </button>
                    </div>

                    <div className={style.pay_now}>
                      <div className={style.pay_info}>
                        <h6 className={style.title}>Pay Now</h6>
                        <input
                          className={`${style.check} form-check-input`}
                          type="radio"
                          name="flexRadioDefault"
                        />
                      </div>

                      <ul className={`ps-0 ${style.list}`}>
                        <li className={style.item}>
                          We will process your payment in your local currency
                        </li>
                        <li className={style.item}>
                          Please note that Expedia will not issue a tax invoice.
                          You will receive a commercial receipt for the purpose
                          of the transaction
                        </li>
                      </ul>

                      <div className={style.total_price}>
                        <span className={style.title1}>Total</span>
                        <div className={style.amount}>
                          INR {total}
                          <span className={style.tax}>
                            (includes taxes & fees)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="" ref={refTo}>
                      <div className={style.form}>
                        <Form
                          noValidate
                          validated={validated}
                          onSubmit={handleOrder}
                        >
                          <h6 className={style.title}>Contact Details</h6>
                          <div className="row">
                            <div className="col-xl-6">
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label className={style.label}>
                                  First Name*
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter First Name"
                                  className={style.form_control}
                                  value={firstName}
                                  required
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please Enter First Name
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                            <div className="col-xl-6">
                              <Form.Group
                                className="mb-3"
                                controlId="validationCustom01"
                              >
                                <Form.Label className={style.label}>
                                  Last Name*
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Last Name"
                                  className={style.form_control}
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  required
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please Enter Last Name
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                            <div className="col-xl-6">
                              <Form.Group
                                className="mb-3"
                                controlId="validationCustom02"
                              >
                                <Form.Label className={style.label}>
                                  Mobile Number*
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Enter Mobile Number"
                                  className={style.form_control}
                                  value={mobile}
                                  required
                                  onChange={(e) => setMobile(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please Enter Valid Mobile Number
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                            <div className="col-xl-6">
                              <Form.Group
                                className="mb-3"
                                controlId="validationCustom03"
                              >
                                <Form.Label className={style.label}>
                                  E-mail*
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter E-mail Address"
                                  className={style.form_control}
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please Enter Valid Email
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                            <div className="col-xl-12">
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Label className={style.label}>
                                  Any specific preferences or special requests (
                                  Optional )
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  placeholder="Enter Your Request"
                                  rows={3}
                                  className={style.form_control}
                                />
                              </Form.Group>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>

                    <div className={style.cancel}>
                      <h6 className={style.title}>Cancellation Policy</h6>

                      <p className={style.item1}>
                        <span className={style.head}>Free cancellation:</span>
                        &nbsp; upto 14 days prior to your check-in date, 100% of
                        the booking amount will be refunded as travel credits.
                        (Not applicable on peak dates. Read more details of
                        cancellation policyhere)
                        <Link className="ps-1" href="/Cancellation">
                          Read Full Cancellation Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>

             
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="sticky-top top_10">
                    <div className={style.price_box}>
                      <h6 className={style.head}>Price Breakdown</h6>

                      <ul className={style.list}>
                        {/* <li className={style.item}>
                    <span className={style.heading}>Total Rental</span>
                    <span className={style.price}>₹ {total}</span>
                  </li>  */}
                        {rateArr &&
                          rateArr?.length > 0 &&
                          rateArr.map((el: any, indexx: any) => (
                            <div key={indexx}>
                              {el.rates.map(
                                (rate: any) =>
                                  rate &&
                                  rate.dayBreakdown.map(
                                    (day: any, index: any) => (
                                      <li className={style.item} key={index}>
                                        <span className={style.heading}>
                                          {/* {moment(day.theDate).format("YYYY-MM-DD")}{" "} */}
                                          {hotelObj &&
                                          hotelObj?.hotelType == "Hotels" ? (
                                            <>
                                              {el.name
                                                ? el.name
                                                : hotelObj.name}{" "}
                                              X{/* {el.room} */}
                                              {/* {el.rateArr} */}
                                              <br />
                                              <span
                                                className={`${style.total_day} `}
                                              >
                                                   {moment(day.theDate).format(
                                                  "D MMM,YYYY"
                                                )}{" "}
                                              </span>
                                              {/* <br />
                                        {rate.rateId
                                          ? getRateNameFromRateId(rate.rateId)
                                          : ""} */}
                                            </>
                                          ) : (
                                            <>
                                              {el.name
                                                ? el.name
                                                : hotelObj.name}
                                              {/* {el.room} */}
                                              {/* {el.rateArr} */}
                                              <br />
                                              <span
                                                className={`${style.total_day} ps-1`}
                                              >
                                                {moment(day.theDate).format(
                                                  "D MMM,YYYY"
                                                )}{" "}
                                              </span>
                                              {/* <br />
                                          {rate.rateId
                                            ? getRateNameFromRateId(rate.rateId)
                                            : ""} */}
                                            </>
                                          )}
                                        </span>
                                        <span className={style.price}>
                                          ₹{" "}
                                          {day.dailyRate *
                                            (el.room ? el.room : 1)}
                                        </span>
                                      </li>
                                    )
                                  )
                              )}
                            </div>
                          ))}

                        {/* <li className={style.item}>
                                    <span className={style.heading}>GST </span>
                                    <span className={style.price}>₹ 1,500</span>
                                </li> */}
                      </ul>
                      {discount && discount?.amount > 0 && (
                        <div className={style.amount}>
                          <div className={style.text}>
                            <span className={style.head1}>Discounts </span>
                          </div>
                          <span className={style.discount}>
                            - ₹ {discount?.amount}
                          </span>
                        </div>
                      )}
                      <div className={style.amount}>
                        <div className={style.text}>
                          <span className={style.head1}>SubTotal</span>
                        </div>
                        <span className={style.total}>₹ {subtotalPrice}</span>
                      </div>

                      {gst.tax > 0 && (
                        <div className={style.amount}>
                          <div className={style.text}>
                            <span className={style.head1}>
                              Tax ( {gst.tax}% )
                            </span>
                          </div>
                          <span className={style.total}>+ ₹ {gst.amount}</span>
                        </div>
                      )}

                      {total > 0 && (
                        <div className={`${style.amount} ${style.border_top}`}>
                          <div className={style.text}>
                            <span className={style.total_head1}>
                              Payable Amount
                            </span>
                            <span className={style.span}>
                              (Includes taxes and charges)
                            </span>
                          </div>
                          <span className={style.total_price_amt}>
                            ₹ {total}
                          </span>
                        </div>
                      )}
                      {discount && discount?.amount > 0 && (
                        <p className={style.saving_amt}>
                          <RiDiscountPercentFill /> You are saving ₹{" "}
                          {discount?.amount} by booking directly
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={handleShowCoupons}
                        className={style.view_coupon_buttn}
                      >
                        <MdOutlineDiscount />
                        View Coupons
                      </button>
                      <div className={`${style.check} form-check`}>
                        <input
                          className={`${style.input} form-check-input`}
                          type="checkbox"
                          onChange={(e) => SetPrivacyCheck(e.target.checked)}
                          checked={privacycheck}
                          id="flexCheckDefault"
                        />
                        <label className={`${style.label} form-check-label`}>
                          I have read and accepted the{" "}
                          <Link href="/TermAndCondition" className={style.link}>
                            Terms & Conditions
                          </Link>
                          ,{" "}
                          <Link href="/PrivacyPolicy" className={style.link}>
                            Privacy Policies
                          </Link>
                          , Cancellation Policy and Indemnity Form
                        </label>
                      </div>
                      <div className={style.mobilebotmfixed}>  

                        {
                            total > 0 &&
                              (loading ? (
                                <button
                                  type="button"
                                  className={`${style.btn8} btn`}
                                >
                                  Please Wait...
                                </button>
                              ) : paymentOptions ? (
                                <>
                                  <button
                                    type="submit"
                                    onClick={handleOrder}
                                    className={`${style.btn8}  btn`}
                                  >
                                    Pay Now
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={handlePaymentOptions}
                                    className={`${style.btn8}  btn`}
                                  >
                                    Book Now
                                  </button>
                                </>
                              ))
                        }
                 
                      </div>
                    </div>
                  </div>
                </div>
          </div>
    </div>
    </div>
      
      <Modal
        size="lg"
        show={showCoupons}
        onHide={handleCloseCoupons}
        className={style.coupon_modal}
        centered
      >
        <Modal.Header className={style.header}>
        <div className={style.coupon_gif}>
            <Image src={couponmodal} alt="coupongif" fill></Image>
          </div>
          <Modal.Title className={style.title}>Coupons and Offers</Modal.Title>
          <button onClick={handleCloseCoupons}>
            <IoCloseOutline />
          </button>
        </Modal.Header>

        <Modal.Body className={style.modal_body}>
          <div className="row align-items-center">
            <div className="col-xl-9 col-lg-9">
              <div className={style.coupon_input}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    placeholder="Enter Coupon Code / credit note"
                    className={style.form_control}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3">
              <button
                className={style.apply_buttnn}
                onClick={() => handleApplyCouponFromText()}
              >
                Apply
              </button>
            </div>
          </div>
          <div className={style.coupons_list}>
            <h6>
              Offers Available <span>Prime Discounts</span>{" "}
              <Link href="/TermAndCondition" className={style.terms}>
                T&Cs Apply
              </Link>
            </h6>
            {coupons &&
              coupons?.length > 0 &&
              coupons.map((coupo: any, indexxx: any) => (
                <div className={style.coupon_item} key={indexxx}>
                  <div className="row">
                    <div className="col-xl-9 col-lg-9">
                      <div className={style.left_side}>
                        <h5 className={style.name}>
                          {" "}
                          {coupo?.discountCode}{" "}
                          <span className={style.green_txt}>
                            {" "}
                            Apply to save upto ₹ {coupo?.maxDiscount}
                          </span>
                        </h5>
                        <p className={style.coupon_desc}>
                          {coupo?.description}
                        </p>
                        <p className={style.expiry_date}>
                          This offer expires on{" "}
                          {new Date(coupo?.expiryDate).toDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`col-xl-3 col-lg-3 `}>
                      {discount && discount?.code == coupo?.discountCode ? (
                        <button
                          className={style.apply_buttn}
                          onClick={() => handleRemoveCoupon()}
                        >
                          {discount ? "Remove" : "Apply"}
                        </button>
                      ) : (
                        <button
                          className={style.apply_buttn}
                          onClick={() => handleApplyCoupon(coupo?.discountCode)}
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Modal.Body>
      </Modal>

      {/* <Login loginShow={show1} loginChange={setShow1} /> */}
    </>
  );
}
