"use client";

import { useEffect, useState } from "react";

export type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getRemaining = (target: Date): CountdownTime => {
  const diff = target.getTime() - Date.now();
  const total = Math.max(diff, 0);
  const seconds = Math.floor(total / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
};

const isCountdownComplete = (time: CountdownTime): boolean =>
  time.days === 0 &&
  time.hours === 0 &&
  time.minutes === 0 &&
  time.seconds === 0;

export const useCountdown = (target: Date) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    getRemaining(target)
  );

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = getRemaining(target);
      setTimeLeft(remaining);
      return remaining;
    };

    if (isCountdownComplete(updateCountdown())) {
      return;
    }

    const interval = window.setInterval(() => {
      const remaining = updateCountdown();
      if (isCountdownComplete(remaining)) {
        window.clearInterval(interval);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [target]);

  const isExpired = isCountdownComplete(timeLeft);

  return {
    timeLeft,
    isExpired,
  };
};
