"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FLIP_GAME_CONFIG } from "../game-config";

export const useGiftService = () => {
  const createGiftOpen = useMutation(api.gifts.createGiftOpen);

  const saveFixedGiftOpen = async () => {
    return createGiftOpen({
      rewardLabel: FLIP_GAME_CONFIG.fixedRewardLabel,
      amount: FLIP_GAME_CONFIG.fixedRewardAmount,
    });
  };

  return {
    saveFixedGiftOpen,
  };
};
