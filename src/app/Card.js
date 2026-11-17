import React from 'react';

import Link from "next/link";

const Card = ({product}) => {
   const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = product.change?.pct || 0;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between hover:border-[#008037] hover:shadow-md transition-all duration-200 cursor-pointer h-full">
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl">
            {product.image}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">
              {product.nameBn}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit === "liter" ? "লিটার" : product.unit === "dozen" ? "ডজন" : "পিস"}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-gray-50 pt-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">আজকের দাম</p>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {product.today} <span className="text-base font-normal text-gray-600">টাকা</span>
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
    </Link>
  );
};

export default Card;
