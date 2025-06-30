import React from 'react'
import RiDeleteBin3Line from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../../redux/slices/cartSlice';

export default function CartContet({cart,userId,guestId}) {
    const dispatch =useDispatch();
    // Handling Adding and substrat to cart
    const handleAddToCart =(productId,delta, quantity,size,color) => 
    {
      const newQuantity = quantity+delta;
      if(newQuantity>=1)
      {
        dispatch(updateCartItemQuantity({
          productId,
          quantity:newQuantity,
          guestId,
          userId,
          size,
          color,
        }));
      }
    }
    const handleRemoveFromCart=(productId,color,size)=>
    {
      dispatch(removeFromCart({productId,guestId,userId,size}))
    }
  return (
    <div>
       {
         cart.products.map((product,index) => (
          <div key={index} className='flex py-4 items-start justify-between border-y-2'>
            <div className='flex items-start'>
                <img src={product.img} alt={product.name} className='w-20 h-25 object-cover mr-4 rounded'/>
          
            <div>
               <h3>{product.name}</h3> 
               <p className='text-sm text-gray-500'> Size :{product.size} color : {product.color}</p>
            </div>
              <div className='flex items-center mt-2'>
                <button className='border rounded px-2 py-1 text-xl font-medium'
                onClick={()=>handleAddToCart(product.productId,-1,product.quantity,product.size,product.color)}> - </button>
                <span className='mx-4'>{product.quantity}</span>
                <button className='border rounded px-2 py-1 text-xl font-medium'  onClick={()=>handleAddToCart(product.productId,1,product.quantity,product.size,product.color)}> + </button>
                </div>
            </div>
            
          <div>
            <p className='text-lg font-medium'>Total Price : ${product.price.toLocaleString() * product.quantity}</p>
          <button onClick={()=>handleRemoveFromCart(product.productId,product.size,product.color)}>
            <RiDeleteBin3Line className="w-5 h-5 "/>
          </button>
          </div>
   </div>
))
}
        
    </div>
  );
}
