"use client";

import { useState, useEffect } from "react";

export default function Allprice() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((result) => {
        const data = Array.isArray(result) ? result : (result.data || []);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-to-high") {
      return a.today - b.today;
    } else if (sortBy === "high-to-low") {
      return b.today - a.today;
    }
    return 0;
  });


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
    
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-sm text-gray-500 mt-1">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

    
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">সাজান</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <span>
                {sortBy === "default" && "ডিফল্ট"}
                {sortBy === "low-to-high" && "দাম: কম থেকে বেশি"}
                {sortBy === "high-to-low" && "দাম: বেশি থেকে কম"}
              </span>
              <span className={`text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                ▲
              </span>
            </button>
          </div>


          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20">
              <button
                onClick={() => {
                  setSortBy("default");
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                  sortBy === "default" ? "font-bold text-emerald-600 bg-emerald-50/50" : "text-gray-700"
                }`}
              >
                ✓ ডিফল্ট
              </button>
              <button
                onClick={() => {
                  setSortBy("low-to-high");
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                  sortBy === "low-to-high" ? "font-bold text-emerald-600 bg-emerald-50/50" : "text-gray-700"
                }`}
              >
                দাম: কম থেকে বেশি
              </button>
              <button
                onClick={() => {
                  setSortBy("high-to-low");
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                  sortBy === "high-to-low" ? "font-bold text-emerald-600 bg-emerald-50/50" : "text-gray-700"
                }`}
              >
                দাম: বেশি থেকে কম
              </button>
            </div>
          )}
        </div>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((x, i) => {
          const isUp = x.change?.dir === "up";
          const isDown = x.change?.dir === "down";
          const pct = x.change?.pct || 0;

          return (
            <div
              key={x.id || i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
            >
    
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl">
                  {x.image}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {x.nameBn}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    প্রতি {x.unit === "kg" ? "কেজি" : x.unit === "liter" ? "লিটার" : x.unit === "dozen" ? "ডজন" : "পিস"}
                  </p>
                </div>
              </div>

  
              <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">আজকের দাম</p>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {x.today} <span className="text-base font-normal text-gray-600">টাকা</span>
                  </div>
                </div>

            
                <div
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                    isUp
                      ? "bg-red-50 text-red-600"
                      : isDown
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                  <span>{Math.abs(pct)}%</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}