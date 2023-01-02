import React, { useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import  Login  from './pages/Login' 
import  Todo  from './pages/Todo'


export const App = () => {



  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
        <Route index element={<Login></Login>}></Route>
        <Route path='/mytodos' element={<Todo></Todo>}></Route>
        </Route>
      </Routes>
    </div>
  )
}
