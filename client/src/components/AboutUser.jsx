import React, { useState } from 'react'
import './AboutUser.css'
import edit from '../assets/edit.svg'
import { useSelector } from 'react-redux'

const AboutUser = () => {

  const login = useSelector((state) => state.auth.login)
  const fio = useSelector((state) => state.auth.fio)
  const phone = useSelector((state) => state.auth.phone)

  const [isEdit, setIsEdit] = useState(false)

  const editOn = () => setIsEdit(!isEdit)

  return (
    <>
     
    <div className='about'>
    {!isEdit ? <h1>Мои данные <img id='edit' src={edit} onClick={editOn}/></h1> : <h1>Мои данные</h1>}
      <div className='about-user-text'>
        <p className='title'>Логин:</p>
        {!isEdit ? <p className='info'>{login}</p> : <input type='text' value={login} />}
      </div>
      <div className='about-user-text'>
        <p className='title'>ФИО:</p>
        {!isEdit ? <p className='info'>{fio}</p> : <input type='text' value={fio} />}
      </div>
      <div className='about-user-text'>
        <p className='title'>Номер телефона:</p>
        {!isEdit ? <p className='info'>{phone}</p> : <input type='text' value={phone} />}
      </div>
      <div className='about-user-text'>
        <p className='title'>Завершено целей:</p>
        <p className='info'>0</p>
      </div>
      {!isEdit ? 
      <></>
      :
      <div className='buttons'>
        <button className='save'>Сохранить</button>
        <button className='cancel' onClick={editOn}>Отменить</button>
      </div>
      }
    </div>
    </>
  )
}

export default AboutUser