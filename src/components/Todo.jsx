import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

//

/*
 * 
 
toDoItem = {
  id: 'string',
  text: 'string',
  isComplete: boolean,
}

 */

const Todo = () => {

const [todoList, setTodoList] = useState([]); // destructuring [todoList, setTodoList]

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

useEffect(()=>{
    
  
  console.log(todoList);


}, [todoList])


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <img className= 'w-8' src={todo_icon} alt="" />
        <h1 className='text-3xl font-semibold'>ToDo List</h1>
      </div>


      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Добавьте свою задачу' />
        <button onClick={add} className='border-none rounded-full bg-red-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Добавить +</button>
      </div>

      <div>

        {/* 
        
          как в реакте рендерить списки?

        { [].map() } js

                 {
          [
            <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>,
            <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>,
            <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
          ]

         }
        
        */}

        { todoList.map((item, index)=> {
          return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
         }) }

{[]}
      </div>

    </div> 
  )
}

export default Todo
