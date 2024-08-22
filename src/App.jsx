import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import { SimpleForm } from './Containers'

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' exact element={<SimpleForm />}/>
      </Routes>
    </>
  )
}

export default App;
