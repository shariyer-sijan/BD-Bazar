import Image from 'next/image';
import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
const Gura = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data = await res.json();

  return (
    <div className="w-full bg-white border-b border-t border-gray-100 ">
      <MarqueeText direction='right'   pauseOnHover={true} duration={7}>
        {data.map((x, i) => (
          <div key={x.id || i} className='mx-5'>
            <span className='mx-1'>{x.image}</span>
            <span>{x.nameBn}</span>
            <span className='mx-1.5 text-gray-600'>{x.today}</span>
            <span className='text-gray-600 '>tk/</span><span className='text-gray-600'>{x.unit}</span>
            {x.change.dir === "up" ? <span className='text-green-700 mx-1.5'>▲{x.change.pct}</span> : <span className='text-red-700 mx-1.5'>▼{x.change.pct}</span>}
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Gura;