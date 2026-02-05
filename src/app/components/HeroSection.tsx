"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FallingHeartsRain } from "./FallingHeartsRain";
import { GIRLFRIEND_NAME, HERO_BACKGROUND_IMAGES, PET_NAME } from "../content";

const HERO_PHOTO_LAYOUT = [
  { left: "5%", top: "10%", width: 200, height: 260, rotate: -8, opacity: 0.32 },
  { left: "70%", top: "6%", width: 180, height: 240, rotate: 7, opacity: 0.3 },
  { left: "10%", top: "58%", width: 170, height: 230, rotate: 5, opacity: 0.28 },
  { left: "68%", top: "56%", width: 190, height: 250, rotate: -6, opacity: 0.3 },
];

export const HeroSection = () => (
  <section className="relative min-h-screen overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-b from-(--pink-soft) via-[#fffafc] to-(--lavender-soft)" />
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-white/25" />
      {HERO_PHOTO_LAYOUT.map((slot, index) => {
        const image =
          HERO_BACKGROUND_IMAGES[index % HERO_BACKGROUND_IMAGES.length];

        return (
          <div
            key={`${image.src}-${slot.left}-${slot.top}`}
            className="absolute overflow-hidden rounded-3xl border border-white/70 bg-white/40 shadow-[0_15px_45px_rgba(93,64,80,0.12)]"
            style={{
              left: slot.left,
              top: slot.top,
              width: `${slot.width}px`,
              height: `${slot.height}px`,
              transform: `rotate(${slot.rotate}deg)`,
              opacity: slot.opacity,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 120px, 160px"
              className="object-cover object-top"
              priority={index === 0}
            />
          </div>
        );
      })}
    </div>
    <FallingHeartsRain />
    <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
      <motion.p
        className="text-sm uppercase tracking-[0.4em] text-[#b07a8a]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        For {GIRLFRIEND_NAME}
      </motion.p>
      <motion.h1
        className="font-display mt-5 text-4xl font-semibold text-[#4b2b36] md:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
      >
        Một trang nhỏ dành riêng cho {PET_NAME}
      </motion.h1>
      <motion.p
        className="mt-6 max-w-2xl text-base text-[#6d4b5a] md:text-lg"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        Hãy kéo xuống để đọc câu chuyện của mình — từ những ngày đầu, qua một
        khoảng lặng nho nhỏ, đến hôm nay khi tụi mình vẫn chọn nhau mỗi ngày.
      </motion.p>
      <motion.div
        className="mt-12 flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-6 py-2 text-xs uppercase tracking-[0.4em] text-[#a36b7f]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        Scroll
        <span className="text-base">↓</span>
      </motion.div>
    </div>
  </section>
);
