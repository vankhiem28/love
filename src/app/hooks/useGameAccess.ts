"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FLIP_GAME_CONFIG } from "../game-config";

export const useGameAccess = () => {
  const state = useQuery(api.game.getState);
  const incrementPlayCount = useMutation(api.game.incrementPlayCount);
  const playCount = state?.playCount ?? 0;
  const phrases = state?.phrases ?? [];
  const isLocked = playCount >= FLIP_GAME_CONFIG.maxPlays;

  const registerPlay = async () => {
    const result = await incrementPlayCount({});
    return {
      locked: result.locked,
      playCount: result.playCount,
    };
  };

  return {
    playCount,
    phrases,
    isLocked,
    registerPlay,
  };
};
