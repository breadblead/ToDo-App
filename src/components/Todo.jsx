import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

const [todoList, setTodoList] = useState([]);
const [filter, setFilter] = useState('all');

const inputRef = useRef();

const add = ()=> {
 const inputText = inputRef.current.value.trim();

 if (inputText === "") {
    return null;
 }

 const newTodo = {
    id: Date.now(),
    text: inputText,
    isComplete: false,
 }
 setTodoList((prev)=> [...prev, newTodo]);
 inputRef.current.value = '';
 
}

const deleteTodo = (id)=> {
    setTodoList((prvTodos)=>{
       return prvTodos.filter((todo) => todo.id !== id)
    })
}

const toggle = (id)=>{
setTodoList((prevTodos)=>{
    return prevTodos.map((todo)=>{
        if(todo.id === id){
           return {...todo, isComplete: !todo.isComplete} 
        }
        return todo;
    })
})

}
const filteredTodos = todoList.filter((todo) =>{
  if (filter === 'active') return !todo.isComplete;
  if (filter === 'completed') return todo.isComplete;
  return true;
});

useEffect(()=>{
    console.log(todoList);
},[todoList])


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <img className= 'w-8' src={todo_icon} alt="" />
        <h1 className='text-3xl font-semibold'>ToDo List</h1>
      </div>


      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Добавьте свою задачу' />
        <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Добавить +</button>
      </div>

      <div className='flex gap-2 my-4'>
        <button onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
           Все
          </button>
          <button onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded ${filter === 'active' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
           Активные
          </button>
          <button onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
           Выполненные 
          </button>

      </div>

      <div>

        {filteredTodos.map((item, index)=>{
          return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
         })}

      </div>

    </div>
  )
}

export default Todo
