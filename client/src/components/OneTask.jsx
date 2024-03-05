import React from 'react'
import time from '../assets/time.svg'
import './OneTask.css'
import { useLocation } from 'react-router-dom'
import { MAIN_ROUTE, TASK_ROUTE } from '../utils/consts'

const OneTask = () => {
  const location = useLocation()

  return (
    <>
    <div className='task'>
        <div className='task-head'>
            <p>Название</p>
            <p><img src={time} />Срок выполнения</p>
        </div>
        <p>Описание описание описание описание описание  описание описание описание описание описание  описание описание описание описание  описание описание описание описание описание ......</p>
        <div className='task-user'>
            <p id="normal">Автор:</p>
            <p id="bold">Логин пользователя</p>
        </div>
        {location.pathname === TASK_ROUTE ? 
          <button>Принять участие</button> :
        location.pathname === MAIN_ROUTE ?  
        <div className='buttons'>
          <button className='accept'>Одобрить</button>
          <button className='decline'>Отклонить</button>
        </div>
        :
        <></>
        }      
    </div>
    </>
  )
}

export default OneTask