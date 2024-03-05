import React from 'react'
import './Profile.css'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/authSlice'
import ProfileMenu from '../components/ProfileMenu'
import { Outlet } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  return (
    <>
    <div className='profile'>
      <div className='profile-left'>
        <ProfileMenu />
        <button className='exit' onClick={() => {
          dispatch(logOut())
        }} >Выйти</button>
      </div>
      <div className='profile-left'>
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default Profile