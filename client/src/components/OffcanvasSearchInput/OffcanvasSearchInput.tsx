"use client"
import React, { useState } from 'react'
import style from './style.module.scss'
import TopOffCanvas from '@/components/TopOffCanvas/TopOffCanvas';
import { IoSearchOutline } from 'react-icons/io5';
import { useSearch } from '@/context/client-provider';
import moment from 'moment';

export default function OffcanvasSearchInput() {


         // handle top offcanvas
         const [showtop, setShowTop] = useState(false);
         const handleClosetop = () => setShowTop(false);
         const handleShowtop = () => setShowTop(true);
  let [locationSearch, setLocationSearch] = useSearch();

  return (
    <>
        <div className="mob_view11 sticky-top top-sticker ">
            <div className="container bg_white">
                <div className="row">
                    <div className="col-xl-5 col-lg-6 col-md-8 mx-auto">
                    {/* {
                                        showtop == false && */}
<div className={style.search_input_buttn}  onClick={handleShowtop} >
                                            <h5 className={style.input}><span className={style.location}>
                                              {locationSearch.location? locationSearch.location : "Select Location"}</span> <span className={style.add_date}>
                                                {`${moment(new Date(locationSearch.startDate)).format(
                    "MMM DD"
                  )}`} - {`${moment(new Date(locationSearch.endDate)).format(
                    "MMM DD"
                  )}`}</span> <span className={style.rooms}>{locationSearch.adult} Guests </span></h5>
                                            <button className={style.search_buttn} >
                                            <IoSearchOutline /></button>
                                        </div>
                                       
                                    {/* } */}
                    </div>
                </div>
            </div>
                                   
                                    </div>

                                    <TopOffCanvas showtop={showtop} handleClosetop={()=>handleClosetop()}/>
    </>
  )
}
