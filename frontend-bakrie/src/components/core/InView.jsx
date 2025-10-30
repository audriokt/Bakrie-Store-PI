"use client"

import React from "react"
import { motion } from "framer-motion"

/**
 * Komponen InView sederhana tanpa react-intersection-observer
 * Memanfaatkan whileInView + viewport bawaan Framer Motion
 */
const InView = ({
  children,
  variants = {
    hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  transition = { duration: 0.6, ease: "easeOut" },
  once = true, // hanya animasi sekali
  amount = 0.2, // seberapa banyak elemen harus terlihat sebelum animasi jalan
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={variants}
      transition={transition}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  )
}

export default InView
