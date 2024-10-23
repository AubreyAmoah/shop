"use client";
import { AppContext } from "./context/AppContext";
import React from "react";

export default function Home() {
  const { user, logout, purchaseHistory } = React.useContext(AppContext);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Purchases</h3>
          <p className="mt-2 text-3xl font-bold">
            {purchaseHistory?.totalItemsPurchased || 0}
          </p>
          <p className="text-green-500 mt-1">+5% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Amount Spent</h3>
          <p className="mt-2 text-3xl font-bold">
            GHS{purchaseHistory?.totalAmountSpent || 0}
          </p>
          <p className="text-green-500 mt-1">+8% from last month</p>
        </div>

        {/* Products Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="mt-2 text-3xl font-bold">320</p>
          <p className="text-green-500 mt-1">+2% from last month</p>
        </div>

        {/* Customers Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="mt-2 text-3xl font-bold">2,380</p>
          <p className="text-green-500 mt-1">+6% from last month</p>
        </div>
      </div>

      {/* Order Table */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Purchases</h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                PaymentMethod
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory?.purchaseHistory?.map((order) => (
              <tr key={order?.id} className="border-t">
                <td className="px-4 py-2">{order?.id}</td>
                <td className="px-4 py-2">{order?.paymentMethod}</td>
                <td className="px-4 py-2">{order?.totalPrice}</td>
                <td
                  className={`px-4 py-2 ${
                    order?.status === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {order?.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
