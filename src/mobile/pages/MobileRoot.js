import React from 'react'
import MobileHeader from '../components/MobileHeader'
import { Outlet } from 'react-router-dom'
import MobileFooter from '../components/MobileFooter'

export default function MobileRoot() {
  return (
    <div>
      <MobileHeader />
      <Outlet />
      <MobileFooter />
    </div>
  )
}
