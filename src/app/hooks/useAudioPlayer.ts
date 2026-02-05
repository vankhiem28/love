"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseAudioPlayerOptions = {
  src: string;
  loop?: boolean;
  autoStartOnInteraction?: boolean;
};

export const useAudioPlayer = ({
  src,
  loop = true,
  autoStartOnInteraction = true,
}: UseAudioPlayerOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
    setIsPlaying(false);
    const audio = new Audio(src);
    audio.loop = loop;
    audio.preload = "auto";
    audioRef.current = audio;

    const handleCanPlay = () => setIsReady(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [src, loop]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) {
      return false;
    }
    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
      return false;
    }
    return play();
  }, [isPlaying, pause, play]);

  useEffect(() => {
    if (!autoStartOnInteraction) {
      return;
    }

    const handleFirstInteraction = () => {
      void play();
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction, {
      once: true,
    });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [autoStartOnInteraction, play]);

  return {
    isPlaying,
    isReady,
    play,
    pause,
    toggle,
  };
};
