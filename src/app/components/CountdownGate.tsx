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
      className="relative flex min-h-screen items-center justify-center bg-[#fffafc] px-6 py-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffe4ec,transparent_65%)] opacity-70" />
      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr]">
          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
            <div className="relative h-72 w-full sm:h-80 lg:h-96">
              <div className="absolute left-0 top-6 h-44 w-36 rotate-[-8deg] rounded-[26px] bg-white/85 p-2 shadow-[0_18px_40px_rgba(93,64,80,0.18)] backdrop-blur sm:h-52 sm:w-44 lg:h-60 lg:w-52">
                <div className="h-full w-full rounded-[20px] bg-[url('/img/h2.jpg')] bg-cover bg-center opacity-90" />
                <div className="absolute -top-3 left-6 h-6 w-16 -rotate-6 rounded-full bg-[#f6e5d9] opacity-80 shadow-[0_10px_20px_rgba(93,64,80,0.15)]" />
              </div>
              <div className="absolute right-4 top-16 h-48 w-40 rotate-6 rounded-[26px] bg-white/85 p-2 shadow-[0_18px_40px_rgba(93,64,80,0.18)] backdrop-blur sm:right-10 sm:h-56 sm:w-48 lg:h-64 lg:w-56">
                <div className="h-full w-full rounded-[20px] bg-[url('/img/h4.jpg')] bg-cover bg-center opacity-90" />
                <div className="absolute -bottom-3 right-8 h-6 w-16 rotate-[8deg] rounded-full bg-[#f8d7e6] opacity-70 shadow-[0_10px_20px_rgba(93,64,80,0.12)]" />
              </div>
              <div className="absolute bottom-2 left-10 h-36 w-32 rotate-60 rounded-[26px] bg-white/85 p-2 shadow-[0_16px_36px_rgba(93,64,80,0.16)] backdrop-blur sm:bottom-4 sm:left-14 sm:h-44 sm:w-36 lg:h-52 lg:w-44">
                <div className="h-full w-full rounded-[20px] bg-[url('/img/h10.jpg')] bg-cover bg-center opacity-90" />
                <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-white/80 bg-[#f2c7d6] shadow-[0_8px_16px_rgba(93,64,80,0.18)]" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c58a9f]">
              <span className="h-px flex-1 bg-[#f2c7d6]" />
              Yêu em ❤️
              <span className="h-px flex-1 bg-[#f2c7d6]" />
            </div>
          </div>
          <div className="relative w-full rounded-[28px] border border-white/70 bg-white/80 p-10 text-center shadow-[0_30px_80px_rgba(93,64,80,0.18)] backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c58a9f]">
              Còn một chút nữa
            </div>
            <h1 className="mt-4 font-display text-3xl text-[#5a2f3a] sm:text-4xl">
              Món quà sẽ mở vào <br /> 14-02-2026
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
        </div>
      </div>
    </motion.section>
  );
};
