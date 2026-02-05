"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FLIP_GAME_CONFIG } from "../game-config";

export type SubmitPhraseResult = {
  ok: boolean;
  error?: string;
};

export const useGameAccess = () => {
  const state = useQuery(api.game.getState);
  const incrementPlayCount = useMutation(api.game.incrementPlayCount);
  const submitPhraseMutation = useMutation(api.game.submitPhrase);

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

  const submitPhrase = async (phrase: string): Promise<SubmitPhraseResult> => {
    const normalized = phrase.trim().toLowerCase();
    const required = FLIP_GAME_CONFIG.unlockPhrase.trim().toLowerCase();

    if (!normalized) {
      return { ok: false, error: "Vui lòng nhập câu mở khóa." };
    }

    if (normalized !== required) {
      return { ok: false, error: "Câu này chưa đúng. Thử lại nhé." };
    }

    await submitPhraseMutation({ phrase: phrase.trim() });
    return { ok: true };
  };

  return {
    playCount,
    phrases,
    isLocked,
    registerPlay,
    submitPhrase,
  };
};
