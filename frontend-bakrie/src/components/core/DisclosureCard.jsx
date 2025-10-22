import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function DisclosureCard({ title, description, image, details }) {
  const [isOpen, setIsOpen] = useState(false);

  const imageVariants = {
    collapsed: { scale: 1, filter: 'blur(0px)' },
    expanded: { scale: 1.1, filter: 'blur(3px)' },
  };

  const contentVariants = {
    collapsed: { opacity: 0, y: 0 },
    expanded: { opacity: 1, y: 1 },
  };

  const transition = {
    type: 'spring',
    stiffness: 26.7,
    damping: 4.1,
    mass: 0.2,
  };

  return (
    <div className="relative w-full max-w-[500px] h-[400px] overflow-hidden rounded-xl">
      <div onClick={() => setIsOpen(!isOpen)}>
        <motion.img
          src={image}
          alt={title}
          className="pointer-events-none h-auto w-auto select-none"
          animate={isOpen ? 'expanded' : 'collapsed'}
          variants={imageVariants}
          transition={transition}
        />
      </div>

      <motion.div
        animate={isOpen ? 'expanded' : 'collapsed'}
        variants={contentVariants}
        transition={transition}
        className="absolute bottom-0 left-0 right-0 rounded-xl bg-zinc-900/90 px-4 pt-2 dark:bg-zinc-50/90 backdrop-blur-sm"
      >
        <button
          className="w-full pb-2 text-left text-[14px] font-medium text-white dark:text-zinc-900"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </button>

        {isOpen && (
          <div className="flex flex-col pb-4 text-[13px] text-zinc-300 dark:text-zinc-700">
            <p>{description}</p>
            <p className="line-clamp-3">{details}</p>
            <button
              className="mt-3 w-full rounded-[4px] border border-yes bg-yes px-4 py-1 text-ookay transition-colors duration-300 hover:bg-ookay hover:text-yes"
              type="button"
            >
              See More
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default DisclosureCard;
