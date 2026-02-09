"use client";

import { useCallback, useMemo, useState } from "react";
import { FLIP_CARD_FRONT_LABELS } from "../content";
import { FLIP_GAME_CONFIG } from "../game-config";

type FlipCard = {
  id: string;
  frontLabel: string;
  rewardLabel: string;
};

const buildDeck = (): FlipCard[] => {
  return FLIP_CARD_FRONT_LABELS.map((frontLabel, index) => ({
    id: `${index}-${frontLabel}`,
    frontLabel,
    rewardLabel: FLIP_GAME_CONFIG.fixedRewardLabel,
  }));
};

export const useFlipCardGame = () => {
  const [cards, setCards] = useState<FlipCard[]>(() => buildDeck());
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const revealedCard = useMemo(
    () => cards.find((card) => card.id === revealedId) ?? null,
    [cards, revealedId]
  );

  const handleFlip = useCallback(
    (cardId: string) => {
      if (revealedId) {
        return;
      }
      const selected = cards.find((card) => card.id === cardId);
      if (!selected) {
        return;
      }
      setRevealedId(cardId);
      setSelectedReward(selected.rewardLabel);
    },
    [cards, revealedId]
  );

  const resetGame = useCallback(() => {
    setCards(buildDeck());
    setRevealedId(null);
    setSelectedReward(null);
  }, []);

  return {
    cards,
    revealedId,
    revealedCard,
    selectedReward,
    handleFlip,
    resetGame,
  };
};
