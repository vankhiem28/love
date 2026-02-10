"use client";

import { useMemo } from "react";
import { FlipCardGame } from "./FlipCardGame";
import { useGameAccess } from "../hooks/useGameAccess";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const GameSection = () => {
  const { phrases } = useGameAccess();
  const visiblePhrases = useMemo(() => phrases.slice(-10), [phrases]);

  const positions = useMemo(() => {
    if (visiblePhrases.length === 0) {
      return [];
    }

    const hashToUnit = (value: string) => {
      let hash = 0;
      for (let i = 0; i < value.length; i += 1) {
        hash = (hash << 5) - hash + value.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash) % 1000;
    };

    return visiblePhrases.map((phrase, index) => {
      const seed = `${phrase}-${index}`;
      const leftSeed = hashToUnit(`${seed}-left`);
      const topSeed = hashToUnit(`${seed}-top`);
      const durationSeed = hashToUnit(`${seed}-duration`);
      const left = 8 + (leftSeed % 84);
      const top = 6 + (topSeed % 40);
      const delay = index * 0.35;
      const duration = 7 + (durationSeed % 4);
      return { left, top, delay, duration };
    });
  }, [visiblePhrases]);

  return (
    <section className="relative overflow-hidden bg-[#fffafc] py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffe3ef_0%,_transparent_55%)] opacity-70" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#ffe8f2]/70 blur-3xl" />
        <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[#e9defa]/65 blur-3xl" />
        <div className="absolute left-1/2 top-24 h-32 w-32 -translate-x-1/2 rounded-full bg-white/70 blur-2xl" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden md:block">
        {visiblePhrases.length > 0 ? (
          <div className="relative h-full px-6">
            <div className="absolute inset-0">
              {visiblePhrases.map((phrase, index) => {
                const position = positions[index];
                if (!position) {
                  return null;
                }

                return (
                  <div
                    key={`phrase-${phrase}-${index}`}
                    className="phrase-orbit absolute rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs text-[#7b4a5b] shadow-[0_12px_30px_rgba(93,64,80,0.15)]"
                    style={{
                      left: `${position.left}%`,
                      top: `${position.top}%`,
                      animationDelay: `${position.delay}s`,
                      animationDuration: `${position.duration}s`,
                    }}
                  >
                    {phrase}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Mini Game"
            title="Lật thẻ quà"
            subtitle="Chọn một thẻ và lật để mở món quà 14-2."
          />
        </Reveal>
        {phrases.length > 0 ? (
          <div className="mt-8 md:hidden flex flex-wrap items-center justify-center gap-3">
            {visiblePhrases.map((phrase, index) => (
              <div
                key={`mobile-${phrase}-${index}`}
                className="phrase-orbit rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs text-[#7b4a5b] shadow-[0_12px_30px_rgba(93,64,80,0.15)]"
                style={{
                  animationDelay: `${index * 0.6}s`,
                  animationDuration: `${8 + (index % 3) * 2}s`,
                }}
              >
                {phrase}
              </div>
            ))}
          </div>
        ) : null}
        <div className="mt-10">
          <Reveal>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-12 rounded-[48px] bg-[radial-gradient(circle_at_top,_#ffe9f2,_transparent_60%)] opacity-80" />
              <div className="pointer-events-none absolute -inset-6 rounded-[44px] bg-[linear-gradient(140deg,_rgba(255,232,243,0.9),_rgba(255,255,255,0.6),_rgba(233,222,250,0.8))] opacity-80 blur-[2px]" />
              <div className="pointer-events-none absolute left-1/2 top-2 h-56 w-56 -translate-x-1/2 rounded-full bg-[conic-gradient(from_90deg,_rgba(255,210,230,0.55),_rgba(255,255,255,0.2),_rgba(230,221,250,0.55),_rgba(255,210,230,0.55))] ring-spin opacity-70 blur-xl" />
              <div className="pointer-events-none absolute -left-10 top-10 h-28 w-28 rounded-full bg-[#ffe3f1]/80 blur-2xl halo-pulse" />
              <div className="pointer-events-none absolute -right-12 bottom-8 h-32 w-32 rounded-full bg-[#e9defa]/75 blur-2xl halo-pulse" />
              <div className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full border border-[#f3cfe0] ring-spin opacity-70" />
              <div className="pointer-events-none absolute -right-8 top-8 h-24 w-24 rounded-full border border-[#f3cfe0] ring-spin-slow opacity-60" />
              <div className="pointer-events-none absolute left-6 bottom-6 h-12 w-28 rotate-[-8deg] rounded-full bg-white/70 shadow-[0_12px_30px_rgba(93,64,80,0.12)]" />
              <div className="pointer-events-none absolute right-10 bottom-2 h-12 w-24 rotate-[10deg] rounded-full bg-white/70 shadow-[0_12px_30px_rgba(93,64,80,0.12)]" />
              <div className="pointer-events-none absolute -left-8 bottom-2 text-5xl text-[#d46b8a] heart-float">
                💐
              </div>
              <div className="pointer-events-none absolute -right-6 -bottom-4 text-5xl text-[#4b2b36] heart-float">
                🍫
              </div>
              <div className="pointer-events-none absolute left-6 top-8 h-3 w-3 rounded-full bg-[#f3cfe0] sparkle" />
              <div className="pointer-events-none absolute right-12 bottom-10 h-4 w-4 rounded-full bg-[#e9defa] sparkle" />
              <div className="pointer-events-none absolute left-1/3 top-4 h-2 w-2 rounded-full bg-[#ffd7e6] sparkle" />
              <div className="pointer-events-none absolute right-1/3 top-12 h-2.5 w-2.5 rounded-full bg-[#efe4ff] sparkle" />
              <div className="relative z-10">
                <FlipCardGame />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
