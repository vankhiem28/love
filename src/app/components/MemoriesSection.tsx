"use client";

import Image from "next/image";
import { TREASURED_MOMENTS } from "../content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const MemoriesSection = () => (
  <section className="relative bg-linear-to-b from-[#fffafc] via-white to-[#fdf4f8] py-24">
    <div className="mx-auto max-w-6xl px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Moments"
          title="Những điều anh trân trọng"
          subtitle="Một vài khoảnh khắc nhỏ mà anh luôn nhớ."
        />
      </Reveal>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-16 w-16 rotate-12 rounded-xl bg-[#ffe4ec]/70 blur-xl" />
            <div className="absolute -right-8 -top-4 h-20 w-20 -rotate-6 rounded-full bg-[#e8e0f0]/70 blur-2xl" />
            <div className="relative -rotate-2 rounded-[28px] border-2 border-white/90 bg-white p-4 shadow-[0_25px_80px_rgba(93,64,80,0.18)]">
              <div className="relative h-165 w-full overflow-hidden rounded-[22px]">
                <Image
                  src="/img/h5.jpg"
                  alt="Khoảnh khắc của em"
                  fill
                  sizes="(max-width: 1024px) 90vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#b07a8a]">
                <span>Yêu em bé ❤️❤️❤️</span>
                <span>♡</span>
              </div>
              <div className="pointer-events-none absolute -left-4 top-10 h-8 w-16 -rotate-12 rounded-lg bg-white/60 shadow-[0_8px_20px_rgba(93,64,80,0.12)]" />
              <div className="pointer-events-none absolute -right-4 bottom-12 h-8 w-14 rotate-12 rounded-lg bg-white/60 shadow-[0_8px_20px_rgba(93,64,80,0.12)]" />
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded-[28px] border border-white/80 bg-white/80 p-8 shadow-[0_20px_60px_rgba(93,64,80,0.12)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-[#b07a8a]">
              Mấy điều nhỏ
            </p>
            <h3 className="font-display mt-3 text-2xl text-[#4b2b36]">
              Những khoảnh khắc anh trân trọng
            </h3>
            <div className="mt-5 space-y-3 text-sm text-[#6f4e5d]">
              {TREASURED_MOMENTS.map((moment) => (
                <p key={moment}>• {moment}</p>
              ))}
            </div>
            <div className="mt-6 h-px bg-linear-to-r from-transparent via-[#e4c7d4] to-transparent" />
            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-[#b07a8a]">
              Always &amp; Forever
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
