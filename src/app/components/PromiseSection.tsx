"use client";

import { FUTURE_WISHES, PROMISES } from "../content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const PromiseSection = () => (
  <section className="relative bg-linear-to-b from-[#fffafc] via-white to-[#fff7fb] py-24">
    <div className="mx-auto max-w-5xl px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Promises"
          title="Những lời hứa anh dành cho em"
          subtitle="Cho hiện tại dịu dàng và một tương lai vững chắc hơn."
        />
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PROMISES.map((promise, index) => (
          <Reveal key={promise.title} delay={index * 0.08}>
            <div className="h-full rounded-[26px] border border-white/80 bg-white/80 p-6 shadow-[0_20px_60px_rgba(93,64,80,0.12)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-[#b07a8a]">
                Promise {index + 1}
              </p>
              <h3 className="font-display mt-3 text-2xl text-[#4b2b36]">
                {promise.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6f4e5d]">
                {promise.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      {/* <div className="mt-12 rounded-[28px] border border-white/80 bg-[var(--cream-soft)] p-8 shadow-[0_30px_80px_rgba(93,64,80,0.12)]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-[#b07a8a]">
            Future notes
          </p>
          <h3 className="font-display mt-3 text-2xl text-[#4b2b36]">
            Ước hẹn của chúng mình
          </h3>
          <div className="mt-4 space-y-3 text-sm text-[#6f4e5d]">
            {FUTURE_WISHES.map((wish) => (
              <p key={wish}>• {wish}</p>
            ))}
          </div>
        </Reveal>
      </div> */}
    </div>
  </section>
);
