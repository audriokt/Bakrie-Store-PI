import React, { useRef, useEffect } from 'react';
import { imageData } from '../layout/itemsCard/ItemsCard';

const InfiniteSlider = ({
  children,
  direction = 'horizontal',
  reverse = false,
  duration = 40000,
  gap = 24,
}) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Duplicate items sekali biar bisa looping halus
    const items = Array.from(slider.children);
    const totalWidth = slider.scrollWidth;
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      slider.appendChild(clone);
    });

    // Set CSS variables untuk animasi
    slider.style.setProperty('--duration', `${duration}ms`);
    slider.style.setProperty('--direction', reverse ? 'reverse' : 'normal');
  }, [duration, reverse, children]);

  const directionClass = direction === 'vertical' ? 'flex-col' : 'flex-row';
  const animationClass =
    direction === 'vertical' ? 'animate-scroll-vertical' : 'animate-scroll-horizontal';

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          direction === 'vertical'
            ? 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
            : 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        WebkitMaskImage:
          direction === 'vertical'
            ? 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
            : 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
      }}
    >
      <div
        ref={sliderRef}
        className={`flex ${directionClass} w-max ${animationClass}`}
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>
    </div>
  );
};

const InfiniteSwiper = () => {
  return (
    <div className="w-full bg-gray-100 py-10">
      <InfiniteSlider duration={30000}>
        {imageData.map((item, index) => (
          <div
            key={index}
            className="min-w-[220px] h-[280px] bg-white shadow-md rounded-2xl flex flex-col items-center justify-center"
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-48 h-48 object-cover rounded-xl mb-3"
            />
            <h3 className="font-semibold text-lg text-yes">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.price}</p>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
};

export default InfiniteSwiper;
