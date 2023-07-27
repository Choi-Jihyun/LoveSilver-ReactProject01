import React from 'react'
import VisitVisual from '../components/VisitVisual'
import VisitIntroduce from '../components/VisitIntroduce'
import VisitLocation from '../components/VisitLocation'
import ContactUs from '../components/ContactUs'

export default function Visit() {
  return (
    <div>
      <VisitVisual />
      <VisitIntroduce />
      <VisitLocation />

      <ContactUs />
    </div>
  )
}
