

import React from 'react'
import Careers_content from '@/app/(WithHeaderAndFooter)/careers/_careers_content/Careers_content'
import CareersBanner from '@/app/(WithHeaderAndFooter)/careers/_CareersBanner/CareersBanner'
import CareersForm from '@/app/(WithHeaderAndFooter)/careers/_CareersForm/CareersForm'

export default function page() {

  return (
<>
<CareersBanner/>
<Careers_content/>
<div id='jointeam'>
<CareersForm/>
</div>
</>
  )
}
