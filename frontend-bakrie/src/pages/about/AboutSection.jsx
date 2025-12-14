import React from "react";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <section className="bg-gradient-to-b from-white to-gray-100 py-20">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
                <p className="mt-4 text-gray-600">
                    We create inclusive, modern digital experiences that empower people and businesses.
                </p>
                <Link
                    to="/about"
                    className="inline-block mt-6 rounded-md bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition"
                >
                    Learn More
                </Link>
            </div>
        </section>
    );
}
