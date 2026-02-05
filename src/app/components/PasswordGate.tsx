"use client";

import Image from "next/image";
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

    setError("Mật khẩu chưa đúng. Thử lại nhé em.");
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[linear-gradient(135deg,#ffe4ec_0%,#fffafc_45%,#e8e0f0_100%)] p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-white/45" />
        <Image
          src="/img/h6.jpg"
          alt="Ảnh của em"
          fill
          priority
          sizes="100vw"
          className="object-contain opacity-60 blur-md"
        />
      </div>
      <motion.div
        className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-white/80 bg-white/80 p-8 text-center shadow-[0_30px_90px_rgba(95,66,80,0.18)] backdrop-blur"
        initial={
          prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#ffe4ec]/70 blur-2xl" />
        <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-[#e8e0f0]/70 blur-2xl" />
        <motion.span
          className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe4ec] text-2xl text-[#b8647f]"
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }
          }
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ❤
        </motion.span>
        <h1 className="font-display mt-4 text-3xl font-semibold text-[#4b2b36]">
          Món quà bí mật
        </h1>
        <p className="mt-2 text-sm text-[#7c5b69]">
          Nhập mật khẩu để mở cánh cửa trái tim.
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
          {error ? (
            <p className="text-sm text-[#c1667f]">{error}</p>
          ) : null}
          <button
            className="w-full rounded-full bg-[#4b2b36] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-[#5d3643]"
            type="submit"
          >
            Mở quà
          </button>
        </form>
        <p className="mt-5 text-xs text-[#b48a98]">
          Gợi ý: một từ nhỏ đầy yêu thương.
        </p>
      </motion.div>
    </motion.div>
  );
};
