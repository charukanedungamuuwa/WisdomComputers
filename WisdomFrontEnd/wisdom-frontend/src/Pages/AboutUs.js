import React from "react";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-50 text-gray-800 mt-16 w-full">
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">About Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Section - Image */}
                    <div className="flex justify-center">
                        <img
                            src="/about-us-image.png" // Replace with the actual image path
                            alt="About Us"
                            className="rounded-lg shadow-lg w-3/4"
                        />
                    </div>

                    {/* Right Section - Text */}
                    <div>
                        <h2 className="text-2xl font-semibold text-green-700 mb-4">Who We Are</h2>
                        <p className="text-lg mb-4 leading-relaxed">
                            At <strong>CodeCraft Solutions</strong>, we believe in the power of technology to transform lives. From empowering blind students
                            with personalized learning tools to innovating sustainability in supply chain management, we focus on impactful, human-centered solutions.
                        </p>
                        <p className="text-lg mb-4 leading-relaxed">
                            Our team is passionate about creating applications that bridge the gap between people and technology. By combining cutting-edge research,
                            user-centric design, and an unwavering commitment to excellence, we bring ideas to life.
                        </p>
                        <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Journey</h2>
                        <p className="text-lg mb-4 leading-relaxed">
                            Over the years, we’ve taken on exciting challenges:
                            - Building robust supply chain systems that prioritize sustainability.
                            - Innovating adaptive audio experiences for blind students.
                            - Optimizing processes for seamless customer interaction in various industries.
                            Our journey is driven by curiosity, teamwork, and a shared vision for a brighter tomorrow.
                        </p>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-blue-800 text-center mb-6">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-white shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold text-green-600">Innovation</h3>
                            <p className="mt-2">
                                Pushing boundaries with ideas that inspire and solutions that matter.
                            </p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold text-green-600">Collaboration</h3>
                            <p className="mt-2">
                                Working together to create meaningful change for communities and businesses.
                            </p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold text-green-600">Sustainability</h3>
                            <p className="mt-2">
                                Committed to practices that leave a positive impact on the planet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
