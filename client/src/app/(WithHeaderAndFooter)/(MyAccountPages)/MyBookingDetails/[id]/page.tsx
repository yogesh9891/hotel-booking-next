"use client";
import React, { useEffect, useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/(MyAccountPages)/MyBookingDetails/[id]/MyBookingDetails.module.scss";
import Link from "next/link";
import Image from "next/image";
// import { Images } from "@/assets/Utility/Images";
import { MdOutlineLocationOn } from "react-icons/md";
import { toastError } from "@/utils/toastMessage.ts";
import { generateFilePath } from "@/lib/axios";
import moment from "moment";
import { useUserApiHook } from "@/service/user.service";

export default function page({ params }: { params: { id: string } }) {
  const [bookingObj, setbookingObj] = useState<any>();
  const { getOrderByIdApi } = useUserApiHook();

  useEffect(() => {
    if (params && params.id) {
      handleOrderbyIdApi(params.id);
    }
  }, [params]);

  const handleOrderbyIdApi = async (slug: string) => {
    try {
      let { data: res } = await getOrderByIdApi(slug);
      // console.log(res?.data, "hotel obj data");
      if (res.data) {
        setbookingObj(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <div className={style.view_details}>
      <h6 className={style.heading}>Booking Detail</h6>

      <div className={style.main}>
        <div className={style.top_sec}>
          <p className={style.booking}>
            Booking ID - <span className={style.id}> #{bookingObj?._id}</span>
          </p>
          <p className={style.booking}>
            Grand Total -{" "}
            <span className={style.id}>₹ {bookingObj?.totalAmount}</span>
          </p>
        </div>

        <div className={style.card_box}>
        <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className={style.image}>
            <Link href={`/PropertyDetail/${bookingObj?.hotelObj?.slug}`}>
              <Image
                src={generateFilePath(bookingObj?.hotelObj?.mainImage)}
                alt=""
                fill
                priority
              />
            </Link>
          </div>
          </div>
          <div className="col-xl-6 col-lg-6">
          <div className={style.main_content}>
            <div className={style.info}>
              <Link href={`/PropertyDetail/${bookingObj?.hotelObj?.slug}`}>
                <h6 className={style.main_heading}>{bookingObj?.hotelObj?.name}</h6>
              </Link>
              <div className={style.location}>
                <MdOutlineLocationOn />
                <p className={style.name}>{bookingObj?.hotelObj?.tagline}</p>
              </div>
            </div>

            {/* <div className={style.avail_info}>
              <p className={style.avail}>Entire Apartment</p>
              <p className={style.avail}>2 Bedrooms </p>
              <p className={style.avail}>2 Bathrooms </p>
              <p className={style.avail}>1 Kitchen</p>
            </div> */}

            <div className={style.middle_sec}>
              <div className={style.check}>
                <span className={style.title}>Check - In</span>
                <span className={style.day}>
                  {" "}
                  {moment(bookingObj?.startDate).format("YYYY-MMM-DD")}
                </span>
                {/* <span className={style.time}>From 11 : 00</span> */}
              </div>
              <div className={style.check}>
                <span className={style.title}>Check - Out</span>
                <span className={style.day}>
                  {" "}
                  {moment(bookingObj?.endDate).format("YYYY-MMM-DD")}
                </span>
                {/* <span className={style.time}>From 11 : 00</span> */}
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>

      <div className={style.booking_detail}>
        <div className="row">
          <div className="col-xl-6">
          <div className={style.main_detail}>
          <h6 className={style.head}>Booking Detail</h6>
          <div className={style.info}>
          <div className={`row ${style.mb_4} ${style.data}`}>
              <div className="col-xl-5 col-4">
              <span className={style.text}>Full Name</span>
              </div>
              <div className="col-xl-7 col-8">
              <span className={style.name}>{bookingObj?.name}</span>
              </div>
            </div>
          <div className={`row ${style.mb_4} ${style.data}`}>
              <div className="col-xl-5 col-4">
              <span className={style.text}>Email</span>
              </div>
              <div className="col-xl-7 col-8">
              <span className={style.name}>{bookingObj?.email}</span>
              </div>
            </div>
          <div className={`row ${style.mb_4} ${style.data}`}>
              <div className="col-xl-5 col-4">
              <span className={style.text}>Phone</span>
              </div>
              <div className="col-xl-7 col-8">
              <span className={style.name}>{bookingObj?.mobile}</span>
              </div>
            </div>
          <div className={`row ${style.mb_4} ${style.data}`}>
              <div className="col-xl-5 col-4">
              <span className={style.text}>Guest</span>
              </div>
              <div className="col-xl-7 col-8">
              <span className={style.name}>
                {bookingObj?.adult} Adults, {bookingObj?.child} Child
              </span>
              </div>
            </div>
          
          </div>
        </div>
          </div>
          <div className="col-xl-6">
          <div className={style.main_detail}>
          <h6 className={style.head}>Booking Summary</h6>
          <ul className={style.info}>
            <li className={style.data}>
              <span className={style.text}>Status</span>
              <span className={`${style.name} ${style.pending}`}>{bookingObj?.orderStatus}</span>
            </li>
            {bookingObj?.discount && (
              <li className={style.data}>
                <span className={style.text}>Discount</span>
                <span className={`${style.name}`}>-₹ {bookingObj?.discount}</span>
              </li>
            )}

            <li className={style.data}>
              <span className={style.text}>Total </span>
              <span className={style.total_Amount}>₹{bookingObj?.totalAmount}</span>
            </li>
          </ul>

          {/* <div className={style.method}>
            <h6 className={style.head}>Payment Method</h6>
            <div className={style.pay}>
              <div className={style.image}>
                <Image src={Images.card} alt="" fill />
              </div>
              <p className={style.number}>xxxx xxxx xxxx 8596</p>
            </div>
          </div> */}
        </div>
          </div>
        </div>
 

    

      </div>
    </div>
  );
}
