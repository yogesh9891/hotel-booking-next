
import React from "react";
// import PartnerFaq from "@/app/(WithHeaderAndFooter)/partnerwithus/PartnerFaq/PartnerFaq";
import JoinHands from "@/app/(WithHeaderAndFooter)/partnerwithus/JoinHands/JoinHands";
import WhatExpect from "@/app/(WithHeaderAndFooter)/partnerwithus/whatexpect/WhatExpect";
import WhatYouExpect from "@/app/(WithHeaderAndFooter)/partnerwithus/whatyouexpect/WhatYouExpect";
import ListPropertyForm from "@/app/(WithHeaderAndFooter)/partnerwithus/_ListYourPropertyForm/ListPropertyForm"
import PartnerBanner from "@/app/(WithHeaderAndFooter)/partnerwithus/_PartnerBanner/PartnerBanner";

export default function page() {


  return (
    <>
   <PartnerBanner/>
      <JoinHands/>
      <WhatExpect/>
      <WhatYouExpect/>

    <ListPropertyForm/>

 {/* <PartnerFaq/> */}
    </>
  );
}
