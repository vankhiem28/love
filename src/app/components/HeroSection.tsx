"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FallingHeartsRain } from "./FallingHeartsRain";
import { GIRLFRIEND_NAME, HERO_BACKGROUND_IMAGES, PET_NAME } from "../content";

const HERO_IMAGES = HERO_BACKGROUND_IMAGES.slice(0, 4);
const [HERO_MAIN, HERO_ACCENT_ONE] = HERO_IMAGES;

export const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 hero-aurora" />
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-[#ffe4ec]/60 blur-3xl"
          animate={
            prefersReducedMotion ? undefined : { y: [0, -18, 0], x: [0, 10, 0] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-10 bottom-20 h-72 w-72 rounded-full bg-[#e8e0f0]/55 blur-3xl"
          animate={
            prefersReducedMotion ? undefined : { y: [0, 14, 0], x: [0, -12, 0] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[20%] top-[12%] h-28 w-28 rounded-full bg-white/60 blur-2xl"
          animate={
            prefersReducedMotion ? undefined : { y: [0, -10, 0], opacity: [0.6, 0.9, 0.6] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <FallingHeartsRain />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center lg:text-left">
          <motion.p
            className="text-xs uppercase tracking-[0.45em] text-[#b07a8a]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            For {GIRLFRIEND_NAME}
          </motion.p>
          <motion.h1
            className="font-display mt-5 text-4xl font-semibold text-[#4b2b36] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
          >
            Một trang nhỏ dành riêng cho {PET_NAME}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base text-[#6d4b5a] sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            Hãy kéo xuống để đọc câu chuyện của mình — từ những ngày đầu, qua một
            khoảng lặng nho nhỏ, đến hôm nay khi tụi mình vẫn chọn nhau mỗi ngày.
          </motion.p>
          <motion.div
            className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-6 py-2 text-xs uppercase tracking-[0.4em] text-[#a36b7f] lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Scroll
            <span className="text-base">↓</span>
          </motion.div>
        </div>
        <motion.div
          className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            className="relative aspect-4/5 rounded-[36px] border border-white/70 bg-white/85 p-2 shadow-[0_32px_90px_rgba(93,64,80,0.2)]"
            animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -top-4 left-10 h-7 w-20 rotate-[-8deg] rounded-full bg-[#f6e5d9] opacity-80 shadow-[0_10px_24px_rgba(93,64,80,0.12)]" />
            <Image
              src={HERO_MAIN?.src ?? HERO_BACKGROUND_IMAGES[0].src}
              alt={HERO_MAIN?.alt ?? "Hero photo"}
              fill
              sizes="(max-width: 768px) 280px, 360px"
              className="rounded-[30px] object-cover"
              priority
            />
            <div className="absolute inset-0 rounded-[30px] hero-sheen" />
          </motion.div>
          <motion.div
            className="absolute -right-8 -top-10 hidden w-36 rotate-[8deg] rounded-[26px] border border-white/70 bg-white/85 p-2 shadow-[0_20px_45px_rgba(93,64,80,0.16)] sm:block"
            animate={
              prefersReducedMotion ? undefined : { y: [0, 12, 0], rotate: [8, 6, 8] }
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={HERO_ACCENT_ONE?.src ?? HERO_BACKGROUND_IMAGES[1].src}
              alt={HERO_ACCENT_ONE?.alt ?? "Accent photo"}
              width={160}
              height={210}
              className="h-40 w-full rounded-[20px] object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
