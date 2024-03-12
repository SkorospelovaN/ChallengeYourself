import React, { useEffect, useState } from 'react'
import './AboutUser.css'
import edit from '../assets/edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateuserThunk } from '../redux/authSlice'

const AboutUser = () => {

  const id = localStorage.getItem('id')
  const dispatch = useDispatch()

  const [login, setLogin] = useState(localStorage.getItem('login'))
  const [fio, setFio] = useState(localStorage.getItem('fio'))
  const [phone, setPhone] = useState(localStorage.getItem('phone'))

  const [isEdit, setIsEdit] = useState(false)

  const editOn = () => setIsEdit(!isEdit)

  const [user, setUser] = useState([])

    useEffect(() => {
      fetch('http://localhost:5000/getuser')
      .then(user => user.json())
      .then(user => {
        setUser(user)
      })
    }, [])


  return (
    <>
     
    <div className='about'>
      <input type='hidden' value={id}/>
    {!isEdit ? <h1>Мои данные <img id='edit' src={edit} onClick={editOn}/></h1> : <h1>Мои данные</h1>}
      <div className='about-user-text'>
        <p className='title'>Логин:</p>
        {!isEdit ? <p className='info'>{login}</p> : <input type='text' value={login} onChange={e => setLogin(e.target.value)} />}
      </div>
      <div className='about-user-text'>
        <p className='title'>ФИО:</p>
        {!isEdit ? <p className='info'>{fio}</p> : <input type='text' value={fio} onChange={e => setFio(e.target.value)} />}
      </div>
      <div className='about-user-text'>
        <p className='title'>Номер телефона:</p>
        {!isEdit ? <p className='info'>{phone}</p> : <input type='tel' value={phone} onChange={e => setPhone(e.target.value)} />}
      </div>
      <div className='about-user-text'>
        <p className='title'>Завершено целей:</p>
        {
          user.map((us) => {
            return (us.id == id) ? <p className='info'>{us.done}</p> : <></>
          })
        }
      </div>
      {!isEdit ? 
      <></>
      :
      <div className='buttons'>
        <button className='save' onClick={() => {
          dispatch(updateuserThunk({
            id: id,
            login: login,
            fio: fio,
            phone: phone
          }))
          localStorage.setItem('login', login)
          localStorage.setItem('fio', fio)
          localStorage.setItem('phone', phone)
        }}>Сохранить</button>
        <button className='cancel' onClick={editOn}>Отменить</button>
      </div>
      }
    </div>
    </>
  )
}

export default AboutUser