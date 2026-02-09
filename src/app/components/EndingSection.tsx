"use client";

import { GIRLFRIEND_NAME } from "../content";
import { HeartOrb } from "./HeartOrb";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const HEART_PARTICLES = [
  { left: "8%", top: "18%", size: 18, delay: "0s", duration: "8s" },
  { left: "18%", top: "70%", size: 14, delay: "1.2s", duration: "9s" },
  { left: "32%", top: "10%", size: 12, delay: "0.6s", duration: "7.5s" },
  { left: "48%", top: "82%", size: 16, delay: "1.8s", duration: "8.5s" },
  { left: "62%", top: "22%", size: 14, delay: "0.9s", duration: "7.2s" },
  { left: "76%", top: "68%", size: 18, delay: "1.5s", duration: "9.2s" },
  { left: "88%", top: "28%", size: 12, delay: "0.3s", duration: "8.8s" },
];

export const EndingSection = () => (
  <section className="relative overflow-hidden bg-[#fffafc] py-24">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffe4ec_0%,#fffafc_55%,#e8e0f0_100%)] opacity-80" />
    <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#ffe4ec]/55 blur-3xl" />
    <div className="absolute -right-16 bottom-12 h-80 w-80 rounded-full bg-[#e8e0f0]/55 blur-3xl" />
    <div className="pointer-events-none absolute inset-0">
      {HEART_PARTICLES.map((particle, index) => (
        <span
          key={`heart-${particle.left}-${particle.top}-${index}`}
          className="absolute text-[#f0b8cc] heart-float"
          style={{
            left: particle.left,
            top: particle.top,
            fontSize: `${particle.size}px`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        >
          ❤
        </span>
      ))}
      <span className="absolute left-[12%] top-[42%] h-2 w-2 rounded-full bg-white/70 sparkle" />
      <span className="absolute right-[18%] top-[38%] h-2 w-2 rounded-full bg-white/70 sparkle" />
      <span className="absolute right-[28%] bottom-[18%] h-2 w-2 rounded-full bg-white/70 sparkle" />
    </div>
    <div className="relative mx-auto max-w-4xl px-6 text-center">
      <Reveal>
        <SectionHeading
          eyebrow="Forever"
          title="Lời kết từ trái tim"
          subtitle="Và câu nói mà anh muốn nhắc lại mỗi ngày."
        />
      </Reveal>
      <Reveal className="mx-auto mt-12 w-full max-w-xl">
        <div className="relative rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-[0_28px_80px_rgba(93,64,80,0.18)] backdrop-blur sm:p-10">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#ffe4ec]/60 blur-2xl" />
          <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-[#e8e0f0]/60 blur-2xl" />
          <div className="absolute left-1/2 top-10 h-60 w-60 -translate-x-1/2 rounded-full bg-[#f8d7e6]/55 blur-2xl halo-pulse" />
          <div className="text-[11px] uppercase tracking-[0.4em] text-[#b07a8a]">
            Lời nhắn nhỏ
          </div>
          <h3 className="font-display mt-4 text-3xl text-[#4b2b36] md:text-4xl">
            Anh yêu em, {GIRLFRIEND_NAME}.
          </h3>
          <p className="mt-4 text-base text-[#6f4e5d]">
            Cảm ơn em vì đã trở lại và chọn chúng ta thêm một lần nữa. Anh vẫn ở
            đây, nắm tay em thật chặt và cùng em bước tiếp.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#f1c7d6] bg-white/70 px-5 py-2 text-xs text-[#7a5564]">
              ♪ Gợi ý: mở bài hát của tụi mình và đọc lại từ đầu.
            </div>
          </div>
          <div className="relative mt-10 flex justify-center">
            {/* <div className="absolute -inset-10 rounded-full border border-[#f1c7d6]/70 border-dashed ring-spin-slow" />
            <div className="absolute -inset-16 rounded-full border border-[#d9b5c3]/50 border-dotted ring-spin" /> */}
            <div className="absolute -inset-20 rounded-full bg-[#f8d7e6]/40 blur-2xl halo-pulse" />
            <div className="relative flex h-60 w-60 items-center justify-center rounded-full border border-white/70 bg-[#fff7fb] shadow-[0_22px_55px_rgba(93,64,80,0.18)]">
              <HeartOrb />
            </div>
            <span className="absolute -right-4 top-6 text-lg text-[#f0b8cc] heart-float">
              ❤
            </span>
            <span className="absolute -left-6 bottom-6 text-sm text-[#f0b8cc] heart-float">
              ❤
            </span>
          </div>
          <div className="mt-6 text-xs uppercase tracking-[0.35em] text-[#b07a8a]">
            Always
          </div>
          <div className="mt-3 font-letter text-2xl text-[#b06e84]">
            Forever &amp; always
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
