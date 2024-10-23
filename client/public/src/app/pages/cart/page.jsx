// src/pages/cart/Cart.js
"use client";
import { AppContext } from "@/app/context/AppContext";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Cart() {
  const { cartItems, purchaseCartItems, loading, reduceCartItem } =
    React.useContext(AppContext);

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <table className="min-w-full table-auto bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Unit Price</th>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Color</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.item}</td>
                  <td className="px-4 py-2">GHS{item.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{item.size}</td>
                  <td className="px-4 py-2">{item.color}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">GHS{item.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        reduceCartItem(
                          item?.name,
                          item?.size,
                          item?.price,
                          item?.color
                        )
                      }
                    >
                      <FontAwesomeIcon
                        className="text-red-500"
                        icon={faMinus}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">
              Total: GHS{totalAmount.toFixed(2)}
            </h2>
            <button
              onClick={purchaseCartItems}
              disabled={loading ? true : false}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
