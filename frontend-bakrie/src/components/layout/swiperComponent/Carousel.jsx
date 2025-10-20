// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const imageData = [
  {
    src: '/carousel/Bakery_Video_Generation.mp4', 
    duration: 8000,
  },
  {
    src: '/carousel/bakery.jpg', 
    duration: 3000,
  },
  {
    src: '/carousel/cookies.jpg', 
    duration: 3000,
  },
]

export default function Carousel() {
  return (
    <>
    <div className='max-h-[490px] border border-blue-500 flex items-center justify-center z-[-1] relative'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper -z-10"
      >
        {/* looping tiap gambar nya terus kasih kondisi untuk ngecek tipe carousel image nya */}
        {imageData.map((image, index) => (
          <SwiperSlide key={index} className='w-full h-[480px]' data-swiper-autoplay={image.duration}>
            {/* <img src={image.src} alt={`Slide ${index + 1}`} className='w-full max-h-[490px] object-cover'/> */}
            {image.src.endsWith('.mp4') ? (
              <video 
                src={image.src}
                autoPlay 
                loop 
                muted
                // duration={image.duration}
                className='w-full h-[480px] object-cover pointer-events-none'
              />
            ) : (
              <img 
                src={image.src} 
                alt={`Slide ${index + 1}`} 
                className='w-full h-[480px] object-cover pointer-events-none'
                />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div className='w-full flex items-center justify-center -z-2'>
              <button className='w-36 h-[40px] rounded-full bg-yes relative bottom-32'>
                <p className='text-ookay font-semibold'>Order Now</p>
              </button>
          </div>
    </>
  );
}
