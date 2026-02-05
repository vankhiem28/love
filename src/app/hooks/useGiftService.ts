"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export type CreateGiftOpenInput = {
  rewardLabel: string;
  accountNumber: string;
};

export const useGiftService = () => {
  const createGiftOpen = useMutation(api.gifts.createGiftOpen);

  const saveGiftOpen = async (input: CreateGiftOpenInput) => {
    return createGiftOpen(input);
  };

  return {
    saveGiftOpen,
  };
};
