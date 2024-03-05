import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './Auth.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AUTH_ROUTE, MAIN_ROUTE } from '../utils/consts'
import { regThunk } from '../redux/regSlice'
import { loginThunk } from '../redux/authSlice'


const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === AUTH_ROUTE
    const [login, setLogin] = useState('')
    const [fio, setFio] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const authState = useSelector((state) => state.auth)
    const regState = useSelector((state) => state.reg)
    const dispatch = useDispatch()

    const nav = useNavigate()

    useEffect(() => {

    }, [authState])

    useEffect(() => {
      if (regState.message) {
        nav(MAIN_ROUTE)
      }
    }, [regState])

    const handleSubmit = event => {
      event.preventDefault();
    }

  return (
    <>
    <form onSubmit={handleSubmit} className={isLogin ? 'auth-form' : 'auth-form-log'}>
        <h1>{isLogin ? 'Регистрация' : 'Вход'}</h1>
        {isLogin ? <input type='text' placeholder='Придумайте логин...' value={login} onChange={e => setLogin(e.target.value)}/> : <input type='text' placeholder='Введите логин...' value={login} onChange={e => setLogin(e.target.value)} />}
        {isLogin ? <input type='text' placeholder='Введите ФИО...' value={fio} onChange={e => setFio(e.target.value)}/> : <></>}
        {isLogin ? <input type='tel' placeholder='Введите номер телефона...' value={phone} onChange={e => setPhone(e.target.value)}/> : <></>}
        {isLogin ? <input type='password' placeholder='Придумайте пароль ...' value={password} onChange={e => setPassword(e.target.value)}/> : <input type='password' placeholder='Введите пароль ...' value={password} onChange={e => setPassword(e.target.value)}/>}
        {isLogin ? 
        <button onClick={() => {
          dispatch(regThunk({
            login: login,
            fio: fio,
            phone: phone,
            password: password
          }))
        }} type='submit'>Зарегистрироваться</button> 
        : 
        <button onClick={() => {
          dispatch(loginThunk({
            login: login,
            password: password
          }))
        }} type='submit'>Войти</button>
        }
    </form>
    <div className='links'>
        <p>{isLogin ? 'Уже есть аккаунт?' : 'Впервые у нас?'}</p>
        {isLogin ? <Link to={MAIN_ROUTE}>Войдите</Link> : <Link to={AUTH_ROUTE}>Зарегистрируйтесь</Link>}
    </div>
    </>
  )
}

export default Auth