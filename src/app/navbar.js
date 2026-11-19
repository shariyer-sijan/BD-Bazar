
import Image from "next/image";
import Link from "next/link";
import Timekoto from "./Timekoto";
import Navsign from "./navsign";
import Navcategory from "./Navcategory";

export default async function Navv() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
  const data = await res.json();

  return (
    <div className="sticky top-0 z-50 bg-white">
      <header className="w-full border-b border-gray-100">
        <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 justify-between min-h-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#008037] flex items-center justify-center shadow-sm shrink-0">
              <Link href="/">
                <Image
                  src="/logo-icon.png"
                  alt="বাজার দর লোগো"
                  width={26}
                  height={26}
                  className="object-contain brightness-150 contrast-125"
                />
              </Link>
            </div>

            <div className="flex flex-col min-w-0">
              <Link
                href="/"
                className="text-xl sm:text-2xl font-bold text-[#1f2937] leading-tight"
              >
                বাজার দর
              </Link>

              <span className="text-[11px] sm:text-sm text-gray-500 mt-0.5 min-h-[20px]">
                <Timekoto />
              </span>
            </div>
          </div>

          <Navsign />
        </div>
      </header>

      <Navcategory data={data} />
    </div>
  );
}
