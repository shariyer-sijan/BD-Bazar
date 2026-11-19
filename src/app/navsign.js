
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const Navsign = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="shrink-0">
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 sm:gap-2 text-gray-700 px-2 sm:px-3.5 py-1.5 rounded-full shadow-sm hover:bg-gray-300 transition-colors cursor-pointer max-w-[160px] sm:max-w-none"
          >
            <span className="w-6 h-6 rounded-full bg-[#008037] flex items-center justify-center font-bold text-xs uppercase shrink-0">
              {user?.name?.charAt(0)}
            </span>

            <span className="font-medium text-xs sm:text-sm truncate">
              {user?.name}
            </span>

            <span className="text-xs opacity-80 shrink-0">▾</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
              <div className="px-3 py-2.5 border-b border-gray-100">
                <p className="font-bold text-gray-900 text-sm truncate">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {user?.email}
                </p>
              </div>

              <div className="py-1 space-y-0.5">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <span className="text-gray-500">👤</span>
                  <span>আমার প্রোফাইল</span>
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left cursor-pointer"
                >
                  <span>↩</span>
                  <span>সাইন আউট</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/signin"
            className="text-xs sm:text-base font-bold text-[#1f2937] hover:text-[#008037] transition-colors whitespace-nowrap"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn bg-[#008037] hover:bg-[#006b2e] text-white font-bold text-xs sm:text-base px-3 sm:px-6 h-9 sm:h-11 min-h-0 rounded-xl border-none shadow-md whitespace-nowrap"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navsign;
