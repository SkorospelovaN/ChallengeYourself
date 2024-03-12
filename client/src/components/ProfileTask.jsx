import React, { useEffect, useState } from 'react'
import './ProfileTask.css'
import { useLocation } from 'react-router-dom'
import { IN_TASKS, USER_TASKS } from '../utils/consts'
import time from '../assets/timewhite.svg'
import { useDispatch } from 'react-redux'
import { finishThunk } from '../redux/updateSlice'

const ProfileTask = () => {
    const location = useLocation()

    const [data, setData] = useState([])

    const dispatch = useDispatch()

    const id = localStorage.getItem('id')

    useEffect(() => {
      fetch('http://localhost:5000/gettask')
      .then(data => data.json())
      .then(data => {
        setData(data)
      })
    }, [])
  
    const [task, setTask] = useState([])
  
    useEffect(() => {
      fetch('http://localhost:5000/getintask')
      .then(task => task.json())
      .then(task => {
        setTask(task)
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
          <p className='with'>Выполняют с вами:</p>
          <p className='number'>{elem.quantity}</p>
        </div>
        {
          user.map((us) => {
            return (us.id == id) ? <button className='done' onClick={() => {
              dispatch(finishThunk({
                user_id: id,
                id: elem.id,
                done: us.done
              }))
            }}>Завершить</button> : <></>
          })
        }
      </div>
      :
      <>
      {
        task.map((t) => {
          return location.pathname === IN_TASKS && elem.user_id != id && elem.status == 'Одобрено' && elem.id == t.task_id && t.user_id == id ? 
        <div className='user-tasks'> 
        <div className='user-tasks-title'>
          <p>{elem.name}</p>
          <p><img src={time} />{elem.date.substring(0, 10)}</p>
        </div>
        <p className='task-info'>{elem.description}</p>
        <div className='task-with'>
          <p className='with'>Автор:</p>
          {
            user.map((el) => {
                return elem.user_id == el.id ? <p className='number'>{el.login}</p> : <></>
              })
          }
        </div>
        {
          user.map((us) => {
            return (us.id == id) ? <button className='done' onClick={() => {
              dispatch(finishThunk({
                user_id: id,
                id: elem.id,
                done: us.done
              }))
            }}>Завершить</button> : <></>
          })
        }
      </div>
      :
      <></>
        })
      }
      </>
      })
    }
    </>
  )
}

export default ProfileTask