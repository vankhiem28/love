"use client";

import { FALLING_HEARTS } from "../content";

export const FallingHeartsRain = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {FALLING_HEARTS.map((heart, index) => (
      <span
        key={`${heart.left}-${index}`}
        className="absolute inline-block select-none text-[#f2a7bc]"
        style={{
          left: heart.left,
          top: 0,
          fontSize: heart.size,
          opacity: heart.opacity,
          transformOrigin: "center",
          willChange: "transform",
          animation: `fall ${heart.duration} linear infinite`,
          animationDelay: heart.delay,
          // @ts-expect-error CSS variable for drift distance.
          "--drift": heart.drift,
        }}
      >
        ❤
      </span>
    ))}
  </div>
);
