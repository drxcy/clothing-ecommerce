import React from 'react'
import TopBar from '../Layouts/TopBar'
import Navbar from './Navbar'

export default function Header() {
  return (
    <header className='border-b border-gray-200'>
        {/* Top Bar */}
        <TopBar/>
        {/* NavBar */}
        <Navbar/>
        {/* Cart Drawer */}
    </header>
  )
}
