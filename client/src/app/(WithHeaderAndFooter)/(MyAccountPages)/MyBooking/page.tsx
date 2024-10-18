"use client";

import React, { useEffect, useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/(MyAccountPages)/MyBooking/MyBooking.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineLocationOn } from "react-icons/md";
import empty from "@/assets/images/empty.webp";
import { useUserApiHook } from "@/service/user.service";
import { toastError } from "@/utils/toastMessage.ts";
import { generateFilePath } from "@/lib/axios";
import moment from "moment";

export default function page() {
  const { getAllActiveOrdersByUserIdApi } = useUserApiHook();

  const [complete_bookingArr, setComplete_BookingArr] = useState([]);

  const [upcoming_bookingArr, setUpcoming_BookingArr] = useState([]);

  useEffect(() => {
    const getAllBooking: any = async () => {
      try {
        let { data: res } = await getAllActiveOrdersByUserIdApi();
        if (res.data) {
          setComplete_BookingArr(res.data);
        }
        if (res.upcomingBooking) {
          setUpcoming_BookingArr(res.upcomingBooking);
        }
      } catch (error) {
        toastError(error);
      }
    };
    getAllBooking();
  }, []);

  // console.log("complete_bookingArrcomplete_bookingArrcomplete_bookingArr",complete_bookingArr)

  return (
    <>
    <div className={style.booking_sec}>
      <Tabs
        defaultActiveKey="complete"
        id="uncontrolled-tab-example"
        className=" tabs"
        >
        <Tab eventKey="complete" title="Complete">
          {complete_bookingArr && complete_bookingArr?.length > 0 ? (
            complete_bookingArr?.map((el: any, i) => (
              <div className={style.main} key={i}>
                <div className={style.top_sec}>
                  <p className={style.booking}>
                    Booking ID - <span className={style.id}> {el?._id}</span>
                  </p>
                  <p className={style.booking}>
                    Grand Total -{" "}
                    <span className={style.id}>₹ {el?.totalAmount}</span>
                  </p>
                </div>

                <div className={style.card_box}>
                  <div className="row">
                    <div className="col-xl-5 col-lg-6">
                    <div className={style.image}>
                    <Link href={`/PropertyDetail/${el?.hotelObj?.slug}`}>
                      <Image
                        src={generateFilePath(el?.hotelObj?.mainImage)}
                        alt=""
                        fill
                        priority
                        />
                    </Link>
                  </div>

                    </div>
                    <div className="col-xl-7 col-lg-6">
                    <div className={style.main_content}>
                    <div className={style.info}>
                      <Link href={`/PropertyDetail/${el?.hotelObj?.slug}`}>
                        <h6 className={style.heading}>{el?.hotelObj?.name}</h6>
                      </Link>
                      <div className={style.location}>
                        <MdOutlineLocationOn />
                        <p className={style.name}>{el?.hotelObj?.tagline}</p>
                      </div>
                    </div>

                    {/* <div className={style.avail_info}>
                      <p className={style.avail}>{el?.apart}</p>
                      <p className={style.avail}>{el?.bed} Bedrooms </p>
                      <p className={style.avail}>{el?.bath} Bathrooms </p>
                      <p className={style.avail}>{el?.kitchen} Kitchen</p>
                    </div> */}

                    <div className={style.middle_sec}>
                      <div className={style.check}>
                        <span className={style.title}>Check - In</span>
                        <span className={style.day}>
                          {moment(el?.startDate).format("YYYY-MMM-DD")}
                        </span>
                        {/* <span className={style.time}>
                          From {moment(el.startDate).format("YYYY-MMM-DD")}
                        </span> */}
                      </div>
                      <div className={style.check}>
                        <span className={style.title}>Check - Out</span>
                        <span className={style.day}>
                          {moment(el?.endDate).format("YYYY-MMM-DD")}
                        </span>
                        {/* <span className={style.time}>
                          From {el?.checkout_time}
                        </span> */}
                      </div>
                    </div>

                    <div className={style.bottom_sec}>
                      <Link
                        href={`/MyBookingDetails/${el._id}`}
                        className={`${style.btn4} btn`}
                        >
                        View Detail
                      </Link>
                    </div>
                  </div>
                    </div>
                  </div>
                
               
                </div>
              </div>
            ))
          ) : (
            <div className={style.empty_box}>
              <p className={style.desc}>
                You have no Booking planned. Whenever you’re ready for your next
                Booking, we’re here to help you
              </p>
              <div className={style.images}>
                <Image src={empty} alt="" fill />
              </div>

              <div className={style.button}>
                <Link href="/" className={`${style.btn5} btn`}>
                  Explore Wabi Sabi
                </Link>
              </div>
            </div>
          )}
        </Tab>

        <Tab eventKey="upcoming" title="Upcoming">
          {upcoming_bookingArr && upcoming_bookingArr?.length > 0 ? (
            upcoming_bookingArr?.map((el: any, index) => (
              <div className={style.main} key={index}>
                <div className={style.top_sec}>
                  <p className={style.booking}>
                    Booking ID - <span className={style.id}> {el?._id}</span>
                  </p>
                  <p className={style.booking}>
                    Grand Total -{" "}
                    <span className={style.id}>₹ {el?.totalAmount}</span>
                  </p>
                </div>

                <div className={style.card_box}>
                  <div className={style.image}>
                  <Link href={`/PropertyDetail/${el?.hotelObj?.slug}`}>
                      <Image
                        src={generateFilePath(el?.hotelObj?.mainImage)}
                        alt=""
                        fill
                        priority
                      />
                    </Link>
                  </div>

                  <div className={style.main_content}>
                    <div className={style.info}>
                      <Link href={`/PropertyDetail/${el?.hotelObj?.slug}`}>
                        <h6 className={style.heading}>{el?.hotelObj?.name}</h6>
                      </Link>
                      <div className={style.location}>
                        <MdOutlineLocationOn />
                        <p className={style.name}>{el?.location}</p>
                      </div>
                    </div>

                    {/* <div className={style.avail_info}>
                      <p className={style.avail}>{el?.apart}</p>
                      <p className={style.avail}>{el?.bed} Bedrooms </p>
                      <p className={style.avail}>{el?.bath} Bathrooms </p>
                      <p className={style.avail}>{el?.kitchen} Kitchen</p>
                    </div> */}

                    <div className={style.middle_sec}>
                      <div className={style.check}>
                        <span className={style.title}>Check - In</span>
                        <span className={style.day}>
                          {moment(el?.startDate).format("YYYY-MMM-DD")}
                        </span>
                        {/* <span className={style.time}>
                          From {moment(el.startDate).format("YYYY-MMM-DD")}
                        </span> */}
                      </div>
                      <div className={style.check}>
                        <span className={style.title}>Check - Out</span>
                        <span className={style.day}>
                          {moment(el?.endDate).format("YYYY-MMM-DD")}
                        </span>
                        {/* <span className={style.time}>
                          From {el?.checkout_time}
                        </span> */}
                      </div>
                    </div>

                    <div className={style.bottom_sec}>
                      <Link
                        href={`/MyBookingDetails/${el._id}`}
                        className={`${style.btn4} btn`}
                        >
                        View Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={style.empty_box}>
              <p className={style.desc}>
                You have no Booking planned. Whenever you’re ready for your next
                Booking, we’re here to help you
              </p>
              <div className={style.images}>
                <Image src={empty} alt="" fill />
              </div>

              <div className={style.button}>
                <Link href="/" className={`${style.btn5} btn`}>
                  Explore Wabi Sabi
                </Link>
              </div>
            </div>
          )}
        </Tab>
      </Tabs>
    </div>


      </>

  );
}
