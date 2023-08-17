import React, { useEffect } from 'react'
import MobileVisitVisual from '../components/MobileVisitVisual'
import MobileVisitIntroduce from '../components/MobileVisitIntroduce'
import MobileVisitLocation from '../components/MobileVisitLocation'
import MobileVisitPlaceImages from '../components/MobileVisitPlaceImages'
import MobileContactUs from '../components/MobileContactUs'
import { useLocation } from 'react-router'


export default function MobileVisit() {
  const {pathname}= useLocation()
  
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname])

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
