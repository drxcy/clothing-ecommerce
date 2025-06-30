import React from 'react'
import { IoMdClose } from 'react-icons/io';
import CartContet from '../Cart/CartContet';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CartDrawer({toogleDrawer ,drawerOpen}) {
    // const [drawerOpen ,setDrawerOpen] = useState ("false");
    // const toggleDrawer = () => setDrawerOpen(!drawerOpen);
    const navigate = useNavigate();
    const {user,guestId} = useSelector((state)=>state.auth);
    const {cart} =useSelector((state)=>state.cart);
    const userId = user ? user._id:null;
const handleCheckout = () =>
{
    drawerOpen()
    if(!user)
    {
        navigate("/login?redirect=checkout");
    }
    else{
        navigate("/checkout");
    }
}
  return (
    <div className={`fixed top-0 right-1 w-3/4 sm:1/2 md:[30rem] h-full bg-white shadow-lg transform transition-transform
    duration-300 flex flex-col z-50 ${drawerOpen ? "transform-x-0" : "transform-x-full"}`}>
{/* Close Button */}
    <div className='flex justify-end p-4'>
        <button onClick={toogleDrawer} className=''>
            <IoMdClose className='h-6 w-6 text-gray-500'/>
        </button>
    </div>
    {/* Cart Content with Scrollable Area  */}
    <div className='flex-grow overflow-y-auto'>
    <h2> Your Cart</h2>      
      {cart && cart?.products?.length >0 ?( <CartContet cart={cart} userId={userId} guestId={guestId} />):
      (<p className='text-center'>Your Cart is Empty. </p>)}
    </div>
    {/* Component For Card Content */}
   
    {/* Checkout Button Fixed at the Bottom */}
    <div className='p-4 bg-white sticky bottom-0'>
        {cart && cart?.products?.length >0 && (
            <>
             <button onClick={handleCheckout} className='w-full bg-black font-semibold text-white py-3 rounded-md hover:bg-gray-800 transition'>
            Checkout</button>
        <p className='text-sm tracking-tighter  text-gray-400 mt-2 text-center'>Shipping Taxes, and discount codes calculated at Checkout</p>
            </>
        )}
    </div>
    </div>
  )
}
