"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import Swal from "sweetalert2";
import { getCartItems } from "@/app/actions/actions";
import { Product } from "@/sanity/schemaTypes/types/profetch";
import { client } from "@/sanity/lib/client"; // Import Sanity client

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      Swal.fire({ title: "Error", text: "Please fill in all the fields.", icon: "error", confirmButtonText: "Ok" });
      return;
    }

    setLoading(true);

    try {
      // ✅ Construct order data with proper `items` structure
      const orderData = {
        _type: "order", // ✅ Ensure this matches the schema
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        address: formValues.address,
        city: formValues.city,
        zipCode: formValues.zipCode,
        phone: formValues.phone,
        email: formValues.email,
        total,
        items: cartItems.map((item) => ({
          _type: "object", // ✅ Ensure `_type` is "object"
          product: { _type: "reference", _ref: item._id }, // Reference product ID
          quantity: item.inventory,
          price: item.price,
        })),
        status: "pending",
      };

      // ✅ Save order in Sanity
      const newOrder = await client.create(orderData);

      setLoading(false);

      if (newOrder) {
        localStorage.removeItem("appliedDiscount");
        Swal.fire({ title: "Success!", text: "Your order has been placed!", icon: "success", confirmButtonText: "Ok" });
      } else {
        throw new Error("Failed to save order.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Sanity Order Error:", error);
      Swal.fire({ title: "Error", text: "Something went wrong. Try again.", icon: "error", confirmButtonText: "Ok" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <Link href="/cart" className="text-[#666666] hover:text-black transition text-sm">
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4 text-[#666666]" />
            <span className="text-sm">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 py-3 border-b">
                  <div className="w-16 h-16 rounded overflow-hidden">
                    {item.image && <Image src={urlFor(item.image)} alt={item.title} width={64} height={64} className="object-cover w-full h-full" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="text-xs text-gray-500">Quantity: {item.inventory}</p>
                  </div>
                  <p className="text-sm font-medium">${item.price * item.inventory}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm">Subtotal: <span className="font-medium">${subtotal}</span></p>
              <p className="text-sm">Discount: <span className="font-medium">-${discount}</span></p>
              <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-white border rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold">Billing Information</h2>
            {Object.keys(formValues).map((field) => (
              <div key={field}>
                <label htmlFor={field} className="font-medium text-gray-700">{field.replace(/([A-Z])/g, " $1").trim()}</label>
                <input
                  id={field}
                  placeholder={`Enter your ${field}`}
                  value={formValues[field as keyof typeof formValues]}
                  onChange={handleInputChange}
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors[field as keyof typeof formErrors] && <p className="text-sm text-red-500">{`${field.replace(/([A-Z])/g, " $1").trim()} is required.`}</p>}
              </div>
            ))}
            <button className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md mt-6" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
