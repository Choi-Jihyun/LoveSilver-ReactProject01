import React, { useEffect } from 'react'
// import GalleryVisual from '../components/GalleryVisual'
import GalleryMain from '../components/GalleryMain'
import BlackMenuBg from '../components/BlackMenuBg'
import { useLocation } from 'react-router'

export default function Gallery() {
  const {pathname}= useLocation()

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname])

  return (
    <div>
      <BlackMenuBg/>
      <div style={{minHeight: '100vh'}}>
        <GalleryMain />
      </div>
    </div>
  )
}
