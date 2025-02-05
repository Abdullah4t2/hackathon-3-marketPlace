"use client";

import { Product } from "@/sanity/schemaTypes/types/profetch";
import React, { useEffect, useState } from "react";
import { getCartItems } from "../actions/actions";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Footer from "../Components/Footer";
import { client } from "@/sanity/lib/client";
import Swal from "sweetalert2";

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipcode: "",
    city: "",
  });

  useEffect(() => {
    // Fetch cart items
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subTotal = cartItems.reduce((total, item) => total + item.price * item.inventory, 0).toFixed(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const total = parseFloat(subTotal) - discount;
    const orderData = {
      _type: "order",
      ...formValues,
      cartItems: cartItems.map((item) => ({
        _type: "object",
        products: { _type: "reference", _ref: item._id },
        quantity: item.inventory,
        price: item.price,
      })),
      total: total.toFixed(2),
      orderDate: new Date().toISOString(),
    };

    try {
      await client.create(orderData);
      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been placed successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("cartItems");
      setCartItems([]);
    } catch (error) {
      console.error("Error creating order:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue placing your order. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-pink-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="py-4">
          <Link href="/cart" className="text-blue-500 hover:underline">Cart</Link>
          <span className="mx-2">→</span>
          <span className="font-bold">Checkout</span>
        </nav>
      </div>
      <div className="main max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            // Log the item to ensure the data is correct
            console.log(item); 

            return (
              <div key={item._id} className="flex items-center border-b py-4">
                <div className="w-16 h-16 relative">
                  {/* Check if the image is available */}
                  {item.image ? (
                    <Image
                      src={urlFor(item.image).toString()} // Ensure URL generation works
                      alt={item.title}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <p className="text-gray-500">No image available</p>
                  )}
                </div>
                <div className="ml-4">
                  {/* Ensure title is available */}
                  <h3 className="text-lg font-semibold">{item.title || "Product Name Missing"}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.inventory}</p>
                  <p className="text-sm font-bold">${(item.price * item.inventory).toFixed(2)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No items in cart</p>
        )}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold">Subtotal: ${subTotal}</h3>
          {discount > 0 && <p className="text-sm text-green-500">Discount Applied: -${discount.toFixed(2)}</p>}
          <h2 className="text-xl font-bold">Total: ${(parseFloat(subTotal) - discount).toFixed(2)}</h2>
        </div>
        <h2 className="text-2xl font-bold mt-6">Billing Information</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="font-semibold">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <label className="font-semibold">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <label className="font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <label className="font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <label className="font-semibold">City</label>
          <input
            type="text"
            name="city"
            value={formValues.city}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <label className="font-semibold">Zip Code</label>
          <input
            type="text"
            name="zipcode"
            value={formValues.zipcode}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </form>
        <button
          type="button"
          onClick={handlePlaceOrder}
          className="mt-6 w-full p-4 bg-gradient-to-r from-teal-400 to-pink-300 text-white font-semibold rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-pink-300 hover:to-teal-400 transition-all duration-300"
        >
          Place Order
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
