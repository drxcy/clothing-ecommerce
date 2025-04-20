import React from 'react'
import RiDeleteBin3Line from 'react-icons/ri'

export default function CartContet() {
    const cartProductItems = 
      [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
        { id: 3, name: 'Product 3', price: 300 },
      ]
  return (
    <div>
       {
         cartProductItems.map((product,index) => (
          <div key={index} className='flex py-4 items-start justify-between border-y-2'>
            <div className='flex items-start'>
                <img src={product.img} alt={product.name} className='w-20 h-25 object-cover mr-4 rounded'/>
          
            <div>
               <h3>{product.name}</h3> 
               <p className='text-sm text-gray-500'> Size :{product.size} color : {product.color}</p>
            </div>
              <div className='flex items-center mt-2'>
                <button className='border rounded px-2 py-1 text-xl font-medium'> - </button>
                <span className='mx-4'>{product.quantity}</span>
                <button className='border rounded px-2 py-1 text-xl font-medium'> + </button>
                </div>
            </div>
            
          <div>
            <p className='text-lg font-medium'>Total Price : ${product.price.toLocaleString() * product.quantity}</p>
          <button>
            <RiDeleteBin3Line className="w-5 h-5 "/>
          </button>
          </div>
   </div>
))
}
        
    </div>
  );
}
