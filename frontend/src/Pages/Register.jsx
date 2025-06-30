import React from 'react'
import { useState } from 'react'
import register from '../assets/register.webp'
import {registerUser} from "../redux/slices/authSlice.js";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { mergeCart } from '../../redux/slices/cartSlice.js';
import { loginUser } from '../../redux/slices/authSlice.js';
 const dispatch = useDispatch();
    const navigate =useNavigate();
    const location = useLocation();
    const {user,guestId,loading} = useSelector((state)=> state.auth);
    const {cart} = useSelector((state)=>state.cart);
    // Get redirect parameter and check if its checkout or something
    const redirect = new URLSearchParams(location.search).get("redirect") | "/";
    const isCheckoutRedirect = redirect.includes("checkout");
    useEffect(() =>
    {
        if(user)
        {
            if(cart?.products.length > 0 && guestId)
                {
                dispatch(mergeCart({guestId,user})).then(()=>
                {
                    navigate(isCheckoutRedirect ? "/checkout" :"/");
                });
        }
        else {
            navigate(isCheckoutRedirect ? "/checkout" :"/");
        }
    }
    },[user,guestId,cart,navigate,isCheckoutRedirect,dispatch]);
    const handleSubmit = (e) =>
    {
        e.preventDefault();
      dispatch(registerUser({name,email,password}));
    }
export default function Register() {
    const [name ,setName] =useState("")
    const [password ,setPassword] =useState("")
    const [email ,setEmail] = useState("")
    const dispatch = useDispatch();

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        dispatch(registerUser({name,email,password}));
    }
  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form onSubmit={handleSubmit}
        className='w-full max-w-md bg-white rounded shadow-sm p-8 border'
        >
            <div className='flex justify-center mb-6'>
                <h2 className='text-xl font-meduim'>Company </h2>
            </div>
            <h2 className='text-2xl font-bold text-center mb-6'>Hey There !!</h2>
            <p className='text-center mb-6'>Enter your username and password to Register</p>
            <div className='mb-4'>
                <label 
                className='block text-sm font-semibold mb-2'
                > Enter Your Name</label>
                <input type="text" 
                placeholder='Enter Your Name'
                onChange={(e)=>setName(e.target.value)}
                className='w-full p-2 border rounded'
                value={name}
                />
            </div>
            <div className='mb-4'>
                <label 
                className='block text-sm font-semibold mb-2'
                > Enter Your Email</label>
                <input type="text" 
                placeholder='Enter Your Email'
                onChange={(e)=>setEmail(e.target.value)}
                className='w-full p-2 border rounded'
                value={email}
                />
            </div>
            <div className='mb-4'>
                <label 
                className='block text-sm font-semibold mb-2'
                > Enter Your Password</label>
                <input type="text" 
                placeholder='Enter Your Password'
                onChange={(e)=>setPassword(e.target.value)}
                className='w-full p-2 border rounded'
                value={password}
                />
            </div>
            <button 

        type='submit'
        className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800
            transition'>
               {loading?"loading": "Sign Up"}
            </button>
<p className='mt-6 text-center text-sm'>You Have Account  {" "} </p>
<Link to ={`/login?redirect=${encodeURIComponent}`} className='text-blue-600'>
Login
</Link>

        </form>
        
        </div>
        <div className='hidden md:block w-1/2 bg-gray-800'>
               <div className='h-full flex flex-col justify-center items-center'>
                   <img src={register} alt="Register to an account" className='w-full h-[750px] object-cover' />
               </div>
           </div> 

    </div>
  )
}
