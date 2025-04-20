import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import login from '../assets/login.webp'

export default function Login() {
    const [email ,setEmail] =useState("")
    const [password ,setPassword] =useState("")
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log("user login :",{email ,password})
    }
  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form 
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
            <div className='flex justify-center mb-6'>
                <h2 className='text-xl font-medium'>OPPo</h2>
            </div>
            <h2 className='text-2xl font-bold text-center mb-6'> Hey There </h2>
            <p className='text-center mb-6'>Enter your username and password to login</p>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Enter Your Email</label>
                <input type="email" 
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                className='w-full p-2 border rounded'
                placeholder='Enter Your Email'
                />
            </div>
            <div className='mb-4'>
                <label
                className='block text-sm font-semibold mb-2 '>
                    Enter Your Password
                </label>
                <input 
                type='password'
                className='w-full p-2 border rounded'
                placeholder='Enter Your Password'
                onChange={(e)=> setPassword(e.target.value)}
                />
            </div>
            <button 

            type='submit'
            className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800
            transition'
            >
                Sign In
            </button>
            <p className='mt-6 text-center text-sm'>Don't Have Account  {" "} </p>
            <Link to ='/register' className='text-blue-600'>
            Sign Up
            </Link>
        </form>
        
        </div>
    <div className='hidden md:block w-1/2 bg-gray-800'>
        <div className='h-full flex flex-col justify-center items-center'>
            <img src={login} alt="Login To Account" className='w-full h-[750px] object-cover' />
        </div>
    </div>
    </div>
  )
}
