import React, { useEffect, useState } from 'react'
import {FaFilter } from 'react-icons/fa'
import FilterSidebar from '../components/Product/FilterSidebar';
import { useRef } from 'react';
import SortOption from '../components/Product/SortOption';
import ProductGrid from '../components/Product/ProductGrid';

export default function CollectionPage() {
    const [products,setProducts] = useState([]);
    const SidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => 
        {
            setIsSidebarOpen(!isSidebarOpen)
        } 
        const handleClickOutside = () =>
        {
            // Close Sidebar if Clicked Outside
            if(SidebarRef.current && !SidebarRef.current.contains(e.target))
            {
                setIsSidebarOpen(false)
            }

        }
        useEffect (() =>
        {
                document.addEventListener("mousedown",handleClickOutside)
                // Clean EventListner 
                document.removeEventListener("mousedown",handleClickOutside)
        })
    useEffect (() =>
    {
        const fetchProducts = []
    })
  return (
    <div className='flex flex-col lg:flex-row'>
        {/* Mobile Filter Button */}
        <button  
        onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'> 
            <FaFilter className='mr-2' />
        </button>
        {/* Filter Sidebar */}
         <div ref={SidebarRef} className={`${isSidebarOpen ? "translate-x-0": "-translate-x-full"} fixed inset-y-0 z-50 
         left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 
         lg:static lg:traslate-x-0 `}>
            <FilterSidebar/>
         </div>
         <div className='flex-grow p-4'>
            <h2 className='text-2xl uppercase mb-4'>All Collection </h2>
            {/* Sort Option */}
            <SortOption/>
            {/* Product Grid */}
            <ProductGrid products={products}/>
         </div>

    </div>
  )
}
