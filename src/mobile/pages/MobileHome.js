import React from 'react'
import MainVisual from '../components/MobileMainVisual'
import VisitSection from '../components/MobileVisitSection'
import CurriculumSection from '../components/MobileCurriculumSection'
import GallerySection from '../components/MobileGallerySection'
import ReviewSection from '../components/MobileReviewSection'
import ContactUs from '../components/MobileContactUs'

export default function MobileHome() {
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
