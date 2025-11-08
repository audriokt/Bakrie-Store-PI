import React from 'react'

export const aboutData = {
  title: 'Patteserie Bakery',
  description: 'All Cakes and Pastry you need here!',
  image:
    'https://i.pinimg.com/originals/c9/d0/51/c9d0511bf871416f05563844dd2362b6.png',
  details: `Patteserie Bakery & Cakes blossomed in early 2025 from a simple philosophy:
    that gourmet indulgence should be undeniably joyful and picture-perfect. We blend 
    the meticulous craft of classic French pâtisserie with a whimsical, modern heart, 
    creating artisan cakes, comforting bread, and flaky pastries as delicious as they 
    are delightfully cute.`,
};

export default function AboutPage() {
  return (
    <div className="px-10 pt-40 pb-10 max-w-4xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-4 text-yes">{aboutData.title}</h1>
      <p className="text-gray-600">{aboutData.details}</p>
    </div>
  );
}