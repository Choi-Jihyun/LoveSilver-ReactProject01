import React, { useEffect } from 'react'
import MobileGalleryMain from '../components/MobileGalleryMain'
import { useLocation } from 'react-router'


export default function MobileGallery() {
  const {pathname}= useLocation()
  
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname])
  return (
    <div>
      <MobileGalleryMain />

    </div>
  )
}
