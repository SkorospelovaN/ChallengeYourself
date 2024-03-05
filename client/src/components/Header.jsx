import React from 'react'
import './Header.css'
import logo from '../assets/Logo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ADDTASK_ROUTE, ADMIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, TASK_ROUTE } from '../utils/consts'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../redux/authSlice'

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const role = useSelector((state) => state.auth.role)

  const nav = useNavigate()

  const toMain = () => {
    nav(MAIN_ROUTE)
  }

  return (
    <>
    <div className={role === 'USER' ? 'header' : 'admin-header'}>
      <img id="logo" onClick={toMain} src={logo} />
      {role === 'USER' ? 
      <ul className='menu'>
        <Link className={location.pathname === TASK_ROUTE ? 'active-a' : 'menu-a'} to={TASK_ROUTE}>Главная страница</Link>
        <Link className={location.pathname != TASK_ROUTE && location.pathname != ADDTASK_ROUTE ? 'active-a' : 'menu-a'} to={PROFILE_ROUTE}>Профиль</Link>
        <Link className={location.pathname === ADDTASK_ROUTE ? 'active-a' : 'menu-a'}  to={ADDTASK_ROUTE}>Добавить цель</Link>
      </ul> 
      :
      role === 'ADMIN' ?
      <>
      <ul className='menu'>
        <Link className={location.pathname === MAIN_ROUTE ? 'active-a' : 'menu-a'} to={MAIN_ROUTE}>Заявки</Link>
        <Link className={location.pathname === ADMIN_ROUTE ? 'active-a' : 'menu-a'} to={ADMIN_ROUTE}>Все цели</Link>
      </ul> 
      <button className='admin-exit' onClick={() => {
          dispatch(logOut())
        }}>Выйти</button>
      </>
      : 
      <></>}
    </div>
    </>
  )
}

export default Header