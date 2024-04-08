import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Books from './components/Books'
import Login from './components/login'
import Dashboard from './components/Dashboard'
import AddStudent from './components/AddStudent'
import Logout from './components/Logout'
import { useState } from 'react'
import AddBook from './components/AddBook'
import EditBook from './components/EditBook'
import Delete from './components/Delete'
function App() {
  const [role, setRoleProp]=useState('')
  return (
    <BrowserRouter>
    <Navbar role ={role}/>
    <Routes>
      <Route path='/' element={<Home setRoleProp={setRoleProp} />}></Route>
      <Route path='/books' element={<Books role ={role} />}></Route>
      <Route path='/login' element={<Login setRoleProp={setRoleProp} />}></Route>
      <Route path = '/dashboard' element={<Dashboard />}></Route>
      <Route path = '/addstudent' element={<AddStudent />}></Route>
      <Route path = '/logout' element={<Logout setRoleProp={setRoleProp}  />}></Route>
      <Route path ='/addbook' element={<AddBook/>}></Route>
      <Route path ='/book/:id' element={<EditBook/> }></Route>
      <Route path ='/delete/:id' element={<Delete/>}></Route>
    </Routes>
    </BrowserRouter>

  )
}

export default App
