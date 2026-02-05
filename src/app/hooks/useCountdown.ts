"use client";

import { useEffect, useMemo, useState } from "react";

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

export const useCountdown = (target: Date) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    getRemaining(target)
  );

  const isExpired = useMemo(
    () => target.getTime() <= Date.now(),
    [target]
  );

  useEffect(() => {
    if (isExpired) {
      return;
    }

    const interval = window.setInterval(() => {
      setTimeLeft(getRemaining(target));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isExpired, target]);

  const isComplete =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return {
    timeLeft,
    isExpired: isExpired || isComplete,
  };
};
