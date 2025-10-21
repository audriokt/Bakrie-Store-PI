import React, { useRef, useEffect, useState } from 'react';
import { imageData } from '../layout/itemsCard/ItemsCard';

const InfiniteSlider = ({ children, speed = 0.5, gap = 24 }) => {
  const sliderRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Duplikat isi supaya seamless
    const items = Array.from(slider.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      slider.appendChild(clone);
    });

    let position = 0;
    let currentSpeed = speed;
    let animationFrame;

    const animate = () => {
      // Ubah kecepatan kalau di-hover
      const targetSpeed = isHover ? speed * 0.25 : speed; // melambat 75% saat hover
      currentSpeed += (targetSpeed - currentSpeed) * 0.05; // transisi halus

      position -= currentSpeed;
      slider.style.transform = `translateX(${position}px)`;

      // reset posisi biar loop terus
      if (Math.abs(position) >= slider.scrollWidth / 2) {
        position = 0;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [children, speed, isHover]);

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      }}
    >
      <div
        ref={sliderRef}
        className="flex w-max will-change-transform transition-transform"
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>
    </div>
  );
};

const InfiniteSwiper = () => {
  return (
    <div className="w-full bg-ookay">
      <InfiniteSlider speed={0.6} gap={32}>
        {imageData.map((item, index) => (
          <div
            key={index}
            className="min-w-[220px] h-[280px] bg-ookay rounded-l flex flex-col items-center justify-center"
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-48 h-48 object-cover rounded-xl mb-3"
            />
            <h3 className="font-semibold text-lg text-yes">{item.name}</h3>
            <p className="text-yes text-sm">{item.price}</p>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
};

export default InfiniteSwiper;
