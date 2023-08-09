import React, { useEffect } from 'react'
import VisitVisual from '../components/VisitVisual'
import VisitIntroduce from '../components/VisitIntroduce'
import VisitLocation from '../components/VisitLocation'
import ContactUs from '../components/ContactUs'
import VisitPlaceImages from '../components/VisitPlaceImages'
import { useLocation } from 'react-router-dom'
// import usePlaces from '../hooks/usePlaces'

export default function Visit() {
  // const {placeId} = useParams()
  const {pathname}= useLocation()

  // useEffect(()=>{
  //   window.scrollTo(0,0);
  // }, [pathname])

  return (
    <div>
      <VisitVisual />
      <VisitIntroduce />
      <VisitLocation/>
      <VisitPlaceImages />
      <ContactUs />
    </div>
  )
}
