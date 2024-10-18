import React from "react";
import dynamic from "next/dynamic";
// import style from "@/layout/layout.module.scss";
// import StayFormInput from "@/components/StayFormInput/StayFormInput";
import Destination from "@/components/Destination/Destination";
// import ThisSeason from "@/components/ThisSeason/ThisSeason";



const ThisSeason = dynamic(() => import("@/components/ThisSeason/ThisSeason"), {

  ssr: false,
})
const Collection = dynamic(() => import("@/components/Collection/Collection"), {


  ssr: false,
})
const OurGuests = dynamic(() => import("@/components/OurGuests/OurGuests"), {


  ssr: false,
})
const Luxury = dynamic(() => import("@/components/Luxury/Luxury"), {


  ssr: false,
})
const Ecofriendly = dynamic(() => import("@/components/Ecofriendly/Ecofriendly"), {


  ssr: false,
})
const FeatureProperty = dynamic(() => import("@/components/FeatureProperty/FeatureProperty"), {

  ssr: false,
})




// import TourVideo from "@/components/TourVideo/TourVideo";
// import BookingOffers from "@/components/BookingOffers/BookingOffers";
// import OurGuests from "@/components/OurGuests/OurGuests";
// import Luxury from "@/components/Luxury/Luxury";
import {
  getAllBannerApi,
  getCollectionApi,
  getHomePageApi,
  getTestimonialApi,
} from "@/service/home.service";
import Banner from "@/components/Banner/Banner";
import { getAllHotelApi } from "@/service/hotel.service";
// import Partner from "@/components/Partner/Partner";


const getHomeBanner: any = async () => {
  try {

    // console.log("GET BANNER DATA...............")
    let { data: res } = await getAllBannerApi("status=true");
    // console.log(res, "BANNER DATA...............")
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getHomePage: any = async () => {
  try {
    let { data: res } = await getHomePageApi("status=true");
    if (res.data) {
      return {
        locationArr: res.data[0]?.location ? res.data[0]?.location : [],
        propertyArr: res.data[0]?.mostViewProperties
          ? res.data[0]?.mostViewProperties
          : [],
        preminumArr: res.data[0]?.preminumCollection
          ? res.data[0]?.preminumCollection
          : [],
      };
    }
  } catch (error) {
    console.error(error);
    return { locationArr: [], propertyArr: [], preminumArr: [] };
  }
};



const handleCollection = async () => {
  try {
    let { data: res } = await getCollectionApi("status=true");
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const handlegetTestimonial = async () => {
  try {
    let { data: res } = await getTestimonialApi("status=true");
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function page() {
  let { propertyArr, locationArr, preminumArr } = await getHomePage();
  let bannerArr = await getHomeBanner();
  // let hotels = await handlegetHotel();
  let collections = await handleCollection();
  let testimonials = await handlegetTestimonial();

  return (
    <>
      <Banner bannerArr={bannerArr} />
      <Destination locationArr={locationArr} />

      <ThisSeason propertyArr={propertyArr} />

      <Collection collectionArr={collections} />

      <FeatureProperty propertyArr={preminumArr} />

      {/* <BookingOffers propertyArr={preminumArr} /> */}

      {/* <TourVideo /> */}

      <Ecofriendly />

      <OurGuests testimonialArr={testimonials} />

      {/* <Partner /> */}

      <Luxury />
    </>
  );
}
