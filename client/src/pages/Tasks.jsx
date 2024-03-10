import React from 'react'
import './Tasks.css'
import OneTask from '../components/OneTask'

const Tasks = () => {
  return (
    <>
    <h1 className='head-text'>Доступные цели</h1>
    <div className='around-tasks'>
      <OneTask />
    </div>
    </>
  )
}

export default Tasks