import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Timekoto from './Timekoto';

const Banner = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        <div className="flex flex-col items-start max-w-2xl">
         <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 mb-6 shadow-sm">
  <Timekoto />
</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/products"
            className="btn bg-[#008037] hover:bg-[#006b2e] text-white font-bold text-base px-8 h-12 min-h-0 rounded-xl border-none shadow-md transition-all duration-200"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="relative w-full max-w-sm lg:max-w-md flex justify-center items-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্যের ঝুড়ি"
            width={380}
            height={320}
            className="object-contain"
            priority
          />
        </div>

      </div>
    </div>
    );
};

export default Banner;