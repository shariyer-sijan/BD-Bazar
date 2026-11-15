import React from 'react';

const Priceup = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const data = await res.json();
    const barche= data.filter((x)=> x.change.dir==='up') ;
    const topUpProducts = [...barche]
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
    return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    

    <div className="flex items-center gap-2 mb-6">
      <span className="text-red-500 text-lg">▲</span>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        আজ দাম বেড়েছে
      </h2>
    </div>

    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topUpProducts.map((x, i) => (
        <div
          key={x.id || i}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
        >
  
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl">
              { x.image || "📦"}
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

          {/* কার্ডের নিচের অংশ: আজকের দাম এবং পার্সেন্টিজ ব্যাজ */}
          <div className="flex items-end justify-between border-t border-gray-50 pt-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">আজকের দাম</p>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {x.today} <span className="text-base font-normal text-gray-600">টাকা</span>
              </div>
            </div>

            {/* লাল রঙের পার্সেন্টেজ ব্যাজ */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-bold">
              <span>▲</span>
              <span>{x.change.pct}%</span>
            </div>
          </div>
          
        </div>
      ))}
    </div>

  </div>
);F
};

export default Priceup;