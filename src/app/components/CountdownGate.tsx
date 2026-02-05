"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { COUNTDOWN_TARGET } from "../content";
import { useCountdown } from "../hooks/useCountdown";

type CountdownGateProps = {
  onComplete: () => void;
};

export const CountdownGate = ({ onComplete }: CountdownGateProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { timeLeft, isExpired } = useCountdown(COUNTDOWN_TARGET);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isExpired) {
      onComplete();
    }
  }, [isExpired, onComplete]);

  const parts = useMemo(
    () => [
      { label: "Ngày", value: timeLeft.days },
      { label: "Giờ", value: timeLeft.hours },
      { label: "Phút", value: timeLeft.minutes },
      { label: "Giây", value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  if (!isMounted) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="relative flex min-h-screen items-center justify-center bg-[#fffafc] px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffe4ec,transparent_65%)] opacity-70" />
      <div className="relative w-full max-w-2xl rounded-4xl border border-white/70 bg-white/80 p-10 text-center shadow-[0_30px_80px_rgba(93,64,80,0.18)] backdrop-blur">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#c58a9f]">
          Còn một chút nữa
        </div>
        <h1 className="mt-4 font-display text-3xl text-[#5a2f3a] sm:text-4xl">
          Món quà sẽ mở vào 14-02-2026
        </h1>
        <p className="mt-3 text-sm text-[#7b4a5b]">
          Đợi thêm xíu nhé, đúng ngày thì cửa sẽ mở ra.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {parts.map((part) => (
            <div
              key={part.label}
              className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 text-center"
            >
              <div className="text-2xl font-semibold text-[#5a2f3a]">
                {part.value.toString().padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#9a6b7b]">
                {part.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-xs text-[#9a6b7b]">
          21:00 ngày 14-02-2026 là mở ngay nha.
        </div>
      </div>
    </motion.section>
  );
};
