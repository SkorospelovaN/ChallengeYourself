import React, { useEffect, useState } from 'react'
import time from '../assets/time.svg'
import './OneTask.css'
import { useLocation } from 'react-router-dom'
import { ADMIN_ROUTE, MAIN_ROUTE, TASK_ROUTE } from '../utils/consts'
import { useDispatch, useSelector } from 'react-redux'
import { deleteThunk, updateThunk } from '../redux/updateSlice'

const OneTask = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const updateState = useSelector((state) => state.update)
  const id = useSelector((state) => state.auth.id)

  const [task_id] = localStorage.getItem('task_id')

  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/gettask')
    .then(data => data.json())
    .then(data => {
      setData(data)
    })
  }, [])

  const [user, setUser] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/getuser')
    .then(user => user.json())
    .then(user => {
      setUser(user)
    })
  }, [])

  useEffect(() => {

  }, [updateState])



  return (
    <>
    {
      data.map((elem) => {
    return (location.pathname === TASK_ROUTE && elem.status == 'Одобрено' && elem.user_id != id) || (location.pathname === MAIN_ROUTE && elem.status == 'Ожидает') || (location.pathname === ADMIN_ROUTE && elem.status == 'Одобрено') ? <div className='task'>
        <div className='task-head'>
            <p>{elem.name}</p>
            <p><img src={time} />{elem.date.substring(0, 10)}</p>
        </div>
        <p>{elem.description}</p>
        <div className='task-user'>
            <p id="normal">Автор:</p>
            {
              user.map((el) => {
                return elem.user_id == el.id ? <p id="bold">{el.login}</p> : <></>
              })
            }
        </div>
        {location.pathname === TASK_ROUTE ? 
          <button>Принять участие</button> :
        location.pathname === MAIN_ROUTE ?  
        <div className='buttons'>
          <input type='hidden' value={elem.id} />
          <button className='accept' onClick={() => {
            localStorage.setItem('task_id', elem.id)
            dispatch(updateThunk({
              id: task_id
          }))
          
          }}>Одобрить</button>
          <button className='decline' onClick={() => {
            localStorage.setItem('task_id', elem.id)
            dispatch(deleteThunk({
              id: task_id
          }))
          }}>Отклонить</button>
        </div>
        :
        <></>
        }      
    </div>
    :
    <></>  
  })
  }
    </>
  )
}

export default OneTask