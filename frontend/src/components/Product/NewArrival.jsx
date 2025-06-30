import React, { useEffect, useRef, useState } from 'react'
import {FiChevronLeft,FiChevronRight} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function NewArrival() {
    const scrollRef = useRef();
    const [isDragging ,setIsDragging] = useState(false);
    const [startX ,setStartX] = useState(0);
    const [scrollLeft ,setScrollLeft ] = useState(false)

    const [canscrollLeft ,setCanScrollLeft ] = useState(true);
    const [canscrollRight ,setCanScrollRight ] = useState(true);
    const [newArrivals,setNewArrivals] = useState([]);
    useEffect(() =>
    {
        const fetchNewArrivals = async() => {
            try
            {
               const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`); 
            setNewArrivals(response.data);
            }
            catch (error)
            {
                console.error(error);
            }
        }
        fetchNewArrivals();
    },[]
    )

    const handleMouseDown= (e) =>
    {
setIsDragging(true);
setStartX(e.pageX - scrollRef.current.offsetLeft)
setScrollLeft(scrollRef.current.scrollLeft);
    }
    const handleMouseMove = (e) =>
    {
        if(!isDragging)
            return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft =scrollLeft - walk;
    }
    const handleMouseLeave = () =>
    {
        setIsDragging(false)
    }

    const scroll  =(direction) =>
    {
const scrollAmount = direction ===' left' ? -300 :300
scrollRef.current.scrollBy({left :scrollAmount,behaviour : "smooth"})
    }
    // Update Scroll 
    const UpdateScrollButtons = () => 
    {
        const container = scrollRef.current;
        if (container)
        {

            const scrollLeft = container.scrollLeft;
            const scrollRight = container.scrollWidth > scrollLeft - container.clientWidth;
            setCanScrollLeft( scrollLeft > 0);
            setCanScrollRight(scrollRight);
        }
        // console.log({
        //     scrollLeft :container.scrollLeft,
        //     clientWidth :container.clientWidth,
        //     containerScrollWidth :container.scrollWidth,
        // })
    }
    useEffect(() =>
    {
const container =scrollRef.current;
        if (container) {
            container.addEventListener("scroll",UpdateScrollButtons);
            UpdateScrollButtons();
            return ()  => container.removeEventListener("scroll",UpdateScrollButtons)
        }
    },[newArrivals]);

  return (
   <section  className='py-16 px-4 lg:px-0'>
    <div className="container mx-auto text-center mb-10 relative ">
        <h2 className='text-3xl font-bold mb-4'>
            Explore New Arivals
        </h2>
        <p className='text-lg text-gray-600 mb-8'>
    Discover the latest styles straight off the many runway ,freshly added to keep your wardrobe 
    on a cutting edge of fashion
        </p>
        {/* Scroll Buttons */}
        <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
            <button
            onClick={()=>scroll("left")} 
            disabled= {!canscrollLeft}
            className={`p-2  rounded boder ${canscrollLeft ? "bg-white text-black" :"bg-gray-200 text-gray-800 cursor-not-allowed"}`}>
                
                <FiChevronLeft className="text-2xl" />
            </button>
            <button
              onClick={()=>scroll("right")} 
              disabled= {!canscrollRight}
            className={`p-2  rounded boder ${canscrollRight ? "bg-white text-black" :"bg-gray-200 text-gray-800 cursor-not-allowed"}`}>
              
                <FiChevronRight className="text-2xl" />
            </button>
        </div>

    </div>
    {/* Scrollable Content */}
    <div ref={scrollRef} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseLeave}
        onMouseLeave={handleMouseLeave}
    className= {`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "curser-grabbing" :"cursor-grab"}`}>
        {
            newArivalsItems.map((product ) => (
             <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                <img
                src={product.image[0]?.url} 
                alt={product.image[0]?.altText || product.name}
                className='w-full h-[500px] object-cover rounded-lg'
                draggable="false"/>
                <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white
                p-4 rounded-b-lg'>
                    <Link to ={`/product/${product._id}`}
                    className='block'>
                        <h4 className='font-meduim' >
                {product.name}
                        </h4>
                        <p className='mt-1'>{product.price}</p>
                    </Link>
                 </div>    
              </div> 
               

            )
            )
        }

    </div>
   </section>
  )
}
