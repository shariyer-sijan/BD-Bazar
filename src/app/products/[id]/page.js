
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const ProductDetailsContent = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`);
  const data = await res.json();

  if( data.error==="Not found"){
    notFound()
  }
  const {nameBn,categoryNameBn,categoryIcon,today,yesterday, unit, image, change, markets,} = data;

  return (
    <div className="w-full max-w-[900px]">
      <div className="text-xs text-gray-500 mb-4 flex flex-wrap items-center gap-1.5 break-words">
        <Link href="/" className="hover:text-gray-800">হোম</Link>
        <span>›</span>
        <Link href={`/category/${data.category}`}>{categoryNameBn}</Link>
        <span>›</span>
        <span className="text-gray-900 font-bold">{nameBn}</span>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#f4f7f4] flex items-center justify-center text-2xl sm:text-3xl shadow-inner shrink-0">
            {categoryIcon || image || "🥔"}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 break-words">{nameBn}</h1>
            <p className="text-xs text-gray-500 mt-0.5">প্রতি {unit === "kg" ? "কেজি" : unit} · {categoryNameBn}</p>
            <p className={`text-xs font-medium mt-1 ${change?.dir === "up" ? "text-red-600" : "text-emerald-600"}`}>
              গতকালের তুলনায় আজ দাম {change?.dir === "up" ? "বেড়েছে" : "কমেছে"} {change?.pct}%
            </p>
          </div>
        </div>

        <div className="bg-[#f4f7f4] px-5 sm:px-6 py-3 rounded-2xl text-center shrink-0 w-full sm:w-auto">
          <span className="text-xs text-gray-500 block font-medium">আজকের দাম</span>
          <span className="text-2xl font-black text-gray-900">{today}</span>
          <span className="text-xs text-gray-600 block">টাকা / {unit === "kg" ? "কেজি" : unit}</span>
          <span className={`text-xs font-bold ${change?.dir === "up" ? "text-red-600" : "text-emerald-600"}`}>
            {change?.dir === "up" ? "▲" : "▼"} {change?.pct}%
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-base font-extrabold text-gray-900 mb-3">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <span className="text-xs text-gray-500 block">সর্বনিম্ন দাম</span>
            <span className="text-xl font-black text-emerald-600 mt-1 block">
              {markets.length > 0 ? Math.min(...markets.map(m => m.min)) : 0} টাকা
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5 block">সবচেয়ে কম দামের বাজার</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <span className="text-xs text-gray-500 block">সর্বাধিক দাম</span>
            <span className="text-xl font-black text-red-600 mt-1 block">
              {markets.length > 0 ? Math.max(...markets.map(m => m.max)) : 0} টাকা
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5 block">সবচেয়ে বেশি দামের বাজার</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <span className="text-xs text-gray-500 block">গড় দাম</span>
            <span className="text-xl font-black text-gray-900 mt-1 block">{today} টাকা</span>
            <span className="text-[11px] text-gray-400 mt-0.5 block">প্রতি কেজি-এর হিসেবে</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-6">
        <h2 className="text-base font-extrabold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto w-full">
          <table className="table w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-bold text-xs">
                <th className="bg-transparent">বাজার</th>
                <th className="bg-transparent">বিভাগ</th>
                <th className="bg-transparent">সর্বনিম্ন</th>
                <th className="bg-transparent">সর্বাধিক</th>
                <th className="bg-transparent text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.length > 0 ? (
                markets.map((m, index) => {
                  const avgPrice = ((m.min + m.max) / 2).toFixed(2);
                  return (
                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 text-gray-800">
                      <td className="font-bold">{m.market}</td>
                      <td>{m.division}</td>
                      <td>{m.min} টাকা</td>
                      <td>{m.max} টাকা</td>
                      <td className="text-right font-medium">{avgPrice} টাকা</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-4">কোনো বাজার ডেটা পাওয়া যায়নি</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Link href={`/category/${data.category}`} className="text-xs font-bold underline flex items-center gap-1">
          <span>{categoryIcon}</span>
          <span> সব </span>
          <span> {categoryNameBn}</span>
        </Link>
      </div>
    </div>
  );
};

const Page = ({ params }) => {
  return (
    <div className="min-h-screen bg-[#f4f7f4] px-3 sm:px-4 py-5 sm:py-8 flex flex-col items-center">
      <Suspense fallback={<div className="py-20 text-sm font-bold text-gray-500">প্রোডাক্টের তথ্য লোড হচ্ছে...</div>}>
        <ProductDetailsContent params={params} />
      </Suspense>
    </div>
  );
};

export default Page;
