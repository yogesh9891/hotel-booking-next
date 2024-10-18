"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import style from "@/components/PropertyDetailContent/PropertyDetailContent.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import Select from 'react-select'

// import amenity1 from "@/assets/images/amenity1.webp";
// import amenity2 from "@/assets/images/amenity2.webp";
// import amenity3 from "@/assets/images/amenity3.webp";
// import amenity4 from "@/assets/images/amenity4.webp";
// import amenity5 from "@/assets/images/amenity5.webp";
// import amenity6 from "@/assets/images/amenity6.webp";
// import amenity7 from "@/assets/images/amenity7.webp";
// import amenity8 from "@/assets/images/amenity8.webp";
// import amenity9 from "@/assets/images/amenity9.webp";
// import amenity10 from "@/assets/images/amenity10.webp";
// import amenity11 from "@/assets/images/amenity11.webp";
// import amenity12 from "@/assets/images/amenity12.webp";
// import amenity13 from "@/assets/images/amenity13.webp";
// import amenity14 from "@/assets/images/amenity14.webp";
// import room1 from "@/assets/images/room1.webp";
// import space1 from "@/assets/images/space1.webp";
// import space2 from "@/assets/images/space2.webp";
// import space3 from "@/assets/images/space3.webp";
// import review1 from "@/assets/images/review1.png";
// import review2 from "@/assets/images/review2.png";
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

