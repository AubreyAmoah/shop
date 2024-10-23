"use client";
import { AppContext } from "./context/AppContext";
import React from "react";

export default function Home() {
  const { user, logout } = React.useContext(AppContext);
  return (
    <div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="mt-2 text-3xl font-bold">1,240</p>
          <p className="text-green-500 mt-1">+5% from last month</p>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="mt-2 text-3xl font-bold">$50,430</p>
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
          <h3 className="text-lg font-semibold">Customers</h3>
          <p className="mt-2 text-3xl font-bold">2,380</p>
          <p className="text-green-500 mt-1">+6% from last month</p>
        </div>
      </div>

      {/* Order Table */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Customer
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
            <tr className="border-t">
              <td className="px-4 py-2">#12345</td>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">$500</td>
              <td className="px-4 py-2 text-green-500">Completed</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">#12346</td>
              <td className="px-4 py-2">Jane Smith</td>
              <td className="px-4 py-2">$250</td>
              <td className="px-4 py-2 text-yellow-500">Pending</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">#12347</td>
              <td className="px-4 py-2">Mike Johnson</td>
              <td className="px-4 py-2">$350</td>
              <td className="px-4 py-2 text-red-500">Cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
