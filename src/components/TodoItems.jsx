import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'


const TodoItems = ({text, id, isComplete, deleteTodo, toggle, editingId, startEditing, editText, setEditText, updateTodo, cancelEdit}) => {

  if (editingId === id) {
    return (
      <div className='flex items-center my-3 gap-2'>
        <input type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600' 
        autoFocus
        onKeyDown={(e) =>{
          if (e.key === 'Enter') updateTodo(id, editText);
        if (e.key === 'Escape') cancelEdit();
        }}
        />
        <button
        onClick={() => updateTodo(id, editText)}
        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
        >
          Сохранить
        </button>
        <button
        onClick={cancelEdit}
        className='px-4 py-2 bg-gray-400 text-white  rounded-lg hover:bg-gray-500'
        >
          Отмена
        </button>
      </div>
    );
  }

  return (
    <div className='flex items-center my-3 gap-2'>

      <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
      <img src={isComplete ? tick: not_tick} alt="" className='w-7'/>
      <p className='text-slate-700 ml-4 text-[17px]'>{text}</p>
    </div>

    <button
    onClick={() => startEditing(id, text)}
    className='px-2 text-lg hover:text-orange-600'
    title='Редактировать'
    >
     Ред
    </button>

    <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt="" className='w-3.5 cursor-pointer'/>

    </div>
  )
}

export default TodoItems