export default function PropertyDetailContent({
  hotel,
  handelReview,
}: {
  hotel: any;
  handelReview: (total: number, reviewTotal: number) => void;
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
  const [amenitiesArr, setAmenitiesArr] = useState([]);
  const [spaceArr, setSpaceArr] = useState([]);
  // const food = useRef<any>(null);

  const [toggleamenities, setToggleamenities] = useState(8);
  const [contentchnage, setContentchnage] = useState(false);

  const [showcontent, setshowcontent] = useState(false);
  const [listArr, setListArr] = useState([
    {
      item: "About",
      active: true,
      tab: 1,
      refTo: overview,
    },
    {
      item: "Amenities",
      active: false,
      tab: 2,
      refTo: amenities,
    },

    // {
    //     item: 'Food & Dining',
    //     active: false,
    //     tab: 1,
    //     refTo: food,
    // },



  ]);
  const [reviewArr, setReviewArr] = useState([]);
  const [roomsArr, setRoomsArrr] = useState([]);



  const options = [
    { value: 'Room Only', label: 'Room Only' },
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Breakfast and Lunch/Dinner', label: 'Breakfast and Lunch/Dinner' },
    { value: 'Breakfast, Lunch and Dinner', label: 'Breakfast, Lunch and Dinner' }
  ]

  const handelshowmore = () => {
    setToggleamenities(amenitiesArr.length - 1)
    setContentchnage(true)
  }
  const handelless = () => {
    setToggleamenities(8)
    setContentchnage(false)
  }


  useEffect(() => {
    if (hotel && hotel?.hotelType) {
      let templistAr = listArr;
      if (
        hotel?.hotelType == "Home Stays" &&
        !templistAr.some((el) => el.item == "The Space")
      ) {
        templistAr.splice(2, 0, {
          item: "The Space",
          active: false,
          tab: 3,
          refTo: the_space,
        });
      } else if (
        hotel?.hotelType == "Hotels" &&
        !templistAr.some((el) => el.item == "Room Types")
      ) {
        templistAr.splice(2, 0, {
          item: "The Space",
          active: false,
          tab: 3,
          refTo: the_space,
        });
        templistAr.splice(3, 0, {
          item: "Room Types",
          active: false,
          tab: 1,
          refTo: room,
        });
      }
      if (
        hotel?.propertyHighlightsArr &&
        hotel?.propertyHighlightsArr?.length > 0 && !templistAr?.some((el) => el.item == 'Must Know')
      ) {
        templistAr.splice(3, 0, {
          item: "Must Know",
          active: false,
          tab: 3,
          refTo: must_know,
        });
      }

      if (
        hotel?.locationAndSurroundingsArr &&
        hotel?.locationAndSurroundingsArr?.length > 0 && !templistAr?.some((el) => el.item == 'Feel at Home')
      ) {
        templistAr.splice(4, 0, {
          item: "Feel at Home",
          active: false,
          tab: 4,
          refTo: feel_home,
        });
      }

      if (
        hotel?.faqArr &&
        hotel?.faqArr?.length > 0 && !templistAr?.some((el) => el.item == 'FAQ’S')
      ) {
        templistAr.splice(5, 0, {
          item: "FAQ’S",
          active: false,
          tab: 5,
          refTo: faq,
        });
      }


      setListArr(templistAr);
    }



    if (hotel && hotel?._id) {
      handelGetReviews(hotel?._id);
      handelGetRooms(hotel?._id);
    }

    if (hotel && hotel?.roomsArr) {
        setSpaceArr(hotel?.roomsArr.map((el:any) => ({...el,checked:true})))
    }

    if (hotel && hotel?.amenitiesArr) {

      let temmArr: any = hotel?.amenitiesArr.map((amenityCategory: any) => [...amenityCategory?.amenityArr.map((el: any) => el)]);

      console.log(temmArr, "temmArrtemmArrtemmArrtemmArrtemmArrtemmArr")
      setAmenitiesArr(temmArr)

    }
  }, [hotel]);

  const handelGetRooms = async (hotelId: string) => {
    try {
      let { data: res } = await getRoomsApi(`hotelId=${hotelId}`);
      if (res?.data?.length > 0) {
        if (res?.data && res?.data) {
          let temorommArr = res?.data.map((el: any) => {
            el.selectedRoom = 0;
            if (
              locationSearch &&
              locationSearch?.roomsArr?.length > 0 &&
              locationSearch?.roomsArr.findIndex(
                (elx) => elx.roomId == el._id
              ) > -1
            ) {
              let roomObj = locationSearch?.roomsArr.find(
                (elx) => elx.roomId == el._id
              );
              if (roomObj) {
                el.selectedRoom = Number(roomObj.rooms ? roomObj.rooms : 0);
              }
            }
            return el;
          });

          setRoomsArrr(temorommArr);
        }
      } else {
        let templistAr = listArr;

        // if (!templistAr?.some((el) => el.item == "Reviews")) {
        //   templistAr.splice(6, 0, {
        //     item: "Reviews",
        //     active: false,
        //     tab: 7,
        //     refTo: reviews,
        //   });
        // }

        setListArr(templistAr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeRoomArr = (index: number, key: string, value: any) => {
    let tempArr: any = [...roomsArr];
    let remaingGuest = locationSearch.adult;
    console.log(remaingGuest, "totalgGuesttotalgGuest", locationSearch.adult);

    // if (value <= 0) return;

    tempArr.map((roomx: any) => {
      if (remaingGuest > 0) {
        remaingGuest =
          remaingGuest -
          Number(key == "minus" ? roomx.selectedRoom - 1 : roomx.selectedRoom) *
          Number(roomx.guest);
      }
    });

    if (remaingGuest <= 0) {
      return toastError("You cannot add room . Guest is full");
    }

    tempArr[index].selectedRoom = Number(value <= 0 ? 0 : value);

    console.log(tempArr);

    let totalRoom = tempArr.reduce(
      (acc: any, curr: any) => acc + Number(curr.selectedRoom),
      0
    );

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
        rooms: el.selectedRoom,
        rmsPropertyId: el.rmsPropertyId,
        rmsCategoryId: el.rmsCategoryId,
      }));
    if (contextRoomArr?.length > 0) {
      setLocationSearch({
        ...locationSearch,
        roomsArr: contextRoomArr,
      });
    }

    setRoomsArrr(tempArr);
  };

  const handelGetReviews = async (hotelId: string) => {
    try {
      let { data: res } = await getReviewByHotelId(hotelId);
      console.log(res?.data, "res?.datares?.datares?.data");
      if (res?.data && res?.data) {
        setReviewArr(res?.data);
        // handelReview(res?.data?.length, res?.data?.length);
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
  

  // list array handleclick

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
              window.scroll(0, ele.refTo.current.offsetTop + 580);
            }
          else if (windowWidth > 992)
            {
              window.scroll(0, ele.refTo.current.offsetTop + 700);
            }

      //  window.scroll(0, ele.refTo.current.offsetTop + 700);
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
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 2.1,
      spaceBetween: 20,
    },
    1600: {
      slidesPerView: 2.1,
      spaceBetween: 20,
    },
  };

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   initialSlide: 3,
  //   responsive: [
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1
  //       }
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       }
  //     },

  //   ]
  // };

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
      boxShadow: '0 !important',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '2px',
      paddingBottom: '2px',
      zindex: '3',
      borderRadius: '5px',
      backgroundColor: '#fff',
      minWidth: "70%",
      cursor: "pointer",
      borderColor: '#cccccc',

    }),
    option: (base: any) => ({
      ...base,
      cursor: "pointer",
      background: "white",   // this was the mistake (I needed to remove this)
      color: '#000',
      borderColor: '#cccccc',
      ":hover": {
        backgroundColor: "#516b6a",
        color: "#fff",
        borderColor: '#cccccc'
      },
    })

  }


  const handleChangeRoom = (checked:boolean,index:number) => {
    let tempArr:any = [...spaceArr];
    tempArr[index].checked = checked;
    setSpaceArr(tempArr)

  }

  return (
    <div className={style.content}>
      <ul
        className={`${style.list} sticky-top stickyzindex top_80   category_list1`}
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
        <h6 className={style.title}>About</h6>

        <div className={style.list_content}>
          {showcontent == false ? (
            <div className={style.desc}
              dangerouslySetInnerHTML={{
                __html: hotel?.description?.substring(0, 300),
              }}
            ></div>
          ) : (
            <div className={style.desc}
              dangerouslySetInnerHTML={{
                __html: hotel?.description,
              }}
            ></div>
          )}
        </div>

        <p
          className={`${style.readmorebutton} ${style.btn4}`}
          onClick={() => setshowcontent(!showcontent)}
        >
          {" "}
          Show {showcontent == false ? "more" : "less"}
        </p>
      </div>

      {/* this tab only for hotel page */}

      {roomsArr && roomsArr?.length > 0 && (
        <div className={style.body} ref={room}>
          <h6 className={style.title}>Room Types</h6>

          <div className="row">
            {roomsArr &&
              roomsArr?.length &&
              roomsArr?.map((room: any, innd) => (
                <div className="col-lg-6 col-md-6 col-sm-6" key={innd}>
                  <div className={style.main_content}>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <Swiper
                          slidesPerView={1}
                          loop={true}
                          navigation={true}
                          modules={[Navigation]}
                          className={`${style.swiper} mySwiper3`}
                        >
                          <SwiperSlide>
                            <div className={style.image}>
                              <Link href="#">
                                {" "}
                                <Image
                                  src={generateImageUrl(room.mainImage)}
                                  alt=""
                                  fill
                                  priority
                                />
                              </Link>
                            </div>
                          </SwiperSlide>
                          {room?.imagesArr &&
                            room?.imagesArr.map((img: any, imndex: number) => (
                              <SwiperSlide key={imndex}>
                                <div className={style.image}>
                                  <Link href="#">
                                    {" "}
                                    <Image
                                      src={generateImageUrl(room.mainImage)}
                                      alt=""
                                      fill
                                      priority
                                    />
                                  </Link>
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      </div>
                    </div>

                    <div className={style.info_content}>
                      <h6 className={style.heading}> {room.name} </h6>

                      <div className={style.images}>
                        <div className={style.info}>
                          <div className={style.small_image}>
                            <Image src={middle1} alt="" fill />
                          </div>
                          <span className={style.text}>
                            {room?.noOfRoom} Bedroom{" "}
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
                            {room?.guest} Guests{" "}
                          </span>
                        </div>
                      </div>
                      {room.pointDescription &&
                        room.pointDescription?.length > 0 && (
                          <div className={style.feature}>
                            {room.pointDescription &&
                              room.pointDescription?.length &&
                              room.pointDescription?.map(
                                (pointDescription: any, idnn: number) => (
                                  <div className={style.first} key={idnn}>
                                    {/* <IoIosCheckmarkCircleOutline /> */}
                                    <p className={style.span2}>
                                      {pointDescription.name}
                                    </p>
                                  </div>
                                )
                              )}
                          </div>
                        )}

                      <div className={style.bottom_sec}>
                        <div className={style.amount}>
                          {/* <span className={style.span3}>Start From</span>
                          <p className={style.price}>
                             ₹{room?.price}
                            <span className={style.color}>/ Night</span>
                          </p> */}
                          <span className={style.span3}>Room Plan</span>
                          <Select
                            options={options}
                            styles={customStyles}
                            placeholder="Select Price..."
                          />
                        </div>
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
                                      Number(room.selectedRoom - 1)
                                    )
                                  }
                                >
                                  -
                                </span>
                                <input type="text" value={room.selectedRoom} />
                                <span
                                  className={style.plus}
                                  onClick={(e) =>
                                    handleChangeRoomArr(
                                      innd,
                                      "plus",
                                      Number(room.selectedRoom + 1)
                                    )
                                  }
                                >
                                  +
                                </span>
                              </div>
                            ) : (
                              <div className={`${style.button} ${style.col6}`}>
                                <button
                                  type="submit"
                                  onClick={(e) =>
                                    handleChangeRoomArr(
                                      innd,
                                      "selectedRoom",
                                      Number(room.selectedRoom + 1)
                                    )
                                  }
                                  className={`${style.btn1} btn`}
                                >
                                  Add Room
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className={style.body} ref={amenities}>
        <h6 className={style.title}>Amenities</h6>

        <div className="row">
          {hotel &&
            hotel.amenitiesArr &&
            amenitiesArr.slice(0, toggleamenities)?.map(
              (amenity: any, rrtt: number) =>
                amenity?.length > 0 && (
                  <div className="col-lg-3 col-md-3 col-sm-3 col-6" key={rrtt}>
                    <div className={style.icons}>
                      {amenity[0].amenityImage && (
                        <div className={style.image}>
                          <Image
                            src={generateImageUrl(amenity[0].amenityImage)}
                            alt=""
                            fill
                            priority
                          />
                        </div>
                      )}
                      <h6 className={style.head}>{amenity[0].amenityName}</h6>
                    </div>
                  </div>
                )
            )}

          <div className={`mt-5 ${style.togglebuton}`}>
            {contentchnage ? (
              <p className={style.buttonless} onClick={handelless}>
                Show Less
              </p>
            ) : (
              <p className={style.buttonless} onClick={handelshowmore}>
                Show more
              </p>
            )}
          </div>
        </div>
      </div>

      {/* this tab only for hotel page */}

      {/* <div className={style.body} ref={food}>
                <h6 className={style.title}>Food <span className={style.type}>&</span> Dinning</h6>

                <div className={style.food_sec}>
                    <div className={style.food_type}>

                        <div className={style.food}>
                            <div className={style.img1}>
                                <div className={style.image}>
                                    <Image src={Images.veg} alt='' fill />
                                </div>
                            </div>
                            <div className={style.img2}>
                                <div className={style.image}>
                                    <Image src={Images.non_veg} alt='' fill />
                                </div>
                            </div>
                            Both Vegetarian & Non-Vegetarian Food
                        </div>

                        <div className={style.food}>
                            <div className={style.img3}>
                                <div className={style.image}>
                                    <Image src={Images.rupee} alt='' fill />
                                </div>
                            </div>
                            Average meal cost for : ₹350
                        </div>
                    </div>

                    <div className={style.timing}>
                        <div className={style.img3}>
                            <div className={style.image}>
                                <Image src={Images.time} alt='' fill />
                            </div>
                        </div>
                        <p className={style.time}>Breakfast : 8AM - 10:30 AM</p>
                        <p className={style.time}>Lunch : 1PM - 3:30 PM</p>
                        <p className={style.time}>Dinner : 8PM - 11:30 PM</p>
                    </div>
                </div>
            </div> */}
      {hotel && hotel?.roomsArr && +hotel?.roomsArr?.length > 0 && (
        <div className={`${style.body} ${style.swiper_space}`} ref={the_space}>
          <h6 className={style.title_space}>The Space</h6>

          <Swiper
            // slidesPerView={2.5}
            // slidesPerGroup={1}
            // spaceBetween={15}
            loop
            pagination={{ clickable: true }}
            breakpoints={mobilresponsive}
            navigation={true}
            modules={[Navigation,Pagination]}
            className={`${style.swiper}  swiper_space spacee`}
          >
            {hotel?.roomsArr?.length > 0 &&
              spaceArr?.map((ro: any, inde: number) => (
                <SwiperSlide key={inde} className={style.slide}>
                  <div className={style.image1}>
                    {ro.image ? (
                      <Image
                        src={generateImageUrl(ro.image)}
                        alt=""
                        fill
                        priority
                      />
                    ) : (
                      ro.imagesArr?.length > 0 && (
                        <Image
                          src={generateImageUrl(ro.imagesArr[0].imageUrl)}
                          alt=""
                          fill
                          priority
                        />
                      )
                    )}
                  </div>
                  <div className={style.para_content}>
                    <h6 className={style.text}>{ro.name} </h6>
                    <p className={style.para}>
                      {ro.checked ? ro.view.substring(0, 120) + "..." : ro.view}

                      <p
                        className={`mt-2 ${style.readmorebutton}`}
                        onClick={() => handleChangeRoom(!ro.checked, inde)}
                      >
                        Show {ro.checked == true ? "more" : "less"}
                      </p>
                    </p>
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
            <p className={style.review}>
              {reviewArr?.length} reviews {reviewArr?.length}
            </p>
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
                              priority
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
                            <Image src={google} alt="" fill priority />
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
                    className={`${style.collapse} accordion-collapse collapse ${
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
  );
}
