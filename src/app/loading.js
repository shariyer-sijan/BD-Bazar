const Loading = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#f0f5f1]">

            <div className="w-12 h-12 border-4 border-[#d5e5d9] border-t-[#008037] rounded-full animate-spin"></div>

            <h2 className="text-lg font-bold text-gray-800 mt-5">
                লোড হচ্ছে...
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                অনুগ্রহ করে অপেক্ষা করুন।
            </p>

        </div>
    );
};

export default Loading;