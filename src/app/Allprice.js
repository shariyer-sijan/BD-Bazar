
"use client";

import { useState } from "react";
import Card from "./Card";

export default function Allprice({ products }) {
  const [sortBy, setSortBy] = useState("default");

  const sortOptions = [
    { value: "default", label: "ডিফল্ট" },
    { value: "low-to-high", label: "দাম: কম থেকে বেশি" },
    { value: "high-to-low", label: "দাম: বেশি থেকে কম" },
  ];

  const currentLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label ||
    "ডিফল্ট";

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-to-high") {
      return a.today - b.today;
    }

    if (sortBy === "high-to-low") {
      return b.today - a.today;
    }
    return 0;
  });

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      id="products"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            সব পণ্য
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <details className="relative group w-full sm:w-auto">
          <summary className="flex items-center justify-between sm:justify-start gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer list-none select-none">
            <span>{currentLabel}</span>

            <span className="text-xs transition-transform duration-200 group-open:rotate-180">
              ▼
            </span>
          </summary>

          <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={(e) => {
                  setSortBy(opt.value);
                  e.currentTarget.closest("details").open = false;
                }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-gray-700 flex items-center justify-between"
              >
                <span>{opt.label}</span>

                {sortBy === opt.value && <span>✓</span>}
              </button>
            ))}
          </div>
        </details>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sortedProducts.map((product, i) => (
          <Card
            key={product.id || i}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
