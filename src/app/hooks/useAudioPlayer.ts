"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_VOLUME = 0.1;
const MIN_VOLUME = 0;
const MAX_VOLUME = 1;

const normalizeVolume = (value: number) =>
  Math.min(MAX_VOLUME, Math.max(MIN_VOLUME, value));

type UseAudioPlayerOptions = {
  src: string;
  loop?: boolean;
  autoStartOnInteraction?: boolean;
  volume?: number;
};

export const useAudioPlayer = ({
  src,
  loop = true,
  autoStartOnInteraction = true,
  volume = DEFAULT_VOLUME,
}: UseAudioPlayerOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRef = useRef(normalizeVolume(volume));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
    setIsPlaying(false);
    const audio = new Audio(src);
    audio.loop = loop;
    audio.preload = "auto";
    audio.volume = volumeRef.current;
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

  useEffect(() => {
    const normalizedVolume = normalizeVolume(volume);
    volumeRef.current = normalizedVolume;
    if (audioRef.current) {
      audioRef.current.volume = normalizedVolume;
    }
  }, [volume]);

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
