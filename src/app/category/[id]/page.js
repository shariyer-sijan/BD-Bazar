
import Card from '@/app/Card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

const Lodata = async ({ params, searchParams }) => {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const sortBy = resolvedSearchParams?.sort || "default";

  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${id}`);
  const products = await res.json();

  if(products.length===0){
    notFound()
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-to-high") return a.today - b.today;
    if (sortBy === "high-to-low") return b.today - a.today;
    return 0;
  });

  const sortOptions = [
    { value: "default", label: "ডিফল্ট" },
    { value: "low-to-high", label: "দাম: কম থেকে বেশি" },
    { value: "high-to-low", label: "দাম: বেশি থেকে কম" },
  ];

  const currentLabel = sortOptions.find(opt => opt.value === sortBy)?.label || "ডিফল্ট";

  const categoryName = products[0]?.categoryNameBn || "পণ্যের তালিকা";
  const categoryIcon = products[0]?.categoryIcon || "📦";

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 flex items-center gap-3 sm:gap-5">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#f4f7f4] flex items-center justify-center text-2xl sm:text-3xl shadow-inner shrink-0">
          {categoryIcon}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 break-words">{categoryName}</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6 gap-3 sm:gap-4">
        <p className="text-xs sm:text-sm text-gray-600 font-medium">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-500">সাজান</span>
          <details className="relative group">
            <summary className="flex items-center gap-2 bg-white border border-gray-300 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer list-none select-none">
              <span>{currentLabel}</span>
              <span className="text-xs transition-transform duration-200 group-open:rotate-180">
                ▼
              </span>
            </summary>

            <div className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-24px)] bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20">
              {sortOptions.map((opt) => (
                <Link
                  key={opt.value}
                  href={`?sort=${opt.value}`}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-gray-700 flex items-center justify-between block"
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.value && <span>✓</span>}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full'>
        {sortedProducts.map((product, i) => (
          <Card key={product.id || i} product={product} />
        ))}
      </div>

    </div>
  );
};

const Page = ({ params, searchParams }) => {
  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      <Suspense fallback={<div className="py-20 text-center text-sm font-bold text-gray-500">তথ্য লোড হচ্ছে...</div>}>
        <Lodata params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Page;
