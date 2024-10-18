import React from 'react'
import About_Banner from '@/app/(WithHeaderAndFooter)/AboutUs/_AboutUsComponents/_About_Banner/About_Banner';
import Our_Story from '@/app/(WithHeaderAndFooter)/AboutUs/_AboutUsComponents/_OurStory/Our_Story';
import Our_Founders from '@/app/(WithHeaderAndFooter)/AboutUs/_AboutUsComponents/_Our_Founders/Our_Founders';
import Our_Journey from '@/app/(WithHeaderAndFooter)/AboutUs/_AboutUsComponents/OurJourney/Our_Journey';

export default function page() {

  return (

    <>
      <About_Banner />


      <Our_Story />

    <Our_Journey/>

    <Our_Founders/>
    </>
  )
}
