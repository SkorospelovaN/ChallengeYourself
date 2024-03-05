import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import './index.css'

const MainPage = () => {
  return (
    <>
    <div className='page'>
      <Header />
      <Outlet />
    </div>
    </>
  )
}

export default MainPage