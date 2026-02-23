import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

const [todoList, setTodoList] = useState([]);
const [filter, setFilter] = useState('all');
const [searchQuery, setSearchQuery] = useState('');
const [sortBy, setSortBy] = useState('date');
const [sortDirection, setSortDirection] = useState('desc');

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
let processedTodos = todoList.filter((todo) =>{
  if (filter === 'active') return !todo.isComplete;
  if (filter === 'completed') return todo.isComplete;
  return true;
});

if (searchQuery.trim() !== '') {
  processedTodos = processedTodos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
);
}

const sortedTodos = [...processedTodos].sort((a, b) =>{
let comparison = 0;

 if (sortBy === 'date') {
  comparison = a.id - b.id;
 }
 if (sortBy === 'text'){
  if (a.text < b.text) comparison = -1;
  if (a.text > b.text) comparison = 1;
  else comparison = 0;
 }
 if (sortBy === 'status') {
  if (a.isComplete === b.isComplete) {
    comparison = 0;
  }
  else {
    if (a.isComplete === true && b.isComplete === false) {
      comparison = 1;
    }
    else {
      comparison = -1;
    }
  }
 }
 return sortDirection === 'asc' ? comparison : -comparison;
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

      <div className='my-4'>
        <input 
        type="text" 
        placeholder='Поиск задач'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600'
        />

      </div>

      <div className='flex items-center gap-2 my-4'>
        <select value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
        className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:b order-orange-600'>
        <option value="date">По дате</option>
        <option value="text">По алфавиту</option>
        <option value="status">По статусу</option>
        </select>

        <button
        onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
        className='px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100'
        >
          {sortDirection === 'asc' ? '↑' : '↓'}

        </button>
      </div>

      <div>

        {sortedTodos.map((item, index)=>{
          return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
         })}

      </div>

    </div>
  )
}

export default Todo
