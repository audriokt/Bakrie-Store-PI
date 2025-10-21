import React from 'react'
import Carousel from '../../layout/swiperComponent/Carousel'
import ItemsCard from '../../layout/itemsCard/ItemsCard'
import InfiniteSwiper from '../../core/InfiniteSwiper'
const HomePage = () => {
  return (
    <div className='min-h-[800px] w-full border border-red-500'>
      <Carousel/>

       {/* Favorite Choices */}
      <div className='w-full bg-ookay mt-20 py-10'>
        <div className='flex justify-between items-center'>
          <h1 className='font-extrabold text-3xl text-yes pl-10'>Favorites Choices</h1>
          <button className='bg-yes text-white text-sm w-28 h-9 rounded-full mr-10 border border-yes hover:bg-transparent hover:text-yes font-medium transition duration-300'>
            Shop All
          </button>
        </div>

        {/*Infinite Swiper ditaruh di sini */}
        <div className='mt-10'>
          <InfiniteSwiper />
        </div>
      </div>
      
      {/* item card */}
      <div className='flex flex-col justify-center items-center mt-20 w-full'>
        <h1 className='font-extrabold text-3xl text-yes mb-10'>Checkout Our Products</h1>
        <ItemsCard/>
      </div>

      {/* about us */}
      <div>
        
      </div>
    </div>
  )
}

export default HomePage