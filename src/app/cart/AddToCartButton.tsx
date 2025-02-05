"use client";

import { Product } from "@/sanity/schemaTypes/types/profetch";
import { useState } from "react";
import { addToCart } from "../actions/actions";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      {added ? "Added to Cart ✅" : "Add to Cart"}
    </button>
  );
}
