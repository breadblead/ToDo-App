import React from 'react'
import todo_icon from '../assets/todo_icon.png'

const Todo = () => {
  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <img className= 'w-8' src={todo_icon} alt="" />
        <h1 className='text-3xl font-semibold'>ToDo List</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input type="text" placeholder='Добавьте свою задачу' />
        <button>Добавить +</button>
      </div>

    </div>
  )
}

export default Todo
