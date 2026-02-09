import React from 'react'
import Todo from './components/Todo'

// html element <div></>
// react elelement <div> => (render) html element div
// component App
// component Todo

function App() {
  return (
    <div className='bg-stone-900 grid py-4 min-h-screen'>
      <Todo/>
    </div>
  )
}

export default App
