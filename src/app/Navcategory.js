
"use client";

import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";

const Navcategory = ({ data }) => {
  const params = useParams();
  const currentId = params?.id;

  return (
    <div className="border-b border-gray-100 py-2 bg-white">
      <div className="flex max-w-6xl mx-auto overflow-x-auto scrollbar-none px-4 gap-2">
        {data.map((x, i) => {
          const isActive = currentId === String(x.id);

          return (
            <Link
              key={x.id || i}
              href={`/category/${x.id}`}
              className="shrink-0"
            >
              <div
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-[#008037] text-white shadow-sm font-bold"
                    : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span>{x.icon}</span>
                <span>{x.nameBn}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navcategory;
