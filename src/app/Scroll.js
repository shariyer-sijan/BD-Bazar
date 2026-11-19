
"use client";

import React from 'react';

const Scroll = () => {
    const handleScroll = () => {
        document.getElementById("products")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <button
            onClick={handleScroll}
            className="btn bg-[#008037] hover:bg-[#006b2e] text-white font-bold text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 min-h-0 rounded-xl border-none shadow-md transition-all duration-200"
        >
            সব পণ্য দেখুন
        </button>
    );
};

export default Scroll;
