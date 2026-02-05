"use client";

import { STORY_PARAGRAPHS } from "../content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const StorySection = () => (
  <section className="relative bg-[#fffafc] py-24">
    <div className="mx-auto max-w-4xl px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Love Letter"
          title="Một bức thư dành cho em"
          subtitle="Từ ngày gặp nhau, đến khoảng lặng, và đến ngày mình yêu xa nhưng vẫn chọn lại nhau."
        />
      </Reveal>
      <div className="mt-10 rounded-4xl border border-white/80 bg-(--cream-soft) p-8 shadow-[0_30px_80px_rgba(92,59,74,0.12)] md:p-12">
        {STORY_PARAGRAPHS.map((paragraph, index) => (
          <Reveal key={paragraph} delay={index * 0.1}>
            <p className="font-letter mt-5 text-lg leading-9 text-[#5e3b49] md:text-xl">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
