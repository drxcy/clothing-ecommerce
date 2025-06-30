import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails, updateProduct } from '../../../redux/slices/productsSlice';


export default function EditProductPage() {
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {selectedProduct,loading,error} =useSelector((state)=>state.products)
    const [productData ,setProductData] = useState({
        name:"",
        description:"",
        price:0,
        countInStock :0,
        sku :"",
        category :"",
        brand :"",
        sizes :[],
        colors :[],
        collections:"",
        material :"",
        gender:"",
        images: [],
    })
    const [uploading,setUploading]=useState(false); //Image uploading state
    useEffect(()=>
    {
        if(id)
        {
            dispatch(fetchProductDetails(id))
        }
    },[dispatch,id]);
    useEffect(()=>
    {
        setProductData(selectedProduct);
    },[selectedProduct]);
    const handleChange =(e) =>
    {
        const {name,value} = e.target.value;
        setProductData ((prevData) => ({...prevData, [name]:value}));
    }
    const handleImageUpload = async(e) =>
    {
        const file = e.target.files[0];
        const formData= new FormData();
        formData.append("image",file);
        try {
            setUploading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,formData,
                {
                    headers :{ "Content-Type":"multipart/form-data" }
                }
            );
            setProductData((prevData)=>(
            {
                ...prevData,
                images:[...prevData.images,{url:data.imageUrl,altText:""}],
            }));
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false)
        }
    }
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        dispatch(updateProduct({id,productData}));
        navigate("/admin/products");   
    }
    if(loading) return <p>Loading</p>
    if(error) return <p>Error :{error}</p>
  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
        <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
        <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Product Name </label>
                    <input type="text" name='name' value={productData.name} 
                    className="w-full border border-gray-300 rounded-md p-2" 
                    onChange={handleChange}/>
            </div>
             {/* Description */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Product Description </label>
                    <textarea type="text" name='description' value={productData.description} 
                    className="w-full border border-gray-300 rounded-md p-2" 
                    onChange={handleChange}
                    rows={4}
                    required
                    />
            </div>
            {/*  Price */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Product Price </label>
                    <input type="number" name='price' value={productData.price} 
                    className="w-full border border-gray-300 rounded-md p-2" 
                    onChange={handleChange}/>
            </div>
            {/* Count In Stock */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Product Count in Stock </label>
                    <input type="number" name='countInStock' value={productData.countInStock} 
                    className="w-full border border-gray-300 rounded-md p-2" 
                    onChange={handleChange}/>
            </div>
            {/*  SKU */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Product SKU </label>
                    <input type="text" name='sku' value={productData.sku} 
                    className="w-full border border-gray-300 rounded-md p-2" 
                    onChange={handleChange}/>
            </div>
            {/*  Sizes */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Product Size (Comma - Seperator) </label>
                    <input type="text" name='sizes' value={productData.sizes.join(",")} 
                    className="w-full border border-gray-300 rounded-md p-2" 
                    onChange={(e)=>
                        setProductData({
                            ...productData,
                            sizes : e.target.value.split(",").map((size) =>size.trim)
                        })
                    }/>
            </div>
            {/*  Colors*/}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Product Colors (Comma - Seperator) </label>
                    <input type="text" name='colors' value={productData.colors.join(",")} 
                    className="w-full border border-gray-300 rounded-md p-2" 
                    onChange={(e)=>
                        setProductData({
                            ...productData,
                            colors : e.target.value.split(",").map((color) =>color.trim)
                        })
                    }/>
            </div>
             {/*  Images */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Upload Image </label>
                    <input type="file" 
                    onChange={handleImageUpload}/>
                    {uploading && <p>Uploading Images..</p>}
                    <div className='flex gap-4 mt-4'>
                        {productData.images.map((image,index) =>
                        (
                            <div key={index}>
                               <img src={image.url} alt={image.altText || "Product Image"}
                               className='h-20 w-20 object-cover rounded-md shadow-md'/> 
                            </div>
                        ))}

                    </div>
            </div>
            <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md
            hover:bg-green-600 transition-colors
            '>Update Product</button>
        </form>
    </div>
  )
}
