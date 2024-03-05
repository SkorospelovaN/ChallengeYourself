import React from 'react'
import './ProfileMenu.css'
import { Link, useLocation } from 'react-router-dom'
import { IN_TASKS, PROFILE_ROUTE, USER_TASKS } from '../utils/consts'

const ProfileMenu = () => { 
    const location = useLocation()

  return (
    <ul className='profile-menu'>
        <Link className={location.pathname != USER_TASKS && location.pathname != IN_TASKS ? 'active-link' : 'non-active-link'} to={PROFILE_ROUTE}>Мои данные</Link>
        <Link className={location.pathname === USER_TASKS ? 'active-link' : 'non-active-link'} to={USER_TASKS}>Созданные цели</Link>
        <Link className={location.pathname === IN_TASKS ? 'active-link' : 'non-active-link'} to={IN_TASKS}>Участие в целях</Link>
    </ul>
  )
}

export default ProfileMenu