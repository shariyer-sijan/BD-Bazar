"use client";

import Link from 'next/link';
import React from 'react';
import { useParams } from 'next/navigation'; // বর্তমান রাউটের প্যারামিটার ধরার জন্য

const Navcategory = ({ data }) => {
    const params = useParams();
    const currentId = params?.id; // URL থেকে বর্তমান ক্যাটাগরির আইডি বা স্লাগ ধরবে

    return (
        <div className='border-b border-gray-100 py-2 bg-white'>
            <div className='flex max-w-6xl mx-auto overflow-x-auto scrollbar-none px-4 gap-2'>
                {
                    data.map((x, i) => {
                        // চেক করা হচ্ছে URL-এর আইডি এই ক্যাটাগরির আইডির সাথে মিলে কিনা
                        const isActive = currentId === String(x.id);

                        return (
                            <Link key={x.id || i} href={`/category/${x.id}`}>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-200 shrink-0 ${
                                    isActive
                                        ? "bg-[#008037] text-white shadow-sm font-bold" // সিলেক্ট করা থাকলে সবুজ
                                        : "text-gray-700 bg-gray-50 hover:bg-gray-100"   // সাধারণ অবস্থায় নরমাল
                                }`}>
                                    <span>{x.icon}</span>
                                    <span>{x.nameBn}</span>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Navcategory;