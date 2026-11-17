"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formdata = new FormData(e.target);
    const user = Object.fromEntries(formdata.entries());

    try {
      const { data, error } = await authClient.signIn.email({ ...user, callbackURL: "/" });

      if (error) {
        toast.error(error.message || "সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error(err);
      toast.error("কোথাও কোনো ত্রুটি ঘটেছে।");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] flex flex-col items-center justify-center px-4 py-12">
      {/* উপরের হেডিং */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          সাইন ইন
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* সাদা কার্ড ফর্ম কন্টেইনার */}
      <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
        
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* ইমেইল */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#008037]"
            />
          </div>

          {/* পাসওয়ার্ড */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#008037]"
            />
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="btn bg-[#008037] hover:bg-[#006b2e] text-white w-full mt-2 border-none shadow-sm text-base font-bold min-h-11 h-11 rounded-xl cursor-pointer disabled:opacity-50"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        {/* ডিভাইডার */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-xs text-gray-500 font-medium">
            অথবা
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* সোশ্যাল বাটনগুলো (লোগো সহ) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google Button */}
          <button
            type="button"
            className="btn bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold text-xs h-auto py-2.5 rounded-xl shadow-none normal-case cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span className="leading-tight text-center">
              Google দিয়ে <br /> চালিয়ে যান
            </span>
          </button>

          {/* GitHub Button */}
          <button
            type="button"
            className="btn bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold text-xs h-auto py-2.5 rounded-xl shadow-none normal-case cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 shrink-0 fill-gray-900" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className="leading-tight text-center">
              GitHub দিয়ে <br /> চালিয়ে যান
            </span>
          </button>
        </div>

        {/* নিচের সাইন আপ লিংক */}
        <p className="text-center text-xs text-gray-600 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-bold text-[#008037] underline hover:text-[#006b2e]"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      {/* হোম পেজে ফিরে যাওয়ার লিংক */}
      <Link
        href="/"
        className="mt-6 text-xs font-medium text-gray-600 underline hover:text-gray-900"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default Page;