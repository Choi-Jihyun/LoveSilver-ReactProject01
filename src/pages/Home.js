import React from 'react'
import MainVisual from '../components/MainVisual'
import VisitSection from '../components/VisitSection'
import CurriculumSection from '../components/CurriculumSection'
import GallerySection from '../components/GallerySection'
import ReviewSection from '../components/ReviewSection'
import ContactUs from '../components/ContactUs'

export default function Home() {
  return (
    <div>
      <MainVisual/>
      <VisitSection />
      <CurriculumSection />
      <GallerySection />
      <ReviewSection />
      <ContactUs />
    </div>
  )
}
