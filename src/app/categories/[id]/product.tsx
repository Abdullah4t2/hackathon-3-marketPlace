"use client";

import { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "@/sanity/lib/queries";
import { Category } from "@/sanity/schemaTypes/types/catfetch";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Product } from "@/sanity/schemaTypes/types/profetch";
import Swal from "sweetalert2";
import { addToCart } from "@/app/actions/actions"; // Import addToCart from actions

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        const fetchedCategories = await fetchCategories();
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          position: "top-right",
          icon: "error",
          title: "Failed to Load Data",
          text: "Please try refreshing the page.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleAddToCart = (product: Product) => {
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
    <div className="p-4 font-sans">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our E-Commerce Website</h1>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const productCount = products.filter((product) =>
              Array.isArray(product.category) &&
              product.category.some((cat) => cat._id === category._id)
            ).length;

            const productText =
              productCount > 0
                ? `${productCount} Product${productCount > 1 ? "s" : ""} in this category`
                : "Some products are available in this category";

            return (
              <div
                key={category._id}
                className="border rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg hover:border-gray-300"
              >
                <Link
                  href={`/categories/${category._id}`}
                  className="text-center w-full"
                >
                  <h3 className="font-semibold text-xl mb-2">{category.title}</h3>
                  {category.image && (
                    <div className="h-48 w-full overflow-hidden rounded-md mb-4">
                      <img
                        src={urlFor(category.image)}
                        alt={category.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-600">{productText}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Products Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <Link
                href={`/product/${product._id}`}
                className="text-center w-full"
              >
                <h3 className="font-semibold text-xl mb-2">{product.title}</h3>
                {product.image && (
                  <div className="h-64 w-full overflow-hidden rounded-md mb-4">
                    <img
                      src={urlFor(product.image)}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <p className="text-lg font-bold text-gray-800 mb-2">${product.price}</p>
                {product.priceWithoutDiscount && (
                  <p className="text-sm text-gray-500 line-through mb-2">
                    ${product.priceWithoutDiscount}
                  </p>
                )}
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Description:</strong> {product.description}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Inventory:</strong> {product.inventory}
                </p>
                {product.tags && (
                  <p className="text-sm text-gray-600">
                    <strong>Tags:</strong> {product.tags.join(", ")}
                  </p>
                )}
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
