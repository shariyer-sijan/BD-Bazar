import Link from 'next/link';
import React from 'react';
import Card from './Card';

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
        {topDownProducts.map((product) => (
          <Card key={product.id } product={product} />
        ))}
      </div>

    </div>
  );
};
export default Pricedown;