import React from 'react'
import MobileVisitVisual from '../components/MobileVisitVisual'
import MobileVisitIntroduce from '../components/MobileVisitIntroduce'
import MobileVisitLocation from '../components/MobileVisitLocation'
import MobileVisitPlaceImages from '../components/MobileVisitPlaceImages'
import MobileContactUs from '../components/MobileContactUs'


export default function MobileVisit() {
  return (
    <div>
      <MobileVisitVisual />
      <MobileVisitIntroduce />
      <MobileVisitLocation/>
      <MobileVisitPlaceImages />
      <MobileContactUs />
    </div>
  )
}
