import React from "react";
import style from "@/components/AparmentsHotelsCard/ApartmentsHotelsCard.module.scss";
import Image from "next/image";
import Link from "next/link";

import feature1 from "@/assets/images/feature1.webp";
import feature2 from "@/assets/images/feature2.webp";
import feature3 from "@/assets/images/feature3.webp";
import feature4 from "@/assets/images/feature4.webp";
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowForwardOutline } from "react-icons/io5";
import { generateImageUrl } from "@/service/url.service";
import moment from "moment";
import { useSearch } from "@/context/client-provider";


export default function ApartmentsHotelsCard({
  hotelArr,
}: {
  hotelArr: any[];
}) {
  let [locationSearch, setLocationSearch] = useSearch();


  return (
    <div className={style.card_sec}>
      <div className="container">
        <div className="row">
          {hotelArr &&
            hotelArr?.length &&
            hotelArr?.map((hotel, i) => (
              <div className={style.card_box} key={i}>
                <div className={`row ${style.j_c_sb}`}>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                    <div className={style.pics}>
                      <div className={style.image}>
                        <Link   href={`/${hotel?.hotelType == 'Hotels' ? 'HotelDetail' :  'PropertyDetail' }/${hotel.slug}?location=${
                              locationSearch?.location
                            }&locationId=${
                              locationSearch?.locationId
                                ? locationSearch?.locationId
                                : hotel?.location
                            }&startDate=${moment(
                              new Date(locationSearch?.startDate)
                            ).format("YYYY-MM-DD")}&endDate=${moment(
                              new Date(locationSearch?.endDate)
                            ).format("YYYY-MM-DD")}&adult=${
                              locationSearch?.adult
                            }&child=${locationSearch?.child}&rooms=${
                              locationSearch?.rooms
                            }`}>
                          <img
                            src={generateImageUrl(hotel.mainImage)}
                            alt={`${hotel.name}`}
                      
                          />
                        </Link>
                      </div>
                      {/* <div className={style.tag}>1/25</div> */}
                    </div>
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                    <div className={style.main_content}>
                      <div className={style.content}>
                        <div className={style.top_sec}>
                          <div className={style.location}>
                          <Link   href={`/${hotel?.hotelType == 'Hotels' ? 'HotelDetail' :  'PropertyDetail' }/${hotel.slug}?location=${
                              locationSearch?.location
                            }&locationId=${
                              locationSearch?.locationId
                                ? locationSearch?.locationId
                                : hotel?.location
                            }&startDate=${moment(
                              new Date(locationSearch?.startDate)
                            ).format("YYYY-MM-DD")}&endDate=${moment(
                              new Date(locationSearch?.endDate)
                            ).format("YYYY-MM-DD")}&adult=${
                              locationSearch?.adult
                            }&child=${locationSearch?.child}&rooms=${
                              locationSearch?.rooms
                            }`}>
                              <h6 className={style.head}>{hotel.name}</h6>
                            </Link>
                            <p className={style.name}>
                              <FaLocationDot /> {hotel?.locationObj?.name}
                            </p>
                          </div>

                          {/* <div className={style.rate}>
                              <Rating
                                initialValue={el?.rate}
                                size={20}
                                fillColor='rgba(255, 147, 0, 1)'
                                emptyStyle={{ color: 'rgba(206, 204, 209, 1) !important', stroke: 'rgba(206, 204, 209, 1) !important' }}
                                readonly={true}
                                className={style.star}
                              />
                              <span className={style.review}>{el?.review} reviews</span>
                            </div> */}
                        </div>

                        {hotel?.hotelType != "Hotels" ? (
                          <>
                            <div className={style.list}>
                              {/* <span className={style.item}>{el?.place} Apartment</span> */}
                              <span className={style.item}>
                                {hotel?.bedroom} Bedrooms{" "}
                              </span>
                              <span className={style.item}>
                                {hotel?.bathroom} Bathrooms{" "}
                              </span>
                              <span className={style.item}>
                                {hotel?.guest} Guests{" "}
                              </span>
                            </div>
                            <h6 className={style.text}>Amenities</h6>

                            <ul className={style.features}>
                              <li className={style.item1}>
                                <div className={style.image1}>
                                  <Image src={feature1} alt="" fill />
                                </div>
                                <span className={style.text1}>Family</span>
                              </li>
                              <li className={style.item1}>
                                <div className={style.image1}>
                                  <Image src={feature2} alt="" fill />
                                </div>
                                <span className={style.text1}>WiFi </span>
                              </li>
                              <li className={style.item1}>
                                <div className={style.image1}>
                                  <Image src={feature3} alt="" fill />
                                </div>
                                <span className={style.text1}>
                                  Pet Friendly
                                </span>
                              </li>
                              <li className={style.item1}>
                                <div className={style.image1}>
                                  <Image src={feature4} alt="" fill />
                                </div>
                                <span className={style.text1}>Couple</span>
                              </li>
                            </ul>
                          </>
                        ) : (
                          <div className={style.list}>
                            {/* <span className={style.item}>{el?.place} Apartment</span> */}
                            <span className={style.item}>
                              26 Rooms
                            </span>
                            <span className={style.item}>Limited Parking</span>
                            <span className={style.item}>Oishii Cafe</span>
                          </div>
                        )}

                        {/* hotel reviews  */}
                        {hotel?.foodAndDiningArr &&
                          hotel?.foodAndDiningArr?.length > 0 && (
                            <ul className={style.features1}>
                              {hotel?.foodAndDiningArr?.map(
                                (point: any, index: number) => (
                                  <li className={style.hotel_score}>
                                    <span className={style.text2}>
                                      <span className="pe-1">{index + 1}</span>{" "}
                                      {point?.name}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                      </div>

                      <div className={style.bottom_sec}>
                        <div className={style.amount}>
                          <span className={style.span}>Start From</span>
                          <p className={style.price}>
                            ₹ {hotel.price}{" "}
                            <span className={style.color}>/ Night</span>
                          </p>
                        </div>

                        <div className={style.button}>
                          <Link
                            href={`/${hotel?.hotelType == 'Hotels' ? 'HotelDetail' :  'PropertyDetail' }/${hotel.slug}?location=${
                              locationSearch?.location
                            }&locationId=${
                              locationSearch?.locationId
                                ? locationSearch?.locationId
                                : hotel?.location
                            }&startDate=${moment(
                              new Date(locationSearch?.startDate)
                            ).format("YYYY-MM-DD")}&endDate=${moment(
                              new Date(locationSearch?.endDate)
                            ).format("YYYY-MM-DD")}&adult=${
                              locationSearch?.adult
                            }&child=${locationSearch?.child}&rooms=${
                              locationSearch?.rooms
                            }`}
                            className={`${style.btn1} btn`}
                          >
                            See Availability <IoArrowForwardOutline />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
