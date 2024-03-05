import React from 'react'
import OneTask from '../components/OneTask'

const AdminTasks = () => {
  return (
    <>
    <h1 className='head-text'>Одобренные цели</h1>
    <div className='around-tasks'>
      <OneTask />
    </div>
    </>
  )
}

export default AdminTasks