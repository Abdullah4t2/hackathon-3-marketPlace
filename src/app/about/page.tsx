// src/app/about/page.tsx

"use client";

import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-green-100 to-pink-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
            <Header/>
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to Comforty, your go-to place for the best home furniture.
          Our goal is to provide you with high-quality furniture that combines
          comfort and style. We are passionate about helping you make your home
          a place of comfort, relaxation, and luxury.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          At Comforty, we believe in delivering the best products and providing
          excellent customer service. Our team is dedicated to ensuring that
          you have the best shopping experience possible.
        </p>
        <div className="bg-yellow-200 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Quality craftsmanship and durability</li>
            <li>Affordable pricing without compromising on design</li>
            <li>Commitment to sustainable practices and eco-friendly materials</li>
            <li>Exceptional customer service and support</li>
          </ul>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default About;
