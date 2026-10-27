import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import FrontPage from './components/FrontPage'

const App = () => {
  return (
    <div className='text-5xl'>
      <Navbar/>

      <Routes>
        <Route path='/' element={<FrontPage/>}/>
      </Routes>
    </div>
  )
}

export default App