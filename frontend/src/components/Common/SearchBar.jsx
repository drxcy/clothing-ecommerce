import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from '../../../redux/slices/productsSlice';



export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
const [isOpen ,setIsOpen] = useState(false);
const dispatch = useDispatch();
const navigate =useNavigate();

const handleSearchToggle = () => {
    setIsOpen(!isOpen);
}

const searchHandler = (e) => {
    e.preventDefault();
   dispatch(setFilters({search :searchTerm}));
   dispatch(fetchProductsByFilters({search :searchTerm}));
   navigate(`/collections/all?search=${searchTerm}`)
    // setSearchTerm('');
    setIsOpen(false);
}

  return (
    <div className= {`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white z-50 h-24" :"w-auto"}`}
         >
         {isOpen ? (
        <form onSubmit={searchHandler} className='relative flex justify-center items-center w-full'>
            <div className="realtive w-1/2">
                <input type="text"
                className='bg-gray-100 py-2 px-4 pl-3 pr-12 rounded-lg focus:outline-none w-full 
                placeholder:text-gray-400'
                 value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  placeholder="Search"/>
                  {/* Search Icons */}
                
                <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-2 text-gray-600 hover:text-gray-800'>
                    <HiMagnifyingGlass className='w-6 h-6'/>
                </button>
            </div> 
            {/* Close Button */}
            <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-2 text-gray-600 hover:text-gray-800'>
            <HiMiniXMark className='w-6 h-6'/>
        </button>
        </form>
    )  :
    (
        <button onClick={handleSearchToggle}>
        <HiMagnifyingGlass className='w-6 h-6'/>
        </button>
    )}</div>
  )
}
