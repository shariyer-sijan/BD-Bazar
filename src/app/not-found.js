import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-white">

            <h1 className="text-8xl sm:text-9xl font-extrabold text-[#008037]">
                404
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-4">
                পেজটি খুঁজে পাওয়া যায়নি!
            </h2>

            <p className="text-sm text-gray-500 mt-2 max-w-md">
                দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি খুঁজে পাওয়া যাচ্ছে না।
                হয়তো পেজটি সরানো হয়েছে অথবা লিংকটি ভুল।
            </p>

            <Link
                href="/"
                className="mt-6 bg-[#008037] hover:bg-[#006b2e] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-colors"
            >
                ← হোম পেজে ফিরে যান
            </Link>

        </div>
    );
};

export default NotFound;