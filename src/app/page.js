import { Suspense } from "react";
import Gura from "./Gura";
import Banner from "./Banner";
import Priceup from "./Priceup";
import Pricedown from "./Pricedown";
import Allprice from "./Allprice";

export default function Home() {

  return (
    <div>

     
      <Suspense fallback={<div className="text-center py-4 text-gray-500 font-medium">লোড হচ্ছে...</div>}>
        <Gura />
      </Suspense>
      <Banner></Banner>
      <Suspense fallback={<div className="text-center py-4 text-gray-500 font-medium">লোড হচ্ছে...</div>}>
        <Priceup></Priceup>
      </Suspense>

      <Suspense fallback={<div className="text-center py-4 text-gray-500 font-medium">লোড হচ্ছে...</div>}>
        <Pricedown></Pricedown>
      </Suspense>

      <Suspense fallback={<div className="text-center py-4 text-gray-500 font-medium">লোড হচ্ছে...</div>}>
        <Allprice></Allprice>
      </Suspense>
    </div>
  );
}
