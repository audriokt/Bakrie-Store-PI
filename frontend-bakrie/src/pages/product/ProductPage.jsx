import React from 'react'
import ItemsCard from '../../components/layout/itemsCard/ItemsCard'
import { useProduct } from '../../hooks/useProduct.js'

const ProductPage = () => {
  const { products } = useProduct()
  return (
    <div className="min-h-[800px] pt-40 px-10">
      <h1 className='text-5xl text-yes font-extrabold'>Our Products</h1>
      <h1 className='mt-4 text-yes'>All the goods flavours for you to try!</h1>
      <hr class="h-[2px] my-8 bg-ookay border-0"/>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {products.length > 0 ? (
          products.map((product) => (
            <ItemsCard key={product.id} product={product} />
          ))
        ) : (
        <div className="flex flex-col items-center justify-center bg-[#FFF5F5] border border-[#FFDADA] rounded-2xl shadow-md w-[80%] max-w-xl py-16 px-10 text-center mb-10">              
          <h2 className="text-2xl font-semibold text-red-600 mb-3">
            <img src="/waiting/waiting.svg" alt="waiting" />
            <p>There's no product right now</p>
          </h2>
          <p className="text-gray-500">
            Please check back later or explore our store right away!
          </p>
        </div>
        )}
      </div>
    </div>
  )
}

export default ProductPage