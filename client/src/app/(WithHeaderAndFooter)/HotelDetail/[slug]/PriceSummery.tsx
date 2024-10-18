import React, { useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/PropertyDetail/[slug]/PropertyDetail.module.scss";
import Link from "next/link";
import moment from "moment";
import { FaRegCalendarAlt } from "react-icons/fa";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { toastError } from "@/utils/toastMessage.ts";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdOutlineDiscount } from "react-icons/md";
import { Form, Modal, ModalHeader } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";

export default function PriceSummery(props: any) {
  const [showcoupon, SetShowcoupon] = useState(false);

  // const [showdatepicker,SetShowDatePicker] = useState(false)

  // const handleshowdatepicker = () =>
  // {
  //   SetShowDatePicker(!showdatepicker)
  // }

  const handlecoupon = () => {
    SetShowcoupon(!showcoupon);
  };

  // for coupon modal box
  const [showCoupons, setShowCoupons] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const handleCloseCoupons = () => setShowCoupons(false);
  const handleShowCoupons = () => {
    setShowCoupons(true);
  };

  const handleApplyCoupon = () => {
    try {
    
      if (!couponCode) {
        toastError("Please Enter Coupon Code");
        return 0
      }
     props.handleApplyCoupon(couponCode);
  } catch (error) {
    console.log(error)
  }
}



  return (
    <>
      <div
        className={`${style.price_box} ${
          props.hotelType == "Hotels" ? style.bg_gradient1 : ""
        }`}
      >
        <div className={`d-flex justify-content-between ${style.headerclose}`}>
          <div className={style.price_text}>
            <p className={style.price}>
              <span className={style.text}>Starting From</span>₹ {props.price}
              <span className={style.day}>/ Night</span>{" "}
              <span className={style.day}>+ Taxes</span>
            </p>
            {/* <p className={style.rooms}>( For 4 Rooms )</p> */}
          </div>

          <p
            onClick={() => props.setmobileshowprice(!props.mobileshowprice)}
            className="d-lg-none"
          >
            <IoMdClose />
          </p>
        </div>

        <div className="user_inof date_area">
          <div className="row gy-3">
            <div className="col-12 col-md-12">
              <div className={`${style.group} form-group`}>
                <div className="row">
                  <div className="col-6">
                    <div onClick={() => props.setCheckIn(!props.Checkin)}>
                      <label className={style.label}>Check-In</label>
                      <div
                        className={`${style.input_group} input-group position-relative`}
                      >
                        <input
                          type="text"
                          className={`${style.control} form-control`}
                          value={`${moment(
                            new Date(props.locationSearch.startDate)
                          ).format("ddd, MMM DD")}`}
                          placeholder="Select Check-In date"
                          readOnly
                          style={{ cursor: "pointer" }}
                        />
                        <span className={`${style.text} input-group-text`}>
                          <FaRegCalendarAlt />
                        </span>
                      </div>
                    </div>
                    {props.Checkin ? (
                      <div className="datepicker1" ref={props.wrapperRef}>
                        <div className="confirm_buttn">
                          <button
                            onClick={props.handleToggle}
                            className="buttn"
                          >
                            Confirm
                          </button>
                        </div>

                        <DateRangePicker
                          onChange={props.handleSelect}
                          moveRangeOnFirstSelection={false}
                          minDate={
                            new Date(moment(new Date()).format("YYYY-MM-DD"))
                          }
                          months={2}
                          ranges={[
                            {
                              startDate: props.locationSearch
                                ? props.locationSearch.startDate
                                : new Date(),
                              endDate: props.locationSearch
                                ? props.locationSearch.endDate
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
                  <div className="col-6">
                    <div onClick={() => props.setCheckIn(!props.Checkin)}>
                      <label className={style.label}>Check-Out</label>
                      <div
                        className={`${style.input_group} input-group position-relative`}
                      >
                        <input
                          type="text"
                          className={`${style.control} form-control`}
                          value={`${moment(
                            new Date(props.locationSearch.endDate)
                          ).format("ddd, MMM DD")}`}
                          placeholder="Select Check-Out date"
                          readOnly
                          style={{ cursor: "pointer" }}
                        />
                        <span className={`${style.text} input-group-text`}>
                          <FaRegCalendarAlt />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${style.group} form-group`}>
                <div
                  onClick={() => props.setGuest(!props.guest)}
                  className={style.input_group}
                >
                  <label className={style.label}>Guests & Rooms </label>
                  <input
                    type="text"
                    className={`${style.control} form-control`}
                    value={`${props.locationSearch.adult} Adult and ${props.locationSearch.child} Child`}
                    readOnly
                    style={{ cursor: "pointer" }}
                  />
                </div>
                {props.guest ? (
                  <ul
                    className={`${style.list} ${style.childressele}`}
                    ref={props.refs}
                  >
                    <li className={`${style.data} ${style.flexrowbetween}`}>
                      <div className={style.info}>
                        <h6 className={`${style.text} ${style.inputchilder}`}>
                          Adult
                        </h6>
                        <p className={style.text1}>Age 13 years and above</p>
                      </div>

                      <div className={style.buttonsplue}>
                        <button
                          className={`${style.btn6} btn`}
                          onClick={() =>
                            props.setLocationSearch({
                              ...props.locationSearch,
                              adult:
                                props.locationSearch.adult > 1
                                  ? Number(props.locationSearch.adult - 1)
                                  : 1,
                              roomsArr: [],
                            })
                          }
                        >
                          <FiMinus />
                        </button>
                        <span className={`${style.number} ${style.btn6}`}>
                          {props.locationSearch.adult}
                        </span>
                        <button
                          className={`${style.btn6} btn`}
                          onClick={() =>
                            props.setLocationSearch({
                              ...props.locationSearch,
                              adult:
                                props.locationSearch.adult > 26
                                  ? Number(props.locationSearch.adult)
                                  : Number(
                                      Number(props.locationSearch.adult) + 1
                                    ),
                              roomsArr: [],
                            })
                          }
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </li>

                    <li className={`${style.data} ${style.flexrowbetween}`}>
                      <div className={style.info}>
                        <h6 className={`${style.text} ${style.inputchilder}`}>
                          Children
                        </h6>
                        <p className={style.text1}>Age 12 years and below</p>
                      </div>

                      <div className={style.buttonsplue}>
                        <button
                          className={`${style.btn6} btn`}
                          onClick={() =>
                            props.setLocationSearch({
                              ...props.locationSearch,
                              child:
                                props.locationSearch.child > 1
                                  ? Number(props.locationSearch.child - 1)
                                  : 0,
                            })
                          }
                        >
                          <FiMinus />
                        </button>
                        <span className={`${style.number} ${style.btn6}`}>
                          {props.locationSearch.child}
                        </span>
                        <button
                          className={`${style.btn6} btn`}
                          onClick={() =>
                            props.setLocationSearch({
                              ...props.locationSearch,
                              child: Number(props.locationSearch.child + 1),
                            })
                          }
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </li>

                    {/* <li className={`${style.data} ${style.flexrowbetween}`}>
                      <div className={style.info}>
                        <h6 className={style.text}>Rooms</h6>
                      </div>

                      <div className={style.buttonsplue}>
                        <button
                          className={`${style.btn6} btn`}
                          onClick={() =>
                            props.etLocationSearch({
                              ...props.locationSearch,
                              rooms:
                                props.locationSearch.rooms > 1
                                  ? Number(props.locationSearch.rooms - 1)
                                  : 1,
                            })
                          }
                        >
                          <FiMinus />
                        </button>
                        <span className={`${style.number} ${style.btn6}`}>
                          {props.locationSearch.rooms}
                        </span>
                        <button
                          className={`${style.btn6} btn`}
                          onClick={() =>
                            props.setLocationSearch({
                              ...props.locationSearch,
                              rooms: Number(props.locationSearch.rooms + 1),
                            })
                          }
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </li> */}
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* <div className="col-12">
                              <div className="date_card position-relative">
                                <div className="heading_date">
                                  <h3>Guest</h3>
                                </div>

                                <div onClick={() => setShowGuest(!showGuest)}>
                                  <input
                                    value={`${adult} Adult and ${child} Child `}
                                    type="text"
                                    placeholder="Guest"
                                    onClick={() => setShowGuest(!showGuest)}
                                  />
                                </div>
                                <div
                                  className="guest-absolute"
                                  style={{ position: "unset" }}
                                >
                                  <ul>
                                    <li>
                                      <div>
                                        <p className="fw-semibold mb-0">
                                          Adults
                                        </p>
                                        <p className="small mb-0">12+</p>
                                      </div>
                                      <div className="quantity-box">
                                        <span
                                          onClick={decrementQuantity}
                                          className="bg"
                                        >
                                          -
                                        </span>
                                        <span>{adult}</span>
                                        <span
                                          onClick={incrementQuantity}
                                          className="bg"
                                        >
                                          +
                                        </span>
                                      </div>
                                    </li>
                                    <li>
                                      <div>
                                        <p className="fw-semibold mb-0">
                                          Children
                                        </p>
                                        <p className="small mb-0">6-11</p>
                                      </div>
                                      <div className="quantity-box">
                                        <span
                                          onClick={decrementChildQuantity}
                                          className="bg"
                                        >
                                          -
                                        </span>
                                        <span>{child}</span>
                                        <span
                                          onClick={incrementChildQuantity}
                                          className="bg"
                                        >
                                          +
                                        </span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="btn_propery m-0">
                                <button
                                  type="button"
                                  onClick={() => getAvailabiltyDetails()}
                                  className="btn btn-brown w-100 py-2"
                                >
                                  Check Availability
                                </button>
                                {message != "" && (
                                  <>
                                    <h3 className="text-success text-center my-3">
                                      {message}
                                    </h3>
                                    {isAvailable && (
                                      // <button
                                      //   type="button"
                                      //   onClick={() => setAvailabilityModal(true)}
                                      //   className="btn btn-brown w-100 py-2"
                                      // >
                                      //   Book Now
                                      // </button>
                                      <>
                                        {disableCheckout ? (
                                          //  <button className="btn btn-brown w-100 py-2" >Booking Stopped</button>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setAvailabilityModal(true)
                                            }
                                            className="btn btn-brown w-100 py-2"
                                          >
                                            Book Now
                                          </button>
                                        ) : (
                                          <>
                                            <Link
                                              className="btn btn-brown w-100 py-2"
                                              to="/Checkout"
                                            >
                                              Checkout
                                            </Link>
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                                <h3></h3>
                              </div>
                            </div> */}
          </div>
        </div>

        {/* coupon */}

        {props?.discount && (
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
        )}
      {
        props?.isAvailable ==true && (
          
        <button
        type="button"
        onClick={handleShowCoupons}
        className={style.view_coupon_buttn}
      >
        <MdOutlineDiscount />
        View Coupons
      </button>
        )
      }

        {props.totalPrice > 0 && (
          <div className={style.amount}>
            <div className={style.text}>
              <span className={style.head1}>Total</span>
              <span className={style.span}>
                Exclusive of all taxes and charges
              </span>
            </div>
            <span className={style.total}>₹ {props.totalPrice}</span>
          </div>
        )}

        <div className={`${style.check} form-check`}>
          <input
            className={`${style.input} form-check-input`}
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={(e)=>props.SetPrivacyCheck(e.target.checked)}
                  checked={props.privacycheck}
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
        {props?.hotelType == "Hotels" ? (
          <>
            {props?.isLoading ? (
              <button type="button" className={`${style.btn8} mt-1 btn mb-3`}>
                Loading ...
              </button>
            ) : props?.isAvailable ? (
              <button
                type="button"
                onClick={() =>
                  !props.locationSearch?.roomsArr ||
                  props.locationSearch?.roomsArr?.length == 0
                    ? toastError("Please Select Room")
                    : props.totalPrice > 0
                    ? props.handleapayment()
                    : props.getAvailabiltyDetails()
                }
                className={`${style.btn8} mt-1 btn mb-3`}
              >
                {props.totalPrice > 0 ? " Book Now " : "Check Availability"}
              </button>
            ) : (
              <button type="button" className={`${style.btn8} mt-1 btn mb-3`}>
                Not Available
              </button>
            )}
          </>
        ) : (
          <>
            {props?.isLoading ? (
              <button type="button" className={`${style.btn8} mt-1 btn mb-3`}>
                Loading ...
              </button>
            ) : props?.isAvailable ? (
              <button
                type="button"
                onClick={() => props.handleapayment()}
                className={`${style.btn8} mt-1 btn mb-3`}
              >
                Book Now
              </button>
            ) : (
              <button type="button" className={`${style.btn8} mt-1 btn mb-3`}>
                Not Available
              </button>
            )}
          </>
        )}
      </div>

      {/* conatct modal */}

      <Modal
        size="lg"
        show={showCoupons}
        onHide={handleCloseCoupons}
        className={style.coupon_modal}
        centered
      >
        <Modal.Header className={style.header}>
          <Modal.Title className={style.title}>Coupons and Offers</Modal.Title>
          <button onClick={handleCloseCoupons}>
            <IoCloseOutline />
          </button>
        </Modal.Header>

        <Modal.Body className={style.modal_body}>
          <div className="row align-items-center gap_15">
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
                onClick={() => handleApplyCoupon()}
              >
                Apply
              </button>
            </div>
          </div>
          <div className={`${style.coupons_list} category_list`}>
            <h6>
              Offers Available <span>Prime Discounts</span>{" "}
              <Link href="/TermsAndCondition" className={style.terms}>
                T&Cs Apply
              </Link>
            </h6>
            {props.coupons &&
              props?.coupons?.length > 0 &&
              props.coupons.map((coupo: any) => (
                <div className={style.coupon_item}>
                  <div className="row gap_15">
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
                      {props?.discount &&
                      props?.discount?.code == coupo?.discountCode ? (
                        <button
                          className={style.apply_buttnn}
                          onClick={() => props.handleRemoveCoupon()}
                        >
                          {props?.discount ? "Remove" : "Apply"}
                        </button>
                      ) : (
                        <button
                          className={style.apply_buttnn}
                          onClick={() =>
                            props.handleApplyCoupon(coupo?.discountCode)
                          }
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
    </>
  );
}
