import React from 'react'
import Hero from '../components/Layouts/Hero'
import GenderCollection from '../components/Product/GenderCollection'
import NewArrival from '../components/Product/NewArrival'
import ProductDetails from '../components/Product/ProductDetails'
import ProductGrid from '../components/Product/ProductGrid'
import FeaturedCollection from '../components/Product/FeaturedCollection'
import FeaturedSection from '../components/Product/FeaturedSection'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchProductsByFilters } from '../../redux/slices/productsSlice'
import axios from 'axios'

export default function Home() {
  const dispatch =useDispatch();
  const {products,loading,error} =useSelector((state)=>state.products);
  const [bestSellerProduct,setBestSellerProduct] =useState(null);
  useEffect(() =>
  {
    // Fetch products for specific collection
    dispatch(
      fetchProductsByFilters({
        gender:"Women",
        category:"Bottom Wear",
        limit :8,
      })
    );
    // Fetch best seller product
    const fetchBestSeller =async () =>
    {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
},[dispatch]);
  return (
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrival/>
        {/* Best Seller */}
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
       {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}/>) : (
        <p className='text-center'>Loading Best Seller Products </p>
       )}
        {/* Product Grid */}
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>Top Wear For Women</h2>
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
        <FeaturedCollection />
        <FeaturedSection />

    </div>
  )
}
