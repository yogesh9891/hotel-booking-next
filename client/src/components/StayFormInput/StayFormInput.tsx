"use client";

import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
import style from "@/components/StayFormInput/StayFormInput.module.scss";
import { IoPaperPlane } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import Select from "react-select";
// const options1 = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import moment from "moment";
import { IoBed } from "react-icons/io5";
import { FiPlus, FiMinus } from "react-icons/fi";
// import { getAllHotelApi } from "@/service/hotel.service";
import { getAllLocationApi } from "@/service/home.service";
import { usePathname, useRouter } from "next/navigation";
import { SearchDateInput, useSearch } from "@/context/client-provider";
import { toastError } from "@/utils/toastMessage.ts";
import { customStyles } from "@/utils/constants";

type DateChnageFunction = (a: SearchDateInput) => void;

export default function StayFormInput({handleClosetop,handleopenmodalsearchbar}:any) {
  // SEARCH LOCATION INPUT
  const router = useRouter();
  let [locationSearch, setLocationSearch] = useSearch();
  const [search, setSearch] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const handleFrom = () => {
    setSearch(!search);
  };

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // const delayedSearch = debounce((q: string) => {
  //   handlegetHotel(q);
  // }, 500); // Adjust the delay as needed

  // const handleSeatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setLocation(value);
  //   setLocationSearch({
  //     ...locationSearch,
  //     location: value,
  //   });
  //   delayedSearch(value);
  // };

  const [WhereArr, setWhereArr] = useState<
    { slug: string; _id: string; name: string }[]
  >([]);

  const ref: any = useRef(null);
  useEffect(() => {
    function handleOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearch(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [ref, ref.current]);

  // SELECT CHECKIN DATE

  const [Checkin, setCheckIn] = useState(false);

  const handleToggle = () => {
    setCheckIn(!Checkin);
  };

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

  // SELECT GUEST & ROOMS

  useEffect(() => {
    handlegetLocation();
  }, []);

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

  const handleClick = () => {
   

    if (!locationSearch?.location) {
      toastError("Please Select Location");
      return;
    }

    if (
      new Date(locationSearch?.endDate).getTime() <=
      new Date(locationSearch?.startDate).getTime()
    ) {
      toastError("Please Select Valid date");
      return;
    }
    if (handleClosetop) {
       handleClosetop();
    }
    let route = "Property";
    if (pathname == "/Hotels") {
            route = "Hotels";
    }
    router.push(
      `/${route}?location=${locationSearch?.location}&locationId=${
        locationSearch?.locationId
      }&startDate=${moment(new Date(locationSearch?.startDate)).format(
        "YYYY-MM-DD"
      )}&endDate=${moment(new Date(locationSearch?.endDate)).format(
        "YYYY-MM-DD"
      )}&adult=${locationSearch?.adult}&child=${locationSearch?.child}`
    );

    handleopenmodalsearchbar()

   
  };

  const handlegetLocation = async () => {
    try {
      let { data: res } = await getAllLocationApi("", null);
      if (res.data) {
        // // console.log(res.data,"dfdf")
        setWhereArr(res.data);
      }
    } catch (error) {
      // console.error(error);
    }
  };

  const pathname = usePathname();

  const labelStyle = {
    color: locationSearch?.location ? "black" : "red", // Change "red" to the desired color
  };
  const [toggleinputlist,Settoggleinputlist] = useState(false)

  const handletoggleinputlist = ()=>
  {
    Settoggleinputlist(!toggleinputlist);
  }

  return (
    <>
      <div className={style.stayform}>
        <h6 className={style.stay_head}>
          <IoBed />
          Find Stays
        </h6>

        <div className={style.input_boxes}>
          {/* search location input */}
          <div className={`${style.group} form-group`} onClick={handleFrom}>
            <label className={style.label}>Location </label>
          <div className="p_relative">
          <Select
              styles={customStyles}
              value={{
                label: locationSearch?.location
                  ? locationSearch.location
                  : "Please Select Location",
                value: locationSearch.locationId,
              }}
              options={WhereArr.map((el, index) => {
                return { label: el.name, value: el._id };
              })}
              onChange={(val: any) => {
                setLocationSearch({
                  ...locationSearch,
                  location: val.label,
                  locationId: val.value,
                });
                setLocation(val.label);
              }}
            />
          </div>
            {/* {search ? (
              <ul className={style.list} ref={ref}>
                {WhereArr.map((el, index) => (
                  <li
                    key={index}
                    className={style.item}
                    onClick={(e) => {
                      setLocationSearch({
                        ...locationSearch,
                        location: el.name,
                        locationId: el._id,
                      });
                      setLocation(el.name);
                    }}
                  >
                    {el.name}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )} */}
          </div>

          {/* select check-in input */}
          <div className={`${style.group} form-group`}>
            <div onClick={() => setCheckIn(!Checkin)}>
              <label className={style.label}>Check-In</label>
              <div
                className={`${style.input_group} input-group position-relative`}
              >
                <input
                  type="text"
                  className={`${style.control} form-control`}
                  value={`${moment(new Date(locationSearch.startDate)).format(
                    "ddd, MMM DD"
                  )}`}
                  placeholder="Select Check-In date"
                  readOnly
                />
                <span className={`${style.text} input-group-text`}>
                  <FaRegCalendarAlt />
                </span>
              </div>
            </div>
            {Checkin ? (
              <div className="datepicker1" ref={wrapperRef}>
                <div className="confirm_buttn">
                  <button onClick={handleToggle} className="buttn">
                    Apply
                  </button>
                </div>
                <DateRangePicker
                  onChange={handleSelect}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  minDate={new Date(moment(new Date()).format("YYYY-MM-DD"))}
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

          {/* select check-out input */}
          <div className={`${style.group} form-group`}>
            <label className={style.label}>Check-Out</label>
            <div
              className={`${style.input_group} input-group position-relative`}
              onClick={handleToggle}
            >
              <input
                type="text"
                className={`${style.control} form-control`}
                value={`${moment(new Date(locationSearch.endDate)).format(
                  "ddd, MMM DD"
                )}`}
                placeholder="Select Check-Out date"
                readOnly
              />
              <span className={`${style.text} input-group-text`}>
                <FaRegCalendarAlt />
              </span>
            </div>
          </div>

          {/* select guests and rooms input */}
          <div className={`${style.group} form-group`}>
            <div onClick={() => setGuest(!guest)} className="select_rooms">
              <label className={style.label}>Guests & Rooms </label>
              <input
                type="text"
                className={`${style.control} form-control`}
                value={`${locationSearch.adult} Adult and ${locationSearch.child} Child`}
                readOnly
              />
            </div>
            {guest ? (
              <ul className={`${style.list} category_list3 select_rooms `}>
                {/* <li className={style.data}>
                  <div className={style.info}>
                    <h6 className={style.text}>Rooms</h6>
                    <p className={style.text1}>Select Rooms</p>
                  </div>

                  <div className={style.buttons}>
                    <button
                      className={`${style.btn6} btn`}
                      onClick={() =>
                        setLocationSearch({
                          ...locationSearch,
                          rooms:
                            locationSearch.rooms > 1
                              ? Number(locationSearch.rooms - 1)
                              : 1,
                        })
                      }
                    >
                      <FiMinus />
                    </button>
                    <span className={style.number}>{locationSearch.rooms}</span>
                    <button
                      className={`${style.btn6} btn`}
                      onClick={() =>
                        setLocationSearch({
                          ...locationSearch,
                          rooms: Number(locationSearch.rooms + 1),
                        })
                      }
                    >
                      <FiPlus />
                    </button>
                  </div>
                </li> */}
                <li className={style.data}>
                  <div className={style.info}>
                    <h6 className={style.text}>Adult</h6>
                    <p className={style.text1}>Age 13 years and above</p>
                  </div>

                  <div className={style.buttons}>
                    <button
                      className={`${style.btn6} btn`}
                      onClick={() =>
                        setLocationSearch({
                          ...locationSearch,
                          adult:
                            locationSearch.adult > 1
                              ? Number(locationSearch.adult) - 1
                              : 1,
                        })
                      }
                    >
                      <FiMinus />
                    </button>
                    <span className={style.number}>{locationSearch.adult}</span>
                    <button
                      className={`${style.btn6} btn`}
                      onClick={() =>
                        setLocationSearch({
                          ...locationSearch,
                          adult: Number(locationSearch.adult) + 1,
                        })
                      }
                    >
                      <FiPlus />
                    </button>
                  </div>
                </li>

                <li className={style.data}>
                  <div className={style.info}>
                    <h6 className={style.text}>Children</h6>
                    <p className={style.text1}>Age 12 years and below</p>
                  </div>

                  <div className={style.buttons}>
                    <button
                      className={`${style.btn6} btn`}
                      onClick={() =>
                        setLocationSearch({
                          ...locationSearch,
                          child:
                            locationSearch.child > 1
                              ? Number(locationSearch.child - 1)
                              : 0,
                        })
                      }
                    >
                      <FiMinus />
                    </button>
                    <span className={style.number}>{locationSearch.child}</span>
                    <button
                      className={`${style.btn6} btn`}
                      onClick={() =>
                        setLocationSearch({
                          ...locationSearch,
                          child: Number(locationSearch.child + 1),
                        })
                      }
                    >
                      <FiPlus />
                    </button>
                  </div>
                </li>
                <div className="confirm_buttn">
                  {/* <button onClick={() => setGuest(!guest)} className="buttn">Apply & Search</button> */}
                  <button type="button" onClick={handleClick} className="buttn">
                    Apply & Search
                  </button>
                </div>
              </ul>
            ) : (
              ""
            )}
          </div>

          <button type="button" className={`${style.btn1} btn`} onClick={handleClick}>
            <IoPaperPlane />{" "}
            {pathname == "/Hotels"
              ? "Search Hotels"
              : pathname == "/HotelDetail/"
              ? "Search Hotels"
              : pathname == "/location"
              ? "Search Hotels"
              : pathname == "/Apartments"
              ? "Search Apartments"
              : pathname == "/Apartments"
              ? "Search Apartments"
              : "Search Property"}
          </button>
        </div>
      </div>
    </>
  );
}
