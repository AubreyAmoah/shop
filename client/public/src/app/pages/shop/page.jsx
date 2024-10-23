"use client";
import { AppContext } from "@/app/context/AppContext";
import React from "react";

export default function Shop() {
  const { items, addCartItem } = React.useContext(AppContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Shop</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md max-[400px]:p-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{item?.name}</h3>
            </div>

            <img src={item.images[0]} alt="item image" className="w-full" />
            <span className=" text-blue-500">Available Types</span>
            <div className="mt-4">
              {item?.SizesAndPrices?.map((info, idx) => (
                <div key={idx}>
                  <div className="mt-2 flex items-center gap-4 max-[400px]:gap-2 max-[400px]:text-sm">
                    <p className=" font-medium">size: {info?.size}</p>
                    <p className="text-gray-500">price: {info?.price}</p>
                    <p className={`text-${info?.color}-400`}>
                      color: {info?.color}
                    </p>
                    <p
                      className={`${
                        info?.stock > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      stock: {info?.stock}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      addCartItem(
                        item?.name,
                        info?.size,
                        info?.price,
                        info?.color,
                        1
                      )
                    }
                    className="text-white p-2 bg-teal-600 border-none shadow-sm text-sm rounded-sm mt-2"
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
