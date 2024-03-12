import React, { useEffect, useState } from 'react'
import time from '../assets/time.svg'
import './OneTask.css'
import { useLocation } from 'react-router-dom'
import { ADMIN_ROUTE, MAIN_ROUTE, TASK_ROUTE } from '../utils/consts'
import { useDispatch, useSelector } from 'react-redux'
import { deleteThunk, updateThunk } from '../redux/updateSlice'
import { intaskThunk } from '../redux/intask'

const OneTask = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const updateState = useSelector((state) => state.update)
  const id = useSelector((state) => state.auth.id)
  const role = useSelector((state) => state.auth.role)

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

  const [task, setTask] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/getintask')
    .then(task => task.json())
    .then(task => {
      setTask(task)
    })
  }, [])

  useEffect(() => {

  }, [updateState])

  const intaskState = useSelector((state) => state.intask)

  useEffect(() => {

  }, [intaskState])

  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:5000/getalltasks')
    .then(tasks => tasks.json())
    .then(tasks => {
      setTasks(tasks)
    })
  }, [])




  return (
    <>
    {role === "ADMIN" ?
    <>
        {
          data.map((elem) => {
        return (location.pathname === MAIN_ROUTE && elem.status == 'Ожидает') || (location.pathname === ADMIN_ROUTE && elem.status == 'Одобрено') ? <div className='task'>
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
            {location.pathname === MAIN_ROUTE ?  
            <div className='buttons'>
              <input type='hidden' value={elem.id} />
              <button className='accept' onClick={() => {
                dispatch(updateThunk({
                  id: elem.id
              }))
              }}>Одобрить</button>
              <button className='decline' onClick={() => {
                localStorage.setItem('task_id', elem.id)
                dispatch(deleteThunk({
                  id: elem.id
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
    :
    role === "USER" ? 
    <>
    {
      tasks.map((t) => {
        return (t.user_id != id) ? <div className='task'>
            <div className='task-head'>
                <p>{t.name}</p>
                <p><img src={time} />{t.date.substring(0, 10)}</p>
            </div>
            <p>{t.description}</p>
            <div className='task-user'>
                <p id="normal">Автор:</p>
                {
                  user.map((el) => {
                    return t.user_id == el.id ? <p id="bold">{el.login}</p> : <></>
                  })
                }
            </div> 
              <button onClick={() => {
                dispatch(intaskThunk({
                  task_id: t.id,
                  user_id: id
                }))
              }}>Принять участие</button>
        </div>
        :
        <></>
      })
    }
    </>
  :
  <></>  
  }

    </>
  )
}

export default OneTask