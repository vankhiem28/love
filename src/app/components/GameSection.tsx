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
    <section className="relative bg-[#fffafc] py-24">
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
      <div className="mx-auto max-w-5xl px-6">
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
            <FlipCardGame />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
