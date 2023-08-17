import React, { useEffect } from 'react'
import MainVisual from '../components/MobileMainVisual'
import VisitSection from '../components/MobileVisitSection'
import CurriculumSection from '../components/MobileCurriculumSection'
import GallerySection from '../components/MobileGallerySection'
import ReviewSection from '../components/MobileReviewSection'
import ContactUs from '../components/MobileContactUs'
import { useLocation } from 'react-router'


export default function MobileHome() {
  const {pathname}= useLocation()

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname])
  return (
    <div>
      <MainVisual />
      <VisitSection />
      <CurriculumSection />
      <GallerySection />
      <ReviewSection />
      <ContactUs />
    </div>
  )
}
