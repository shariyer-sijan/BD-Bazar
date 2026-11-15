import React from 'react';

const Pricedown = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const data = await res.json();
    const barche = data.filter((x) => x.change.dir === "down");
    const topDownProducts = [...barche].sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct)).slice(0, 6);
    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* সেকশন টাইটেল (সবুজ রঙের অ্যারো ও হেডিং) */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-green-600 text-lg">▼</span>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          আজ দাম কমেছে
        </h2>
      </div>

      {/* কার্ডগুলোর গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topDownProducts.map((x, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
          >
            {/* কার্ডের উপরের অংশ: আইকন, নাম ও ইউনিট */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl">
                {x.image }
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

            
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-bold">
                <span>▼</span>
                <span>{Math.abs(x.change.pct)}%</span>
              </div>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
};
export default Pricedown;