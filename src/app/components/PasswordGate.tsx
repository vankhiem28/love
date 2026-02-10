"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { FormEvent } from "react";
import { useState } from "react";
import { GIFT_PASSWORD } from "../content";

type PasswordGateProps = {
  onUnlock: () => void;
};

export const PasswordGate = ({ onUnlock }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.trim().toLowerCase() === GIFT_PASSWORD.toLowerCase()) {
      onUnlock();
      return;
    }

    setError("Chưa đúng rồi nè, thử lại xíu nha.");
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,#ffe4ec_0%,#fffafc_55%,#e8e0f0_100%)] p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-white/80 bg-white/85 p-8 text-center shadow-[0_35px_90px_rgba(95,66,80,0.2)] backdrop-blur"
        initial={
          prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#ffe4ec]/70 blur-2xl" />
        <div className="absolute -left-14 bottom-0 h-36 w-36 rounded-full bg-[#e8e0f0]/70 blur-2xl" />
        <div className="pointer-events-none absolute left-6 right-6 top-0 z-10 h-20 -translate-y-1/2 overflow-hidden">
          <div className="absolute inset-y-0 w-[60%] bg-linear-to-r from-transparent via-white/80 to-transparent shimmer-once" />
        </div>
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe4ec] text-3xl text-[#b8647f] shadow-[0_12px_30px_rgba(93,64,80,0.2)] pulse-glow">
          <span className="absolute inset-0 rounded-full pulse-ring" />
          ❤
        </div>
        <h1 className="font-display mt-5 text-3xl font-semibold text-[#4b2b36]">
          Bí mật nhỏ xinh
        </h1>
        <p className="mt-2 text-sm text-[#7c5b69]">
          Nhập mật khẩu để mở quà nha.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full rounded-full border border-[#f1c7d6] bg-white px-5 py-3 text-center text-base text-[#4b2b36] outline-none transition focus:border-[#e8a6bf] focus:ring-2 focus:ring-[#f7d3e1]"
            placeholder="Mật khẩu riêng của chúng mình"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
          />
          {error ? <p className="text-sm text-[#c1667f]">{error}</p> : null}
          <button
            className="w-full rounded-full bg-[#4b2b36] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-[#5d3643]"
            type="submit"
          >
            Mở ngay
          </button>
        </form>
        <p className="mt-5 text-xs text-[#b48a98]">
          提示：小宝贝的生日。
        </p>
      </motion.div>
    </motion.div>
  );
};
