import React from 'react'
import GalleryAddDetailInner from '../components/GalleryAddDetailInner'
import BlackMenuBg from '../components/BlackMenuBg'
import { isMobile } from 'react-device-detect';

export default function GalleryAddDetail() {
  return (
    <div>
      <div style={{display: (isMobile ? 'none':'block')}}>
        <BlackMenuBg/>
      </div>
      <GalleryAddDetailInner />
    </div>
  )
}
