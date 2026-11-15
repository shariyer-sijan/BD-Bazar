"use client";
import { useState, useEffect } from "react";

export default function Timekoto() {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const formatted = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDateStr(formatted);
  }, []);

  return (
    <span className="text-xs sm:text-sm font-medium">
      {dateStr || "লোড হচ্ছে..."}
    </span>
  );
}