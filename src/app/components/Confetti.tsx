"use client";

import { useMemo } from "react";
import { CONFETTI_COLORS } from "../content";

export const Confetti = () => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        left: `${(index * 11 + 8) % 100}%`,
        delay: `${(index % 6) * 0.2}s`,
        duration: `${2.4 + (index % 5) * 0.25}s`,
        size: `${6 + (index % 4) * 2}px`,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute top-0 rounded-full"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            animation: `confetti-fall ${piece.duration} ease-in forwards`,
            animationDelay: piece.delay,
          }}
        />
      ))}
    </div>
  );
};
