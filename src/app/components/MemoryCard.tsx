"use client";

import type { Memory } from "../content";
import { Reveal } from "./Reveal";

type MemoryCardProps = {
  memory: Memory;
  index: number;
};

export const MemoryCard = ({ memory, index }: MemoryCardProps) => (
  <Reveal delay={index * 0.08}>
    <div className="relative rounded-[28px] border border-white/80 bg-white/80 p-6 shadow-[0_20px_60px_rgba(93,64,80,0.12)] backdrop-blur">
      <span className="absolute -left-5 top-8 h-3 w-3 rounded-full bg-[#e9a6bc] shadow-[0_0_0_6px_rgba(233,166,188,0.25)]" />
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,_#ffe4ec,_#fbeef6_60%,_#e8e0f0)] text-sm uppercase tracking-[0.2em] text-[#b47b8e] md:h-32 md:w-44">
          Ảnh kỷ niệm
          <span className="pointer-events-none absolute inset-0">
            <span className="absolute left-0 top-6 h-10 w-10 rounded-full bg-white/40 blur-xl" />
            <span className="absolute right-2 bottom-4 h-12 w-12 rounded-full bg-white/30 blur-2xl" />
          </span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#b08998]">
            {memory.date}
          </p>
          <h3 className="font-display mt-2 text-2xl text-[#4b2b36]">
            {memory.title}
          </h3>
          <p className="mt-2 text-sm text-[#6f4e5d] md:text-base">
            {memory.caption}
          </p>
        </div>
      </div>
    </div>
  </Reveal>
);
