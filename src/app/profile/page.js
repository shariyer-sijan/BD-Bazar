"use client";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

    // Better Auth হুক দিয়ে কারেন্ট সেশন বা ইউজারের তথ্য ফেচ করা
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // নাম আপডেট করার জন্য স্টেট
    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // নাম আপডেট হ্যান্ডলার
   const handleUpdateName = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data, error } = await authClient.updateUser({
      name: name,
    });

    if (error) {
      toast.error(error.message || "নাম আপডেট করতে সমস্যা হয়েছে।");
      setLoading(false);
      return;
    }

    toast.success("নাম সফলভাবে হালনাগাদ করা হয়েছে!");
    setLoading(false);
    router.refresh();
  } catch (err) {
    console.error(err);
    toast.error("কোথাও কোনো ত্রুটি ঘটেছে।");
    setLoading(false);
  }
};

    // সাইন আউট হ্যান্ডলার
    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center">
                <p className="text-gray-500 font-medium">লোড হচ্ছে...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4f7f4] px-4 py-12 flex flex-col items-center">
            <div className="w-full max-w-[600px]">

                {/* হেডিং */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        আমার প্রোফাইল
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* সাকসেস বা এরর মেসেজ */}
                {message && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-medium rounded-xl text-center">
                        {message}
                    </div>
                )}

                {/* ১. ইউজার ইনফো কার্ড */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {/* অবতার বা লোগো */}
                        <div className="w-12 h-12 rounded-2xl bg-[#008037] text-white font-bold text-lg flex items-center justify-center uppercase shrink-0 shadow-sm">
                            {user?.name?.charAt(0) || "u"}
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 text-base">
                                {user?.name || "ব্যবহারকারী"}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                {user?.email || "email@example.com"}
                            </p>
                        </div>
                    </div>

                    {/* সাইন আউট বাটন */}
                    <button
                        onClick={handleSignOut}
                        className="border border-red-200 hover:bg-red-50 text-red-600 font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                        <span>↩</span>
                        <span>সাইন আউট</span>
                    </button>
                </div>

                {/* ২. নাম হালনাগাদ কার্ড */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                    <h3 className="font-bold text-gray-900 text-base mb-4">
                        নাম হালনাগাদ করুন
                    </h3>

                    <form onSubmit={handleUpdateName} className="space-y-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                                নাম
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#008037]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn bg-[#008037] hover:bg-[#006b2e] text-white font-bold text-sm px-6 h-10 min-h-0 rounded-xl border-none shadow-sm cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "হালনাগাদ হচ্ছে..." : "নাম হালনাগাদ করুন"}
                        </button>
                    </form>
                </div>

                {/* হোম পেজে ফিরে যাওয়ার লিংক */}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-xs font-medium text-gray-600 underline hover:text-gray-900"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Page;