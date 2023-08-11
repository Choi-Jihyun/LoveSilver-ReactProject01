import React from 'react'
import BlackMenuBg from '../components/BlackMenuBg'
import CurriculumSection from '../components/CurriculumSection'

export default function Curriculum() {

  return (
    <div>
      <BlackMenuBg/>
      <div style={{minHeight: '100vh'}}>
        <CurriculumSection />
      </div>
    </div>
  )
}
