import React from 'react'
import Carousel from '../../layout/swiperComponent/Carousel'
import ItemsCard from '../../layout/itemsCard/ItemsCard'

const HomePage = () => {
  return (
    <div className='min-h-[800px] w-full border border-red-500'>
      <Carousel/>
      
      {/* item card */}
      <div className='flex flex-col justify-center items-center mt-20 w-full'>
        <h1 className='font-extrabold text-3xl text-yes mb-10'>Checkout Our Products</h1>
        <ItemsCard/>
      </div>
    </div>
  )
}

export default HomePage