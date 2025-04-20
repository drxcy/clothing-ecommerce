import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserLayout from './components/Layouts/UserLayout'
import Home from './Pages/Home'
import Toaster from "sooner";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import CollectionPage from './Pages/CollectionPage';


export default function App() {
  return (
    <BrowserRouter future= {{ v7_startTransition : true , v7_relativeSplatPath :true}}>
    <Toaster position= 'top-right' />
    <Routes>
      <Route path="/" element={<UserLayout />} />
      <Route index element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/collection/:collection" element={<CollectionPage/>}/>
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
    
    </BrowserRouter>
  )
}
