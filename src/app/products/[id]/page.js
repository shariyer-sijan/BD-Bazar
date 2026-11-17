import Link from "next/link";
import { Suspense } from "react";

// ১. ডেটা ফেচিং ও ইউআই কম্পোনেন্ট (এটি Suspense-এর ভেতরে থাকবে)
const ProductDetailsContent = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`);
  const data = await res.json();
 
  const {
    nameBn = "নাম পাওয়া যায়নি",
    categoryNameBn = "ক্যাটাগরি",
    categoryIcon = "🥔",
    today = 0,
    yesterday = 0,
    unit = "kg",
    image = "",
    change = { dir: "up", pct: 0 },
    markets = [],
  } = data;

  return (
    <div className="w-full max-w-[900px]">
      {/* ব্রেডক্রাম্ব */}
      <div className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
        <Link href="/" className="hover:text-gray-800">হোম</Link>
        <span>›</span>
        <span>{categoryNameBn}</span>
        <span>›</span>
        <span className="text-gray-900 font-bold">{nameBn}</span>
      </div>

      {/* টপ হেডার কার্ড */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#f4f7f4] flex items-center justify-center text-3xl shadow-inner shrink-0">
            {categoryIcon || image || "🥔"}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">{nameBn}</h1>
            <p className="text-xs text-gray-500 mt-0.5">প্রতি {unit === "kg" ? "কেজি" : unit} · {categoryNameBn}</p>
            <p className={`text-xs font-medium mt-1 ${change?.dir === "up" ? "text-red-600" : "text-emerald-600"}`}>
              গতকালের তুলনায় আজ দাম {change?.dir === "up" ? "বেড়েছে" : "কমেছে"} {change?.pct}%
            </p>
          </div>
        </div>

        <div className="bg-[#f4f7f4] px-6 py-3 rounded-2xl text-center shrink-0 w-full sm:w-auto">
          <span className="text-xs text-gray-500 block font-medium">আজকের দাম</span>
          <span className="text-2xl font-black text-gray-900">{today}</span>
          <span className="text-xs text-gray-600 block">টাকা / {unit === "kg" ? "কেজি" : unit}</span>
          <span className={`text-xs font-bold ${change?.dir === "up" ? "text-red-600" : "text-emerald-600"}`}>
            {change?.dir === "up" ? "▲" : "▼"} {change?.pct}%
          </span>
        </div>
      </div>

      {/* দামের সারসংক্ষেপ */}
      <div className="mb-6">
        <h2 className="text-base font-extrabold text-gray-900 mb-3">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <span className="text-xs text-gray-500 block">গতকালের দাম</span>
            <span className="text-xl font-black text-gray-900 mt-1 block">{yesterday} টাকা</span>
            <span className="text-[11px] text-gray-400 mt-0.5 block">তুলনামূলক পূর্বের মূল্য</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <span className="text-xs text-gray-500 block">আজকের দাম</span>
            <span className="text-xl font-black text-gray-900 mt-1 block">{today} টাকা</span>
            <span className="text-[11px] text-gray-400 mt-0.5 block">বর্তমান বাজারদর</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <span className="text-xs text-gray-500 block">পরিবর্তন</span>
            <span className={`text-xl font-black mt-1 block ${change?.dir === "up" ? "text-red-600" : "text-emerald-600"}`}>
              {change?.dir === "up" ? "+" : "-"}{change?.pct}%
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5 block">বাজারের তারতম্য</span>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-6">
        <h2 className="text-base font-extrabold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-bold text-xs">
                <th className="bg-transparent">বাজার</th>
                <th className="bg-transparent">বিভাগ</th>
                <th className="bg-transparent">সর্বনিম্ন</th>
                <th className="bg-transparent text-right">সর্বাধিক</th>
              </tr>
            </thead>
            <tbody>
              {markets.length > 0 ? (
                markets.map((m, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 text-gray-800">
                    <td className="font-bold">{m.market}</td>
                    <td>{m.division}</td>
                    <td>{m.min} টাকা</td>
                    <td className="text-right font-medium">{m.max} টাকা</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-400 py-4">কোনো বাজার ডেটা পাওয়া যায়নি</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ব্যাক লিংক */}
      <div>
        <Link href="/" className="text-xs font-bold text-[#008037] underline flex items-center gap-1">
          <span>🌿</span>
          <span>হোমে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
};

// ২. মূল পেজ কম্পোনেন্ট যেখানে Suspense দিয়ে র‍্যাপ করা হয়েছে
const Page = ({ params }) => {
  return (
    <div className="min-h-screen bg-[#f4f7f4] px-4 py-8 flex flex-col items-center">
      <Suspense fallback={<div className="py-20 text-sm font-bold text-gray-500">প্রোডাক্টের তথ্য লোড হচ্ছে...</div>}>
        <ProductDetailsContent params={params} />
      </Suspense>
    </div>
  );
};

export default Page;