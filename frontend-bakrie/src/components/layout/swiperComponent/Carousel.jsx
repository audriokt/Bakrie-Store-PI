import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

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
];

export default function Carousel() {
  return (
    <div className="relative max-h-[490px] flex items-center justify-center">
      {/* Carousel */}
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
        className="mySwiper w-full h-[480px]"
      >
        {imageData.map((image, index) => (
          <SwiperSlide key={index} data-swiper-autoplay={image.duration}>
            {image.src.endsWith('.mp4') ? (
              <video
                src={image.src}
                autoPlay
                loop
                muted
                className="w-full h-[480px] object-cover pointer-events-none"
              />
            ) : (
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-[480px] object-cover pointer-events-none"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tombol di atas carousel */}
      <div className="absolute bottom-14 flex justify-center w-full z-10">
        <Link to="/products">
          <button className="w-36 h-[45px] rounded-full bg-yes hover:bg-[#E04E4E] transition duration-300 shadow-md">
            <p className="text-white font-semibold tracking-wide">Order Now</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
