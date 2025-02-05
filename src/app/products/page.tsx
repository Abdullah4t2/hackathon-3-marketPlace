"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "@/sanity/lib/queries"; // Function to fetch all products
import { Product } from "@/sanity/schemaTypes/types/profetch"; // Product type
import { urlFor } from "@/sanity/lib/image"; // Sanity image helper
import Swal from "sweetalert2"; // For sweet alert
import Header from "@/app/Components/Header"; // Header component
import Footer from "@/app/Components/Footer"; // Footer component

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch products on page load
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(); // Fetch all products from Sanity
        setProducts(fetchedProducts); // Set fetched products in state
      } catch (error) {
        console.error("Error fetching products:", error);
        Swal.fire({
          position: "top-right",
          icon: "error",
          title: "Failed to Load Products",
          text: "Please try again.",
        });
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading state if data is not fetched yet
  if (!products.length) return <div>No products available</div>; // Show message if no products found

  // Handle adding product to cart
  const handleAddToCart = (product: Product) => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const updatedCartItems = [...savedCartItems, product]; // Add product to cart
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Save updated cart to localStorage
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.title} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Products List */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={urlFor(product.image)}
                alt={product.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-600 my-2">{product.description}</p>
                <p className="text-lg font-bold text-green-600">${product.price}</p>
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-600 transition-all"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductsPage;
