import React from 'react'
import './ProfileTask.css'
import { useLocation } from 'react-router-dom'
import { IN_TASKS, USER_TASKS } from '../utils/consts'
import time from '../assets/timewhite.svg'
import { useSelector } from 'react-redux'

const ProfileTask = () => {
    const location = useLocation()

    const description = useSelector((state) => state.gettask.description)

  return (
    <>
    <div className='user-tasks'>
        <div className='user-tasks-title'>
          <p>Название</p>
          <p><img src={time} />Срок выполнения</p>
        </div>
        <p className='task-info'>
       {description}
        </p>
        <div className='task-with'>
          <p className='with'>{location.pathname === IN_TASKS ? 'Автор:' : 'Выполняют с вами:'}</p>
          <p className='number'>{location.pathname === IN_TASKS ? 'Логин пользователя' : '5'}</p>
        </div>
        <button className='done'>Завершить</button>
      </div>
    </>
  )
}

export default ProfileTask