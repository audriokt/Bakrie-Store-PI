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
      <div className='py-4'>
          {products.map((product) => (
              <ItemsCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default ProductPage