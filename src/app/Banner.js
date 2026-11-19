
"use client";

import Image from "next/image";
import React from "react";
import Timekoto from "./Timekoto";
import Scroll from "./Scroll";
import { authClient } from "@/lib/auth-client";

const Banner = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-start max-w-2xl w-full">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 mb-5 sm:mb-6 shadow-sm">
            <Timekoto />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Scroll />
        </div>

        <div className="relative w-full max-w-sm lg:max-w-md flex justify-center items-center">
          {user ? (
            <div className="grid grid-cols-3 w-full rounded-3xl border border-[#dce5dd] bg-[#f0f5f1] overflow-hidden">
              <div className="p-3 sm:p-5 lg:p-6 border-r border-dashed border-[#d5dfd7]">
                <p className="text-gray-700 text-xs sm:text-sm">পণ্য</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 mt-2">
                  ৩৩
                </h2>
                <p className="text-gray-700 text-xs sm:text-sm mt-2 sm:mt-3">
                  টি নির্বাচনের পণ্য
                </p>
              </div>

              <div className="p-3 sm:p-5 lg:p-6 border-r border-dashed border-[#d5dfd7]">
                <p className="text-gray-700 text-xs sm:text-sm">বাজার</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202b23] mt-2">
                  ১২
                </h2>
                <p className="text-gray-700 text-xs sm:text-sm mt-2 sm:mt-3">
                  টি বাজার অন্তর্ভুক্ত
                </p>
              </div>

              <div className="p-3 sm:p-5 lg:p-6">
                <p className="text-gray-700 text-xs sm:text-sm">বিভাগ</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202b23] mt-2">
                  ৬
                </h2>
                <p className="text-gray-700 text-xs sm:text-sm mt-2 sm:mt-3">
                  টি বিভাগের তথ্য
                </p>
              </div>
            </div>
          ) : (
            <Image
              src="/bazar-hero.png"
              alt="বাজারের পণ্যের ঝুড়ি"
              width={380}
              height={320}
              className="object-contain w-full h-auto"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
