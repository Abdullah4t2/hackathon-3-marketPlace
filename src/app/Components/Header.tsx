"use client";

import { FaCartArrowDown } from "react-icons/fa";
import { LuSofa } from "react-icons/lu";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Fetch items from localStorage on page load
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(savedCartItems);
  }, []);

  // Add item to cart and update localStorage
  const addToCart = (item: any) => {
    const updatedCartItems = [...cartItems, item];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const toggleCart = () => {
    // Handle cart toggle if necessary
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-200">
        <div className="flex items-center space-x-2">
          <LuSofa />
          <span className="text-xl font-bold">Comforty</span>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <FaCartArrowDown className="text-xl text-gray-700 cursor-pointer" />
          </Link>
          <span className="text-xl">{cartItems.length}</span> {/* Show cart item count */}
        </div>
      </header>

      <nav className="bg-white w-full border-t border-gray-300">
        <div className="container mx-auto flex justify-center space-x-8 py-3">
          <Link href="/Homeroute" className="text-gray-700 hover:text-blue-500 transition">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-500 transition">
            About
          </Link>
          <Link href="/shop" className="text-gray-700 hover:text-blue-500 transition">
            Shop
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-500 transition">
            Product
          </Link>
        </div>
      </nav>
    </>
  );
}
