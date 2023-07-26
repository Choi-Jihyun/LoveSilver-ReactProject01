import React from 'react'
// Todo: common.css 어디에 해야하는지 질문 -> App.css에 넣으면 된다.
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Root() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
