import React, { useEffect, useState } from 'react'
import './ProfileTask.css'
import { useLocation } from 'react-router-dom'
import { IN_TASKS, USER_TASKS } from '../utils/consts'
import time from '../assets/timewhite.svg'

const ProfileTask = () => {
    const location = useLocation()

    const [data, setData] = useState([])

    const id = localStorage.getItem('id')

    useEffect(() => {
      fetch('http://localhost:5000/gettask')
      .then(data => data.json())
      .then(data => {
        setData(data)
      })
    }, [])


  return (
    <>
     {
      data.map((elem) => {
        return location.pathname === USER_TASKS && elem.user_id == id && elem.status == 'Одобрено' ? 
        <div className='user-tasks'> 
        <div className='user-tasks-title'>
          <p>{elem.name}</p>
          <p><img src={time} />{elem.date.substring(0, 10)}</p>
        </div>
        <p className='task-info'>{elem.description}</p>
        <div className='task-with'>
          <p className='with'>{location.pathname === IN_TASKS ? 'Автор:' : 'Выполняют с вами:'}</p>
          <p className='number'>{location.pathname === IN_TASKS ? 'Логин пользователя' : `${elem.quantity}`}</p>
        </div>
        <button className='done'>Завершить</button>
      </div>
      :
      <></>
      })
    }
    </>
  )
}

export default ProfileTask