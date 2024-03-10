import React, { useEffect, useState } from 'react'
import './AddTask.css'
import { taskThunk } from '../redux/taskSlice'
import { useDispatch, useSelector } from 'react-redux'

const AddTask = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [user_id] = useSelector((state) => state.auth.id)

  const taskState = useSelector((state) => state.task)

  useEffect(() => {

  }, [taskState])

  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault();
  }


  return (
    <>
    <form onSubmit={handleSubmit} className='add-task'>
      <h1>Добавить цель</h1>
      <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Введите название...'/>
      <input type='text' value={description} onChange={e => setDescription(e.target.value)} placeholder='Введите описание......'/>
      <input type='date' value={date} onChange={e => setDate(e.target.value)} />
      <input type='hidden' value={user_id} />
      <button onClick={() => {
        dispatch(taskThunk({
          name: name,
          description: description,
          date: date,
          user_id: user_id
        })
        )}}>Отправить</button>
    </form>
    </>
  )
}

export default AddTask