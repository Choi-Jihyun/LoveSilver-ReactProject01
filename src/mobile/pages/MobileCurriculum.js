import React, { useEffect } from 'react'
import CurriculumSection from '../components/MobileCurriculumSection'
import { useLocation } from 'react-router'



export default function MobileCurriculum() {
  const {pathname}= useLocation()

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname])
  
  return (
    <div>
      <CurriculumSection/>
    </div>
  )
}
