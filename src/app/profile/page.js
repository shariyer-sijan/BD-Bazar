
"use client";

import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(false);

    const handleUpdateName = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await authClient.updateUser({
                name: name,
            });

            if (error) {
                toast.error(error.message || "নাম আপডেট করতে সমস্যা হয়েছে।");
                return;
            }

            toast.success("নাম সফলভাবে হালনাগাদ করা হয়েছে!");
            router.refresh();
        } catch (err) {
            console.error(err);
            toast.error("কোথাও কোনো ত্রুটি ঘটেছে।");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-[#f0f5f1] flex items-center justify-center px-4">
                <p className="text-gray-500 font-medium">লোড হচ্ছে...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f0f5f1] px-3 sm:px-4 py-6 sm:py-8 md:py-12 flex flex-col items-center">

            <div className="w-full max-w-[540px]">

                <div className="mb-5">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                        আমার প্রোফাইল
                    </h1>

                    <p className="text-xs text-gray-500 mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                <div className="bg-[#fafcfb] rounded-2xl border border-[#e3ebe5] p-3 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">

                    <div className="flex items-center gap-3 min-w-0">

                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#008037] text-white font-bold text-lg flex items-center justify-center uppercase shrink-0 shadow-sm">
                            {user?.name?.charAt(0) || "u"}
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-base font-medium text-gray-900 truncate">
                                {user?.name || "ব্যবহারকারী"}
                            </h2>

                            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 truncate">
                                {user?.email || "email@example.com"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="border border-red-400 hover:bg-red-50 text-red-600 font-medium text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 shrink-0 w-full sm:w-auto"
                    >
                        <span>↩</span>
                        <span>সাইন আউট</span>
                    </button>
                </div>

                <div className="bg-[#fafcfb] rounded-2xl border border-[#e3ebe5] p-4 sm:p-6">

                    <h3 className="font-bold text-gray-900 text-sm mb-5 sm:mb-6">
                        তথ্য
                    </h3>

                    <form onSubmit={handleUpdateName} className="space-y-3">

                        <div>
                            <label className="block text-xs font-medium text-gray-800 mb-1.5">
                                নাম
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-3 py-2 rounded-lg border border-[#dfe8e1] bg-transparent text-gray-900 text-sm focus:outline-none focus:border-[#008037]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#008b43] hover:bg-[#007536] text-white font-bold text-sm h-10 rounded-lg shadow-sm cursor-pointer transition-colors disabled:opacity-50"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>

                    </form>
                </div>

                <div className="mt-5 text-center">
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
