"use client";

import { useAuth, useUser, SignOutButton } from "@clerk/nextjs"; // Import Clerk hooks
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Product } from "@/sanity/schemaTypes/types/profetch";
import Swal from "sweetalert2";
import { urlFor } from "@/sanity/lib/image";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";

const CartPage = () => {
  const { isSignedIn } = useAuth(); // Clerk authentication check
  const { user } = useUser(); // Clerk user info
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Redirect to sign-in if not logged in
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "Item has been removed.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantityChange(id, product.inventory + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.inventory > 1) {
      handleQuantityChange(id, product.inventory - 1);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.inventory, 0)
      .toFixed(2);
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to Checkout",
      text: "Please review your cart before checkout.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Redirecting to checkout...", "success");
        router.push("/checkout");
      }
    });
  };

  if (!isSignedIn) return null; // Prevents rendering cart before redirect

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Info */}
      {user && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Hello, {user.firstName}!</h2>
          <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
          {/* Correct usage of SignOutButton */}
          <SignOutButton>
            <button
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </SignOutButton>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2 className="text-lg font-medium">Your cart is empty.</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={urlFor(item.image).toString()}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm">
                    <strong>Price:</strong> ${item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 md:mt-0">
                {/* Quantity Controls */}
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-l-md"
                    onClick={() => handleDecrement(item._id)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={item.inventory}
                    className="w-12 text-center border-gray-300"
                  />
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-r-md"
                    onClick={() => handleIncrement(item._id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Summary Section */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Cart Summary</h2>
            <p className="text-sm">
              <strong>Total:</strong> ${calculateTotal()}
            </p>
            <button
              className="w-full mt-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              onClick={handleProceed}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
