"use client";

import { useEffect, useState } from "react";
import { fetchProductById } from "@/sanity/lib/queries";
import { Product } from "@/sanity/schemaTypes/types/profetch";
import { urlFor } from "@/sanity/lib/image";
import { addToCart } from "@/app/actions/actions";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import Footer from "@/app/Components/Footer"; // Import Footer
import Header from "@/app/Components/Header"; // Import Header

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const fetchedProduct = await fetchProductById(id as string);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire({
          position: "top-right",
          icon: "error",
          title: "Failed to Load Product",
          text: "Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.title} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50 p-6">
      {/* Include Header here */}
      <Header />

      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl flex flex-col md:flex-row mb-6">
        {/* Left: Product Image and Title */}
        <div className="md:w-1/2 relative">
          <img
            src={urlFor(product.image)}
            alt={product.title}
            className="w-full h-96 object-cover rounded-t-lg md:rounded-l-lg"
          />
          <h1 className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-3 py-1 rounded-md text-xl font-semibold">
            {product.title}
          </h1>
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between p-6 space-y-6">
          {/* Description Section */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">Description</h2>
            <p className="text-lg text-gray-700">{product.description}</p>
          </div>

          {/* Price Section */}
          <p className="text-xl font-semibold text-green-600">Price: ${product.price}</p>

          {/* Add to Cart Button */}
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg w-full text-center hover:from-blue-600 hover:to-purple-600 transition-all"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default ProductPage;
