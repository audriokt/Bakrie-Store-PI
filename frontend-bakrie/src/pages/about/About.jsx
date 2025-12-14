// AboutPage.jsx
import React from "react";

export default function AboutPage() {
    return (
        <main className="bg-white py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-gray-800 mb-8">About Us</h1>

                {/* Vision */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-700">Our Vision</h2>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                        To build inclusive and modern digital experiences that inspire and empower communities worldwide.
                    </p>
                </section>

                {/* Mission */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-700">Our Mission</h2>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                        We strive to deliver innovative, scalable, and sustainable solutions with a focus on quality and customer satisfaction.
                    </p>
                </section>

                {/* Story */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-700">Our Story</h2>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                        Our journey began with a simple idea: technology should simplify life, not complicate it. Since then, we’ve grown into a team dedicated to creating impactful digital solutions.
                    </p>
                </section>

                {/* Values */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-700">Our Values</h2>
                    <ul className="mt-3 space-y-2 text-gray-600 list-disc list-inside">
                        <li>Innovation and creativity</li>
                        <li>Inclusivity and accessibility</li>
                        <li>Integrity and transparency</li>
                        <li>Commitment to excellence</li>
                    </ul>
                </section>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <a
                        href="/contact"
                        className="inline-block rounded-md bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </main>
    );
}