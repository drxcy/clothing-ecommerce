import React from 'react'
import {Link } from "react-router-dom";
import {TbBrandMetadata} from "react-icons/tb";
import {IoLogoInstagram} from "react-icons/io";
import {RiTwitterXLine} from "react-icons/Ri"

export default function TopBar() {
  return (
    <div className='bg-primary text-white '>
      <div className='container mx-auto flex justify-center items-center px-3 py-3'>
        <div className='hidden md:flex items-center space-x-2'>
          <Link to=''className='hover:text-gray-500'>
    <TbBrandMetadata className='h-5 w-5'/>
          </Link>
          <Link to=''className='hover:text-gray-500'>
    <IoLogoInstagram className='h-5 w-5'/>
          </Link>
          <Link to=''className='hover:text-gray-500'>
    <RiTwitterXLine className='h-3 w-3'/>
          </Link>
        </div>
        <div className='text-sm text-center flex-grow'>
          <span>We will ship worldwide E-Commerce. All rights reserved.</span>
        </div>
        <div className='text-sm hidden md:block'>
          <Link to="">
          <span>+232232323</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
