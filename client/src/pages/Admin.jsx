import React from 'react'
import OneTask from '../components/OneTask'

const Admin = () => {
  return (
    <>
    <h1 className='head-text'>Заявки</h1>
    <div className='around-tasks'>
      <OneTask />
      <OneTask />
    </div>
    </>
  )
}

export default Admin