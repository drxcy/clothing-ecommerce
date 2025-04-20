import React from 'react'
import Hero from '../components/Layouts/Hero'
import GenderCollection from '../components/Product/GenderCollection'
import NewArrival from '../components/Product/NewArrival'
import ProductDetails from '../components/Product/ProductDetails'
import ProductGrid from '../components/Product/ProductGrid'
import FeaturedCollection from '../components/Product/FeaturedCollection'
import FeaturedSection from '../components/Product/FeaturedSection'

export default function Home() {
  return (
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrival/>
        {/* Best Seller */}
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        <ProductDetails />
        {/* Product Grid */}
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>Top Wear For Women</h2>
          <ProductGrid products={placehlderProduct} />
        </div>
        <FeaturedCollection />
        <FeaturedSection />

    </div>
  )
}
