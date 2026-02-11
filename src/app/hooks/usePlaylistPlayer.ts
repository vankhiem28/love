"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { MusicTrack } from "../types";
import { useAudioPlayer } from "./useAudioPlayer";

type UsePlaylistPlayerOptions = {
  tracks: MusicTrack[];
  loop?: boolean;
  autoStartOnInteraction?: boolean;
};

export const usePlaylistPlayer = ({
  tracks,
  loop = false,
  autoStartOnInteraction = true,
}: UsePlaylistPlayerOptions) => {
  const safeTracks = useMemo(() => tracks.filter(Boolean), [tracks]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingAutoPlay, setPendingAutoPlay] = useState(false);

  const currentTrack = safeTracks[currentIndex];
  const {
    isPlaying,
    isReady,
    play,
    pause,
    toggle,
  } = useAudioPlayer({
    src: currentTrack?.src ?? "",
    loop,
    autoStartOnInteraction,
  });

  const selectTrack = useCallback(
    (index: number) => {
      if (index === currentIndex || !safeTracks[index]) {
        return;
      }
      setPendingAutoPlay(isPlaying);
      setCurrentIndex(index);
    },
    [currentIndex, isPlaying, safeTracks]
  );

  const next = useCallback(() => {
    if (safeTracks.length <= 1) {
      return;
    }
    const nextIndex = (currentIndex + 1) % safeTracks.length;
    selectTrack(nextIndex);
  }, [currentIndex, safeTracks.length, selectTrack]);

  const prev = useCallback(() => {
    if (safeTracks.length <= 1) {
      return;
    }
    const prevIndex =
      (currentIndex - 1 + safeTracks.length) % safeTracks.length;
    selectTrack(prevIndex);
  }, [currentIndex, safeTracks.length, selectTrack]);

  useEffect(() => {
    if (safeTracks.length === 0) {
      return;
    }
    if (currentIndex >= safeTracks.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, safeTracks.length]);

  useEffect(() => {
    if (!pendingAutoPlay || !isReady) {
      return;
    }
    void play().finally(() => setPendingAutoPlay(false));
  }, [isReady, pendingAutoPlay, play]);

  return {
    tracks: safeTracks,
    currentIndex,
    currentTrack,
    isPlaying,
    isReady,
    play,
    pause,
    toggle,
    selectTrack,
    next,
    prev,
  };
};
