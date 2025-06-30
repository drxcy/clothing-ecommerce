import React from 'react'
import { Link } from 'react-router-dom';
import {HiBars3BottomRight,HiOutlineUser,HiOutlineShoppingBag } from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../Layouts/CartDrawer';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const [drawerOpen ,setDrawerOpen] = useState ("false");
    const [navdrawerOpen ,setNavDrawerOpen] = useState("false");
    const {cart} =useSelector((state)=>state.cart);
    const {user} =useSelector((state)=>state.auth)
    const cartItemCount= cart?.products?.reduce((total,product)=>total + product.quantity,0 || 0)
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
            <Link to="/collections/all?gender=Men" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>
            Men
            </Link>
            <Link to="/collections/all?gender=Women" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>
            Women
            </Link>
            <Link to="/collections/all?category=Top Wear" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>
            Top Wear
            </Link>
            <Link to="/collections/all?category=Bottom Wear" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>
            Bottom Wear
            </Link>
        </div>
        {/* Right - Icons */}
        <div className='flex items-center space-x-3'>
            {user && user.role===admin &&(  <Link to ="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>
            )}
              
            <Link to="/profile" className='text-gray-700 hover:text-black'>
            <HiOutlineUser className='h-6 w-6 text-gray-500' />
            </Link>
            <button onClick ={toggleDrawer}
            to="" className='relative text-gray-700 hover:text-black'>

            <HiOutlineShoppingBag className='h-6 w-6 text-gray-500' />
            {cartItemCount >0 && (
                <span className='absolute -top-1 bg-primary text-xs text-white py-0.5 px-2 rounded-full '>
                {cartItemCount}
            </span>
            )}
            
            </button>
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
            <Link to="/collections/all?gender=Men" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Men
            </Link>
            <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Women
            </Link>
            <Link to="/collections/all?category=Top Wear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Top Wear
            </Link>
            <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Bottom Wear
            </Link>
        </nav>
       
     </div>
    </>

   
  )
}
