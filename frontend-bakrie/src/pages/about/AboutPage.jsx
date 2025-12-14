import React from "react";
import { Link } from "react-router-dom";

export const aboutData = [
    {
        title: "The Spark of a Dream",
        desc: "Patteserie Bakery began as a small dream — a warm kitchen filled with hopes and experiments.",
        image:
            'https://i.pinimg.com/originals/c9/d0/51/c9d0511bf871416f05563844dd2362b6.png',
        video: "../../../public/about/about/bakes-video.mp4"
        ,
    },
    {
        title: "The French Craft",
        desc: "We grew inspired by the elegance of French pâtisserie — precision, layers, and beautiful craftsmanship.",
        image:
            'https://i.pinimg.com/originals/c9/d0/51/c9d0511bf871416f05563844dd2362b6.png',
        video: "../../../public/about/about/baker-video.mp4",
    },
    {
        title: "Made With Love & Whimsy",
        desc: "Each pastry blends classic technique with cute, modern flair — as lovely to see as it is to taste.",
        image:
            'https://i.pinimg.com/originals/c9/d0/51/c9d0511bf871416f05563844dd2362b6.png',
        video: "../../../public/about/about/cakes-video.mp4",
    },
    {
        title: "From Our Kitchen to Your Heart",
        desc: "Every dessert is made to create joy — turning moments into memories, one bite at a time.",
        image:
            'https://i.pinimg.com/originals/c9/d0/51/c9d0511bf871416f05563844dd2362b6.png',
        video: "../../../public/about/about/bakrie-store.mp4",
    },
];

export default function AboutPage() {
    return (
        <div className="pt-36 pb-24 px-6 space-y-24 bg-gradient-to-b from-red-50/40 to-white">
            <h1 className="text-center text-5xl font-extrabold text-yes drop-shadow-sm mb-10">
                Patteserie Bakery
            </h1>

            {aboutData.map((item, index) => (
                <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto
          ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                >
                    {/* Video */}
                    <video
                        src={item.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full md:w-[45%] h-[350px] rounded-3xl shadow-xl border-4 border-white object-cover bg-gray-200"
                        onError={(e) => (e.target.style.display = "none")}
                    />

                    {/* Text */}
                    <div className="md:w-[50%] space-y-3">
                        <h2 className="text-3xl font-bold text-yes">{item.title}</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                </div>
            ))}

            {/* CTA Button */}
            <div className="text-center mt-14">
                <Link
                    to="/products"
                    className="px-10 py-4 bg-yes text-white font-semibold rounded-full shadow-md text-lg
          hover:bg-transparent hover:text-yes hover:shadow-xl border-2 border-yes transition-all duration-300"
                >
                    Experience The Magic
                </Link>
            </div>
        </div>
    );
}