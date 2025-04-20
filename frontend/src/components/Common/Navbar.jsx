import React from 'react'
import { Link } from 'react-router-dom';
import {HiBars3BottomRight, HiOutLineUser,HiOutlineShoppingBag } from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../Layouts/CartDrawer';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

export default function Navbar() {
    const [drawerOpen ,setDrawerOpen] = useState ("false");
    const [navdrawerOpen ,setNavDrawerOpen] = useState("false");
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);
    const toggleNavDrawer = () => setNavDrawerOpen(!navdrawerOpen);
  return (
    <>
     <nav className='container mx-auto flex justify-between items-center py-4 px-6'>
        {/* Left Logo */}
        <div className=''>
            <Link to="" className='text-2xl font-meduim'>
            Chevous
            </Link>
        </div>
         {/* Center - Navigation Links */}
         <div className='hidden md:flex space-x-5'>
            <Link to="" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>
            Men
            </Link>
            <Link to="" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>
            Women
            </Link>
            <Link to="" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>
            Travel
            </Link>
            <Link to="" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>
            Journey
            </Link>
        </div>
        {/* Right - Icons */}
        <div className='flex items-center space-x-3'>
            <Link to="" className='text-gray-700 hover:text-black'>
            <HiOutLineUser className='h-6 w-6 text-gray-500' />
            </Link>
            <Button onClick ={toggleDrawer}
            to="" className='relative text-gray-700 hover:text-black'>

            <HiOutlineShoppingBag className='h-6 w-6 text-gray-500' />
            <span className='absolute -top-1 bg-primary text-xs text-white py-0.5 px-2 rounded-full '>
                4
            </span>
            </Button>
            {/* Search Bar */} 
            <div className='overflow-hidden'>
            <SearchBar/>
            </div>
           
            <button onClick={toggleNavDrawer} className='md:hidden'>
                <HiBars3BottomRight  className='w-6 h-6 text-gray-700'/>
            </button>
           

        </div>
     </nav>
     <CartDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}/>
     {/* Mobile Navigation  */}
     <div className ={`fixed top-0 left-0 w-3/4 sm:1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform
    duration-300 flex flex-col z-50 ${navdrawerOpen ? "transform-x-0" : "-transform-x-full"}`}>
        <button onClick={toggleNavDrawer} className='flex justify-end p-4'>
            <IoMdClose className='h-6 w-6 text-gray-600'/>
        </button>
     </div>
     <div className='p-4'>
        <h2 className='text-xl font-semibold mb-4'>Menu</h2>
        <nav className='space-y-4'>
  {/* Mobile Menu Items */}
            <Link to="/collections/all" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Men
            </Link>
            <Link to="" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Women
            </Link>
            <Link to="" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Travel
            </Link>
            <Link to="" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Journey
            </Link>
        </nav>
       
     </div>
    </>

   
  )
}
