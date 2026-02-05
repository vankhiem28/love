"use client";

import Lottie from "lottie-react";
import { GIRLFRIEND_NAME } from "../content";
import heartAnimation from "../assets/heart.json";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const EndingSection = () => (
  <section className="relative bg-[#fffafc] py-24">
    <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
      <Reveal>
        <SectionHeading
          eyebrow="Forever"
          title="Lời kết từ trái tim"
          subtitle="Và câu nói mà anh muốn nhắc lại mỗi ngày."
        />
      </Reveal>
      <Reveal className="mt-10 w-full max-w-md">
        <div className="rounded-[28px] border border-white/80 bg-white/80 p-6 shadow-[0_20px_60px_rgba(93,64,80,0.12)] backdrop-blur">
          <Lottie animationData={heartAnimation} loop />
        </div>
      </Reveal>
      <Reveal>
        <h3 className="font-display mt-8 text-3xl text-[#4b2b36] md:text-4xl">
          Anh yêu em, {GIRLFRIEND_NAME}.
        </h3>
        <p className="mt-4 max-w-2xl text-base text-[#6f4e5d]">
          Cảm ơn em vì đã trở lại và chọn chúng ta thêm một lần nữa. Dù đang yêu
          xa, anh vẫn ở đây, nắm tay em thật chặt và cùng em bước tiếp.
        </p>
      </Reveal>
      <Reveal>
        <div className="mt-8 rounded-full border border-[#f1c7d6] bg-white/70 px-6 py-3 text-sm text-[#7a5564]">
          ♪ Gợi ý: mở bài hát của tụi mình và đọc lại từ đầu.
        </div>
      </Reveal>
    </div>
  </section>
);
